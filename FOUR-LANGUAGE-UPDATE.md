# Four-language content update

Active UI and full-content languages, in order: Pashto (ps), Persian (fa), Urdu (ur), English (en). Arabic botanical names remain in names.ar and the existing multilingual name lists. Arabic UI dictionaries and bundled Arabic body translations are removed. A stored Arabic preference falls back to Pashto. Other recent main-branch changes are preserved.

Dashboard editing, completeness, new records, content imports, saves, and exports use four text languages. Arabic botanical names have a separate editor and remain importable/searchable. The web app ignores Arabic body fields from older cloud records and retains Arabic plant names.

## Existing Firestore records

Deploying GitHub Pages does not migrate Firestore. An authenticated administrator must use **د عربي متن پاکول** in the dashboard. It reads the current data, shows the affected count, prompts, downloads a complete pre-migration JSON backup and deletes only `fields.ar` in batches of 400. `names.ar`, all `otherNames` lists (including Arabic names), other language text, status, and images are not changed. Historical backups are retained. The operation is idempotent; an interrupted run can be retried. No production database migration has been claimed by the code deployment.

The provided 2026-11-15 export can be converted separately for archival/file use, but must not replace newer live records wholesale.

## Checks

- `node test-accounts.cjs`
- `node test-identification-details.cjs`
- `NODE_PATH=/path/to/jsdom-and-acorn/node_modules node tools/test-four-language-production.cjs`
- `git diff --check`

Tests cover all bundled details in four languages, UI order and direction, legacy preference fallback, exact Arabic-name preservation against the base commit, account behavior and identification metadata. Native APK binaries are not rebuilt by this web update; native wrappers may have separate bundled content/settings.
