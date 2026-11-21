# Ghazali Dashboard — Project Progress

Last checked: 2026-11-21

## Active work branch
- Branch: `refactor/split-app-html`
- Checked branch HEAD: `a5bfdc990166d95b88e4d164ab573d5406a84100`
- Main HEAD at checkpoint: `7497e32a778657e656e357556b3e1fb1df0b1eff`
- Do not merge this branch until the integration and runtime checks below are complete.
- Do not overwrite the user's split files or redesign the existing interface without an explicit need.

## User's goal
Split the previously very large `app/app.html` into maintainable HTML, CSS, JavaScript modules, and data files while preserving all existing dashboard features, data, language support, authentication, and appearance.

## Confirmed observations
- The split branch contains a substantially reduced `app/app.html` (the comparison reported approximately 2,931 fewer lines).
- New module groups exist under `app/js/`, `app/css/`, and `app/data/`.
- Observed JS modules include `core.js`, `afghan-plants.js`, `plantnet-id.js`, `firebase-dashboard.js`, `account-v2.js`, `improvements-v2.js`, `settings-modern.js`, `entry-names.js`, `hardware-back.js`, and `mint-lens-init.js`.
- Observed data modules include `images.js`, `taj-records.js`, `fig-text.js`, `word-detail-layout.js`, `pomegranate.js`, `reviewed-records.js`, `lst45.js`, and `afghan-embed.js`.
- A build/source helper exists at `tools/app-source.cjs`.
- Test files include `test-home-layout.cjs`, `test-identification-details.cjs`, `test-publication.cjs`, `test-accounts.cjs`, and `test-import-file.cjs`.
- The split branch is behind current `main` by 3 commits (compare result: `main` is ahead by 3; split branch is not ahead).
- The three commits on main include important updates to the Gemini module's local URL and service-worker cache/offline behavior. These must be integrated carefully into the split branch.
- Split branch currently uses an older Gemini URL and service-worker cache version (previously inspected as external Gemini URL and `gk-shell-v3`); current main uses a local Gemini module URL and a newer service-worker cache version.
- No GitHub Actions workflow runs were found for the split branch HEAD. Runtime/browser/offline behavior has not yet been verified.

## Risks / items to verify
1. Confirm every script and stylesheet referenced by `app/app.html` exists and loads in the correct order.
2. Check whether modules use globals that depend on earlier scripts; preserve dependency order.
3. Check duplicate top-level `const`/class declarations and module-vs-classic-script scope compatibility.
4. Confirm every data file is loaded before the code that consumes it, especially the plant and reference data.
5. Reconcile the three newer main commits without discarding the split work.
6. Update the service-worker shell list to include all required split assets; avoid silently swallowing precache failures.
7. Run all available Node tests and syntax checks; then test app load, login, language switching, plant search/details, identification, import/export, and offline reload in a browser.
8. Preserve the existing UI and all data. Do not delete or replace large embedded data until parity is demonstrated.

## Next steps (in order)
- [ ] Obtain a complete file tree and inspect all HTML script/link references.
- [ ] Inspect `tools/app-source.cjs` and test commands; determine exact supported build/test workflow.
- [ ] Review every module's imports/exports and global dependencies.
- [ ] Compare split branch with main and integrate the three main commits safely.
- [ ] Fix service-worker precache coverage and cache version.
- [ ] Run Node tests and syntax checks; record exact pass/fail output.
- [ ] Perform browser and offline smoke tests.
- [ ] Update this file after each meaningful checkpoint.
- [ ] Only then prepare a PR/merge recommendation; do not merge without user approval.

## Work log
### 2026-11-21
- Located and inspected `refactor/split-app-html` rather than the older PR #19 branch.
- Confirmed split structure and current branch/main SHAs above.
- Identified the three-commit mainline gap and stale Gemini/service-worker integration.
- No application source files have been changed in this checkpoint. This file is the continuity record.
