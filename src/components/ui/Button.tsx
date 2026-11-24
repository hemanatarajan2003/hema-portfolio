"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { useFinePointer } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "ghost" | "outline";

const styles: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-fg/90",
  accent: "bg-accent text-white hover:brightness-110 dark:text-[#101014]",
  outline: "border border-line bg-card text-fg hover:border-fg/30",
  ghost: "text-fg hover:bg-fg/5",
};

type Props = {
  href: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  external?: boolean;
  download?: boolean | string;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
};

const sizes = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

/** Pill button / link. `magnetic` makes it follow the cursor slightly on desktop. */
export function Button({
  href,
  variant = "primary",
  size = "md",
  magnetic = false,
  external,
  download,
  className,
  children,
  ...aria
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.4 });
  const active = magnetic && fine;

  const onMove = (e: React.PointerEvent) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,filter,color] duration-300",
    sizes[size],
    styles[variant],
    className,
  );

  const isAnchor = external || download || href.startsWith("mailto:") || href.startsWith("tel:") || href.endsWith(".pdf");

  const inner = isAnchor ? (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: typeof download === "string" ? download : true } : {})}
      {...aria}
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={classes} {...aria}>
      {children}
    </Link>
  );

  return (
    <motion.span
      ref={ref}
      style={active ? { x, y } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-flex"
    >
      {inner}
    </motion.span>
  );
}
