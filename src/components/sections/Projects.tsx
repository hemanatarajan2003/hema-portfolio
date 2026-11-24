"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectIllustration } from "@/components/illustrations/ProjectVisuals";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { theme } = project;
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative grid overflow-hidden rounded-[2rem] border shadow-lift outline-offset-4 transition-[transform] duration-500",
        compact ? "gap-0" : "md:grid-cols-[1fr_1.15fr]",
        theme.dark ? "border-white/10 text-white" : "border-black/5 text-[#171717]",
      )}
      style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
      aria-label={`${project.title} — read case study`}
    >
      <div className={cn("relative z-10 flex flex-col p-6 md:p-10", compact && "md:p-7")}>
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="rounded-full px-2.5 py-1 font-semibold" style={{ background: `${theme.accent}22`, color: theme.accent }}>
            {project.number}
          </span>
          <span className={theme.dark ? "text-white/60" : "text-black/55"}>{project.category}</span>
        </div>
        <h3
          className={cn(
            "mt-6 font-display font-semibold tracking-[-0.03em] text-balance",
            compact ? "text-2xl" : "text-[clamp(1.75rem,3.4vw,2.9rem)] leading-[1.05]",
          )}
        >
          {project.shortTitle}
        </h3>
        {!compact && (
          <>
            <p className={cn("mt-2 text-sm font-medium", theme.dark ? "text-white/70" : "text-black/60")}>{project.title}</p>
            <p className={cn("mt-5 max-w-md text-[15px] leading-relaxed", theme.dark ? "text-white/70" : "text-black/65")}>
              {project.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className={cn(
                    "rounded-full border px-2.5 py-1 font-mono text-[11px]",
                    theme.dark ? "border-white/15 text-white/75" : "border-black/10 bg-white/50 text-black/70",
                  )}
                >
                  {t}
                </li>
              ))}
            </ul>
          </>
        )}
        <span
          className={cn(
            "mt-8 inline-flex w-fit items-center gap-2 rounded-full py-2.5 pr-3 pl-5 text-sm font-medium transition-all md:mt-auto",
            theme.dark ? "bg-white text-[#101014]" : "bg-[#171717] text-white",
          )}
        >
          View case study
          <span className="grid size-6 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45" style={{ background: theme.accent }}>
            <ArrowUpRight className="size-3.5 text-white" />
          </span>
        </span>
      </div>
      <div className={cn("relative min-h-[240px] p-4 md:min-h-[420px] md:p-6", compact && "md:min-h-[220px]")}>
        <div className="relative h-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]">
          <ProjectIllustration type={project.visual} />
        </div>
        <span
          className={cn(
            "absolute right-5 bottom-4 rounded-full px-2 py-0.5 font-mono text-[9.5px] tracking-wider uppercase",
            theme.dark ? "bg-white/10 text-white/55" : "bg-black/5 text-black/45",
          )}
        >
          Conceptual illustration
        </span>
      </div>
    </Link>
  );
}

export function Projects() {
  const root = useRef<HTMLDivElement>(null);

  // Scroll-driven stacking: each card shrinks and dims as the next one slides over it.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          gsap.to(card.firstElementChild, {
            scale: 0.92,
            filter: "brightness(0.85)",
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top 120px",
              scrub: true,
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="projects" className="py-24 md:py-36">
      <div className="container-x" ref={root}>
        <SectionHeading label="03 / Selected Projects" lines={["Turning knowledge", "into practical solutions."]} />
        <div className="grid gap-6 md:gap-10">
          {projects.map((p, i) => (
            <div key={p.slug} data-stack-card className="relative md:sticky" style={{ top: `${96 + i * 14}px`, zIndex: i + 1 }}>
              <div className="origin-top will-change-transform">
                <ProjectCard project={p} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
