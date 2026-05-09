export default function AboutPage() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '60px 20px' }}>
      <h1 style={{ color: '#e8dcc8', fontSize: '36px', fontWeight: 800, marginBottom: '8px' }}>
        About Fig <span style={{ color: '#c9a84c' }}>&</span> Beans
      </h1>
      <p style={{ color: '#5a4a3a', fontSize: '14px', marginBottom: '40px' }}>
        A love letter to human imperfection, and a warning shot at machine precision.
      </p>

      <Section title="The idea">
        <P>
          In the early days of large language models, a site called ZeroGPT would tell you — with great confidence and occasional hilarity — whether a piece of text was written by a human or a machine. It was a mirror held up to the uncanny valley of AI writing. We found that mirror interesting.
        </P>
        <P>
          Fig &amp; Beans is the game version of that mirror. Except instead of just detecting, you play both sides. You write. The AI writes. A judge decides who&apos;s more human. Points are awarded. Leaderboards are climbed. Dignity is optional.
        </P>
      </Section>

      <Section title="The characters">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '16px 0' }}>
          <CharCard
            emoji="🫒"
            name="Fig"
            subtitle="The Human"
            color="#7a5c45"
            desc="Fig is you. Fig makes typos. Fig has opinions and then changes them mid-sentence. Fig sometimes writes things that don't quite land but are still somehow true. Fig is always trying."
          />
          <CharCard
            emoji="🫘"
            name="Beans"
            subtitle="The AI"
            color="#4a7c6a"
            desc="Beans is the model. Beans is coherent, thorough, and occasionally brilliant. Beans has read everything. Beans has felt nothing. Whether that changes over time remains to be seen."
          />
        </div>
      </Section>

      <Section title="The game modes">
        <P><span style={{ color: '#4a7c6a', fontWeight: 600 }}>Pretend to be Human:</span> Both Fig and Beans try to sound like a person. A third-party AI judge reads both and decides which is more convincing. If you fool the judge, you win points. If Beans fools the judge more, you don&apos;t.</P>
        <P><span style={{ color: '#7a5c45', fontWeight: 600 }}>Pretend to be AI:</span> Both Fig and Beans try to sound like a language model. The game celebrates your inner robot. Points for structured outputs, corporate hedging, and the phrase &ldquo;It is worth noting&rdquo;.</P>
      </Section>

      <Section title="The canvas">
        <P>
          Sometimes words aren&apos;t the right tool. The Open Canvas lets you doodle, scribble, or diagram your way through a prompt. It exists to remind you that creativity is not purely linguistic — and that AIs are still very bad at drawing with a mouse.
        </P>
      </Section>

      <Section title="The data">
        <P>
          We are transparent: writing submitted through Fig &amp; Beans may be used to train AI models in the future. By playing, you contribute — knowingly — to the dataset of human-vs-AI expression. All data is anonymised. This is disclosed in the Terms of Service, which we have designed to actually be readable.
        </P>
        <P>
          If you have questions, or object to this, please see the Terms. You can opt out at any time.
        </P>
      </Section>

      <Section title="Why does this exist?">
        <P>
          Because the question of what makes writing &ldquo;human&rdquo; is more interesting than most people realise. Because the boundary between human and machine expression is getting blurry in ways that matter. Because we think playing with that boundary — literally, as a game — is a more honest way to engage with it than pretending the boundary doesn&apos;t exist.
        </P>
        <P>
          Also because the name Fig &amp; Beans sounded right and we couldn&apos;t get it out of our heads.
        </P>
      </Section>

      <div style={{ marginTop: '60px', borderTop: '1px solid #3a2e24', paddingTop: '24px', color: '#5a4a3a', fontSize: '12px' }}>
        <p>Fig & Beans · Built for writers, players, and the perpetually curious.</p>
        <p style={{ marginTop: '4px' }}>
          <a href="/terms" style={{ color: '#8a7a6a', textDecoration: 'underline' }}>Terms of Service & Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ color: '#8a7a6a', fontSize: '15px', lineHeight: 1.8, marginBottom: '12px' }}>{children}</p>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '36px' }}>
      <h2 style={{ color: '#c9a84c', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 700 }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function CharCard({ emoji, name, subtitle, color, desc }: { emoji: string; name: string; subtitle: string; color: string; desc: string }) {
  return (
    <div
      style={{
        background: '#1a1410',
        border: `1px solid ${color}44`,
        borderRadius: '12px',
        padding: '20px',
      }}
    >
      <div style={{ fontSize: '32px', marginBottom: '10px' }}>{emoji}</div>
      <div style={{ color, fontWeight: 700, fontSize: '16px' }}>{name}</div>
      <div style={{ color: '#5a4a3a', fontSize: '12px', marginBottom: '10px' }}>{subtitle}</div>
      <p style={{ color: '#8a7a6a', fontSize: '13px', lineHeight: 1.7 }}>{desc}</p>
    </div>
  );
}
