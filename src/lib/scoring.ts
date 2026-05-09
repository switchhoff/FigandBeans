import { RoundScores, GameMode } from '@/types';

// Placeholder scorer — replace with real Vercel AI SDK call
export async function scoreRound(
  prompt: string,
  humanResponse: string,
  aiResponse: string,
  mode: GameMode
): Promise<RoundScores> {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 2000 + Math.random() * 1500));

  // Mock scoring logic — will be replaced with actual AI judge
  const humanLen = humanResponse.length;
  const aiLen = aiResponse.length;

  // Heuristics for mock scoring
  const humanHasPersonal = /\b(i|my|me|we|us|our|personally|honestly|actually|hmm|uhh|dunno|kinda|sorta)\b/i.test(humanResponse);
  const humanHasTypos = /[a-z]{15,}/.test(humanResponse); // long words = probably not typo
  const aiHasBullets = /^[\s]*[-•*]/m.test(aiResponse);
  const aiHasListStructure = /\d\.\s/.test(aiResponse);
  const aiHasCorporateSpeak = /\b(furthermore|moreover|additionally|in conclusion|it is worth noting|it should be noted)\b/i.test(aiResponse);

  let humanScore = 50;
  let aiScore = 50;

  if (humanHasPersonal) humanScore += 15;
  if (!aiHasBullets && !aiHasListStructure) humanScore += 10;
  if (humanLen < 300) humanScore += 8; // humans tend to be more concise
  if (aiHasCorporateSpeak) aiScore += 20;
  if (aiHasBullets || aiHasListStructure) aiScore += 15;
  if (aiLen > 500) aiScore += 10;

  // Clamp
  humanScore = Math.min(95, Math.max(30, humanScore));
  aiScore = Math.min(95, Math.max(30, aiScore));

  const humanPercentage = Math.round((humanScore / (humanScore + aiScore)) * 100);
  const guessedHumanWasHuman = humanPercentage > 50;

  const breakdown = {
    creativity: Math.round(40 + Math.random() * 50),
    emotionalDepth: Math.round(humanHasPersonal ? 55 + Math.random() * 40 : 20 + Math.random() * 40),
    coherence: Math.round(60 + Math.random() * 35),
    aiPatterns: Math.round(aiHasCorporateSpeak || aiHasBullets ? 60 + Math.random() * 35 : 15 + Math.random() * 35),
    surpriseFactor: Math.round(20 + Math.random() * 70),
  };

  const judgements = guessedHumanWasHuman
    ? [
        `The human response carries the fingerprints of lived experience — fragmented, personal, and wonderfully inconsistent. The AI response reads more like a structured essay than a thought.`,
        `Fig's response has that chaotic warmth that's hard to fake. Beans, meanwhile, deployed the classic three-paragraph structure beloved by language models everywhere.`,
        `One of these reads like someone who stayed up too late thinking about this. The other reads like a confident but hollow oracle. I'll let you decide which is which.`,
      ]
    : [
        `Fascinating — the AI successfully mimicked human imperfection, while the human overcorrected into robotic clarity. The judge was fooled.`,
        `Both responses are impressive, but the AI buried the needle this round. The human's response was almost too polished. Almost.`,
        `The human tried to hide their humanity and mostly succeeded. The AI leaned into messiness and pulled it off. Suspicious.`,
      ];

  return {
    humanScore,
    aiScore,
    judgement: judgements[Math.floor(Math.random() * judgements.length)],
    guessedHumanWasHuman,
    humanPercentage,
    breakdown,
  };
}

export function calculatePoints(scores: RoundScores, mode: GameMode, isHuman: boolean): number {
  if (mode === 'pretend-human') {
    // Human gets points for fooling the judge
    if (!scores.guessedHumanWasHuman && isHuman) return 100 + Math.round(scores.aiScore);
    if (scores.guessedHumanWasHuman && !isHuman) return 100 + Math.round(scores.humanScore);
    return 25;
  } else {
    // Pretend to be AI — human gets points for being detected as AI
    if (scores.aiScore > scores.humanScore && isHuman) return 100 + Math.round(scores.aiScore);
    return 25;
  }
}
