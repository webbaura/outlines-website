'use client';

import { track } from '@vercel/analytics';
import { ArrowUpRight } from 'lucide-react';

type Props = {
  href: string;
  eyebrow: string;
  title: string;
  cta: string;
  delay: number;
};

// The one solid-white element on the page, so the eye lands here first.
export default function FeaturedLink({ href, eyebrow, title, cta, delay }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('links_click', { label: title })}
      className="links-rise group block rounded-3xl bg-white text-black px-6 py-4 transition-transform duration-200 active:scale-[0.98]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-black/50">
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-black/60 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-black" />
        </span>
        {eyebrow}
      </p>
      <p className="mt-2 text-xl font-semibold leading-snug tracking-tight">{title}</p>
      <p className="mt-2 flex items-center gap-1 text-sm font-medium text-black/70">
        {cta}
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </p>
    </a>
  );
}
