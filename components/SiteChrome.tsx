import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SocialRail from '@/components/SocialRail';
import LiquidEtherBackground from '@/components/LiquidEtherBackground';

// Nav, footer and WebGL background for the main site. Used by the (site)
// route-group layout, and by app/not-found.tsx, which renders outside that
// group (unmatched URLs only get the root layout).
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LiquidEtherBackground />
      <Nav />
      <SocialRail />
      <main>{children}</main>
      <Footer />
    </>
  );
}
