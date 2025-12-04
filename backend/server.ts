import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

// ✅ Deklarera app först
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(cors({ origin: 'https://portfolio-pwex.onrender.com' }));
// CORS för frontend
app.use(express.json({ limit: '1mb' }));

// ✅ Serve static Vite frontend
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

// Supabase setup
const SUPABASE_URL = (process.env.SUPABASE_URL || '').trim();
const SUPABASE_SERVICE_ROLE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('SUPABASE_URL eller SUPABASE_SERVICE_ROLE_KEY saknas!');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// ✅ Exempel GET endpoint
app.get('/api/daily', async (_req, res) => {
  const { data, error } = await supabase
    .from('daily_reasons')
    .select('*')
    .order('id', { ascending: false }) // viktig!
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

// ✅ SPA fallback: serve index.html for all non-API routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

