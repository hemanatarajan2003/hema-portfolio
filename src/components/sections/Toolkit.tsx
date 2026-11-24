"use client";

import { motion } from "motion/react";
import { Network } from "lucide-react";
import { toolkit } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { stagger } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/* Layout spans for the 4-column bento (matches toolkit.groups order). */
// Order: Programming, Web, Networking, Cloud, Database, OS, Dev Tools (dense flow fills gaps)
const spans = [
  "lg:col-span-1",
  "lg:col-span-2",
  "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "sm:col-span-2 lg:col-span-2",
];

export function Toolkit() {
  return (
    <section id="skills" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading label={toolkit.label} lines={toolkit.headline} />

        <motion.ul
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="grid grid-flow-row-dense gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4"
        >
          {toolkit.groups.map((g, gi) => {
            const big = g.items.length > 3;
            return (
              <motion.li
                key={g.title}
                variants={stagger.item}
                whileHover={{ y: -4 }}
                className={cn("group card flex flex-col p-5 transition-shadow duration-500 hover:shadow-lift md:p-6", spans[gi])}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{g.title}</h3>
                  <span className="font-mono text-[11px] text-muted/70">{String(g.items.length).padStart(2, "0")}</span>
                </div>

                {big ? (
                  <>
                    <div className="mt-6 flex items-center gap-3">
                      <span className="grid size-14 place-items-center rounded-2xl bg-white shadow-soft dark:bg-white/95">
                        <BrandIcon name="cisco" size={40} />
                      </span>
                      <Network className="size-8 text-[#1BA0D7]" aria-hidden />
                    </div>
                    <ul className="mt-auto grid grid-cols-2 gap-2 pt-8">
                      {g.items.map((it) => (
                        <li
                          key={it.name}
                          className="rounded-xl border border-line bg-bg px-3 py-2.5 text-[13.5px] font-medium transition-colors hover:border-[#1BA0D7]/50"
                        >
                          {it.name}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-4 pt-8">
                    {g.items.map((it) => (
                      <li key={it.name} className="flex items-center gap-3">
                        {it.icon && (
                          <span className="grid size-12 place-items-center rounded-2xl bg-white shadow-soft transition-transform duration-300 group-hover:scale-110 dark:bg-white/95">
                            <BrandIcon name={it.icon} size={28} decorative />
                          </span>
                        )}
                        <span className="font-display text-[17px] font-medium">{it.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
