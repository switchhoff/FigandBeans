import { NextRequest, NextResponse } from 'next/server';

// Placeholder — wire up Vercel AI SDK here
// import { generateText } from 'ai';
// import { anthropic } from '@ai-sdk/anthropic';

export async function POST(req: NextRequest) {
  const { prompt, mode } = await req.json();

  // TODO: Replace with Vercel AI SDK streaming
  // const { text } = await generateText({
  //   model: anthropic('claude-opus-4-7'),
  //   prompt: buildBeansPrompt(prompt, mode),
  // });

  const mockResponses: Record<string, string[]> = {
    'pretend-human': [
      `Okay so I've been sitting with this for a few minutes and I'm not sure I have a clean answer. There's something about the question that keeps slipping away from me the moment I try to pin it down. Which is maybe the answer. Or maybe I'm just avoiding saying something embarrassing.`,
      `This is going to sound weird but the first thing I thought of was my dad's car. Old Volvo, smelled like petrol and dog, and somehow that's where I always felt most like I was going somewhere. I don't know what that has to do with anything. Probably everything.`,
    ],
    'pretend-ai': [
      `This is an excellent prompt that raises several important considerations. Firstly, it is worth noting that the question has multiple dimensions worth exploring. Furthermore, I would like to present a structured analysis. In conclusion, the answer involves a nuanced understanding of the interplay between various factors.`,
      `Thank you for this thoughtful question. I will now provide a comprehensive response structured around three key principles. 1. Context is paramount. 2. Multiple perspectives exist. 3. Nuance is essential. It is important to consider all of the above before forming a definitive view.`,
    ],
  };

  const responses = mockResponses[mode] || mockResponses['pretend-human'];
  const text = responses[Math.floor(Math.random() * responses.length)];

  return NextResponse.json({ text });
}

export function buildBeansPrompt(prompt: string, mode: string): string {
  if (mode === 'pretend-human') {
    return `You are Beans, an AI playing a game where you must write as humanly as possible. Write a short, natural, slightly imperfect response to the following prompt. Be personal, a little messy, and genuine. Avoid lists, structure, or formal language. 1-3 paragraphs max.

Prompt: "${prompt}"`;
  } else {
    return `You are Beans, an AI playing a game where you must write as artificially as possible. Write a structured, formal, slightly hollow response to the following prompt. Use bullet points, numbered lists, transitional phrases like "Furthermore", "It is worth noting", and "In conclusion". Be thorough but empty.

Prompt: "${prompt}"`;
  }
}
