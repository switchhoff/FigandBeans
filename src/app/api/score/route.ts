import { NextRequest, NextResponse } from 'next/server';

// Placeholder — wire up Vercel AI SDK here
// import { generateText } from 'ai';
// import { anthropic } from '@ai-sdk/anthropic';

export async function POST(req: NextRequest) {
  const { prompt, humanResponse, aiResponse, mode } = await req.json();

  // TODO: Replace with real AI judge using Vercel AI SDK
  // const { text } = await generateText({
  //   model: anthropic('claude-opus-4-7'),
  //   prompt: buildJudgePrompt(prompt, humanResponse, aiResponse, mode),
  // });

  // Mock response for now
  const mockScore = {
    humanScore: 55 + Math.floor(Math.random() * 30),
    aiScore: 45 + Math.floor(Math.random() * 30),
    judgement: 'The judge has deliberated. Results are provisional and subject to the model\'s interpretation of humanity.',
    guessedHumanWasHuman: true,
    humanPercentage: 60,
    breakdown: {
      creativity: Math.floor(40 + Math.random() * 55),
      emotionalDepth: Math.floor(40 + Math.random() * 55),
      coherence: Math.floor(50 + Math.random() * 45),
      aiPatterns: Math.floor(20 + Math.random() * 60),
      surpriseFactor: Math.floor(20 + Math.random() * 70),
    },
  };

  return NextResponse.json(mockScore);
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
