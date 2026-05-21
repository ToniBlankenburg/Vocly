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

One JSON file per CEFR level in [`src/data/`](src/data/):

| File | Level | Words |
|------|-------|-------|
| `vocab-a1.json` | A1 | 61 |
| `vocab-a2.json` | A2 | 24 |
| `vocab-b1.json` | B1 | 24 |

Each entry:

```json
{ "de": "der Apfel", "es": "la manzana", "category": "food", "level": "A1" }
```

A1 is bundled with the main chunk; A2 and B1 are lazy-loaded when the user reaches that level.
New categories are picked up automatically — no config needed.

## Out of scope

Audio/TTS, spaced repetition, progress persistence, user accounts.
