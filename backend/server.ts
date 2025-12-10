import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve paths in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

// Supabase setup
const SUPABASE_URL = (process.env.SUPABASE_URL || '').trim();
const SUPABASE_SERVICE_ROLE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_URL eller SUPABASE_SERVICE_ROLE_KEY saknas!');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Middleware: JSON + CORS
app.use(express.json({ limit: '1mb' }));

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

// OPTIONS preflight: use middleware instead of a wildcard route
// (wildcard patterns like '*' can trigger path-to-regexp errors)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Serve static frontend files
app.use(express.static(distPath));

// API endpoint
app.get('/api/daily', async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('daily_reasons')
    .select('*')
    .order('id', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) return res.status(500).json({ success: false, error: error.message });
  if (!data)
    return res.json({ success: true, reason: null, message: 'Ingen anledning i databasen' });

  return res.json({ success: true, reason: data.reason, generated_at: data.generated_at });
});

// Blogs endpoint (reads table name from env: BLOG_TABLE)
app.get('/api/blogs', async (_req: Request, res: Response) => {
  try {
    const table = (process.env.BLOG_TABLE || 'blogs').trim();
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ success: false, error: error.message });
    return res.json({ success: true, posts: data || [] });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || String(err) });
  }
});

// Reasons endpoint — return all rows from `daily_reasons`
app.get('/api/reasons', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('daily_reasons')
      .select('*')
      .order('id', { ascending: false });

    if (error) return res.status(500).json({ success: false, error: error.message });
    return res.json({ success: true, reasons: data || [] });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || String(err) });
  }
});

// SPA fallback
app.get(/^\/.+/, (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
app.get('/', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
