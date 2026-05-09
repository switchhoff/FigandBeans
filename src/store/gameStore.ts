'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState, GameRound, LeaderboardEntry, CanvasPost } from '@/types';
import { getRandomPrompt } from '@/lib/prompts';

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: 'lb1', username: 'OliveWriter', avatar: '🫒', totalPoints: 4820, humanPoints: 2100, aiPoints: 2720, gamesPlayed: 47, bestStreak: 8, joinedAt: new Date('2024-01-15') },
  { id: 'lb2', username: 'BeanCounter', avatar: '🫘', totalPoints: 3990, humanPoints: 3200, aiPoints: 790, gamesPlayed: 38, bestStreak: 12, joinedAt: new Date('2024-02-01') },
  { id: 'lb3', username: 'FigFanatic', avatar: '🍑', totalPoints: 3450, humanPoints: 1800, aiPoints: 1650, gamesPlayed: 31, bestStreak: 6, joinedAt: new Date('2024-03-10') },
  { id: 'lb4', username: 'TypedNoise', avatar: '⌨️', totalPoints: 2900, humanPoints: 900, aiPoints: 2000, gamesPlayed: 29, bestStreak: 5, joinedAt: new Date('2024-04-02') },
  { id: 'lb5', username: 'Synaptic', avatar: '🧠', totalPoints: 2250, humanPoints: 1400, aiPoints: 850, gamesPlayed: 22, bestStreak: 4, joinedAt: new Date('2024-04-20') },
  { id: 'lb6', username: 'WordGhost', avatar: '👻', totalPoints: 1800, humanPoints: 600, aiPoints: 1200, gamesPlayed: 18, bestStreak: 3, joinedAt: new Date('2024-05-01') },
  { id: 'lb7', username: 'NeuralNomad', avatar: '🌊', totalPoints: 1540, humanPoints: 800, aiPoints: 740, gamesPlayed: 15, bestStreak: 3, joinedAt: new Date('2024-05-10') },
];

const MOCK_POSTS: CanvasPost[] = [
  {
    id: 'cp1',
    prompt: getRandomPrompt(),
    title: 'On the colour of longing',
    content: 'It is that shade of blue that doesn\'t have a name yet. You know it when you feel it — at 4pm on a winter Sunday, the light going sideways through venetian blinds. Not sad, exactly. Just... aware.',
    author: 'OliveWriter',
    likes: 34,
    createdAt: new Date('2024-05-01'),
  },
  {
    id: 'cp2',
    prompt: getRandomPrompt(),
    title: 'A brief apology to my spider plant, Gerald',
    content: 'Gerald, I am sorry. I knew you were thirsty. I watched you droop for two weeks because I convinced myself plants are dramatic. You were not dramatic. You were dehydrated. I hope heaven has good light.',
    author: 'BeanCounter',
    likes: 89,
    createdAt: new Date('2024-05-05'),
  },
  {
    id: 'cp3',
    prompt: getRandomPrompt(),
    title: 'The internet: a note to a 14th century monk',
    content: 'Brother Anselm, imagine if every scroll ever written were connected by invisible thread, and you could pull on any thread and find the scroll — but also 4,000 arguments about whether a dog is a good boy.',
    author: 'FigFanatic',
    likes: 57,
    createdAt: new Date('2024-05-07'),
  },
];

interface GameStore {
  user: UserState;
  leaderboard: LeaderboardEntry[];
  posts: CanvasPost[];
  currentRound: GameRound | null;

  setUsername: (name: string) => void;
  acceptTerms: () => void;
  addPoints: (human: number, ai: number) => void;
  addRound: (round: GameRound) => void;
  setCurrentRound: (round: GameRound | null) => void;
  addPost: (post: Omit<CanvasPost, 'id' | 'likes' | 'createdAt'>) => void;
  likePost: (id: string) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      user: {
        username: '',
        avatar: '✏️',
        totalPoints: 0,
        humanPoints: 0,
        aiPoints: 0,
        gamesPlayed: 0,
        streak: 0,
        bestStreak: 0,
        termsAccepted: false,
        history: [],
      },
      leaderboard: MOCK_LEADERBOARD,
      posts: MOCK_POSTS,
      currentRound: null,

      setUsername: (name) => set(s => ({ user: { ...s.user, username: name } })),
      acceptTerms: () => set(s => ({ user: { ...s.user, termsAccepted: true } })),
      addPoints: (human, ai) => set(s => ({
        user: {
          ...s.user,
          humanPoints: s.user.humanPoints + human,
          aiPoints: s.user.aiPoints + ai,
          totalPoints: s.user.totalPoints + human + ai,
          gamesPlayed: s.user.gamesPlayed + 1,
        },
      })),
      addRound: (round) => set(s => ({ user: { ...s.user, history: [round, ...s.user.history].slice(0, 50) } })),
      setCurrentRound: (round) => set({ currentRound: round }),
      addPost: (post) => set(s => ({
        posts: [{
          ...post,
          id: `cp${Date.now()}`,
          likes: 0,
          createdAt: new Date(),
        }, ...s.posts],
      })),
      likePost: (id) => set(s => ({
        posts: s.posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p),
      })),
      incrementStreak: () => set(s => {
        const newStreak = s.user.streak + 1;
        return {
          user: {
            ...s.user,
            streak: newStreak,
            bestStreak: Math.max(s.user.bestStreak, newStreak),
          },
        };
      }),
      resetStreak: () => set(s => ({ user: { ...s.user, streak: 0 } })),
    }),
    { name: 'fig-and-beans-store' }
  )
);
