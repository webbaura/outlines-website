'use client';

import { useInView } from '@/lib/useInView';

type Props = {
  className?: string;
};

// A 1px section divider that grows from the centre out as it enters view.
// Replaces ad-hoc `border-t border-white/5` and sells the section break
// as a scene change, not a horizontal rule.
export default function Bookend({ className = '' }: Props) {
  const { ref, inView } = useInView({ threshold: 0 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      aria-hidden="true"
      className={`relative h-px w-full overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 origin-center bg-white/15"
        style={{
          transform: inView ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  );
}
