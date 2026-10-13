'use client';

import { track } from '@vercel/analytics';
import { ArrowUpRight } from 'lucide-react';

type Props = {
  href: string;
  label: string;
  icon: React.ReactNode;
  delay: number; // ms, for the staggered entrance
};

// One frosted row. Tap feedback via active:scale so it feels physical on
// touch screens, where there is no hover.
export default function LinkRow({ href, label, icon, delay }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('links_click', { label })}
      className="links-rise group flex items-center gap-4 h-[52px] px-5 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md transition-[background-color,border-color,transform] duration-200 hover:bg-white/[0.12] hover:border-white/30 active:scale-[0.98]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="text-white/70 shrink-0" aria-hidden="true">{icon}</span>
      <span className="flex-1 text-[15px] font-medium tracking-wide text-white/90">{label}</span>
      <ArrowUpRight
        size={18}
        aria-hidden="true"
        className="text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
