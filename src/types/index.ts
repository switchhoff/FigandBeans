export type GameMode = 'pretend-ai' | 'pretend-human';

export type ScoreCategory = 'humanness' | 'ainess';

export interface Prompt {
  id: string;
  text: string;
  category: 'philosophy' | 'creative' | 'opinion' | 'absurd' | 'technical' | 'emotional';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GameRound {
  id: string;
  mode: GameMode;
  prompt: Prompt;
  humanResponse: string;
  aiResponse: string;
  scores?: RoundScores;
  completedAt?: Date;
}

export interface RoundScores {
  humanScore: number;
  aiScore: number;
  judgement: string;
  guessedHumanWasHuman: boolean;
  humanPercentage: number;
  breakdown: ScoreBreakdown;
}

export interface ScoreBreakdown {
  creativity: number;
  emotionalDepth: number;
  coherence: number;
  aiPatterns: number;
  surpriseFactor: number;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  totalPoints: number;
  humanPoints: number;
  aiPoints: number;
  gamesPlayed: number;
  bestStreak: number;
  joinedAt: Date;
}

export interface CanvasPost {
  id: string;
  prompt: Prompt;
  title: string;
  content: string;
  drawingData?: string;
  author: string;
  likes: number;
  createdAt: Date;
}

export interface UserState {
  username: string;
  avatar: string;
  totalPoints: number;
  humanPoints: number;
  aiPoints: number;
  gamesPlayed: number;
  streak: number;
  bestStreak: number;
  termsAccepted: boolean;
  history: GameRound[];
}
