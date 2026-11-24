import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, ImageOff, Info } from "lucide-react";
import { projects } from "@/data/portfolio";
import { ProjectIllustration } from "@/components/illustrations/ProjectVisuals";
import { ProjectCard } from "@/components/sections/Projects";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.shortTitle,
    description: p.description,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${p.title} — Hema N`, description: p.description, url: `/projects/${p.slug}` },
  };
}

function Block({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-line py-14 md:grid-cols-[260px_1fr] md:gap-12 md:py-20">
      <Reveal y={12}>
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      </Reveal>
      <Reveal delay={0.08}>{children}</Reveal>
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const related = projects.filter((x) => x.slug !== p.slug && x.slug !== next.slug).slice(0, 2);
  const { theme } = p;

  return (
    <article className="pt-28 md:pt-36">
      <div className="container-x">
        <Link href="/#projects" className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-fg">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" /> Back to portfolio
        </Link>

        {/* Header */}
        <header className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="rounded-full px-2.5 py-1 font-semibold" style={{ background: `${theme.accent}22`, color: theme.accent }}>
                Project {p.number}
              </span>
              <span className="text-muted">{p.category}</span>
            </div>
            <MaskLines
              as="h1"
              animateOnMount
              lines={[p.title]}
              className="mt-6 font-display text-[clamp(2.2rem,5.6vw,4.6rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance"
            />
          </div>
          <Reveal delay={0.2}>
            <p className="text-[16px] leading-relaxed text-muted md:text-lg">{p.description}</p>
            {(p.github || p.demo) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {p.github && (
                  <Button href={p.github} external variant="outline">
                    Source code <ArrowUpRight className="size-4" />
                  </Button>
                )}
                {p.demo && (
                  <Button href={p.demo} external>
                    Live demo <ArrowUpRight className="size-4" />
                  </Button>
                )}
              </div>
            )}
          </Reveal>
        </header>

        <Reveal delay={0.1} className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <li key={t} className="rounded-full border border-line bg-card px-3 py-1.5 font-mono text-xs">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Hero visual */}
        <Reveal delay={0.15} className="mt-12">
          <figure
            className={cn("relative overflow-hidden rounded-[2rem] border shadow-lift", theme.dark ? "border-white/10" : "border-black/5")}
            style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
          >
            <div className="mx-auto aspect-[16/10] max-w-4xl p-6 md:aspect-[16/8] md:p-10">
              <ProjectIllustration type={p.visual} />
            </div>
            <figcaption
              className={cn(
                "absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px]",
                theme.dark ? "bg-white/10 text-white/70" : "bg-white/70 text-black/60",
              )}
            >
              <Info className="size-3.5" /> Conceptual illustration — not a screenshot of the project
            </figcaption>
          </figure>
        </Reveal>

        {/* Body */}
        <div className="mt-10">
          <Block label="Overview" title="Project overview">
            <p className="max-w-2xl text-lg leading-relaxed">{p.overview}</p>
          </Block>

          <Block label="Objective" title="What it set out to do">
            <p className="max-w-2xl text-lg leading-relaxed">{p.objective}</p>
          </Block>

          <Block label="Concepts" title="Technical concepts">
            <ul className="grid gap-3 sm:grid-cols-2">
              {p.concepts.map((c) => (
                <li key={c.title} className="card p-5">
                  <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.text}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block label="Implementation" title="Implementation details">
            {p.implementation.length ? (
              <ol className="grid gap-3">
                {p.implementation.map((step, i) => (
                  <li key={step} className="flex items-start gap-4 rounded-2xl border border-line bg-card p-4">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="flex max-w-2xl items-start gap-2 rounded-2xl border border-dashed border-line p-5 text-muted">
                <Info className="mt-0.5 size-4 shrink-0" />
                Detailed implementation notes for this academic project haven&apos;t been published yet. The concepts above summarise its scope.
              </p>
            )}
          </Block>

          <Block label="Architecture" title="Concept flow">
            <ol className="flex flex-col gap-2 md:flex-row md:items-stretch">
              {p.flow.map((step, i) => (
                <li key={step} className="flex flex-1 flex-col items-stretch gap-2 md:flex-row md:items-center">
                  <div
                    className="flex flex-1 flex-col justify-between gap-6 rounded-2xl border p-4"
                    style={{ borderColor: `${theme.accent}55`, background: `${theme.accent}10` }}
                  >
                    <span className="font-mono text-[11px]" style={{ color: theme.accent }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display font-semibold">{step}</span>
                  </div>
                  {i < p.flow.length - 1 && (
                    <ArrowRight aria-hidden className="mx-auto size-4 shrink-0 rotate-90 text-muted md:rotate-0" />
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-muted">Simplified conceptual flow. It will be replaced with the original project diagram once it&apos;s added.</p>
          </Block>

          <Block label="Screenshots" title="Project screenshots">
            {p.screenshots.length ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {p.screenshots.map((s) => (
                  <div key={s.src} className="relative aspect-video overflow-hidden rounded-2xl border border-line">
                    <Image src={s.src} alt={s.alt} fill sizes="(min-width: 768px) 40vw, 90vw" className="object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid place-items-center gap-2 rounded-2xl border border-dashed border-line bg-card/50 px-6 py-12 text-center">
                <ImageOff className="size-6 text-muted" />
                <p className="font-medium">Screenshots coming soon</p>
                <p className="max-w-sm text-sm text-muted">
                  Original screenshots haven&apos;t been added yet. The visual above is a conceptual illustration.
                </p>
              </div>
            )}
          </Block>

          <Block label="Outcomes" title="Learning outcomes">
            <ul className="grid gap-3">
              {p.learning.map((l) => (
                <li key={l} className="flex items-start gap-3 text-lg">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-accent" />
                  {l}
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </div>

      {/* Next project */}
      <section className="mt-6 border-t border-line">
        <Link href={`/projects/${next.slug}`} className="group block">
          <div className="container-x flex flex-col gap-4 py-16 md:flex-row md:items-end md:justify-between md:py-24">
            <div>
              <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">Next project · {next.number}</p>
              <p className="mt-4 font-display text-[clamp(2rem,6vw,4.8rem)] leading-none font-semibold tracking-[-0.04em] transition-colors group-hover:text-accent">
                {next.shortTitle}
              </p>
            </div>
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-fg text-bg transition-transform duration-500 group-hover:-rotate-45 md:size-20">
              <ArrowRight className="size-6" />
            </span>
          </div>
        </Link>
      </section>

      {/* Related */}
      <section className="bg-subtle/60 py-16 md:py-24">
        <div className="container-x">
          <SectionLabel>Related projects</SectionLabel>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((r) => (
              <ProjectCard key={r.slug} project={r} compact />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/#projects" variant="outline">
              <ArrowLeft className="size-4" /> Back to all projects
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}
