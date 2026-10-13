import SiteChrome from '@/components/SiteChrome';

// Chrome for the main site. Lives in the (site) route group so standalone
// pages like /links can opt out of the nav, footer and WebGL background.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
