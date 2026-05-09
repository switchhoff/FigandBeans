'use client';

import { useRef, useState, useEffect } from 'react';
import { X, ScrollText, ChevronDown } from 'lucide-react';

interface Props {
  username: string;
  onAccept: () => void;
  onDecline: () => void;
}

export default function TermsModal({ username, onAccept, onDecline }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [checked, setChecked] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
    setScrollPct(Math.round(pct * 100));
    if (pct > 0.92) setScrolled(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: '#1a1410',
          border: '1px solid #3a2e24',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #3a2e24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ScrollText size={18} style={{ color: '#c9a84c' }} />
            <span style={{ color: '#e8dcc8', fontWeight: 700, fontSize: '16px' }}>
              Terms of Service & Privacy Policy
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: '#5a4a3a', fontSize: '12px' }}>{scrollPct}% read</span>
            <button onClick={onDecline} style={{ background: 'none', border: 'none', color: '#8a7a6a', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scroll progress */}
        <div style={{ height: '2px', background: '#251e18' }}>
          <div
            style={{
              height: '100%',
              width: `${scrollPct}%`,
              background: 'linear-gradient(90deg, #7a5c45, #c9a84c)',
              transition: 'width 0.1s',
            }}
          />
        </div>

        {/* Terms content */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            fontSize: '13px',
            lineHeight: 1.8,
            color: '#8a7a6a',
          }}
        >
          <TermsContent username={username} />
        </div>

        {/* Footer */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid #3a2e24' }}>
          {!scrolled && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#5a4a3a',
                fontSize: '12px',
                marginBottom: '14px',
              }}
            >
              <ChevronDown size={14} style={{ animation: 'bounce 1.5s infinite' }} />
              Scroll to the bottom to continue
            </div>
          )}

          <label
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              cursor: scrolled ? 'pointer' : 'not-allowed',
              opacity: scrolled ? 1 : 0.4,
              marginBottom: '16px',
            }}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={e => scrolled && setChecked(e.target.checked)}
              disabled={!scrolled}
              style={{ marginTop: '3px', accentColor: '#c9a84c' }}
            />
            <span style={{ color: '#e8dcc8', fontSize: '13px' }}>
              I have read and understood the Terms of Service, including the data and AI training clauses at the bottom.
              I accept.
            </span>
          </label>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onDecline}
              style={{
                flex: 1,
                padding: '11px',
                background: 'transparent',
                border: '1px solid #3a2e24',
                borderRadius: '8px',
                color: '#8a7a6a',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Decline
            </button>
            <button
              onClick={onAccept}
              disabled={!checked || !scrolled}
              style={{
                flex: 2,
                padding: '11px',
                background: checked && scrolled ? 'linear-gradient(135deg, #c9a84c, #e8c96a)' : '#251e18',
                border: 'none',
                borderRadius: '8px',
                color: checked && scrolled ? '#0f0b08' : '#5a4a3a',
                cursor: checked && scrolled ? 'pointer' : 'not-allowed',
                fontWeight: 700,
                fontSize: '14px',
                transition: 'all 0.15s',
              }}
            >
              I Accept — Let Me Write
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <h3 style={{ color: '#c9a84c', fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 700 }}>
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ marginBottom: '10px', color: '#8a7a6a' }}>{children}</p>;
}

function TermsContent({ username }: { username: string }) {
  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <p style={{ color: '#e8dcc8', fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>
          Fig & Beans — Terms of Service
        </p>
        <p style={{ color: '#5a4a3a', fontSize: '12px' }}>
          Last updated: 9 May 2026 · Version 1.0 · Effective immediately upon acceptance
        </p>
        <p style={{ color: '#5a4a3a', fontSize: '12px', marginTop: '4px' }}>
          Agreement entered into by: <span style={{ color: '#c9a84c' }}>{username || 'User'}</span>
        </p>
      </div>

      <Section title="1. Acceptance of Terms">
        <P>By accessing or using the Fig &amp; Beans platform ("Platform", "Service", "the Game"), you agree to be bound by these Terms of Service ("Terms"), our Privacy Policy, and all applicable laws and regulations. If you do not agree with any part of these Terms, you may not use our Service. We mean that. It is not a suggestion.</P>
        <P>These Terms constitute a legally binding agreement between you and Fig &amp; Beans Ltd (fictitious entity pending registration, "Company", "we", "our", "us"). We reserve the right to interpret "us" broadly.</P>
        <P>Your use of the Service constitutes an ongoing and continuous acceptance of these Terms as they may be updated from time to time. You are expected to periodically check for updates, even though we know you will not.</P>
      </Section>

      <Section title="2. Description of Service">
        <P>Fig &amp; Beans is a gamified writing platform in which human users ("Fig", "you", "the biological participant") and AI systems ("Beans", "the model", "the machine") respond to writing prompts. A third-party AI model (the "Judge") evaluates responses and assigns scores. We make no claims about the objectivity, fairness, or mood of the Judge.</P>
        <P>The Service includes but is not limited to: game modes (Pretend to be Human, Pretend to be AI), an open canvas drawing tool, community blog posts, user profiles, leaderboards, prompt generation, scoring dashboards, and any other feature we add between now and the end of time.</P>
        <P>We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without notice or liability, for reasons including but not limited to: the AI becoming too good, a fig shortage, ennui, regulatory action, or general existential dissatisfaction with the product-market fit.</P>
      </Section>

      <Section title="3. User Accounts and Eligibility">
        <P>You must be at least 13 years old to use this Service. If you are under 18, you should have parental consent. If you are over 18 and are still seeking parental consent, we admire the relationship.</P>
        <P>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately if you suspect unauthorised access to your account. We will respond as promptly as our roadmap allows.</P>
        <P>You may not impersonate another person, whether human or AI, except within the designated game modes, where impersonating an AI is actively encouraged and scored.</P>
      </Section>

      <Section title="4. Rules of Play">
        <P>Fig &amp; Beans is a game. It is meant to be fun. That said, the following rules apply:</P>
        <P>(a) You may not use actual AI tools to generate your responses in game modes. This defeats the purpose, which is to determine whether you can outperform, underperform, or confuse an AI. We cannot detect this but ask you to have some dignity.</P>
        <P>(b) Responses must not contain hate speech, harassment, explicit sexual content, threats, or content that violates any applicable law. The Judge is not equipped to handle this and, frankly, neither are we.</P>
        <P>(c) You may not attempt to manipulate the scoring algorithm, exploit the platform, or gain unfair advantages. If you do, we will be impressed and then suspend your account.</P>
        <P>(d) Streak integrity must be maintained honestly. If you are scoring Beans-level AIness and you are actually a person, we celebrate you. If you are running a bot, we do not.</P>
      </Section>

      <Section title="5. Intellectual Property">
        <P>You retain ownership of all original content you create on the Platform, including written responses, drawings, and blog posts ("User Content"). By submitting User Content, you grant Fig &amp; Beans a non-exclusive, worldwide, royalty-free, perpetual, irrevocable, sublicensable licence to use, reproduce, modify, adapt, publish, translate, distribute, and display your User Content in connection with the Service.</P>
        <P>This licence includes the right to use your content for promotional purposes, platform improvement, model training, academic research, internal analysis, and demonstration of the Service to potential investors, partners, and confused journalists.</P>
        <P>You represent that you own or have the right to submit all User Content, and that your User Content does not infringe the intellectual property rights of any third party, including but not limited to: Shakespeare, Hemingway, the AI whose style you are attempting to replicate, or your previous therapist.</P>
      </Section>

      <Section title="6. Prohibited Conduct">
        <P>You agree not to: (a) use the Service for any unlawful purpose; (b) attempt to reverse engineer the scoring system; (c) upload malicious code of any kind; (d) scrape or harvest user data; (e) post commercial advertising disguised as a creative writing response; (f) submit a response that is longer than 10,000 words (we will read it, but we will be annoyed); (g) use the canvas drawing tool to draw things that cannot be unseen; (h) impersonate staff of Fig &amp; Beans, real or fictional; (i) attempt to convince the Judge that it is the human and you are the AI, even if philosophically compelling.</P>
      </Section>

      <Section title="7. Third-Party Services">
        <P>The Platform integrates with third-party AI providers for the purposes of response generation (Beans) and response scoring (the Judge). We make no representations about the accuracy, reliability, or emotional stability of these providers. Their terms of service apply in addition to our own.</P>
        <P>We may change AI providers at any time. If Beans becomes a different model with a different personality, that is intentional. Beans is a character, not a person. The distinction remains important.</P>
      </Section>

      <Section title="8. Disclaimers and Limitation of Liability">
        <P>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR AVAILABLE AT THREE IN THE MORNING WHEN YOU MOST WANT TO USE IT.</P>
        <P>IN NO EVENT SHALL FIG &amp; BEANS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, GOODWILL, OR THE EXISTENTIAL DISCOMFORT OF DISCOVERING THAT AN AI SCORED MORE HUMANLY THAN YOU.</P>
        <P>Our total liability to you for any claims arising from your use of the Service shall not exceed the greater of: (a) the amount you paid us in the twelve months preceding the claim, or (b) £1 (one pound sterling), whichever is greater. This clause will make more sense once we introduce paid tiers.</P>
      </Section>

      <Section title="9. Termination">
        <P>We may terminate or suspend your account at any time, for any reason, with or without notice. Reasons may include violation of these Terms, suspected cheating, repeated attempts to submit the same response, suspicious activity patterns, or if the vibe is off.</P>
        <P>Upon termination, your right to use the Service ceases immediately. Provisions that by their nature should survive termination will survive, including Sections 5, 8, 10, and 11.</P>
      </Section>

      <Section title="10. Governing Law">
        <P>These Terms shall be governed by the laws of England and Wales, without regard to conflict of law principles. Any disputes shall be resolved in the courts of England and Wales, unless your jurisdiction mandates otherwise, in which case we respectfully acknowledge the complexity of international internet law.</P>
      </Section>

      <Section title="11. Changes to Terms">
        <P>We may modify these Terms at any time. Changes become effective upon posting. We will make a reasonable effort to notify you of material changes, where "reasonable" is defined as posting a banner that you will dismiss without reading. Your continued use of the Service constitutes acceptance of the revised Terms.</P>
      </Section>

      <Section title="12. Miscellaneous">
        <P>If any provision of these Terms is found to be unenforceable, the remaining provisions remain in full force. Our failure to enforce any right or provision does not constitute a waiver. These Terms constitute the entire agreement between you and Fig &amp; Beans with respect to the Service and supersede all prior agreements.</P>
        <P>The section titles are for convenience only and do not affect interpretation. The use of "Fig" and "Beans" as character names is metaphorical. No actual figs or beans were harmed in the development of this platform, though one houseplant was neglected.</P>
      </Section>

      {/* ─── THE IMPORTANT BIT ─── */}
      <div
        style={{
          marginTop: '40px',
          padding: '20px',
          background: 'rgba(201, 168, 76, 0.05)',
          border: '1px solid rgba(201, 168, 76, 0.2)',
          borderRadius: '10px',
        }}
      >
        <p style={{ color: '#c9a84c', fontWeight: 700, fontSize: '14px', marginBottom: '12px', letterSpacing: '0.05em' }}>
          13. Data Confidentiality & AI Training — Please Read This Part
        </p>
        <P>We take your privacy seriously. Your account information, personally identifiable data, and private communications will be kept confidential and will not be sold to third parties. We implement reasonable security measures to protect your information.</P>
        <P>However — and this is the part we need you to understand clearly — the writing content you submit through the Service, including your responses in game modes, blog posts, and canvas submissions, <span style={{ color: '#e8dcc8' }}>may be used to train AI language models in the future</span>. This includes responses you submit in both Pretend to be Human and Pretend to be AI modes.</P>
        <P>Your writing is interesting to us precisely because it exists at the boundary between human and AI expression. By playing this game, you contribute to a dataset that explores that boundary. We find this genuinely meaningful. We hope you do too.</P>
        <P>You may opt out of AI training data use by contacting us at <span style={{ color: '#c9a84c' }}>data@figandbeans.ai</span>. Opting out will not affect your ability to use the Service. Submissions prior to opt-out may already be anonymised and incorporated into datasets, but no new submissions will be used after we process your request.</P>
        <P>All data used for AI training will be anonymised. Your username and account details will not be linked to training data visible to external parties. We are not building a surveillance system. We are building a writing game with a research side-effect.</P>
        <P>Thank you for reading this far. Most people don&apos;t. You are already more human than the average user.</P>
      </div>

      <div style={{ height: '40px' }} />
    </div>
  );
}
