# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Vocly is a minimalist micro-learning web app for ultra-fast Spanish/German vocabulary training. Built with React, Vite, TypeScript, and TailwindCSS.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
```

## Architecture

This is a **no-backend, no-auth** app — all data is static and all state is in-memory.

**Vocabulary data** lives in `src/data/vocab.json`. Each entry: `{ "de": "...", "es": "...", "category": "..." }`. The app reads this file directly; adding new words or categories requires only editing the JSON.

**Core quiz logic:**
- Questions are randomly ordered, mixing both directions (de→es and es→de)
- Each question presents 4 choices; distractors are drawn from the **same category** as the correct answer for harder reps
- No persistence — no localStorage, no accounts, no streaks

**Mobile-first UI** — interactions should be fast, finger-friendly, and require no setup.

## Commit messages

- Use imperative mood, present tense: "Add word list" not "Added word list"
- Keep the subject line under 72 characters
- No trailing period on the subject line
- Focus on the *why*, not the *what* — the diff already shows what changed
- One logical change per commit; avoid bundling unrelated changes

## Scope boundaries

Out of scope for MVP: audio/TTS, spaced repetition, progress persistence, user accounts, difficulty/CEFR filtering. Do not add these unless explicitly requested.
