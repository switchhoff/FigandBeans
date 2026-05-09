import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: 'Fig & Beans — Human vs AI Writing Game',
  description: 'Can you write like a human? Can AI write like one? Play Fig & Beans and find out.',
  openGraph: {
    title: 'Fig & Beans',
    description: 'Human vs AI writing game. Who is more human?',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#0f0b08', minHeight: '100vh' }}>
        <Nav />
        <main style={{ paddingTop: '56px', minHeight: '100vh' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
