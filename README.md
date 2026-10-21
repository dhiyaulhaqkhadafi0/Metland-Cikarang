<div align="center">

# SMMC Property — Property Discovery Experience

**A real estate discovery and lead-generation web application**

Product thinking · Frontend engineering · Search and discovery · Buyer experience

</div>

---

## Project overview

SMMC Property is a Next.js web project for making residential property discovery more informative and approachable. Its interface brings property exploration, financing education, interactive tools, and inquiry flows into one browsing experience.

This repository documents the **product implementation**. It is not a statement of official endorsement, property availability, or current real estate offers.

## Product features

| Experience | Engineering focus |
| --- | --- |
| Property discovery and cluster pages | Browse and understand housing options |
| Smart property finder | Guided discovery and filtering |
| Mortgage and investment tools | Interactive financial scenario exploration |
| Property galleries | Visual storytelling for listings |
| Lead capture | Clear calls to action and inquiry journeys |
| Internal dashboard | Workspace for managing supporting operations |

## Tech stack

- **Application:** JavaScript, React, Next.js App Router
- **Styling & interaction:** Tailwind CSS, Framer Motion, Lucide, Lenis
- **Data & authentication:** Supabase
- **Supporting tools:** AI SDK integrations, analytics, PDF/export utilities

## Structure

```text
src/
  app/             Page routes, APIs, authentication, dashboard
  components/
    atoms/         Small reusable UI pieces
    molecules/     Composed elements
    organisms/     Full-page sections
    kpr/           Financing experiences
    explore/       Property discovery
    dashboard/     Management interfaces
  ...
public/            Media and static assets
```

## Local development

```bash
npm ci
npm run dev
```

Use development-only configuration for external integrations. Do not commit credentials, lead/customer records, or downloaded analytics.

```bash
npm run lint
npm run build
```

## Product engineering notes

The project illustrates how sales-facing domain knowledge can translate into user journeys: discovery → comparison → financing understanding → inquiry. It is an evolving product project, not a claim that every workflow has been independently production-certified.

## Builder

**Daffa Dhiyaulhaq Khadafi** — AI-Assisted Product Engineer & Digital Builder.

[Personal site](https://khadafidaffa.com) · [More work](https://github.com/dhiyaulhaqkhadafi0/website)
