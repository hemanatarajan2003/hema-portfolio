"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { navLinks, profile, site } from "@/data/portfolio";
import { Monogram } from "@/components/ui/Monogram";
import { telHref } from "@/lib/utils";
import { scrollToTarget } from "./SmoothScroll";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="container-x grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
        <div>
          <div className="flex items-center gap-3">
            <Monogram className="size-11 text-sm" />
            <div>
              <p className="font-display text-lg font-semibold leading-tight">{profile.name}</p>
              <p className="text-sm text-muted">{profile.title}</p>
            </div>
          </div>
          <p className="mt-6 max-w-xs font-display text-2xl font-medium leading-snug tracking-tight text-balance">
            {site.closing}
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Navigate</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}>
                <Link href={`/#${l.id}`} className="text-fg/80 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Contact</p>
          <ul className="mt-4 grid gap-2.5 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="break-all text-fg/80 hover:text-accent">
                {profile.email}
              </a>
            </li>
            {profile.showPhone && (
              <li>
                <a href={telHref(profile.phone)} className="text-fg/80 hover:text-accent">
                  {profile.phone}
                </a>
              </li>
            )}
            <li className="text-fg/80">{profile.location}</li>
            {profile.linkedin && (
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-fg/80 hover:text-accent">
                  LinkedIn ↗
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col items-start justify-between gap-4 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center">
        <p suppressHydrationWarning>
          © {year} {profile.name}. All rights reserved.
        </p>
        <button
          type="button"
          onClick={() => scrollToTarget(0)}
          className="group inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 font-medium text-fg transition-colors hover:border-fg/30"
        >
          Back to top
          <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
