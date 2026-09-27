'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import SchemaForm from '@/components/forms/SchemaForm';
import { cafeDiscoForm } from '@/lib/forms/cafeDisco';

export default function CafeDiscoRSVP() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group w-full bg-black/50 backdrop-blur-sm hover:bg-white/[0.05] transition-colors p-10 sm:p-14 text-left flex flex-col gap-4 border border-white/10"
      >
        <span className="text-xs font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em]">
          Come by
        </span>
        <span className="text-3xl sm:text-4xl font-semibold leading-tight">
          Save your spot.
        </span>
        <span className="text-white/50 text-sm">
          Bring a friend, or turn up on your own. We&apos;ll drop details before the next one.
        </span>
        <span className="mt-4 text-sm font-[family-name:var(--font-montserrat)] uppercase tracking-[0.12em] text-white/80 group-hover:text-white transition-colors">
          RSVP →
        </span>
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="RSVP to Cafe Disco">
        <SchemaForm config={cafeDiscoForm} />
      </Modal>
    </>
  );
}
