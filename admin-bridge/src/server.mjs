import express from 'express';
import { exchangeAdminToken } from './index.mjs';

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '8kb' }));
app.get('/healthz', (_req, res) => res.status(200).json({ status: 'ok' }));
app.all('/exchange', exchangeAdminToken);
app.use((_req, res) => res.status(404).json({ error: 'not_found' }));
app.listen(Number(process.env.PORT || 8080), '0.0.0.0');
