"use client";

import { motion } from "motion/react";
import { Layers, MessageCircle, Shuffle, Users, type LucideIcon } from "lucide-react";
import { softSkills } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { MaskLines, Reveal, stagger } from "@/components/ui/Reveal";
import { Terminal } from "./Terminal";

const icons: Record<string, LucideIcon> = {
  Teamwork: Users,
  Adaptability: Shuffle,
  Communication: MessageCircle,
  Multitasking: Layers,
};

export function SoftSkills() {
  return (
    <section aria-labelledby="soft-skills" className="bg-subtle/60 py-24 md:py-32">
      <div className="container-x grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal y={12}>
            <SectionLabel>Soft skills</SectionLabel>
          </Reveal>
          <div id="soft-skills">
            <MaskLines
              lines={[softSkills.headline]}
              className="mt-5 font-display text-[clamp(2.1rem,5vw,3.8rem)] leading-[1.02] font-semibold tracking-[-0.035em]"
            />
          </div>

          <motion.ul
            variants={stagger.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 divide-y divide-line border-y border-line"
          >
            {softSkills.items.map((s, i) => {
              const Icon = icons[s.name] ?? Users;
              return (
                <motion.li key={s.name} variants={stagger.item} className="group flex items-center gap-5 py-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-card transition-all duration-500 group-hover:rotate-[360deg] group-hover:border-accent group-hover:bg-accent group-hover:text-white dark:group-hover:text-[#101014]">
                    <Icon className="size-[18px]" />
                  </span>
                  <div className="flex-1">
                    <p className="font-display text-xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-2xl">
                      {s.name}
                    </p>
                    <p className="text-sm text-muted">{s.text}</p>
                  </div>
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        <Reveal delay={0.1} className="lg:pt-14">
          <p className="mb-3 font-mono text-xs text-muted">
            Try it — type <kbd className="rounded bg-fg/10 px-1.5 py-0.5">help</kbd> or tap a command.
          </p>
          <Terminal />
        </Reveal>
      </div>
    </section>
  );
}
