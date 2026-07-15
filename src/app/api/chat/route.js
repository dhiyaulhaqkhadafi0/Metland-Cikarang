import { GoogleGenerativeAI } from "@google/generative-ai";
import { SMI_SYSTEM_PROMPT } from "@/lib/smi-knowledge";

// Models to try in order of preference
const FALLBACK_MODELS = [
  "gemini-3.5-flash",
  "gemini-3-flash-preview",
  "gemini-3.1-flash-lite",
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash",
];

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY tidak ditemukan." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Build chat history - skip leading assistant messages (welcome greeting)
    const conversationMessages = messages.slice(0, -1);
    const firstUserIdx = conversationMessages.findIndex((m) => m.role === "user");
    const validHistory = firstUserIdx >= 0 ? conversationMessages.slice(firstUserIdx) : [];
    const history = validHistory.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: m.parts ? m.parts : [{ text: m.content || "" }],
    }));

    const lastMessage = messages[messages.length - 1];
    const promptParts = lastMessage?.parts ? lastMessage.parts : [{ text: lastMessage?.content || "" }];

    // Try each model until one works
    let lastError = null;
    for (const modelName of FALLBACK_MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: SMI_SYSTEM_PROMPT,
        });

        const chat = model.startChat({ history });
        const result = await chat.sendMessageStream(promptParts);

        const stream = new ReadableStream({
          async start(controller) {
            const encoder = new TextEncoder();
            try {
              for await (const chunk of result.stream) {
                const text = chunk.text();
                if (text) {
                  const encoded = encoder.encode(`0:${JSON.stringify(text)}\n`);
                  controller.enqueue(encoded);
                }
              }
            } catch (streamErr) {
              console.error(`Stream error (${modelName}):`, streamErr);
            } finally {
              controller.close();
            }
          },
        });

        // If we got here, the model worked!
        return new Response(stream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "X-Vercel-AI-Data-Stream": "v1",
          },
        });
      } catch (modelErr) {
        console.warn(`Model ${modelName} failed:`, modelErr.message?.substring(0, 100));
        lastError = modelErr;
        // Continue to next model
      }
    }

    // All models failed
    const errMsg = lastError?.message || "Semua model AI sedang tidak tersedia.";
    return new Response(
      JSON.stringify({ error: errMsg }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("SMI Chat API Error:", error?.message || error);
    return new Response(
      JSON.stringify({ error: error?.message || "Terjadi kesalahan pada server SMI." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
