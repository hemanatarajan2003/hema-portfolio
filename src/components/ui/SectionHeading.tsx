import { cn } from "@/lib/utils";
import { MaskLines, Reveal } from "./Reveal";

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      <span className="h-px w-6 bg-accent" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  label,
  lines,
  intro,
  className,
}: {
  label?: string;
  lines: readonly string[];
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      {label && (
        <Reveal y={12}>
          <SectionLabel>{label}</SectionLabel>
        </Reveal>
      )}
      <MaskLines
        lines={lines}
        className="mt-5 font-display text-[clamp(2.1rem,5.4vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance"
        mutedLast
      />
      {intro && (
        <Reveal delay={0.15} className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {intro}
        </Reveal>
      )}
    </div>
  );
}
