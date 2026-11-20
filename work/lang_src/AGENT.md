# Translating Gill Fighter into one language (instructions for a translation agent)

Gill Fighter is a casual iOS game: you are a small fish, eat smaller fish, grow, avoid bigger ones, collect 100+ fish species, decorate an aquarium, play online Arena, and build "Gill City", an undersea town (Township / SimCity style). Players are casual, 12+. Tone: friendly, short, playful, clear. These are UI strings: buttons, labels, toasts, help text, update notes.

You translate from English (the English text is the existing official English UI). All work is under /home/claude/gill-fighter/work/lang_src.

## Inputs
- `src_main_1.json` … `src_main_4.json`: arrays of `[id, english]` or `[id, english, "SHORT"]`. SHORT = a top-bar icon label; keep it very short (≤ 7 Latin chars, ≤ 3 CJK chars).
- `src_other.json`: object with
  - `city_d`: `[id, english]` town-mode words and sentences
  - `city_t`: `[id, english]` town-mode sentence templates that contain `$1`, `$2` … (captured values inserted at runtime)
  - `city_u`: unit words map (`"일":"d","시간":"h","분":"m","초":"s","칸":" tiles","개":"","마리":""` = day, hour, minute, second, tiles, count, fish). Give your language's short unit suffixes (keep "" where English has "", e.g. counters). Keep a leading space if your language needs a space before the unit.
  - `mx`, `mx2`: `[id, english]` English UI strings written directly in code (keep `{k}`-style placeholders)
  - `rx`: `[id, english_regex, spanish_example]` regex patterns over English UI text; you write the replacement string for your language using the same `$1`, `$2` groups (the Spanish example shows what a replacement looks like). Keep any trailing group like `$2` where the example keeps it.
- `glossary.json`: `{code: {term: translation}}` — USE these exact translations for core terms everywhere (Pearls, Gems, Coral Hall, Town, tabs, modes …) so the whole game is consistent.
- `langs.json`: code → [App Store locale, language name].
- `/home/claude/gill-fighter/store/whatsnew_*.json`: already-published store texts in your locale (useful style/term reference).

## Output (write files, valid JSON, UTF-8)
- `out/<code>/main_<n>.json` for each main chunk you are assigned: `{"<id>": "<translation>", ...}` with EVERY id of that chunk (ids as strings).
- `out/<code>/other.json` (only if assigned): `{"city_d":{id:text}, "city_t":{id:text}, "city_u":{korean_unit: suffix}, "mx":{id:text}, "mx2":{id:text}, "rx":{id:replacement}, "pack":{"town":"<short tab label for the town, = glossary 'Town (bottom tab label, very short)'>","city":"<glossary Gill City>"}}`

Write each file as soon as that chunk is done (use python3 to json.dump with ensure_ascii=False, or the Write tool). Work in batches of ~150–250 strings so nothing is skipped. Then run `python3 validate.py <code>` — it checks all chunks, so it will report files you were not assigned as missing; ignore those, but fix every problem in YOUR files (missing ids, changed HTML tags, changed placeholders, leftover Korean).

## Rules
1. Keep EXACTLY: HTML tags and their attributes (`<b>`, `<small>`, `<br>`, `<i style="...">` …), placeholders (`$1`, `{n}`, `%s`, `\n`), emoji, numbers, symbols like `·` `›` `→` `×` `🫧` `💎`. You may move them inside the sentence where your grammar needs it.
2. Do not translate brand names except as the glossary says (Gill Fighter, Gill City).
3. Keep strings about as long as the English (UI space is tight). Prefer the short natural wording a mobile game would use. Buttons: imperative/short.
4. Fish species names: translate common names naturally (e.g. Clownfish → your usual name). Invented names: translate the meaning playfully or keep if it's a name.
5. If an English string is a fragment (starts/ends mid-sentence, e.g. "Collect from orders, trains, whale ships and bubbles:"), translate it as a fragment that will be followed by the same kind of value.
6. Never leave Korean characters in output. If the English is empty or just symbols, copy it as is.
7. Right-to-left languages (Arabic, Hebrew): write normally in your script; keep numbers/emoji as they are.
8. Don't add explanations or notes inside translations.
