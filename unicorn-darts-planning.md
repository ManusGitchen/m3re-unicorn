# Unicorn-Darts Architecture Planning Questions

Please answer the questions below by editing this file. Add your answers after each question.

---

## 1. Game Types Priority

**Question**: You mentioned "standard darts game rules (301, 501, Cricket, etc.)". Should we:

- **Option A**: Start with just one game type (e.g., 301) for MVP, then expand later?
- **Option B**: Plan for all three game types (301, 501, Cricket) from the start?

**Recommendation**: Start with 301 (most common) for MVP

**Your Answer**: Start with 501

---

## 2. Database Technology

**Question**: You specified SQLite, but for a web application, which approach should we use:

- **Option A**: SQLite via WASM (sql.js or wa-sqlite) - runs entirely in browser, no backend needed
- **Option B**: SQLite on a backend server (Node.js + better-sqlite3) - requires building an API layer
- **Option C**: Browser-native storage (IndexedDB) - simpler, no dependencies, sufficient for local games

**Recommendation**: IndexedDB for simplicity, or sql.js if SQLite is a hard requirement

**Your Answer**: sqlight is no hard requirement, use indexedDB for simplicity. I just need something to store the resuts and to same the profiles

---

## 3. Monorepo Structure

**Question**: Should unicorn-darts be:

- **Option A**: A separate package like `unicorn-darts/` (sibling to `unicorn-lib/`) with its own build config
- **Option B**: A subdirectory within `unicorn-lib/` (e.g., `unicorn-lib/apps/darts/`)

**Recommendation**: Separate package for independence and easier deployment

**Your Answer**: option A

---

## 4. Deployment Target & Routing

**Question**: 
- Will this be a standalone web app (deployed separately)?
- Or a demo/example within the unicorn-lib project?
- Does it need routing (multi-page) or can it be single-page?

**Your Answer**: standalone web app deployed on home server or running local. Can be a singlepage application

---

## 5. Player Images

**Question**: For player profile images, which approach:

- Upload from device?
- Use avatar service (like Gravatar, DiceBear)?
- Simple initials-based avatars?

**Recommendation**: Initials-based avatars initially (simpler), add upload later

**Your Answer**: for mvp I can set the images hard, but I would like to change it to upload from device later

---

## 6. Shortcuts/Slang Terms

**Question**: You mentioned "breakfast" = 26. Should we:

- Research comprehensive darts slang dictionary (there are many: "bagadix" = 26, "ton" = 100, etc.)?
- Start with a basic set (5-10 common terms)?

**Recommendation**: Basic set initially (breakfast, ton, shanghai, etc.), extensible for more

**Your Answer**: basic set initially is enough. take your recommendation

---

## 7. Component Reuse Strategy

**Question**: Since unicorn-lib provides CSS classes but NOT Vue components:

- Should unicorn-darts create its own Vue components using the CSS classes?
- Or should we extract reusable components back into unicorn-lib for shared use?

**Recommendation**: Create components in unicorn-darts first, extract to unicorn-lib later if needed

**Your Answer**: create them in unicorn-darts. I will extract later if I need them somewhere again.

---

## 8. Testing Priority

**Question**: For Vitest 8 testing:

- Full test coverage from the start (TDD approach)?
- Focus on business logic (scoring, rules) first, UI tests later?

**Recommendation**: Business logic tests first (critical for scoring accuracy)

**Your Answer**: business logic tests like unit tests, so ui tests

---

## Additional Notes

Add any additional requirements, constraints, or preferences here:

