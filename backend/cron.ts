// Backend cron scheduler. Disabled by default to avoid duplicate runs with
// Supabase edge-function scheduling. To enable backend scheduling set
// the environment variable `ENABLE_BACKEND_CRON=true`.

const ENABLE_BACKEND_CRON = process.env.ENABLE_BACKEND_CRON === 'true';

if (!ENABLE_BACKEND_CRON) {
  console.log('Backend cron disabled. Using Supabase edge-function schedule.');
} else {
  (async () => {
    try {
      const cron = (await import('node-cron')).default;
      const { ChatOpenAI } = await import('@langchain/openai');
      const { supabase } = await import('./supabase');

      const llm = new ChatOpenAI({
        model: 'gpt-4o-mini',
        temperature: 0.9,
        apiKey: process.env.OPENAI_API_KEY,
        maxRetries: 0,
      });

      async function generateDailyReason() {
        const prompt = `
You are an expert career coach for junior frontend developers. Your task is to generate a single, concise, positive sentence in English explaining why a recruiter should hire Hai Ho as a Junior Frontend Developer.

Consider the following personal and professional profile:
- Currently finishing the last year of a Frontend Developer program at IT-Högskolan, Stockholm, graduating in June 2026.
- Strong foundation in HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind, Git, API integration.
- Experienced in team projects using Agile methodologies; reliable, responsible, and collaborative team member who actively contributes ideas and technical support.
- Particularly enjoys fullstack challenges and creative projects, with a focus on design and enhancing user experience.
- Worked on significant projects, e.g., a Recorder App with AI transcription features, built from idea to completion.
- Comfortable with Figma, VSCode, Jira, and other modern development tools.
- Personal qualities: honest, trustworthy, responsible, open-minded, adaptable, eager to learn and improve.
- Motivation: passionate about frontend development, creativity, and building beautiful, user-friendly digital experiences.
- Target employers: product companies, startups, and agencies.

Requirements for your output:
1. Max 1 sentence.
2. Professional, persuasive, yet humble and realistic tone.
3. Focus on strengths, skills, or qualities that make Hai Ho a great hire.
4. Keep it relevant to what recruiters typically value in junior frontend developers today.

Output example: “...” (don’t provide the example; generate a unique sentence each time).
`;

        let reason: string;

        try {
          const response = await llm.invoke(prompt);
          reason = String(response.content).trim();
        } catch (err: Error | any) {
          console.log('❌ AI error (possibly out of credits):', err?.message ?? String(err));
          reason =
            'Hai Ho combines strong curiosity with a fast-learning mindset, delivering value from day one.';
        }

        await supabase.from('daily_reasons').delete().neq('id', 0);

        const { data, error } = await supabase
          .from('daily_reasons')
          .insert({ reason, generated_at: new Date() })
          .select();

        if (error) {
          console.error('🔥 Supabase error:', error);
        } else {
          console.log('New daily reason generated:', data?.[0]);
        }
      }

      cron.schedule('0 0 * * *', generateDailyReason);
      console.log('Backend cron job activated (ENABLE_BACKEND_CRON=true).');
    } catch (err) {
      console.error('Failed to start backend cron:', err);
    }
  })();
}
