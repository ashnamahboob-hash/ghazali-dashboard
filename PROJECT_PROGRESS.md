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
- [x] Obtain a complete file tree and inspect all HTML script/link references.
- [x] Inspect `tools/app-source.cjs`; Node execution remains pending because the repository cannot be run in this connector session.
- [ ] Review every module's imports/exports and global dependencies; data chunk counts and insertion markers currently match.
- [ ] Reconcile branch ancestry with the three main commits; their key Gemini/offline changes have been reapplied, but the commits are not yet merged/cherry-picked.
- [x] Refresh service-worker cache version and precache the split app's runtime assets; install now fails visibly if a required shell asset cannot be cached.
- [ ] Run Node tests and syntax checks; record exact pass/fail output.
- [ ] Perform browser and offline smoke tests.
- [x] Update this file after each meaningful checkpoint.
- [ ] Only then prepare a PR/merge recommendation; do not merge without user approval.

## Work log
### 2026-11-21
- Located and inspected `refactor/split-app-html` rather than the older PR #19 branch.
- Confirmed the complete app file tree and checked every local script/style reference in `app/app.html`; all references resolve after normalizing `./accounts.js`.
- Inspected `tools/app-source.cjs`: it reconstructs the former monolithic HTML by inserting moved data chunks at explicit markers in the JavaScript files.
- Reapplied the current-main Gemini URL fix: `app/app.html` now loads `./ghazali-gemini.js?v=6`.
- Reworked `app/sw.js`: bumped cache to `gk-shell-v6`, added the current local Gemini module and plant JSON to the shell, listed the split runtime CSS/JS files, and removed the silent catch around precache installation by using `cache.addAll`.
- Verified both edits are present at the branch head. The latest app source commit is `b2f7e9d85acf05d51a2aee47ef8a6c0d8d10d2e8`; latest service-worker commit / branch HEAD is `43999b1cb44de89aa85a4646c5e8faa6eaeda4ab`.
- Branch comparison now reports 4 commits ahead and 3 behind `main`; the three behind commits are not yet part of this branch's ancestry even though the important Gemini/offline code changes have been reapplied.
- No Node tests or browser/offline tests have been executed. GitHub Actions reports no workflow runs for this branch, and this environment could not clone the repository for local execution.
- Remaining high-priority review: validate classic-script top-level declaration collisions and script dependency order; execute all Node tests and browser smoke tests before any merge.
- No merge has been performed.

### Additional checkpoint — automated validation setup
- Added `.github/workflows/validate-app.yml` on the active refactor branch. It runs Node syntax checks and the six existing regression tests (including the four-language JSDOM production test).
- The workflow file is present, but GitHub currently reports zero workflow runs/check-runs for its commit; therefore no tests are claimed as passing.
- Static check: every local script/style path referenced by `app/app.html` exists in the branch tree (the `./accounts.js` path resolves to `accounts.js`).
- Static check: all eight moved data files have matching reconstruction markers/chunk counts in their destination JS files; the emblem image chunk is intentionally handled separately by `app-source.cjs`.
- Latest branch comparison at this checkpoint: 6 commits ahead and 3 commits behind `main`. The branch still needs a careful ancestry integration step; no merge has been performed.

### Additional checkpoint — offline shell regression coverage
- Found a real offline-startup gap: the first revised service-worker shell cached the split CSS/JS files but omitted the eight data scripts referenced by `app/app.html`. Those data scripts contain the plant and reference content needed by the app.
- Added all eight data scripts to `app/sw.js` and kept the `gk-shell-v6` version. The install uses `cache.addAll(SHELL)`, so missing required assets fail the install rather than being silently ignored.
- Added `test-pwa-shell.cjs`, which checks that every local `src`/`href` referenced by `app/app.html` is present in the service-worker shell and explicitly checks all eight split data files.
- Updated `.github/workflows/validate-app.yml` to syntax-check both `app/js/*.js` and `app/data/*.js`, and to run the new offline-shell test with the existing regression suite.
- Independent static comparison of the actual branch files: 27 unique local HTML asset references, zero missing from the 34-entry service-worker cache list.
- The test suite has not yet been executed by Node/GitHub Actions in this session; do not mark tests as passing until a real run is available.

### Additional checkpoint — dependency and cache audit
- Reviewed the ordered script/style tags in `app/app.html`: the page loads the split data files before the core and feature scripts; Firebase/account/Gemini module scripts are marked as modules and execute after parsing.
- Confirmed the static local asset audit has no missing `src`/`href` references.
- Separately checked every entry in the 34-item service-worker shell against the Git tree: zero missing files (excluding the intentional directory entry `./`).
- Confirmed the branch diff against `main` still contains the intended split files and the two app-shell integration files; no unrelated files were introduced by this work.
- The three commits on `main` remain absent from branch ancestry. Their relevant Gemini/offline changes are present in the branch's current file contents, but a merge commit has deliberately not been created without approval.
