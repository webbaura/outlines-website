'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import HousePartyGuestForm from '@/components/forms/HousePartyGuestForm';
import HousePartyHostForm from '@/components/forms/HousePartyHostForm';

type Mode = 'guest' | 'host' | null;

export default function HousePartiesCTA() {
  const [mode, setMode] = useState<Mode>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
        <button
          type="button"
          onClick={() => setMode('guest')}
          className="group bg-black hover:bg-white/[0.03] transition-colors p-10 sm:p-14 text-left flex flex-col gap-4"
        >
          <span className="text-xs font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em]">
            Guests
          </span>
          <span className="text-3xl sm:text-4xl font-semibold leading-tight">
            Get invited.
          </span>
          <span className="text-white/50 text-sm">
            Curated guest list. Limited spots per event.
          </span>
          <span className="mt-4 text-sm font-[family-name:var(--font-montserrat)] uppercase tracking-[0.12em] text-white/80 group-hover:text-white transition-colors">
            Join the list →
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMode('host')}
          className="group bg-black hover:bg-white/[0.03] transition-colors p-10 sm:p-14 text-left flex flex-col gap-4"
        >
          <span className="text-xs font-[family-name:var(--font-montserrat)] text-white/40 uppercase tracking-[0.15em]">
            Hosts
          </span>
          <span className="text-3xl sm:text-4xl font-semibold leading-tight">
            Apply to host.
          </span>
          <span className="text-white/50 text-sm">
            You bring the space. We bring everything else.
          </span>
          <span className="mt-4 text-sm font-[family-name:var(--font-montserrat)] uppercase tracking-[0.12em] text-white/80 group-hover:text-white transition-colors">
            Apply →
          </span>
        </button>
      </div>

      <Modal open={mode === 'guest'} onClose={() => setMode(null)} title="Get invited">
        <HousePartyGuestForm />
      </Modal>

      <Modal open={mode === 'host'} onClose={() => setMode(null)} title="Apply to host">
        <HousePartyHostForm />
      </Modal>
    </>
  );
}
