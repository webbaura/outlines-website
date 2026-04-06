'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
        <p className="text-white/60 text-sm font-[family-name:var(--font-montserrat)]">
          You&apos;re in. We&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <label htmlFor="email-signup" className="sr-only">
        Email address
      </label>
      <input
        id="email-signup"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 bg-transparent border border-white/20 text-white placeholder:text-white/30 px-4 py-3 text-sm font-[family-name:var(--font-montserrat)] focus:outline-none focus:border-white/50 transition-colors"
      />
      <button
        type="submit"
        className="bg-white text-black px-6 py-3 text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors flex items-center justify-center gap-2 shrink-0"
      >
        Stay in the loop
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
