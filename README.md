# Fig & Beans

A gamified writing platform where one human (Fig) and one AI (Beans) respond to the same prompt — and a third-party AI judge decides who writes more like a human.

## What it is

Fig & Beans is a creative writing game with two core modes:

- **Pretend to be Human** — Both the human and the AI try to write naturally. The judge decides who's more convincing.
- **Pretend to be AI** — Both the human and the AI try to write like a language model. Points for robotic precision.

Users also get an **Open Canvas** — a drawing + writing space where they can respond to prompts in any form, to push creativity away from AI-typical outputs.

A global **leaderboard** tracks humanness and AI-ness scores across all players.

## Stack

- **Next.js 14** (App Router) — frontend + API routes
- **TypeScript** — typed throughout
- **Tailwind CSS** — utility classes
- **Zustand** — client-side state with localStorage persistence
- **Lucide React** — icons

## Connecting the AI (next step)

Two API routes are ready for Vercel AI SDK wiring:

### `src/app/api/generate/route.ts`
Generates Beans's response to a prompt. Swap the mock for:

```ts
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

const { text } = await generateText({
  model: anthropic('claude-opus-4-7'),
  prompt: buildBeansPrompt(prompt, mode),
});
```

### `src/app/api/score/route.ts`
Scores both responses. The judge prompt builder (`buildJudgePrompt`) is already written in that file.

The mock scorer in `src/lib/scoring.ts` can be replaced with a real fetch to `/api/score`.

## Deploying to Firebase

For SSR support (required — API routes), use **Firebase App Hosting**:

```bash
npm install -g firebase-tools
firebase init apphosting
firebase deploy
```

## Project structure

```
src/
  app/
    page.tsx              # Landing + registration
    layout.tsx            # Root layout with Nav
    play/page.tsx         # Game mode selection + play flow
    leaderboard/page.tsx  # Global leaderboard
    blog/page.tsx         # Open canvas / community posts
    about/page.tsx        # About page
    profile/page.tsx      # User profile + history
    terms/page.tsx        # Full terms of service
    api/
      score/route.ts      # AI judge endpoint (Vercel AI SDK ready)
      generate/route.ts   # Beans response generation endpoint
  components/
    Nav.tsx               # Top navigation
    PromptCard.tsx        # Prompt display with refresh
    ScoreDisplay.tsx      # Round results + breakdown bars
    DrawingCanvas.tsx     # HTML5 canvas drawing tool
    TermsModal.tsx        # Terms modal (must scroll to bottom to accept)
  lib/
    prompts.ts            # 20 curated writing prompts
    scoring.ts            # Mock scorer (replace with AI API call)
  store/
    gameStore.ts          # Zustand store (user, leaderboard, posts)
  types/
    index.ts              # Shared TypeScript types
```

## Design decisions

- **Dark, warm palette** — deep browns (#0f0b08), gold (#c9a84c), forest greens. Organic and tactile, not tech-cold.
- **Georgia serif** — writing platform should feel like a writing platform.
- **Grain texture overlay** — CSS SVG filter, zero bundle cost.
- **Terms must be scrolled** — users cannot accept without reaching the AI training clause at the bottom (92% scroll threshold).
- **Mock leaderboard** — seeded with named players so it feels alive from day one.
- **Zustand + localStorage** — zero backend dependency for MVP; drop in Firebase SDK when ready.

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

---

Named after a fig and a bean. We are not affiliated with any figs or beans.
