"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Download, Mail, MapPin, Phone, Send } from "lucide-react";
import { contact, profile } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { LinkedInIcon } from "@/components/ui/Monogram";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { telHref } from "@/lib/utils";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // Fallback for browsers without clipboard permission
      const ta = document.createElement("textarea");
      ta.value = profile.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const details = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    ...(profile.showPhone ? [{ icon: Phone, label: "Phone", value: profile.phone, href: telHref(profile.phone) }] : []),
    { icon: MapPin, label: "Location", value: profile.location, href: "" },
  ];

  return (
    <section id="contact" className="px-3 pb-6 md:px-5">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-[#101014] px-5 py-20 text-white md:rounded-[2.5rem] md:px-12 md:py-28 dark:border dark:border-line dark:bg-[#15151c]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-[#7856E8]/30 blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,.08)_1px,transparent_0)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
        </div>

        <div className="relative mx-auto max-w-[1100px]">
          <Reveal y={12}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pr-3.5 pl-2.5 text-[13px] font-medium">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ADE80] opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-[#4ADE80]" />
              </span>
              {profile.availability}
            </span>
          </Reveal>

          <MaskLines
            lines={contact.headline}
            className="mt-7 font-display text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.98] font-semibold tracking-[-0.045em]"
            mutedLast
            mutedClassName="text-white/45"
          />

          <Reveal delay={0.15}>
            <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/65 md:text-lg">{contact.text}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={`mailto:${profile.email}`} size="lg" magnetic className="bg-white text-[#101014] hover:bg-white/90">
                <Send className="size-4" /> Send an Email
              </Button>
              <button
                type="button"
                onClick={copy}
                className="inline-flex h-13 items-center gap-2 rounded-full border border-white/20 px-6 text-[15px] font-medium transition-colors hover:border-white/50"
                aria-live="polite"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "y" : "n"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="inline-flex items-center gap-2"
                  >
                    {copied ? <Check className="size-4 text-[#4ADE80]" /> : <Copy className="size-4" />}
                    {copied ? "Copied!" : "Copy Email"}
                  </motion.span>
                </AnimatePresence>
              </button>
              <Button href={profile.resume} download="Hema_SE_resume.pdf" size="lg" className="border border-white/20 bg-transparent text-white hover:border-white/50 hover:bg-transparent">
                <Download className="size-4" /> Download Resume
              </Button>
              {profile.linkedin && (
                <Button href={profile.linkedin} external size="lg" className="bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90">
                  <LinkedInIcon /> LinkedIn
                </Button>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-[0.8fr_1.5fr_1fr_1fr]">
              <div className="bg-[#101014] p-5 dark:bg-[#15151c]">
                <dt className="font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">Name</dt>
                <dd className="mt-2 font-display text-lg font-medium">{profile.name}</dd>
              </div>
              {details.map((d) => (
                <div key={d.label} className="bg-[#101014] p-5 dark:bg-[#15151c]">
                  <dt className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.16em] text-white/45 uppercase">
                    <d.icon className="size-3.5" /> {d.label}
                  </dt>
                  <dd className="mt-2 font-display text-[17px] font-medium [overflow-wrap:anywhere]">
                    {d.href ? (
                      <a href={d.href} className="transition-colors hover:text-[#A78BFA]">
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
