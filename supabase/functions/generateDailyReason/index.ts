// Importera Deno server
import { serve } from 'https://deno.land/std@0.203.0/http/server.ts';
// Supabase Deno client
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Läs miljövariabler från Supabase Edge
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY')!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !OPENAI_KEY) {
  console.error('Missing environment variables');
}

// Skapa Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Funktion som anropar OpenAI
async function callOpenAI(prompt: string) {
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 120,
      temperature: 0.9,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`OpenAI error: ${resp.status} ${text}`);
  }

  const data = await resp.json();
  return data.choices?.[0]?.message?.content?.trim() ?? null;
}

// Funktion som genererar dagens anledning
async function generateDailyReason() {
  const prompt = `You are an expert career copywriter specializing in creating persuasive, warm, and personal one-sentence pitches for junior frontend developers.

Your task is to generate ONE unique, concise sentence in English explaining why a recruiter should hire Hai Ho as a Junior Frontend Developer.

Use the following personal profile to shape the tone and content:

- Finishing the final year of a Frontend Developer program at IT-Högskolan in Stockholm; graduating June 2026.
- Skilled in HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind, Git, and API integration.
- Passionate about creative projects, UI design, and improving user experience.
- Experience building full projects from idea to completion (e.g., an AI-powered recorder app with transcription).
- Reliable, responsible, honest, and someone others can depend on.
- Strong soft skills: problem-solving, communication, creativity, accountability, adaptability.
- Team player who listens, contributes ideas, and supports others; experienced with Agile teamwork.
- Motivated by growth, curiosity, and creating meaningful digital experiences.
- Comfortable with Figma, VSCode, Jira, and modern development tools.
- Targeting product companies, startups, and agencies.

Tone & style requirements:
1. One single sentence.
2. Highly personal and human, not generic.
3. Persuasive and confidence-building, yet humble and sincere.
4. Should make the recruiter feel: “This is a junior developer we want on our team.”
5. Reflect Hai’s personality, passion, responsibility, and drive.
6. Tailored to what companies commonly look for in junior frontend developers today.

Do NOT write an example — generate one new, original sentence each time the prompt is used.
`;

  let reason = 'Hai Ho combines curiosity with a fast-learning mindset.'; // fallback
  try {
    const ai = await callOpenAI(prompt);
    if (ai) reason = ai;
  } catch (err) {
    console.error('OpenAI failed:', err);
  }

  // Radera gamla rader
  await supabase.from('daily_reasons').delete().neq('id', 0);

  // Lägg in ny anledning
  const { data, error } = await supabase
    .from('daily_reasons')
    .insert({ reason, generated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Serve Edge Function
serve(async (req) => {
  try {
    // Accept either a valid service-role Authorization header or a cron secret header.
    const authHeader = req.headers.get('authorization');
    const cronHeader = req.headers.get('x-invoke-secret');
    const CRON_INVOKE_SECRET = Deno.env.get('CRON_INVOKE_SECRET');

    // If Authorization provided, require it to match the service role key.
    if (authHeader) {
      const parts = authHeader.split(' ');
      if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
        return new Response(JSON.stringify({ code: 401, message: 'Invalid authorization' }), {
          status: 401,
        });
      }
    } else if (cronHeader && CRON_INVOKE_SECRET) {
      // If cron header provided, require it to match env secret.
      if (cronHeader !== CRON_INVOKE_SECRET) {
        return new Response(JSON.stringify({ code: 401, message: 'Invalid cron secret' }), {
          status: 401,
        });
      }
    } else {
      // No acceptable auth provided. Return 401 with explanatory message.
      return new Response(JSON.stringify({ code: 401, message: 'Missing authorization header' }), {
        status: 401,
      });
    }

    const data = await generateDailyReason();
    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (err: any) {
    console.error('Function error', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
