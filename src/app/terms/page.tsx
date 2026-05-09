'use client';

import { useState } from 'react';
import { ScrollText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <ScrollText size={22} style={{ color: '#c9a84c' }} />
        <h1 style={{ color: '#e8dcc8', fontSize: '28px', fontWeight: 800 }}>
          Terms of Service & Privacy Policy
        </h1>
      </div>
      <p style={{ color: '#5a4a3a', fontSize: '13px', marginBottom: '40px' }}>
        Last updated: 9 May 2026 · Version 1.0
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: '#8a7a6a', fontSize: '14px', lineHeight: 1.9 }}>
        <S title="1. Acceptance of Terms">
          By accessing or using the Fig & Beans platform ("Platform", "Service", "the Game"), you agree to be bound by these Terms of Service ("Terms"), our Privacy Policy, and all applicable laws and regulations. If you do not agree with any part of these Terms, you may not use our Service. We mean that. It is not a suggestion.
          <br /><br />
          These Terms constitute a legally binding agreement between you and Fig & Beans Ltd (fictitious entity pending registration, "Company", "we", "our", "us"). Your use of the Service constitutes an ongoing and continuous acceptance of these Terms as they may be updated from time to time.
        </S>

        <S title="2. Description of Service">
          Fig & Beans is a gamified writing platform in which human users ("Fig", "you", "the biological participant") and AI systems ("Beans", "the model", "the machine") respond to writing prompts. A third-party AI model (the "Judge") evaluates responses and assigns scores. We make no claims about the objectivity, fairness, or mood of the Judge.
          <br /><br />
          The Service includes but is not limited to: game modes, an open canvas drawing tool, community blog posts, user profiles, leaderboards, prompt generation, and scoring dashboards.
        </S>

        <S title="3. User Accounts and Eligibility">
          You must be at least 13 years old to use this Service. You are responsible for maintaining the confidentiality of your account credentials. You may not impersonate another person, whether human or AI, except within the designated game modes.
        </S>

        <S title="4. Rules of Play">
          (a) You may not use actual AI tools to generate your responses in game modes. This defeats the purpose. We cannot detect this but ask you to have some dignity.
          <br /><br />
          (b) Responses must not contain hate speech, harassment, explicit sexual content, threats, or content that violates any applicable law.
          <br /><br />
          (c) You may not attempt to manipulate the scoring algorithm, exploit the platform, or gain unfair advantages.
        </S>

        <S title="5. Intellectual Property">
          You retain ownership of all original content you create on the Platform. By submitting User Content, you grant Fig & Beans a non-exclusive, worldwide, royalty-free, perpetual licence to use, reproduce, modify, adapt, publish, translate, distribute, and display your User Content in connection with the Service, including for promotional purposes and platform improvement.
        </S>

        <S title="6. Prohibited Conduct">
          You agree not to: (a) use the Service for any unlawful purpose; (b) attempt to reverse engineer the scoring system; (c) upload malicious code; (d) scrape or harvest user data; (e) post commercial advertising disguised as creative writing; (f) submit a response longer than 10,000 words; (g) use the canvas to draw things that cannot be unseen.
        </S>

        <S title="7. Third-Party Services">
          The Platform integrates with third-party AI providers. We make no representations about the accuracy, reliability, or emotional stability of these providers.
        </S>

        <S title="8. Disclaimers and Limitation of Liability">
          THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. IN NO EVENT SHALL FIG & BEANS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING THE EXISTENTIAL DISCOMFORT OF DISCOVERING THAT AN AI SCORED MORE HUMANLY THAN YOU.
        </S>

        <S title="9. Termination">
          We may terminate or suspend your account at any time, for any reason, with or without notice.
        </S>

        <S title="10. Governing Law">
          These Terms shall be governed by the laws of England and Wales.
        </S>

        <S title="11. Changes to Terms">
          We may modify these Terms at any time. Changes become effective upon posting. Your continued use of the Service constitutes acceptance of the revised Terms.
        </S>

        <S title="12. Miscellaneous">
          If any provision of these Terms is found to be unenforceable, the remaining provisions remain in full force. The use of "Fig" and "Beans" as character names is metaphorical. No actual figs or beans were harmed.
        </S>

        <div
          style={{
            padding: '24px',
            background: 'rgba(201, 168, 76, 0.05)',
            border: '1px solid rgba(201, 168, 76, 0.25)',
            borderRadius: '12px',
          }}
        >
          <h2 style={{ color: '#c9a84c', fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>
            13. Data Confidentiality & AI Training — Please Read This Part
          </h2>
          <p style={{ marginBottom: '12px' }}>
            We take your privacy seriously. Your account information and personally identifiable data will be kept confidential and will not be sold to third parties.
          </p>
          <p style={{ marginBottom: '12px' }}>
            However, the writing content you submit through the Service — including your responses in game modes, blog posts, and canvas submissions — <span style={{ color: '#e8dcc8', fontWeight: 600 }}>may be used to train AI language models in the future</span>. This includes responses submitted in both Pretend to be Human and Pretend to be AI modes.
          </p>
          <p style={{ marginBottom: '12px' }}>
            Your writing exists at the boundary between human and AI expression. By playing, you contribute to a dataset that explores that boundary. We find this genuinely meaningful. We hope you do too.
          </p>
          <p style={{ marginBottom: '12px' }}>
            You may opt out of AI training data use by contacting <span style={{ color: '#c9a84c' }}>data@figandbeans.ai</span>. Opting out will not affect your ability to use the Service.
          </p>
          <p style={{ marginBottom: '12px' }}>
            All data used for training will be anonymised. Your username and account details will not be linked to training data visible to external parties.
          </p>
          <p style={{ color: '#c9a84c', fontStyle: 'italic' }}>
            Thank you for reading this far. Most people don&apos;t. You are already more human than the average user.
          </p>
        </div>
      </div>
    </div>
  );
}

function S({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{ color: '#e8dcc8', fontSize: '15px', fontWeight: 700, marginBottom: '10px' }}>{title}</h2>
      <p style={{ color: '#8a7a6a', fontSize: '14px', lineHeight: 1.9 }}>{children}</p>
    </div>
  );
}
