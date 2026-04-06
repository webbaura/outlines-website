'use client';

import { useInView } from '@/lib/useInView';
import { type ReactNode, type ElementType } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  animation?: 'fade-up' | 'fade-in';
}

export default function ScrollReveal({
  children,
  className = '',
  as: Tag = 'div',
  animation = 'fade-up',
}: ScrollRevealProps) {
  const { ref, inView } = useInView();

  const animClass = animation === 'fade-up' ? 'animate-fade-up' : 'animate-fade-in';

  return (
    <Tag
      ref={ref}
      className={`${animClass} ${inView ? 'in-view' : ''} ${className}`}
    >
      {children}
    </Tag>
  );
}
