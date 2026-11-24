import Image from "next/image";
import type { IconKey } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const labels: Record<IconKey, string> = {
  python: "Python",
  c: "C",
  html: "HTML5",
  css: "CSS3",
  javascript: "JavaScript",
  aws: "Amazon Web Services",
  mysql: "MySQL",
  linux: "Linux",
  cisco: "Cisco",
  git: "Git",
  vscode: "Visual Studio Code",
  redhat: "Red Hat",
};

/** Official brand logo (from /public/icons) in its original colours. */
export function BrandIcon({
  name,
  size = 24,
  className,
  decorative = false,
}: {
  name: IconKey;
  size?: number;
  className?: string;
  decorative?: boolean;
}) {
  return (
    <Image
      src={`/icons/${name}.svg`}
      alt={decorative ? "" : labels[name]}
      width={size}
      height={size}
      unoptimized
      className={cn("shrink-0 object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}

/** Brand icon on a light tile so dark logos (AWS, Linux) stay legible in dark mode. */
export function BrandTile({
  name,
  size = 22,
  className,
}: {
  name: IconKey;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-grid place-items-center rounded-xl border border-line bg-white shadow-soft dark:border-white/10 dark:bg-white/95",
        className,
      )}
      style={{ width: size + 18, height: size + 18 }}
    >
      <BrandIcon name={name} size={size} />
    </span>
  );
}
