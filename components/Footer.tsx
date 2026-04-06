import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/brand/logo-dark.jpg"
              alt="Outlines"
              width={32}
              height={32}
              className="rounded-full opacity-60"
            />
            <span className="text-white/40 text-sm font-[family-name:var(--font-montserrat)]">
              Outlines Group
            </span>
          </div>

          <div className="flex items-center gap-5">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/outlinesgroup_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@outlinesgroup_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.27 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3 6.34 6.34 0 0 0 9.49 21.64a6.34 6.34 0 0 0 6.34-6.34V8.7a8.16 8.16 0 0 0 3.76.92V6.19a4.85 4.85 0 0 1-.01.5z" />
              </svg>
            </a>
            {/* Email */}
            <a
              href="mailto:hello@outlinesgroup.com"
              aria-label="Email"
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="22,4 12,13 2,4" />
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-white/30 text-xs font-[family-name:var(--font-montserrat)]">
              &copy; {year} Outlines
            </p>
            <p className="text-white/20 text-xs font-[family-name:var(--font-montserrat)]">
              Built by{' '}
              <a
                href="https://webbaura.com"
                className="hover:text-white/40 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Webbaura
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
