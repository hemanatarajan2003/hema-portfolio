import type { ProjectVisual } from "@/data/portfolio";

/**
 * Conceptual illustrations for each project. They communicate the topic of the
 * project — they are NOT screenshots or diagrams of the delivered work.
 */

/* 01 — IoT malware detection: IoT devices → multitask neural network → outputs */
function MalwareVisual() {
  const layers = [
    [40, 80, 120, 160, 200],
    [60, 100, 140, 180],
    [60, 100, 140, 180],
  ];
  const xs = [150, 220, 290];
  const devices = [
    { y: 50, l: "CAM" },
    { y: 120, l: "HUB" },
    { y: 190, l: "SNSR" },
  ];
  const edges: string[] = [];
  layers.slice(0, -1).forEach((col, li) =>
    col.forEach((y1) => layers[li + 1].forEach((y2) => edges.push(`M${xs[li]} ${y1} L${xs[li + 1]} ${y2}`))),
  );
  return (
    <svg viewBox="0 0 440 240" className="h-full w-full" role="img" aria-label="Conceptual illustration: IoT devices feeding a multitask neural network">
      <defs>
        <radialGradient id="mw-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#A78BFA" stopOpacity=".35" />
          <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
        </radialGradient>
        <pattern id="mw-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#fff" strokeOpacity=".05" />
        </pattern>
      </defs>
      <rect width="440" height="240" fill="url(#mw-grid)" />
      <circle cx="220" cy="120" r="120" fill="url(#mw-glow)" />
      {edges.map((d) => (
        <path key={d} d={d} stroke="#A78BFA" strokeOpacity=".16" strokeWidth=".8" />
      ))}
      {devices.map((d, i) => (
        <g key={d.l}>
          <path id={`mw-in-${i}`} d={`M66 ${d.y} C110 ${d.y} 110 ${layers[0][i + 1]} 150 ${layers[0][i + 1]}`} fill="none" stroke="#22D3EE" strokeOpacity=".4" strokeDasharray="3 4" className="animate-dash" />
          <rect x="20" y={d.y - 16} width="46" height="32" rx="8" fill="#12182B" stroke="#22D3EE" strokeOpacity=".6" />
          <text x="43" y={d.y + 3.5} textAnchor="middle" fontSize="9" fill="#A5F3FC" fontFamily="var(--font-jetbrains)">
            {d.l}
          </text>
          <circle r="2.5" fill="#22D3EE">
            <animateMotion dur={`${1.8 + i * 0.4}s`} repeatCount="indefinite">
              <mpath href={`#mw-in-${i}`} />
            </animateMotion>
          </circle>
        </g>
      ))}
      {layers.map((col, li) =>
        col.map((y) => (
          <circle key={`${li}-${y}`} cx={xs[li]} cy={y} r="6" fill="#1B1540" stroke="#A78BFA" strokeWidth="1.4">
            <animate attributeName="fill-opacity" values="1;.4;1" dur={`${2 + ((y + li * 30) % 5) * 0.3}s`} repeatCount="indefinite" />
          </circle>
        )),
      )}
      {/* multitask heads */}
      {[
        { y: 82, l: "TASK A" },
        { y: 158, l: "TASK B" },
      ].map((h) => (
        <g key={h.l}>
          <path d={`M296 ${h.y < 120 ? 100 : 140} L340 ${h.y}`} stroke="#A78BFA" strokeOpacity=".5" />
          <rect x="340" y={h.y - 14} width="72" height="28" rx="14" fill="#A78BFA" fillOpacity=".12" stroke="#A78BFA" strokeOpacity=".7" />
          <text x="376" y={h.y + 3.5} textAnchor="middle" fontSize="9" fill="#DDD6FE" fontFamily="var(--font-jetbrains)">
            {h.l}
          </text>
        </g>
      ))}
      {/* shield */}
      <g transform="translate(362 196)">
        <path d="M14 0l14 5v9c0 9-6 15-14 18C6 29 0 23 0 14V5z" fill="#A78BFA" fillOpacity=".18" stroke="#A78BFA" />
        <path d="M8 15l4.5 4.5L21 11" stroke="#DDD6FE" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* 02 — IoT fire alarm: device → phone notification concept */
function FireVisual() {
  return (
    <div className="relative grid h-full w-full place-items-center">
      <svg viewBox="0 0 440 260" className="absolute inset-0 h-full w-full" aria-hidden>
        {/* connected device */}
        <g transform="translate(70 130)">
          {[34, 52, 70].map((r, i) => (
            <circle key={r} r={r} fill="none" stroke="#F2552C" strokeOpacity=".5">
              <animate attributeName="r" values={`${r - 14};${r + 10}`} dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values=".55;0" dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <circle r="26" fill="#fff" stroke="#F2552C" strokeOpacity=".35" />
          <path d="M0-12c5 6 9 9 9 15a9 9 0 1 1-18 0c0-4 2-6 4-8 0 3 2 4 3 4 0-4-1-7 2-11z" fill="#F2552C" />
        </g>
        <path d="M110 130 C170 130 190 120 250 120" fill="none" stroke="#F2552C" strokeOpacity=".5" strokeDasharray="4 5" className="animate-dash" />
      </svg>
      {/* phone */}
      <div className="relative ml-[38%] aspect-[9/17] h-[88%] rounded-[1.6rem] border-[5px] border-[#1d1d22] bg-[#1d1d22] shadow-lift">
        <div className="flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-gradient-to-b from-[#FFF4EC] to-white">
          <div className="mx-auto mt-1.5 h-1.5 w-10 rounded-full bg-[#1d1d22]" />
          <div className="mt-3 px-2.5 font-mono text-[8px] text-[#9a6b57]">SAFETY APP</div>
          <div className="mx-2 mt-2 animate-float rounded-xl border border-[#F2552C]/30 bg-white p-2 shadow-soft">
            <div className="flex items-center gap-1.5">
              <span className="grid size-4 place-items-center rounded-md bg-[#F2552C] text-[8px] text-white">!</span>
              <span className="text-[8.5px] font-semibold text-[#171717]">Fire alert</span>
            </div>
            <div className="mt-1.5 h-1 w-full rounded-full bg-[#F2552C]/20" />
            <div className="mt-1 h-1 w-2/3 rounded-full bg-[#F2552C]/15" />
          </div>
          <div className="mx-2 mt-2 grid grid-cols-2 gap-1.5">
            <div className="h-8 rounded-lg bg-[#F2552C]/10" />
            <div className="h-8 rounded-lg bg-[#FFB020]/15" />
          </div>
          <div className="mx-2 mt-auto mb-3 h-6 rounded-full bg-[#F2552C] text-center text-[8px] leading-6 font-semibold text-white">
            Alarm
          </div>
        </div>
      </div>
    </div>
  );
}

/* 03 — Enterprise network: router, core switch, VLAN segments */
function NetworkVisual() {
  const vlans = [
    { x: 30, c: "#0E7CC2", l: "VLAN 10" },
    { x: 165, c: "#06B6D4", l: "VLAN 20" },
    { x: 300, c: "#6366F1", l: "VLAN 30" },
  ];
  return (
    <svg viewBox="0 0 440 260" className="h-full w-full" role="img" aria-label="Conceptual enterprise network topology with VLAN segments">
      {vlans.map((v) => {
        const link = `M220 108 L${v.x + 55} 160`;
        return (
          <g key={v.l}>
            <path d={link} stroke={v.c} strokeOpacity=".6" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash" />
            <circle r="3" fill={v.c}>
              <animateMotion dur="2.2s" repeatCount="indefinite" path={link} />
            </circle>
            <rect x={v.x} y="160" width="110" height="80" rx="14" fill={v.c} fillOpacity=".07" stroke={v.c} strokeOpacity=".35" />
            <text x={v.x + 12} y="178" fontSize="9" fill={v.c} fontFamily="var(--font-jetbrains)" fontWeight="600">
              {v.l}
            </text>
            <rect x={v.x + 35} y="152" width="40" height="16" rx="4" fill="#fff" stroke={v.c} />
            {[0, 1, 2].map((p) => (
              <g key={p} transform={`translate(${v.x + 14 + p * 30} 196)`}>
                <path d="M15 -4 V0" stroke={v.c} strokeOpacity=".5" />
                <rect width="24" height="17" rx="3" fill="#fff" stroke={v.c} strokeWidth="1.3" />
                <path d="M7 24h10" stroke={v.c} strokeWidth="1.3" strokeLinecap="round" />
              </g>
            ))}
          </g>
        );
      })}
      {/* router to cloud */}
      <path d="M220 28 V58" stroke="#0E7CC2" strokeWidth="1.5" />
      <rect x="196" y="10" width="48" height="20" rx="10" fill="#fff" stroke="#0E7CC2" strokeOpacity=".5" />
      <text x="220" y="23.5" textAnchor="middle" fontSize="8" fill="#0E7CC2" fontFamily="var(--font-jetbrains)">WAN</text>
      <circle cx="220" cy="72" r="16" fill="#0E7CC2" />
      <path d="M212 72h16M220 64v16M214 66l12 12M226 66l-12 12" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M220 88 V98" stroke="#0E7CC2" strokeWidth="1.5" />
      <rect x="186" y="98" width="68" height="20" rx="5" fill="#fff" stroke="#0E7CC2" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4, 5].map((p) => (
        <rect key={p} x={194 + p * 9} y="105" width="5" height="5" rx="1" fill="#06B6D4" />
      ))}
    </svg>
  );
}

/* 04 — AWS: VPC with public/private subnets, ALB, ASG of EC2, NAT */
function AwsVisual() {
  const box = (x: number, y: number, w: number, l: string, sub?: string) => (
    <g>
      <rect x={x} y={y} width={w} height="34" rx="8" fill="#FF9900" fillOpacity=".12" stroke="#FF9900" />
      <text x={x + w / 2} y={y + (sub ? 15 : 21)} textAnchor="middle" fontSize="9.5" fontWeight="600" className="fill-[#232F3E]" fontFamily="var(--font-jetbrains)">
        {l}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + 26} textAnchor="middle" fontSize="7" fill="#8a6a3a" fontFamily="var(--font-jetbrains)">
          {sub}
        </text>
      )}
    </g>
  );
  const flows = ["M220 44 V66", "M220 100 L140 150", "M220 100 L300 150", "M140 184 V196 H90 V112", "M300 184 V196 H90"];
  return (
    <svg viewBox="0 0 440 260" className="h-full w-full" role="img" aria-label="Conceptual AWS architecture: VPC, load balancer, auto-scaled EC2 and NAT gateway">
      <rect x="20" y="54" width="400" height="196" rx="16" fill="#fff" fillOpacity=".6" stroke="#232F3E" strokeOpacity=".25" strokeDasharray="5 5" />
      <text x="34" y="72" fontSize="9" fill="#232F3E" fontFamily="var(--font-jetbrains)" fontWeight="600">VPC</text>
      <rect x="34" y="80" width="372" height="40" rx="10" fill="#22C55E" fillOpacity=".07" />
      <text x="300" y="104" fontSize="7.5" fill="#15803d" fontFamily="var(--font-jetbrains)">PUBLIC SUBNET</text>
      <rect x="34" y="130" width="372" height="110" rx="10" fill="#3B82F6" fillOpacity=".06" />
      <text x="330" y="232" fontSize="7.5" fill="#1d4ed8" fontFamily="var(--font-jetbrains)">PRIVATE SUBNET</text>
      <rect x="104" y="140" width="232" height="56" rx="12" fill="none" stroke="#FF9900" strokeOpacity=".55" strokeDasharray="3 3" />
      <text x="220" y="210" textAnchor="middle" fontSize="7.5" fill="#b45309" fontFamily="var(--font-jetbrains)">AUTO SCALING GROUP</text>
      {flows.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke="#FF9900" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash" />
          <circle r="2.8" fill="#FF9900">
            <animateMotion dur={`${2 + i * 0.25}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}
      {box(184, 10, 72, "Users")}
      {box(180, 66, 80, "Load Balancer")}
      {box(50, 84, 80, "NAT Gateway")}
      {box(110, 150, 60, "EC2", "instance")}
      {box(270, 150, 60, "EC2", "instance")}
      <g opacity=".5">{box(190, 150, 60, "EC2", "scale-out")}</g>
    </svg>
  );
}

export function ProjectIllustration({ type }: { type: ProjectVisual }) {
  switch (type) {
    case "malware":
      return <MalwareVisual />;
    case "fire":
      return <FireVisual />;
    case "network":
      return <NetworkVisual />;
    case "aws":
      return <AwsVisual />;
  }
}
