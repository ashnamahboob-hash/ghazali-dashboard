# Account rollout

The web app uses the existing **ghazali-herbs** Firebase project, matching the dashboard. Do not substitute the older native project's configuration.

## Required Firebase setup

1. In Authentication, enable Email/Password and Google, and add the actual hosted app domain to Authorized domains.
2. Review and publish `firestore.rules` to **ghazali-herbs**. GitHub publication does not deploy these rules.
3. Verify email/password signup, verification mail, password reset, Google popup, sign-out and login on the hosted URL with test accounts.
4. Check two accounts: favorites/recent history must stay isolated; reload and a second device must restore the correct account's preferences. Guest data remains separate.
5. Submit a signed-in web suggestion and review it in the dashboard. Approval marks the suggestion as reviewed; it does not automatically rewrite book entries.

## Compatibility and limits

Web and hosted Android WebView now use the same Firebase web session for account actions and Firestore writes. Native bridge presence does not authorize submissions. Android users need to sign in again with an account in **ghazali-herbs**; old native accounts are not automatically migrated. Email/password is available in the embedded app; Google popup is offered only in a regular browser because WebView popup OAuth is unsupported here. No APK was rebuilt.

Anonymous legacy feedback writes are closed in the rules. Publish the web account code and rules together. Existing feedback remains admin-readable. Admin login requires the configured administrator email to be verified. Users can read only their own suggestions; only the administrator can change review status. The account page includes a refreshable list of up to 100 suggestions. Approval is a moderation decision; the administrator still edits and publishes any book changes separately.

Signed-in web preferences use `users/{uid}/private/preferences`, with stable book codes in Firestore. Local personal caches are separated by UID. Sign-out restores guest data. Local caches remain on the device for later use by that account; this is not encrypted storage. Cloud failures display a notice and keep local changes.

Cloud preferences use last-write-wins snapshots, not concurrent multi-device merging. Successful cloud access and deployed security rules require the manual checks above; local tests do not prove Firebase is configured.

## Checks run

- `node test-accounts.cjs`
- `node test-identification-details.cjs`
- JavaScript syntax checks and `git diff --check`

2026-11-13 checks: authenticated submission, spoofed name replacement, native bridge bypass rejection, and account switching during photo processing. Firebase rules and physical Android login are not emulator/device-verified.
