import type { ExpertiseVisual } from "@/data/portfolio";
import { BrandIcon } from "@/components/ui/BrandIcon";

/* Shared window chrome */
function Chrome({ title, children, dark = false }: { title?: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={
        "flex h-full w-full flex-col overflow-hidden rounded-xl border shadow-soft " +
        (dark ? "border-white/10 bg-[#14141a] text-white" : "border-line bg-card")
      }
    >
      <div className={"flex items-center gap-1.5 border-b px-3 py-2 " + (dark ? "border-white/10" : "border-line")}>
        <span className="size-2 rounded-full bg-[#FF5F57]" />
        <span className="size-2 rounded-full bg-[#FEBC2E]" />
        <span className="size-2 rounded-full bg-[#28C840]" />
        {title && <span className="ml-2 truncate font-mono text-[10px] opacity-60">{title}</span>}
      </div>
      <div className="relative flex-1">{children}</div>
    </div>
  );
}

function CodeEditor() {
  const k = "text-[#C792EA]";
  const f = "text-[#82AAFF]";
  const s = "text-[#C3E88D]";
  const c = "text-white/35";
  return (
    <Chrome title="solution.py" dark>
      <pre className="p-3.5 font-mono text-[11px] leading-[1.75] text-white/85">
        <code>
          <span className={c}># break problems into small steps</span>
          {"\n"}
          <span className={k}>def</span> <span className={f}>solve</span>(problem):{"\n"}
          {"    "}steps = <span className={f}>plan</span>(problem){"\n"}
          {"    "}
          <span className={k}>for</span> step <span className={k}>in</span> steps:{"\n"}
          {"        "}step.<span className={f}>run</span>(){"\n"}
          {"    "}
          <span className={k}>return</span> <span className={s}>&quot;solved&quot;</span>
          <span className="ml-0.5 inline-block h-3.5 w-[6px] translate-y-0.5 animate-blink bg-[#A78BFA]" />
        </code>
      </pre>
      <BrandIcon name="python" size={30} decorative className="absolute right-3 bottom-3 opacity-90" />
    </Chrome>
  );
}

function BrowserMock() {
  return (
    <Chrome>
      <div className="flex items-center gap-2 border-b border-line px-3 py-1.5">
        <div className="h-4 flex-1 rounded-full bg-subtle" />
      </div>
      <div className="grid gap-2 p-3">
        <div className="h-2.5 w-2/3 rounded-full bg-fg/15" />
        <div className="h-2 w-5/6 rounded-full bg-fg/[0.07]" />
        <div className="mt-1 grid grid-cols-3 gap-2">
          {(["html", "css", "javascript"] as const).map((n, i) => (
            <div
              key={n}
              className="grid aspect-[4/3] place-items-center rounded-lg border border-line bg-subtle transition-transform duration-500 group-hover:-translate-y-1"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <BrandIcon name={n} size={26} decorative />
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

function CloudDiagram() {
  return (
    <svg viewBox="0 0 280 170" className="h-full w-full" role="img" aria-label="Conceptual cloud infrastructure diagram">
      <rect x="62" y="44" width="206" height="116" rx="12" fill="none" stroke="#FF9900" strokeOpacity=".55" strokeDasharray="4 4" />
      <text x="72" y="60" className="fill-muted font-mono" fontSize="8">VPC</text>
      {/* user / internet */}
      <g>
        <circle cx="28" cy="100" r="15" className="fill-card stroke-line" strokeWidth="1" />
        <path d="M21 101a7 7 0 0 1 6.5-7 5 5 0 0 1 9.2 2.4A4 4 0 0 1 36 104H22.5" fill="none" className="stroke-fg" strokeWidth="1.3" />
      </g>
      {[
        "M43 100 H92",
        "M128 100 L170 76",
        "M128 100 L170 124",
        "M206 76 H230 V100",
        "M206 124 H230 V100",
      ].map((d) => (
        <path key={d} d={d} fill="none" stroke="#FF9900" strokeWidth="1.4" strokeDasharray="4 4" className="animate-dash" />
      ))}
      {[
        { x: 92, y: 86, l: "ELB" },
        { x: 170, y: 62, l: "EC2" },
        { x: 170, y: 110, l: "EC2" },
        { x: 222, y: 92, l: "NAT", w: 34 },
      ].map((n) => (
        <g key={`${n.l}${n.y}`}>
          <rect x={n.x} y={n.y} width={n.w ?? 36} height="28" rx="7" fill="#FF9900" fillOpacity=".12" stroke="#FF9900" />
          <text x={n.x + (n.w ?? 36) / 2} y={n.y + 17.5} textAnchor="middle" fontSize="9" className="fill-fg font-mono" fontWeight="600">
            {n.l}
          </text>
        </g>
      ))}
      <text x="188" y="152" textAnchor="middle" className="fill-muted font-mono" fontSize="7.5">AUTO SCALING</text>
      <rect x="162" y="56" width="52" height="88" rx="9" fill="none" stroke="#FF9900" strokeOpacity=".35" />
    </svg>
  );
}

function NetworkTopology() {
  const pcs = [
    { x: 30, y: 140, c: "#0EA5E9" },
    { x: 90, y: 140, c: "#0EA5E9" },
    { x: 190, y: 140, c: "#7856E8" },
    { x: 250, y: 140, c: "#7856E8" },
  ];
  return (
    <svg viewBox="0 0 280 170" className="h-full w-full" role="img" aria-label="Conceptual network topology">
      <rect x="10" y="118" width="110" height="44" rx="10" fill="#0EA5E9" fillOpacity=".08" />
      <rect x="170" y="118" width="100" height="44" rx="10" fill="#7856E8" fillOpacity=".08" />
      <text x="16" y="114" fontSize="7.5" className="fill-muted font-mono">VLAN 10</text>
      <text x="176" y="114" fontSize="7.5" className="fill-muted font-mono">VLAN 20</text>
      {["M140 32 L60 82", "M140 32 L220 82", "M60 82 L30 140", "M60 82 L90 140", "M220 82 L190 140", "M220 82 L250 140"].map(
        (d, i) => (
          <g key={d}>
            <path d={d} className="stroke-line" strokeWidth="1.5" />
            <circle r="2.6" fill={i % 2 ? "#7856E8" : "#0EA5E9"}>
              <animateMotion dur={`${2.2 + i * 0.3}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        ),
      )}
      {/* router */}
      <circle cx="140" cy="32" r="16" fill="#1BA0D7" />
      <path d="M132 32h16M140 24v16M134 26l12 12M146 26l-12 12" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
      {/* switches */}
      {[60, 220].map((x) => (
        <g key={x}>
          <rect x={x - 20} y="72" width="40" height="20" rx="5" className="fill-card" stroke="#1BA0D7" strokeWidth="1.4" />
          {[0, 1, 2, 3].map((p) => (
            <rect key={p} x={x - 13 + p * 7} y="80" width="4" height="4" rx="1" fill="#1BA0D7" />
          ))}
        </g>
      ))}
      {pcs.map((p) => (
        <g key={p.x}>
          <rect x={p.x - 11} y={p.y - 6} width="22" height="15" rx="3" className="fill-card" stroke={p.c} strokeWidth="1.4" />
          <path d={`M${p.x - 5} ${p.y + 13}h10`} stroke={p.c} strokeWidth="1.4" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

function DatabaseVisual() {
  return (
    <div className="flex h-full items-center gap-4 px-2">
      <svg viewBox="0 0 80 100" className="h-[78%] shrink-0" aria-hidden>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0 ${i * 26})`}>
            <path d="M6 18v16c0 5 15 9 34 9s34-4 34-9V18" fill="#00758F" fillOpacity={0.12 + i * 0.08} stroke="#00758F" strokeWidth="1.4" />
            <ellipse cx="40" cy="18" rx="34" ry="9" fill="#F29111" fillOpacity={i === 0 ? 0.9 : 0.25} stroke="#00758F" strokeWidth="1.4" />
          </g>
        ))}
      </svg>
      <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-line bg-card font-mono text-[10px]">
        <div className="grid grid-cols-[2fr_3fr] border-b border-line bg-subtle px-2 py-1.5 text-muted">
          <span>id</span>
          <span>name</span>
        </div>
        {["01", "02", "03", "04"].map((id, i) => (
          <div
            key={id}
            className="grid grid-cols-[2fr_3fr] border-b border-line/70 px-2 py-1.5 last:border-0 transition-colors duration-300 group-hover:bg-[#00758F]/[0.06]"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <span className="text-[#00758F]">{id}</span>
            <span className="h-1.5 self-center rounded-full bg-fg/15" style={{ width: `${55 + ((i * 17) % 40)}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function LinuxTerminal() {
  return (
    <Chrome title="hema@linux: ~" dark>
      <div className="space-y-1 p-3.5 font-mono text-[11px] leading-relaxed">
        <p>
          <span className="text-[#4ADE80]">hema@linux</span>
          <span className="text-white/40">:~$</span> uname -s
        </p>
        <p className="text-white/70">Linux</p>
        <p>
          <span className="text-[#4ADE80]">hema@linux</span>
          <span className="text-white/40">:~$</span> git --version
        </p>
        <p className="text-white/70">git version 2.x</p>
        <p>
          <span className="text-[#4ADE80]">hema@linux</span>
          <span className="text-white/40">:~$</span> code .
          <span className="ml-0.5 inline-block h-3 w-[6px] translate-y-0.5 animate-blink bg-white/80" />
        </p>
      </div>
      <div className="absolute right-3 bottom-3 flex gap-1.5 rounded-lg bg-white p-1.5">
        <BrandIcon name="linux" size={20} decorative />
        <BrandIcon name="git" size={20} decorative />
        <BrandIcon name="vscode" size={20} decorative />
      </div>
    </Chrome>
  );
}

export function ExpertiseIllustration({ type }: { type: ExpertiseVisual }) {
  switch (type) {
    case "code":
      return <CodeEditor />;
    case "browser":
      return <BrowserMock />;
    case "cloud":
      return <CloudDiagram />;
    case "network":
      return <NetworkTopology />;
    case "database":
      return <DatabaseVisual />;
    case "terminal":
      return <LinuxTerminal />;
  }
}
