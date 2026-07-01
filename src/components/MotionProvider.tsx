import type { PropsWithChildren } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';

export const smoothEase = [0.16, 1, 0.3, 1] as const;

export function MotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
