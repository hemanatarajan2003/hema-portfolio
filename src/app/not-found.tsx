import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[80dvh] place-items-center pt-28 pb-16 text-center">
      <div>
        <p className="font-mono text-sm text-accent">$ cd ./this-page</p>
        <p className="mt-1 font-mono text-sm text-muted">bash: cd: no such file or directory</p>
        <h1 className="mt-8 font-display text-[clamp(5rem,18vw,11rem)] leading-none font-bold tracking-[-0.06em]">404</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link
          href="/"
          className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="size-4" /> Back to portfolio
        </Link>
      </div>
    </section>
  );
}
