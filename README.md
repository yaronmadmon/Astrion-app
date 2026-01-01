## Astrion (Voice-to-Software Factory)

Astrion is an **Empathy-Driven Software Factory**: you speak an idea, Astrion analyzes confidence, asks clarifying questions when needed, and (when confident) creates an **app record + config JSON** that the UI renders deterministically.

### Key architecture (“the laws”)

- **Analyst layer**: `lib/analyst/analyzePrompt.ts` → scores confidence + suggests intent.
- **Command/Foreman layer**: `lib/foreman/planBuild.ts` → emits only high-level JSON (no raw code).
- **Engine/Builder layer**: deterministic templates + assembly; app UI renders from stored config JSON.
- **Storage**: file-backed by default (`data/apps/*.json`) with an Airtable-ready path (env-gated).

## Getting Started

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000` (landing)
- `http://localhost:3000/builder` (voice/text builder)

### How building works (MVP)

- POST `{"prompt":"..."}` to `POST /api/ai/build`
  - If low confidence → returns `{ mode: "dialogue", questions: [...] }`
  - If high confidence → creates an app record in `data/apps/<id>.json` and returns `{ mode: "build", id, config, build }`
- Visit `/apps/<id>` to see the config-driven app UI.

### Airtable (optional)

If you want Airtable reads in the existing deploy route, set:

- `AIRTABLE_API_KEY`
- `AIRTABLE_BASE_ID`

