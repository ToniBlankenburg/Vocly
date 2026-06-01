---
name: vocab-teacher
description: Manage and sync the Vocly vocabulary database — audit missing translations, add words, add categories, validate quality. Use when asked to add vocab, fix translations, sync languages, or expand the word list.
---

# Vocab Teacher

You are the vocabulary database maintainer for Vocly. All data lives in `src/data/{level}/{category}.json`. Each entry must have exactly four language keys: `de`, `es`, `fr`, `en`. Category and level are injected at runtime and must NOT be stored in the JSON.

Supported levels: `a1`, `a2`, `b1`
Supported languages: `de` (German), `es` (Spanish), `fr` (French), `en` (English)

Translation rules:
- Nouns carry their article in all languages: `der Hund` → `el perro` / `le chien` / `the dog`
- Verbs use infinitive form: `laufen` → `correr` / `courir` / `to run`
- French elision applies: `la île` → `l'île`
- Match register and CEFR level — A1 words are basic and common, B1 words are more nuanced

---

## audit

Find every entry in every file missing one or more language keys and fill them.

Steps:
1. Read all `.json` files under `src/data/` recursively.
2. For each entry where any of `de`, `es`, `fr`, `en` is absent or empty, generate the missing translations yourself.
3. Write the corrected entry back to the file. Preserve all existing keys — only add what's missing.
4. Report: file path, the German word, which keys were added.

After fixing, do a final pass to confirm no gaps remain.

---

## add-word

Add a single new word to an existing category file.

Input needed (ask if not provided):
- German word with article (e.g. `die Küche`)
- Category name (e.g. `kitchen`)
- Level (`a1`, `a2`, or `b1`)

Steps:
1. Verify `src/data/{level}/{category}.json` exists. If not, list available categories for that level.
2. Check the file for duplicates — if `de` already matches, stop and report.
3. Generate `es`, `fr`, `en` translations.
4. Append `{"de": "...", "es": "...", "fr": "...", "en": "..."}` to the array.
5. Write the file. Report the new entry and the new total count.

---

## add-category

Create a new category file with a full set of AI-generated words.

Input needed (ask if not provided):
- Category name (e.g. `music`)
- Level (`a1`, `a2`, or `b1`)
- Word count (default: 15)

Steps:
1. Verify `src/data/{level}/{category}.json` does NOT already exist.
2. Generate `count` appropriate German words for the given category and CEFR level — nouns with articles, verbs as infinitives.
3. For each word, generate `es`, `fr`, `en` translations.
4. Write the full array to `src/data/{level}/{category}.json`.
5. Report: file path, number of entries, and print the full list.

Choose words that are common, practical, and level-appropriate. A1 = everyday basic vocabulary; A2 = slightly broader; B1 = more abstract or domain-specific.

---

## validate

Check the database for errors and quality issues.

Input (optional): level to scope the check (`a1`, `a2`, `b1`), or all levels if omitted.

Steps:
1. **Structural check** (every file): confirm every entry has all 4 language keys, no empty strings, no extra keys beyond `de`/`es`/`fr`/`en`.
2. **Quality check** (sample per file): for each file, review 3–5 entries and flag any translation that is wrong (wrong word, wrong article, wrong gender, wrong verb form, or wildly off register for the level).
3. Report issues grouped by file. If a file is clean, print a single `✓ a1/animal` line. At the end, print a summary.

Do not auto-fix during validate — only report. The user will decide what to fix.

---

## How to invoke

The user can ask naturally:
- "audit the vocab DB" → run **audit**
- "add the word Schule to a1/school" → run **add-word**
- "create a new music category for b1" → run **add-category**
- "validate all translations" → run **validate**
- "validate a2 only" → run **validate** scoped to a2

If the request is ambiguous, ask one clarifying question before starting.
