import { Prompt } from '@/types';

export const PROMPTS: Prompt[] = [
  { id: 'p1', text: 'Describe the colour blue to someone who has never seen colour.', category: 'creative', difficulty: 'hard' },
  { id: 'p2', text: 'What does silence sound like in your home at 3am?', category: 'emotional', difficulty: 'medium' },
  { id: 'p3', text: 'Write a one-paragraph argument for why dogs are better pets than people.', category: 'absurd', difficulty: 'easy' },
  { id: 'p4', text: 'If you could send one message to your 10-year-old self, what would it be and why?', category: 'emotional', difficulty: 'medium' },
  { id: 'p5', text: 'Explain the internet to someone from the 1400s.', category: 'creative', difficulty: 'medium' },
  { id: 'p6', text: 'What is the most overrated thing in modern life?', category: 'opinion', difficulty: 'easy' },
  { id: 'p7', text: 'Describe a perfect day that you have never actually had.', category: 'creative', difficulty: 'medium' },
  { id: 'p8', text: 'Is it possible to truly know another person? Why or why not?', category: 'philosophy', difficulty: 'hard' },
  { id: 'p9', text: 'Write a convincing argument that the moon is made of cheese, but you must believe it yourself.', category: 'absurd', difficulty: 'hard' },
  { id: 'p10', text: 'What smell brings back the most vivid memory for you, and why?', category: 'emotional', difficulty: 'easy' },
  { id: 'p11', text: 'If consciousness is just neurons firing, does anything really matter?', category: 'philosophy', difficulty: 'hard' },
  { id: 'p12', text: 'Invent a word for the feeling of reading someone else\'s old diary.', category: 'creative', difficulty: 'medium' },
  { id: 'p13', text: 'What would you do with 48 hours of complete invisibility?', category: 'opinion', difficulty: 'easy' },
  { id: 'p14', text: 'Write a short apology to a houseplant you once neglected.', category: 'absurd', difficulty: 'easy' },
  { id: 'p15', text: 'Is boredom a luxury or a curse?', category: 'philosophy', difficulty: 'medium' },
  { id: 'p16', text: 'Describe what nostalgia tastes like.', category: 'creative', difficulty: 'medium' },
  { id: 'p17', text: 'What is something everyone pretends to understand but nobody really does?', category: 'opinion', difficulty: 'easy' },
  { id: 'p18', text: 'Write the opening line of a novel that you would never actually write.', category: 'creative', difficulty: 'hard' },
  { id: 'p19', text: 'If you had to pick one song to describe your entire existence, what would it be and why?', category: 'emotional', difficulty: 'medium' },
  { id: 'p20', text: 'What does the end of the internet look like?', category: 'absurd', difficulty: 'hard' },
];

export function getRandomPrompt(exclude?: string[]): Prompt {
  const available = exclude ? PROMPTS.filter(p => !exclude.includes(p.id)) : PROMPTS;
  return available[Math.floor(Math.random() * available.length)];
}

export function getPromptById(id: string): Prompt | undefined {
  return PROMPTS.find(p => p.id === id);
}
