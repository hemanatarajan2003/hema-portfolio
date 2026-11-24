"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, CheckCircle2, ExternalLink, Eye, GraduationCap, Info, X } from "lucide-react";
import { credentials, type Credential } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandTile } from "@/components/ui/BrandIcon";
import { stagger } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function PreviewModal({ item, onClose }: { item: Credential; onClose: () => void }) {
  const [tab, setTab] = useState(0);
  const file = item.files[tab];
  const isPdf = file.src.toLowerCase().endsWith(".pdf");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-3 backdrop-blur-sm md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} certificate preview`}
      data-lenis-prevent
    >
      <motion.div
        initial={{ y: 24, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 24, scale: 0.97 }}
        onClick={(e) => e.stopPropagation()}
        className="card flex h-[85dvh] w-full max-w-5xl flex-col overflow-hidden p-0"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 md:px-5">
          <p className="truncate font-display font-semibold">{item.title}</p>
          <div className="flex shrink-0 items-center gap-1">
            <a
              href={file.original ?? file.src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium hover:bg-fg/5"
            >
              {file.original?.toLowerCase().endsWith(".pdf") ? "Open PDF" : "Open"} <ExternalLink className="size-3.5" />
            </a>
            <button type="button" onClick={onClose} autoFocus aria-label="Close preview" className="grid size-9 place-items-center rounded-full hover:bg-fg/5">
              <X className="size-4" />
            </button>
          </div>
        </div>

        {item.files.length > 1 && (
          <div role="tablist" aria-label="Documents" className="flex gap-1.5 overflow-x-auto border-b border-line px-4 py-2.5 md:px-5">
            {item.files.map((f, i) => (
              <button
                key={f.src}
                type="button"
                role="tab"
                aria-selected={i === tab}
                onClick={() => setTab(i)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  i === tab ? "bg-fg text-bg" : "text-muted hover:bg-fg/5 hover:text-fg",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        <div className="relative min-h-0 flex-1 bg-subtle">
          {isPdf ? (
            <iframe key={file.src} src={`${file.src}#view=FitH`} title={`${file.label} certificate`} className="size-full bg-white" />
          ) : (
            <Image key={file.src} src={file.src} alt={`${file.label} — ${item.title}`} fill unoptimized className="object-contain p-2 md:p-6" />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Credentials() {
  const [open, setOpen] = useState<Credential | null>(null);

  return (
    <section id="credentials" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading label={credentials.label} lines={credentials.headline} />

        <motion.ul
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {credentials.items.map((c) => (
            <motion.li
              key={c.title}
              variants={stagger.item}
              whileHover={{ y: -6 }}
              className="group card relative flex flex-col overflow-hidden p-6 transition-shadow duration-500 hover:shadow-lift"
            >
              <div aria-hidden className="absolute -top-16 -right-16 size-40 rounded-full bg-accent/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0" />
              <div className="relative flex items-start justify-between">
                <span className="font-mono text-sm text-muted">{c.number}</span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase ${
                    c.kind === "certification" ? "bg-ok/10 text-ok" : "bg-accent-soft text-accent"
                  }`}
                >
                  {c.kind === "certification" ? <BadgeCheck className="size-3" /> : <GraduationCap className="size-3" />}
                  {c.kind === "certification" ? "Certification" : "Training"}
                </span>
              </div>

              <div className="relative mt-6 flex items-center gap-2">
                {c.icons.map((ic) => (
                  <BrandTile key={ic} name={ic} size={22} />
                ))}
                {c.badges?.map((b, i) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setOpen(c)}
                    aria-label={`View ${c.title} badge ${i + 1}`}
                    className="relative size-10 overflow-hidden rounded-xl shadow-soft transition-transform hover:scale-110"
                  >
                    <Image src={b} alt="" fill sizes="40px" className="object-cover" />
                  </button>
                ))}
              </div>

              <h3 className="relative mt-5 font-display text-xl leading-snug font-semibold tracking-tight">{c.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">{c.detail}</p>

              {c.courses && c.courses.length > 0 && (
                <ul className="relative mt-4 grid gap-2.5 border-t border-line pt-4">
                  {c.courses.map((course) => (
                    <li key={course.name} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#1BA0D7]" />
                      <span className="text-[13px] leading-snug">
                        <span className="font-medium">{course.name}</span>
                        <span className="block font-mono text-[10.5px] text-muted">{course.note}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <ul className="relative mt-5 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <li key={t} className="rounded-full border border-line px-2 py-0.5 font-mono text-[10.5px] text-muted">
                    {t}
                  </li>
                ))}
              </ul>

              {(c.files.length > 0 || c.verifyUrl) && (
                <div className="relative mt-auto flex flex-wrap gap-2 pt-6">
                  {c.files.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setOpen(c)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-fg px-3.5 py-1.5 text-xs font-medium text-bg transition-opacity hover:opacity-90"
                    >
                      <Eye className="size-3.5" />
                      {c.files.length > 1 ? `View certificates (${c.files.length})` : "View certificate"}
                    </button>
                  )}
                  {c.verifyUrl && (
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium hover:border-fg/30"
                    >
                      Verify <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>
              )}
            </motion.li>
          ))}
        </motion.ul>

        <p className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-muted">
          <Info className="mt-px size-3.5 shrink-0" /> {credentials.note}
        </p>
      </div>

      <AnimatePresence>{open && open.files.length > 0 && <PreviewModal item={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
