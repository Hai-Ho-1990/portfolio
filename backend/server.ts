import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));

const SUPABASE_URL = (process.env.SUPABASE_URL || '').trim();
const SUPABASE_SERVICE_ROLE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('SUPABASE_URL eller SUPABASE_SERVICE_ROLE_KEY saknas!');
  process.exit(1);
}

// ✅ Använd createClient istället för PostgrestClient direkt
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

app.post('/api/postInsight', async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    if (!content) return res.status(400).json({ error: 'Missing content' });

    // Insert till Supabase (UTF-8 stöds automatiskt)
    const { data, error } = await supabase.from('insights').insert([{ content }]).select();

    if (error) return res.status(500).json({ error: error.message });

    res.status(200).json({ success: true, inserted: data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
