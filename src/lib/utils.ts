import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about the custom design-token colours so overrides resolve correctly.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: ["bg", "subtle", "fg", "muted", "accent", "accent-soft", "card", "line", "ok"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
