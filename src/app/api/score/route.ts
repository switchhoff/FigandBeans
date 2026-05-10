import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: NextRequest) {
  try {
    const { prompt, humanResponse, aiResponse, mode, model = 'gemini-2.5-flash' } = await req.json();

    const { text } = await generateText({
      model: google(model),
      prompt: buildJudgePrompt(prompt, humanResponse, aiResponse, mode),
    });

    let parsed;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(jsonMatch?.[0] ?? text);
    } catch {
      console.error('[/api/score] unparseable:', text);
      return NextResponse.json({ error: 'Judge returned unparseable response', raw: text }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error('[/api/score]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// Future: build a detailed judge prompt
export function buildJudgePrompt(
  prompt: string,
  humanResponse: string,
  aiResponse: string,
  mode: string
): string {
  return `You are judging a writing game called Fig & Beans.

The prompt was: "${prompt}"

Mode: ${mode === 'pretend-human' ? 'Both writers were trying to sound human' : 'Both writers were trying to sound like an AI'}

Response A: "${humanResponse}"

Response B: "${aiResponse}"

One was written by a human (Fig). One was written by an AI (Beans).

Assess both responses and return a JSON object with:
- humanScore (0-100): how human Response A seems
- aiScore (0-100): how human Response B seems
- judgement: a 2-3 sentence witty commentary on which fooled you and why
- guessedHumanWasHuman: true if you think Response A was actually written by a human
- humanPercentage: percentage score indicating how human the human response seems (0-100)
- breakdown: { creativity, emotionalDepth, coherence, aiPatterns, surpriseFactor } each 0-100`;
}
