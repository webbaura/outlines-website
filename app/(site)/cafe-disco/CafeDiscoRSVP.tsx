'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import PixelCard from '@/components/PixelCard';
import SchemaForm from '@/components/forms/SchemaForm';
import { cafeDiscoForm } from '@/lib/forms/cafeDisco';

export default function CafeDiscoRSVP() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PixelCard
        variant="pink"
        className="w-full border-white/10 bg-black/50 backdrop-blur-sm"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative z-10 w-full text-left p-10 sm:p-14 flex flex-col gap-4 cursor-pointer"
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
      </PixelCard>

      <Modal open={open} onClose={() => setOpen(false)} title="RSVP to Cafe Disco">
        <SchemaForm config={cafeDiscoForm} />
      </Modal>
    </>
  );
}
