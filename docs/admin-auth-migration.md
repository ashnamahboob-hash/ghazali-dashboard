# Ghazali admin authentication separation — migration checklist

Status: PREPARATION ONLY. Do not switch the live dashboard to the second project without a server-side authorization bridge.

## Verified projects
- ghazali-herbs: production Firestore and public-app Firebase Authentication; dashboard authorization uses the verified admin UID in firestore.rules.
- ghazali-nature: separate Firebase project; existing Android app and ghazali-admin web app; one pre-existing Auth account; no Firestore database returned by CLI.

## Security invariants
1. Never change ghazali-herbs Firestore rules to accept arbitrary clients, email claims, or a client-supplied admin flag.
2. Never put a Firebase service-account private key or privileged token in GitHub Pages or the browser.
3. Do not disable user sign-up in ghazali-herbs: public app accounts must remain functional.
4. The existing admin UID in ghazali-herbs must keep access until the replacement is fully verified.
5. The ghazali-nature Firebase ID token is not directly trusted by ghazali-herbs Firestore security rules.

## Required implementation before cutover
- Verify ghazali-nature's existing Auth user and authorized Google sign-in provider; confirm the intended administrator identity.
- Provision a trusted backend (Cloud Run/Cloud Functions) that verifies ghazali-nature ID tokens using the Admin SDK for that project and checks an exact allowlisted UID.
- Have the backend use a ghazali-herbs service identity with minimum required privileges, or issue tightly scoped ghazali-herbs custom tokens after server-side verification; never trust a UID supplied by the browser.
- Explicitly design and test Firestore authorization for admin operations, including read/write, batch edits, history, and feedback; deny unapproved accounts.
- Test owner login, non-owner Google login, fresh registration, and public-app login; verify failed access and no unexpected new admin account.
- Switch dashboard auth only after end-to-end tests; preserve rollback to current UID-based production access.

## Current production
The production dashboard and Firestore rules remain bound to ghazali-herbs. This document makes no runtime changes.
