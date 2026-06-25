'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/',              label: 'Home' },
  { href: '/vision',        label: 'Vision' },
  { href: '/events',        label: 'Events' },
  { href: '/house-parties', label: 'House Parties' },
  { href: '/djs',           label: 'DJs' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,height] duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.78)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        }}
      >
        <nav
          className="max-w-7xl mx-auto px-6 flex items-center justify-between transition-[height] duration-300"
          style={{ height: scrolled ? 64 : 80 }}
        >
          <Link href="/" className="relative hover:opacity-80 transition-opacity">
            <Image
              src="/assets/brand/outlines-transparent.webp"
              alt="Outlines"
              width={120}
              height={130}
              className="h-10 w-auto sm:h-11 select-none"
              priority
            />
          </Link>

          <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {links.map((l, i) => {
              const active =
                l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
              return (
                <li key={l.href} className="flex items-center">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="h-3 w-px bg-white/15 mr-1 lg:mr-2"
                    />
                  )}
                  <Link
                    href={l.href}
                    aria-current={active ? 'page' : undefined}
                    className="relative px-3 py-2 text-sm tracking-wide font-[family-name:var(--font-montserrat)] transition-colors duration-200"
                    style={{
                      color: active
                        ? 'rgba(255,255,255,0.96)'
                        : 'rgba(255,255,255,0.72)',
                      fontWeight: active ? 600 : 500,
                    }}
                  >
                    <span className="inline-block">{l.label}</span>
                    <span
                      aria-hidden="true"
                      className="absolute left-3 right-3 -bottom-0.5 h-px origin-left bg-white"
                      style={{
                        transform: active ? 'scaleX(1)' : 'scaleX(0)',
                        transition: 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2 -mr-2"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu — full screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col items-center justify-center transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-10">
          {links.map((l) => {
            const active =
              l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active ? 'page' : undefined}
                className="text-3xl font-medium tracking-wide transition-opacity"
                style={{ color: active ? '#fff' : 'rgba(255,255,255,0.6)' }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
