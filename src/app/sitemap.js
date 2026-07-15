export default function sitemap() {
  const baseUrl = "https://metlandcikarang.com"; // Replace with actual domain

  // In the future, this should dynamically fetch active clusters/articles from Supabase
  const staticRoutes = ["", "/explore", "/clusters", "/investment", "/kpr"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1 : 0.8,
  }));

  return [...staticRoutes];
}
