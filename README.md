# Vocly
A minimalist micro-learning web app for ultra-fast Spanish vocabulary training.
Designed to replace doomscrolling with rapid-fire vocabulary reps.
MVP Features

German ↔ Spanish vocabulary (both directions, randomly mixed)
Multiple choice answers (4 options per question)
Category-aware distractors — wrong answers are pulled from the same category as the correct word for harder, more useful reps
Instant feedback
Mobile-first
No login
No setup
Ultra-fast interaction loop

Vocabulary Data
Vocabulary lives in a single JSON file at src/data/vocab.json so it's easy to read, edit, and download directly from GitHub.
The MVP ships with a small seed list (~50 words) to keep things minimal. The list is meant to grow — just edit the JSON.
Each entry has the shape:
json{
  "de": "der Apfel",
  "es": "la manzana",
  "category": "food"
}
Categories used in the seed list include food, family, color, verb, number, animal, and a few others. Add new categories freely; the app picks them up automatically.
Out of Scope for MVP
These are planned for later, not part of the first release:

Audio / text-to-speech
Spaced repetition / smart review of wrong answers
Progress persistence, streaks, accuracy stats
Accounts or sync
Difficulty levels / CEFR filtering (A1, A2, …)

Tech Stack

React
Vite
TypeScript
TailwindCSS

Philosophy
Fast brain reps.
Minimal friction.
One more round.
Run locally
bashnpm install
npm run dev
Deploy
Deploy instantly with Vercel.
