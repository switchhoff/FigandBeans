import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: NextRequest) {
  const { prompt, mode } = await req.json();

  const { text } = await generateText({
    model: google('gemini-2.0-flash'),
    prompt: buildBeansPrompt(prompt, mode),
  });

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
