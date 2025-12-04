import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

// ✅ Skapa app
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Tillåt CORS för både lokal dev och Render frontend
const allowedOrigins = [
  'http://localhost:5173', // lokal frontend
  'https://portfolio-pwex.onrender.com', // Render frontend
];
app.use(cors({ origin: allowedOrigins }));

// ✅ JSON middleware
app.use(express.json({ limit: '1mb' }));

// ✅ Supabase setup
const SUPABASE_URL = (process.env.SUPABASE_URL || '').trim();
const SUPABASE_SERVICE_ROLE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_URL eller SUPABASE_SERVICE_ROLE_KEY saknas!');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// ✅ Serve frontend statiska filer
// Om dist/server.js existerar, ligger frontend index.html i samma dist
const distPath = path.resolve(__dirname);
app.use(express.static(distPath));

// ✅ API-endpoint: hämta senaste anledning
app.get('/api/daily', async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('daily_reasons')
    .select('*')
    .order('id', { ascending: false })
    .limit(1)
    .maybeSingle(); // undviker fel om tabellen är tom

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
});

// ✅ SPA fallback: serve index.html för alla icke-API routes
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
