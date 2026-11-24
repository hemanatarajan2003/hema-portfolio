"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { BrandTile } from "@/components/ui/BrandIcon";
import { LinkedInIcon } from "@/components/ui/Monogram";
import { MaskLines } from "@/components/ui/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const floaters = [
  { icon: "python", className: "-left-5 top-[14%]", delay: 0 },
  { icon: "aws", className: "-right-6 top-[26%]", delay: 1.2 },
  { icon: "cisco", className: "-left-7 bottom-[22%]", delay: 2.1 },
  { icon: "linux", className: "-right-4 bottom-[10%]", delay: 0.6 },
] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Background texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000,transparent)] opacity-60" />
        <div className="absolute top-[-10%] right-[-10%] size-[520px] rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card py-1.5 pr-3.5 pl-2.5 text-[13px] font-medium shadow-soft"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
            {profile.hero.badge}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="mt-8 font-display text-lg font-medium text-muted md:text-xl"
          >
            {profile.hero.intro}
          </motion.p>

          <MaskLines
            as="h1"
            animateOnMount
            delay={0.18}
            mutedLast
            lines={profile.hero.headline}
            className="mt-3 font-display text-[clamp(2.55rem,8.4vw,6.4rem)] leading-[0.98] font-semibold tracking-[-0.045em]"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.45 }}
          >
            <p className="mt-7 font-mono text-[13px] tracking-wide text-accent uppercase">{profile.designation}</p>
            <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-muted md:text-[17px]">
              {profile.hero.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="#projects" size="lg" magnetic>
                Explore My Work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button href={profile.resume} variant="outline" size="lg" magnetic download="Hema_SE_resume.pdf">
                <Download className="size-4" /> Download Resume
              </Button>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-2 text-sm text-muted">
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="grid size-10 place-items-center rounded-full border border-line bg-card text-[#0A66C2] transition hover:-translate-y-0.5 hover:border-fg/30 dark:text-[#5aa9ff]"
                >
                  <LinkedInIcon />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                aria-label={`Email ${profile.email}`}
                className="grid size-10 place-items-center rounded-full border border-line bg-card text-fg transition hover:-translate-y-0.5 hover:border-fg/30"
              >
                <Mail className="size-4" />
              </a>
              <span className="ml-2 inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-accent" /> {profile.location}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Portrait / monogram */}
        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
          <motion.div style={{ y: portraitY }} className="relative">
            {/* Masked reveal on the card only, so the floating logos outside it aren't clipped */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, clipPath: "inset(12% 12% 12% 12% round 2rem)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 2rem)" }}
              transition={{ duration: 1.2, ease, delay: 0.25 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-accent-soft via-card to-subtle shadow-lift"
            >
              {profile.portrait ? (
                <Image
                  src={profile.portrait}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-[50%_20%]"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="dot-grid absolute inset-0 opacity-50" aria-hidden />
                  <div className="relative text-center">
                    <span className="block font-display text-[clamp(7rem,20vw,12rem)] leading-none font-bold tracking-[-0.08em] text-fg">
                      HN
                    </span>
                    <span className="mt-2 block font-mono text-xs tracking-[0.3em] text-muted uppercase">
                      {profile.name}
                    </span>
                  </div>
                </div>
              )}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-line bg-card/85 px-4 py-3 backdrop-blur-md">
                <div>
                  <p className="text-sm font-semibold">{profile.title}</p>
                  <p className="text-xs text-muted">MCA · {profile.location}</p>
                </div>
                <span className="rounded-full bg-ok/12 px-2.5 py-1 font-mono text-[10px] font-semibold text-ok uppercase">
                  {profile.availability}
                </span>
              </div>
            </motion.div>

            {floaters.map((f) => (
              <motion.div
                key={f.icon}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.9 + f.delay * 0.15 }}
                className={`absolute hidden sm:block ${f.className}`}
              >
                <div className="animate-float" style={{ animationDelay: `${f.delay}s` }}>
                  <BrandTile name={f.icon} size={26} className="rounded-2xl shadow-lift" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mx-auto mt-16 hidden w-fit flex-col items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-muted uppercase md:flex"
        aria-label="Scroll to About section"
      >
        Scroll
        <span className="grid h-10 w-6 justify-center rounded-full border border-line pt-1.5">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown className="size-3" />
          </motion.span>
        </span>
      </motion.a>
    </section>
  );
}
