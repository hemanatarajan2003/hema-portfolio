"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Smoothly scroll to an element id or to the top. Falls back to native scrolling. */
export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(typeof target === "string" ? `#${target}` : target, { offset: -84, duration: 1.2 });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger stays in sync.
 * Disabled entirely for users who prefer reduced motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -84 } });
    lenis = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // New route: jump to top (or to the hash target) and re-measure triggers.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const id = requestAnimationFrame(() => {
      if (hash && document.getElementById(hash)) {
        lenis?.scrollTo(`#${hash}`, { offset: -84, immediate: true });
      } else {
        lenis?.scrollTo(0, { immediate: true });
      }
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
