import Image from 'next/image';
import Link from 'next/link';
import Marquee from '@/components/Marquee';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black py-28">
      {/* Top marquee strip */}
      <div className="absolute top-20 inset-x-0 z-10">
        <Marquee
          items={['Outlining', 'Electronic music culture', 'Melbourne']}
          bordered
        />
      </div>

      {/* Centre stack */}
      <div className="relative z-10 px-6 w-full max-w-[1400px] flex flex-col items-center text-center">
        <div className="hero-line mb-8 sm:mb-10">
          <Image
            src="/assets/brand/outlines-transparent.webp"
            alt="Outlines"
            width={540}
            height={600}
            priority
            className="w-[110px] sm:w-[140px] lg:w-[160px] h-auto select-none"
          />
        </div>

        <h1 className="hero-line hero-line-2 text-4xl sm:text-6xl lg:text-[6rem] font-bold leading-[0.95] tracking-tight">
          <span className="block">Outlining</span>
          <span className="block hero-stroke">electronic</span>
          <span className="block hero-stroke">music culture.</span>
        </h1>

        <div className="hero-line hero-line-3 mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/events"
            className="group inline-flex items-center gap-3 bg-white text-black pl-6 pr-5 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] hover:bg-white/90 transition-colors"
          >
            Events
            <span aria-hidden="true" className="block h-px w-4 bg-black/80 transition-all duration-300 ease-out group-hover:w-9" />
          </Link>
          <Link
            href="/house-parties"
            className="group inline-flex items-center gap-3 pl-6 pr-5 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white/85 border border-white/20 hover:border-white/55 hover:text-white transition-colors"
          >
            House Parties
            <span aria-hidden="true" className="block h-px w-4 bg-white/55 transition-all duration-300 ease-out group-hover:w-9 group-hover:bg-white" />
          </Link>
          <Link
            href="/djs"
            className="group inline-flex items-center gap-3 pl-6 pr-5 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white/85 border border-white/20 hover:border-white/55 hover:text-white transition-colors"
          >
            DJ with us
            <span aria-hidden="true" className="block h-px w-4 bg-white/55 transition-all duration-300 ease-out group-hover:w-9 group-hover:bg-white" />
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
