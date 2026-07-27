'use client';

import LiquidEther from './LiquidEther';

type Props = {
  colors?: string[];
  opacity?: number;
};

export default function LiquidEtherBackground({
  colors = ['#ffffff', '#d4d4d4', '#7a7a7a'],
  opacity = 0.9,
}: Props) {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity }}
    >
      <LiquidEther
        colors={colors}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
    </div>
  );
}
