# Admin bridge deployment and cutover checklist

The two email addresses are verified in **ghazali-nature** (checked 2026-11-23):
- ashna…: UID `nVfXdNUGqwQhQWUKAqeQXmEBasL2`
- habib…: UID `ujStiMs6mEYQUmf55bXBvVkxSo53`

The production dashboard remains on **ghazali-herbs**. Do **not** change its Firebase config until the bridge is deployed and tested.

## Requirements before deployment
1. A trusted Cloud Run or Cloud Functions runtime with a service identity authorized to verify `ghazali-nature` users and mint Firebase custom tokens in `ghazali-herbs`. Grant only necessary IAM permissions, including token signing capability; do not download or commit private keys.
2. Set `ADMIN_NATURE_UIDS=nVfXdNUGqwQhQWUKAqeQXmEBasL2,ujStiMs6mEYQUmf55bXBvVkxSo53`.
3. Set `ALLOWED_ORIGIN=https://ashnamahboob-hash.github.io`. This origin check is **not authentication**; token verification and UID allowlisting are the real controls.
4. Deploy `admin-bridge/src/index.mjs` as an HTTP handler with Node.js 20+ and `firebase-admin`. Cloud Run requires an HTTP entrypoint/wrapper; this repository does **not** yet include a deployable Cloud Run container or configured runtime.
5. In the target project's Firestore rules, add only these two mapped UIDs, after bridge tests:
   - `nature_admin_nVfXdNUGqwQhQWUKAqeQXmEBasL2`
   - `nature_admin_ujStiMs6mEYQUmf55bXBvVkxSo53`
   Preserve existing admin UID for rollback until verified.
6. Integrate browser flow: sign in to `ghazali-nature`, get its Firebase ID token, POST it as Bearer to the bridge, sign in to `ghazali-herbs` with returned custom token, then load Firestore. Never store or log tokens.
7. Test both administrators; wrong password, unverified email, revoked account, unapproved UID, absent token, wrong origin, and existing public app sign-in.
8. Only then remove the previous admin UID and complete cutover.

## Current blockers
- No trusted server has been deployed.
- IAM and billing prerequisites for Cloud Run/Functions are not confirmed.
- Dashboard still authenticates against ghazali-herbs and its Firestore rules do not yet allow mapped admin UIDs.
- A Cloud Run deployable entrypoint and end-to-end tests are not yet present.

## Security
Do not expose Firebase Admin SDK credentials in the GitHub Pages frontend, and do not loosen Firestore rules. The public app's existing registration and access must remain unchanged.
