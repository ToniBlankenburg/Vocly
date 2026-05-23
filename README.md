# Vocly

A minimalist micro-learning web app for ultra-fast German ↔ Spanish vocabulary training.
Designed to replace doomscrolling with rapid-fire vocabulary reps.

**Live:** [vocly.org](https://www.vocly.org)

## Features

- **CEFR level progression** — A1 → A2 → B1, unlocked by earning 15 correct answers per level
- German ↔ Spanish, both directions, randomly mixed per session
- 4-choice multiple choice — distractors drawn from the same category for harder reps
- Keyboard support — press 1–4 to answer
- Streak counter with 🔥 indicator
- Light / dark mode toggle (defaults to dark; favicon follows OS preference)
- Mobile-first, no login, no setup, no tracking

## Tech stack

- React 18 + TypeScript
- Vite (per-level vocab files code-split into separate chunks)
- TailwindCSS
- React Router v6

## Run locally

```bash
npm install
npm run dev
```

## Vocabulary data

Words live in `src/data/de-es/{level}/{category}.json` — one file per category per level.

| Level | Categories | Words |
|-------|-----------|-------|
| A1 | animal, clothing, color, family, food, house, number, time, transport, verb, weather | 200 |
| A2 | adjective, body, place, profession, shopping, verb | 109 |
| B1 | abstract, adjective, emotion, nature, verb, work | 105 |

Each entry:

```json
{ "de": "der Apfel", "es": "la manzana" }
```

A1 is bundled with the main chunk; A2 and B1 are lazy-loaded when the user reaches that level.
New categories are picked up automatically — just drop a JSON file into the right level folder.

## Out of scope

Audio/TTS, spaced repetition, progress persistence, user accounts.
