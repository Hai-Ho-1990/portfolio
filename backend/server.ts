import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve paths in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

// CORS
const allowedOrigins = ['http://localhost:5173'];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// OPTIONS
app.options('/api/daily', (_req, res) => res.sendStatus(204));

// Serve static frontend
app.use(express.static(distPath));

// API endpoint
app.get('/api/daily', async (_req: Request, res: Response) => {
  res.json({ success: true, reason: 'Hello from backend' });
});

// SPA fallback: serve index.html for all non-API routes
app.get(/^\/.+/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Default fallback for root
app.get('/', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
