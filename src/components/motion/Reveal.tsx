import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'motion/react';

// Soft cinematic easing shared by every reveal animation in the invitation.
export const EASE_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Re-triggers every time the element crosses into/out of view, so scrolling back up
// and back down replays the reveal instead of only ever animating once.
export const viewportRepeat = { once: false, amount: 0.22 } as const;

/** Photos: fade-in + gentle zoom-out (scale 1.06 -> 1). */
export const fadeImg = (delay = 0, duration = 1.1): Variants => ({
  hidden: { opacity: 0, scale: 1.06 },
  visible: { opacity: 1, scale: 1, transition: { duration, ease: EASE_SOFT, delay } },
});

/** Body text / cards: fade-in + slide-up. */
export const fadeUp = (delay = 0, distance = 18, duration = 0.85): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_SOFT, delay } },
});

/** Headings / script titles: same fade-slide, held a little slower for an elegant feel. */
export const fadeUpTitle = (delay = 0, distance = 24, duration = 1.3): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_SOFT, delay } },
});

/** Decorative accents (florals, dividers): opacity only, low -> full. */
export const fadeSoft = (delay = 0, duration = 1.3): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration, ease: EASE_SOFT, delay } },
});

/**
 * Wraps a large photo so it drifts a few pixels with scroll (very light Ken Burns / parallax).
 * Renders as an absolutely-positioned full-size layer, so it must sit inside a `relative overflow-hidden` box.
 * `bufferScale` keeps the image slightly oversized so the drift never reveals an edge gap.
 */
export function ParallaxLayer({
  children,
  strength = 14,
  bufferScale = 1.1,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  bufferScale?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <motion.div ref={ref} style={{ y, scale: bufferScale }} className={`absolute inset-0 h-full w-full ${className}`}>
      {children}
    </motion.div>
  );
}
