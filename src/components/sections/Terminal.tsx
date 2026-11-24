"use client";

import { useEffect, useRef, useState } from "react";
import { education, profile, projects } from "@/data/portfolio";

type Line = { kind: "in" | "out"; text: string };

const COMMANDS = ["help", "whoami", "about", "skills", "projects", "education", "contact", "status", "clear"] as const;

/** Predefined responses only — nothing is ever executed. */
function respond(cmd: string): string[] | "clear" {
  switch (cmd) {
    case "help":
      return ["Available commands:", "  " + COMMANDS.join("  ")];
    case "whoami":
      return [`${profile.name} — ${profile.title} & MCA Graduate`];
    case "about":
      return [
        "MCA graduate interested in software engineering, web,",
        "cloud computing and computer networking. Based in Chennai.",
      ];
    case "skills":
      return ["Python, C, HTML, CSS, JavaScript, AWS, MySQL, Linux, Networking, Git"];
    case "projects":
      return projects.map((p) => `[${p.number}] ${p.shortTitle} — ${p.category}`);
    case "education":
      return education.items.map((e) => `${e.period}  ${e.degree}, ${e.institution}`);
    case "contact":
      return [
        `email     ${profile.email}`,
        ...(profile.showPhone ? [`phone     ${profile.phone}`] : []),
        `location  ${profile.location}`,
        ...(profile.linkedin ? [`linkedin  ${profile.linkedin.replace("https://www.", "")}`] : []),
      ];
    case "status":
      return ["Open to career opportunities."];
    case "clear":
      return "clear";
    case "":
      return [];
    default:
      return [`command not found: ${cmd}`, "Type 'help' to see available commands."];
  }
}

const initial: Line[] = [
  { kind: "out", text: `Welcome to hema-sh. Type 'help' to begin.` },
  { kind: "in", text: "whoami" },
  { kind: "out", text: `${profile.name} — ${profile.title} & MCA Graduate` },
];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(initial);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const out = respond(cmd);
    if (out === "clear") setLines([]);
    else setLines((l) => [...l, { kind: "in", text: raw }, ...out.map((text) => ({ kind: "out" as const, text }))]);
    if (cmd) setHistory((h) => [cmd, ...h].slice(0, 30));
    setCursor(-1);
    setValue("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") run(value);
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (history[next]) {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(Math.max(next, -1));
      setValue(next >= 0 ? history[next] : "");
    } else if (e.key === "Tab") {
      const match = COMMANDS.find((c) => value && c.startsWith(value.toLowerCase()));
      if (match) {
        e.preventDefault();
        setValue(match);
      }
    }
  };

  return (
    <div className="flex h-full min-h-[380px] flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#121218] text-white shadow-lift">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#FF5F57]" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="size-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 font-mono text-[11px] text-white/45">hema@portfolio: ~</span>
      </div>
      <div
        ref={bodyRef}
        data-lenis-prevent
        onClick={() => inputRef.current?.focus()}
        className="flex-1 cursor-text overflow-y-auto p-4 font-mono text-[12.5px] leading-relaxed md:p-5"
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {lines.map((l, i) =>
          l.kind === "in" ? (
            <p key={i} className="mt-2 first:mt-0">
              <span className="text-[#4ADE80]">hema@portfolio</span>
              <span className="text-white/40">:~$ </span>
              {l.text}
            </p>
          ) : (
            <p key={i} className="break-words whitespace-pre-wrap text-white/70">
              {l.text}
            </p>
          ),
        )}
        <div className="mt-2 flex items-center">
          <label htmlFor="term-input" className="shrink-0">
            <span className="text-[#4ADE80]">hema@portfolio</span>
            <span className="text-white/40">:~$&nbsp;</span>
          </label>
          <input
            id="term-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Type a terminal command"
            className="min-w-0 flex-1 bg-transparent text-white caret-[#A78BFA] outline-none"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-white/10 p-3">
        {COMMANDS.filter((c) => c !== "help").map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            className="rounded-md bg-white/[0.06] px-2 py-1 font-mono text-[11px] text-white/70 transition-colors hover:bg-[#A78BFA]/25 hover:text-white"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
