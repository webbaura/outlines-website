import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SocialRail from '@/components/SocialRail';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Outlines',
    template: '%s — Outlines',
  },
  description: 'Outlining electronic music culture. Melbourne-based house music events.',
  keywords: ['house music', 'Melbourne events', 'electronic music', 'Outlines', 'music culture'],
  authors: [{ name: 'Outlines' }],
  creator: 'Outlines',
  metadataBase: new URL('https://outlines.com.au'),
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: '/',
    siteName: 'Outlines',
    title: 'Outlines — Outlining electronic music culture',
    description: 'Melbourne-based house music events. Bringing good house music culture to light.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outlines',
    description: 'Outlining electronic music culture.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable} data-scroll-behavior="smooth">
      <body className="font-[family-name:var(--font-montserrat)]">
        <Nav />
        <SocialRail />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
