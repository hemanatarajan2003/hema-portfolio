"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade-and-rise when scrolled into view. */
export function Reveal({
  delay = 0,
  y = 28,
  className,
  children,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Each line slides up from behind a mask — editorial headline reveal. */
export function MaskLines({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  animateOnMount = false,
  mutedLast = false,
  mutedClassName = "text-muted",
}: {
  lines: readonly string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: string;
  delay?: number;
  animateOnMount?: boolean;
  /** Render the final line in the secondary text colour (editorial two-tone). */
  mutedLast?: boolean;
  mutedClassName?: string;
}) {
  // The in-view trigger lives on the (unclipped) heading; lines inherit via variants.
  // Watching the masked lines themselves never fires because they start fully clipped.
  const MotionTag = motion[Tag];
  const trigger = animateOnMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <MotionTag className={className} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={cn(
              "block will-change-transform",
              mutedLast && lines.length > 1 && i === lines.length - 1 && mutedClassName,
              lineClassName,
            )}
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 0.95, ease, delay: delay + i * 0.09 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Container + item pair for staggered grids. */
export const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  },
  item: {
    hidden: { opacity: 0, y: 26, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
  },
};
