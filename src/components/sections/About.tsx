"use client";

import { motion } from "motion/react";
import { Award, FolderGit2, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { about, credentials, education, profile, projects } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, stagger } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function Cell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={stagger.item}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn("card relative overflow-hidden p-5 md:p-6", className)}
    >
      {children}
    </motion.div>
  );
}

export function About() {
  const mca = education.items[0];
  const gradYear = mca.period.split("–").pop()?.trim();

  return (
    <section id="about" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading label={about.label} lines={about.headline} />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="space-y-5 text-[16px] leading-relaxed text-muted md:text-[17px]">
            {about.paragraphs.map((p, i) => (
              <Reveal key={p} delay={i * 0.08}>
                <p className={i === 0 ? "font-display text-xl leading-snug text-fg md:text-2xl" : ""}>{p}</p>
              </Reveal>
            ))}
          </div>

          <motion.div
            variants={stagger.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            className="grid auto-rows-[minmax(150px,auto)] grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
          >
            <Cell className="col-span-2 bg-fg text-bg [border-color:transparent]">
              <GraduationCap className="size-6 opacity-80" />
              <p className="mt-6 font-display text-5xl font-semibold tracking-tight md:text-6xl">MCA</p>
              <p className="mt-1 text-sm opacity-70">
                Graduate — {gradYear} · {mca.institution}
              </p>
            </Cell>

            <Cell>
              <FolderGit2 className="size-5 text-accent" />
              <p className="mt-5 font-display text-5xl font-semibold tracking-tight">{projects.length}</p>
              <p className="mt-1 text-sm text-muted">Academic projects</p>
            </Cell>

            <Cell>
              <Award className="size-5 text-accent" />
              <p className="mt-5 font-display text-5xl font-semibold tracking-tight">{credentials.items.length}</p>
              <p className="mt-1 text-sm text-muted">Certification &amp; training areas</p>
            </Cell>

            <Cell className="dot-grid">
              <MapPin className="size-5 text-accent" />
              <p className="mt-5 font-display text-2xl font-semibold tracking-tight md:text-3xl">Chennai</p>
              <p className="mt-1 text-sm text-muted">Based in {profile.location.split(",").pop()?.trim()}</p>
            </Cell>

            <Cell className="bg-accent-soft [border-color:transparent]">
              <span className="relative flex size-3">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
                <span className="relative inline-flex size-3 rounded-full bg-ok" />
              </span>
              <p className="mt-5 font-display text-2xl font-semibold tracking-tight md:text-3xl">Open to Work</p>
              <p className="mt-1 text-sm text-muted">Entry-level roles</p>
            </Cell>

            <Cell className="col-span-2 md:col-span-3">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <Sparkles className="size-5 text-accent" />
                  <p className="mt-4 font-display text-2xl font-semibold tracking-tight md:text-3xl">Continuous learner</p>
                  <p className="mt-1 text-sm text-muted">Always exploring the next technology.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Programming", "Web", "Cloud", "Networking", "Linux"].map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Cell>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
