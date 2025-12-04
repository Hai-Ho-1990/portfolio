import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// ✅ Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ JSON middleware
app.use(express.json({ limit: '1mb' }));

// ✅ Supabase setup
const SUPABASE_URL = (process.env.SUPABASE_URL || '').trim();
const SUPABASE_SERVICE_ROLE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing!');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// ✅ CORS headers middleware for Render + localhost dev
const allowedOrigins = [
  'http://localhost:5173', // dev frontend
  'https://portfolio-pwex.onrender.com', // Render frontend
];

app.use('/api', (req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// ✅ Handle preflight OPTIONS requests
app.options('/api/*', (_req, res) => res.sendStatus(204));

// ✅ Serve static frontend files (from dist)
const distPath = path.resolve(__dirname);
app.use(express.static(distPath));

// ✅ API endpoint: fetch latest daily reason
app.get('/api/daily', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('daily_reasons')
      .select('*')
      .order('id', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    if (!data) {
      return res.json({
        success: true,
        reason: null,
        message: 'No reason found in database',
      });
    }

    return res.json({
      success: true,
      reason: data.reason,
      generated_at: data.generated_at,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ SPA fallback: serve index.html for all non-API routes
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
