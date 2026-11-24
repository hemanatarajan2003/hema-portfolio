"use client";

import { motion } from "motion/react";
import { expertise } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandTile } from "@/components/ui/BrandIcon";
import { stagger } from "@/components/ui/Reveal";
import { ExpertiseIllustration } from "@/components/illustrations/ExpertiseVisuals";

export function Expertise() {
  return (
    <section id="expertise" className="bg-subtle/60 py-24 md:py-36">
      <div className="container-x">
        <SectionHeading label={expertise.label} lines={expertise.headline} />

        <motion.ul
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {expertise.items.map((item, i) => (
            <motion.li
              key={item.title}
              variants={stagger.item}
              className="group card flex flex-col p-2.5 transition-shadow duration-500 hover:shadow-lift"
            >
              <div className="relative h-52 overflow-hidden rounded-[1.1rem] border border-line bg-bg p-4">
                <div className="dot-grid absolute inset-0 opacity-40" aria-hidden />
                <div className="relative h-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]">
                  <ExpertiseIllustration type={item.visual} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4 pt-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold tracking-tight">{item.title}</h3>
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </div>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{item.description}</p>
                <div className="mt-auto pt-5">
                  <div className="mb-3 flex gap-1.5">
                    {item.icons.map((ic) => (
                      <BrandTile key={ic} name={ic} size={16} className="rounded-lg" />
                    ))}
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    {item.tech.map((t) => (
                      <li key={t} className="rounded-full bg-fg/[0.05] px-2.5 py-1 font-mono text-[11px] text-fg/75 dark:bg-white/[0.06]">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
