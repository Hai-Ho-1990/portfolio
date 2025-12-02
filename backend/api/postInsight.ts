import { createClient } from '@supabase/supabase-js';
import { IncomingMessage, ServerResponse } from 'http';

// Skapa Supabase-klient med Service Role Key
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function handlePostInsight(req: IncomingMessage, res: ServerResponse, body: string) {
  try {
    const parsed = JSON.parse(body);
    if (!parsed.content) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Missing content' }));
    }

    // Konvertera content till Base64 (för att undvika ByteString problem)
    const contentBase64 = Buffer.from(String(parsed.content), 'utf8').toString('base64');

    const { data, error } = await supabase
      .from('insights')
      .insert([{ content: contentBase64 }])
      .select();

    if (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: error.message }));
    }

    // Dekoda content innan vi skickar tillbaka till frontend
    const decodedData = data?.map((item) => ({
      ...item,
      content: Buffer.from(item.content, 'base64').toString('utf8'),
    }));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, inserted: decodedData }));
  } catch (err: any) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  }
}
