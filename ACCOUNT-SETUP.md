# Account rollout

The web app uses the existing **ghazali-herbs** Firebase project, matching the dashboard. Do not substitute the older native project's configuration.

## Required Firebase setup

1. In Authentication, enable Email/Password and Google, and add the actual hosted app domain to Authorized domains.
2. Review and publish `firestore.rules` to **ghazali-herbs**. GitHub publication does not deploy these rules.
3. Verify email/password signup, verification mail, password reset, Google popup, sign-out and login on the hosted URL with test accounts.
4. Check two accounts: favorites/recent history must stay isolated; reload and a second device must restore the correct account's preferences. Guest data remains separate.
5. Submit a signed-in web suggestion and review it in the dashboard. Approval marks the suggestion as reviewed; it does not automatically rewrite book entries.

## Compatibility and limits

The Android NativeAccount bridge retains precedence. Its existing general feedback uses `feedback`; signed-in web submissions use `suggestions`. Native authentication and cloud profile synchronization still need a coordinated Android update; this change does not rebuild or modify the APK.

Signed-in web preferences use `users/{uid}/private/preferences`, with stable book codes in Firestore. Local personal caches are separated by UID. Sign-out restores guest data. Local caches remain on the device for later use by that account; this is not encrypted storage. Cloud failures display a notice and keep local changes.

Cloud preferences use last-write-wins snapshots, not concurrent multi-device merging. Successful cloud access and deployed security rules require the manual checks above; local tests do not prove Firebase is configured.

## Checks run

- `node test-accounts.cjs`
- `node test-identification-details.cjs`
- JavaScript syntax checks and `git diff --check`
