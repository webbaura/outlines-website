import type { Metadata } from 'next';
import Link from 'next/link';
import SiteChrome from '@/components/SiteChrome';
import StatusPage, { statusButtonClass } from '@/components/StatusPage';

// Handles every unmatched URL plus any notFound() call. Next sends a 404
// status. robots is set explicitly so the root layout's "index, follow"
// doesn't also land in the head next to Next's injected noindex.
export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SiteChrome>
      <StatusPage
        eyebrow="404"
        title="Wrong room."
        body="This page doesn't exist or has moved. The party's still on, though."
        actions={
          <>
            <Link href="/" className={statusButtonClass}>Back home</Link>
            <Link href="/events" className={statusButtonClass}>See events</Link>
          </>
        }
        links={[
          { href: '/house-party', label: 'House Party' },
          { href: '/cafe-disco', label: 'Cafe Disco' },
          { href: '/outlines-records', label: 'Music Label' },
          { href: '/djs', label: 'DJs' },
        ]}
      />
    </SiteChrome>
  );
}
