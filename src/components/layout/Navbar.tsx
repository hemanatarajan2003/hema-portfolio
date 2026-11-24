"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, FileText, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { Monogram } from "@/components/ui/Monogram";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track which section is in view.
  useEffect(() => {
    if (!onHome) return;
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on Escape; lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-3 rounded-full border px-2.5 pl-3 transition-all duration-500 md:h-16 md:px-3 md:pl-4",
          scrolled || open
            ? "border-line bg-card/80 shadow-soft backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href={onHome ? "#home" : "/"} className="flex items-center gap-2.5 rounded-full" aria-label="Hema N — home">
          <Monogram />
          <span className="font-display text-[15px] font-semibold tracking-tight">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = onHome && active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={href(link.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative block rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                    isActive ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-fg/[0.06] dark:bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5 md:gap-2">
          <ThemeToggle />
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 items-center gap-1.5 rounded-full border border-line bg-card px-3.5 text-[13px] font-medium transition-colors hover:border-fg/30 sm:inline-flex"
          >
            <FileText className="size-3.5" /> Resume
          </a>
          <a
            href={href("contact")}
            className="hidden h-9 items-center gap-1 rounded-full bg-fg px-4 text-[13px] font-medium text-bg transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Hire Me <ArrowUpRight className="size-3.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-full border border-line bg-card lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="card mx-auto mt-2 max-w-[1240px] origin-top p-3 lg:hidden"
          >
            <ul className="grid">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={href(link.id)}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg font-medium hover:bg-fg/5"
                  >
                    {link.label}
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-3">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-line text-sm font-medium"
              >
                <FileText className="size-4" /> Resume
              </a>
              <a
                href={href("contact")}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center gap-1 rounded-full bg-fg text-sm font-medium text-bg"
              >
                Hire Me <ArrowUpRight className="size-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
