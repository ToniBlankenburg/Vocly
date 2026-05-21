# Vocly

A minimalist micro-learning web app for ultra-fast German ↔ Spanish vocabulary training.
Designed to replace doomscrolling with rapid-fire vocabulary reps.

**Live:** [vocly.org](https://www.vocly.org)

## Features

- German ↔ Spanish vocabulary, both directions, randomly mixed
- 4-choice multiple choice — wrong answers drawn from the same category for harder reps
- Keyboard support — press 1–4 to answer
- Instant feedback with streak counter
- Mobile-first, no login, no setup

## Tech Stack

- React + TypeScript
- Vite
- TailwindCSS

## Run locally

```bash
npm install
npm run dev
```

## Vocabulary data

Lives in [`src/data/vocab.json`](src/data/vocab.json) — one entry per word:

```json
{ "de": "der Apfel", "es": "la manzana", "category": "food" }
```

To add words: edit the JSON. No rebuild config needed, new categories are picked up automatically.

## Out of scope for MVP

Audio/TTS, spaced repetition, progress persistence, accounts, difficulty/CEFR filtering.
