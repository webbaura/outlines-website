import Image from 'next/image';
import Link from 'next/link';
import Marquee from '@/components/Marquee';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black py-28">
      {/* Top marquee strip */}
      <div className="absolute top-20 inset-x-0 z-10">
        <Marquee
          items={['Outlining electronic music culture']}
          bordered
        />
      </div>

      {/* Centre stack */}
      <div className="relative z-10 px-6 w-full max-w-[1400px] flex flex-col items-center text-center">
        <div className="hero-line mb-4 sm:mb-5">
          <Image
            src="/assets/brand/outlines-transparent.webp"
            alt="Outlines"
            width={540}
            height={600}
            priority
            className="w-[110px] sm:w-[140px] lg:w-[160px] h-auto select-none"
          />
        </div>

        <h1 className="hero-line hero-line-2 text-xs sm:text-sm font-[family-name:var(--font-montserrat)] text-white/70 uppercase tracking-[0.32em] mb-10 sm:mb-12">
          Outlining electronic music culture
        </h1>

        <div className="hero-line hero-line-3 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/events"
            className="group inline-flex items-center gap-3 bg-black text-white pl-6 pr-5 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] border border-white/30 hover:bg-white hover:text-black hover:border-white transition-colors"
          >
            Events
            <span aria-hidden="true" className="block h-px w-4 bg-white/70 transition-all duration-300 ease-out group-hover:w-9 group-hover:bg-black/80" />
          </Link>
          <Link
            href="/house-parties"
            className="group inline-flex items-center gap-3 bg-black text-white pl-6 pr-5 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] border border-white/30 hover:bg-white hover:text-black hover:border-white transition-colors"
          >
            House Parties
            <span aria-hidden="true" className="block h-px w-4 bg-white/70 transition-all duration-300 ease-out group-hover:w-9 group-hover:bg-black/80" />
          </Link>
          <Link
            href="/djs"
            className="group inline-flex items-center gap-3 bg-black text-white pl-6 pr-5 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] border border-white/30 hover:bg-white hover:text-black hover:border-white transition-colors"
          >
            DJ with us
            <span aria-hidden="true" className="block h-px w-4 bg-white/70 transition-all duration-300 ease-out group-hover:w-9 group-hover:bg-black/80" />
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="relative h-10 w-px overflow-hidden">
          <span aria-hidden="true" className="absolute inset-x-0 h-1/2 bg-white/45 hero-scroll-draw" />
        </div>
      </div>
    </section>
  );
}
