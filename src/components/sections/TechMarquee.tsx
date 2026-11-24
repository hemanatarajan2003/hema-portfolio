import { marquee } from "@/data/portfolio";
import { BrandIcon } from "@/components/ui/BrandIcon";

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-3 pr-3 md:gap-4 md:pr-4" aria-hidden={hidden || undefined}>
      {marquee.map((t) => (
        <li
          key={t.name}
          className="flex items-center gap-3 rounded-full border border-line bg-card py-2.5 pr-5 pl-2.5 shadow-soft transition-colors hover:border-fg/25"
        >
          <span className="grid size-9 place-items-center rounded-full bg-white dark:bg-white/95">
            <BrandIcon name={t.icon} size={22} decorative={hidden} />
          </span>
          <span className="font-display text-[15px] font-medium whitespace-nowrap">{t.name}</span>
        </li>
      ))}
    </ul>
  );
}

/** Seamless infinite logo marquee; pauses on hover; static & scrollable for reduced motion. */
export function TechMarquee() {
  return (
    <section aria-label="Technologies I work with" className="border-y border-line bg-subtle/60 py-6 md:py-8">
      <div className="group mask-fade-x flex overflow-hidden motion-reduce:overflow-x-auto">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
