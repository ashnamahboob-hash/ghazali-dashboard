/**
 * Server-only bridge for Ghazali admin sign-in.
 * Requires a trusted runtime (Cloud Run / Functions), ADC, and IAM access to
 * ghazali-herbs. NEVER ship this file or a service-account key in browser code.
 *
 * Environment:
 * ADMIN_NATURE_UIDS: comma-separated Firebase Auth UIDs from ghazali-nature
 * ALLOWED_ORIGIN: exact dashboard origin, e.g. https://ashnamahboob-hash.github.io
 *
 * Flow: verify a ghazali-nature ID token, require allowlisted UID,
 * then mint a ghazali-herbs custom token. The production Firestore rules must
 * be updated to recognize the new target-project UID only after testing.
 */
import { initializeApp, cert, applicationDefault, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const nature = initializeApp({ credential: applicationDefault(), projectId: 'ghazali-nature' }, 'nature');
const herbs = initializeApp({ credential: applicationDefault(), projectId: 'ghazali-herbs' }, 'herbs');

export async function exchangeAdminToken(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Vary', 'Origin');
  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  if (allowedOrigin && req.headers.origin === allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  }
  if (req.method === 'OPTIONS') return res.status(allowedOrigin && req.headers.origin === allowedOrigin ? 204 : 403).end();
  if (req.method !== 'POST') return res.status(405).end();
  if (!allowedOrigin || req.headers.origin !== allowedOrigin) return res.status(403).json({error:'origin_not_allowed'});
  const bearer = /^Bearer (\S+)$/.exec(req.headers.authorization || '');
  if (!bearer) return res.status(401).json({error:'missing_token'});
  const allowed = new Set((process.env.ADMIN_NATURE_UIDS || '').split(',').map(s => s.trim()).filter(Boolean));
  if (!allowed.size) return res.status(503).json({error:'admin_not_configured'});
  try {
    const decoded = await getAuth(nature).verifyIdToken(bearer[1], true);
    if (!allowed.has(decoded.uid)) return res.status(403).json({error:'not_admin'});
    // Prefix avoids collisions with ghazali-herbs regular users.
    const targetUid = 'nature_admin_' + decoded.uid;
    const token = await getAuth(herbs).createCustomToken(targetUid);
    return res.status(200).json({token});
  } catch {
    return res.status(401).json({error:'invalid_or_expired_token'});
  }
}
