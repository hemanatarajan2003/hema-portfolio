"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Briefcase, Building2, GraduationCap, MapPin, PenTool } from "lucide-react";
import { education, training } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stagger } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Vertical line that draws itself as the timeline scrolls through the viewport. */
function useTimelineDraw() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return ref;
}

export function Training() {
  const ref = useTimelineDraw();
  const icons = [Briefcase, PenTool];
  return (
    <section id="training" className="py-24 md:py-32">
      <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading label={training.label} lines={training.headline} className="lg:sticky lg:top-32 lg:self-start" />
        <div ref={ref} className="relative">
          <div aria-hidden className="absolute top-2 bottom-2 left-[21px] w-px bg-line" />
          <div aria-hidden data-line className="absolute top-2 bottom-2 left-[21px] w-px origin-top bg-accent" />
          <motion.ol
            variants={stagger.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            className="grid gap-6"
          >
            {training.items.map((t, i) => {
              const Icon = icons[i] ?? Briefcase;
              return (
                <motion.li key={t.role} variants={stagger.item} className="relative pl-16">
                  <span className="absolute top-5 left-0 grid size-11 place-items-center rounded-full border border-line bg-card shadow-soft">
                    <Icon className="size-[18px] text-accent" />
                  </span>
                  <div className="card p-6 transition-shadow duration-500 hover:shadow-lift md:p-7">
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[11px] text-accent">{t.category}</span>
                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">{t.role}</h3>
                    {t.organization && (
                      <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-fg/80">
                        <Building2 className="size-4 text-muted" /> {t.organization}
                      </p>
                    )}
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{t.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

export function Education() {
  const ref = useTimelineDraw();
  return (
    <section id="education" className="bg-subtle/60 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading label={education.label} lines={education.headline} />
        <div ref={ref} className="relative">
          <div aria-hidden className="absolute top-2 bottom-2 left-[21px] w-px bg-line md:left-1/2" />
          <div aria-hidden data-line className="absolute top-2 bottom-2 left-[21px] w-px origin-top bg-accent md:left-1/2" />
          <motion.ol
            variants={stagger.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            className="grid gap-8"
          >
            {education.items.map((e, i) => (
              <motion.li
                key={e.degree}
                variants={stagger.item}
                className={`relative pl-16 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14"}`}
              >
                <span
                  className={`absolute top-6 left-0 z-10 grid size-11 place-items-center rounded-full border border-line bg-card shadow-soft ${
                    i % 2 ? "md:-left-[22px]" : "md:right-[-22px] md:left-auto"
                  }`}
                >
                  <GraduationCap className="size-[18px] text-accent" />
                </span>
                <div className="group card p-6 transition-shadow duration-500 hover:shadow-lift md:p-8">
                  <p className="font-mono text-sm text-accent">{e.period}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-balance md:text-[1.7rem]">{e.degree}</h3>
                  <p className="mt-3 font-medium">{e.institution}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                    <MapPin className="size-3.5" /> {e.place}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
