"use client";

import { useMemo, useRef } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { links, projects, type DiagramNode, type Project } from "@/lib/content";
import { Item, Reveal } from "@/components/reveal";

const NODE_W = 150;
const NODE_H = 44;
const X_SCALE = 1.25;
const NAV_REM = 4;
const TITLE_REM = 3;
const HEADER_REM = 3.75;
const CARD_REM = 30;

const px = (x: number) => Math.round(x * X_SCALE);

function edgePath(a: DiagramNode, b: DiagramNode) {
  const x1 = px(a.x) + NODE_W;
  const y1 = a.y + NODE_H / 2;
  const x2 = px(b.x);
  const y2 = b.y + NODE_H / 2;
  if (y1 === y2) return `M${x1} ${y1} L${x2} ${y2}`;
  const c = (x2 - x1) / 2;
  return `M${x1} ${y1} C ${x1 + c} ${y1}, ${x2 - c} ${y2}, ${x2} ${y2}`;
}

function strokeFor(kind: DiagramNode["kind"]) {
  if (kind === "ai") return "var(--color-accent)";
  if (kind === "human") return "var(--color-paper-2)";
  return "var(--color-rule-strong)";
}

/* Topological depth per node: roots are 0, each edge adds one. The beam runs depth by depth. */
function depths(project: Project) {
  const d: Record<string, number> = {};
  project.nodes.forEach((n) => (d[n.id] = 0));
  for (let pass = 0; pass < project.nodes.length; pass++) {
    for (const e of project.edges) d[e.to] = Math.max(d[e.to], d[e.from] + 1);
  }
  return d;
}

function Beam({ d, window, progress }: { d: string; window: [number, number]; progress: MotionValue<number> }) {
  const offset = useTransform(progress, window, [0.2, -1]);
  return (
    <motion.path
      d={d}
      pathLength={1}
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth={1.5}
      strokeDasharray="0.2 3"
      style={{ strokeDashoffset: offset }}
    />
  );
}

function NodeGlow({ n, window, progress }: { n: DiagramNode; window: [number, number]; progress: MotionValue<number> }) {
  const offset = useTransform(progress, window, [1, 0]);
  return (
    <motion.rect
      x={px(n.x)}
      y={n.y}
      width={NODE_W}
      height={NODE_H}
      pathLength={1}
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth={1.5}
      strokeDasharray="1 1"
      style={{ strokeDashoffset: offset }}
      pointerEvents="none"
    />
  );
}

function Diagram({ project, reduce, progress }: { project: Project; reduce: boolean; progress: MotionValue<number> }) {
  const byId = Object.fromEntries(project.nodes.map((n) => [n.id, n]));
  const width = px(Math.max(...project.nodes.map((n) => n.x))) + NODE_W + 40;
  const height = Math.max(...project.nodes.map((n) => n.y)) + NODE_H + 40;
  const depth = useMemo(() => depths(project), [project]);
  const levels = Math.max(...Object.values(depth)) + 1;
  const unit = 1 / levels;
  const nodeWindow = (id: string): [number, number] => [depth[id] * unit, depth[id] * unit + unit * 0.25];
  const edgeWindow = (from: string): [number, number] => [depth[from] * unit + unit * 0.25, (depth[from] + 1) * unit];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full min-w-[var(--dw)] lg:min-w-0"
      style={{ "--dw": `${Math.round(width * 0.8)}px` } as React.CSSProperties}
      role="group"
      aria-label={`${project.title} architecture`}
    >
      {project.edges.map((e) => {
        const a = byId[e.from];
        const b = byId[e.to];
        const d = edgePath(a, b);
        const mx = (px(a.x) + NODE_W + px(b.x)) / 2;
        const my = (a.y + b.y) / 2 + NODE_H / 2;
        return (
          <g key={`${e.from}-${e.to}`}>
            <path d={d} fill="none" stroke="var(--color-rule-strong)" strokeWidth={1} />
            {reduce ? null : <Beam d={d} window={edgeWindow(e.from)} progress={progress} />}
            {e.label ? (
              <text x={mx} y={my - 8} textAnchor="middle" fill="var(--color-paper-3)" fontSize={11} fontFamily="var(--font-mono)">
                {e.label}
              </text>
            ) : null}
          </g>
        );
      })}

      {project.nodes.map((n) => (
        <Tooltip.Root key={n.id}>
          <Tooltip.Trigger asChild>
            <motion.g
              tabIndex={0}
              role="button"
              aria-label={`${n.label}: ${n.detail}`}
              className="cursor-help outline-none focus-visible:[&>rect]:stroke-accent"
              whileHover={reduce ? undefined : { transform: "translateY(-2px)" }}
              transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
            >
              <rect
                x={px(n.x)}
                y={n.y}
                width={NODE_W}
                height={NODE_H}
                fill={n.kind === "ai" ? "var(--color-ink-3)" : "var(--color-ink-2)"}
                stroke={strokeFor(n.kind)}
                strokeWidth={1}
                strokeDasharray={n.kind === "human" ? "3 3" : undefined}
                style={{ transition: "stroke 160ms var(--ease-out)" }}
              />
              {reduce ? null : <NodeGlow n={n} window={nodeWindow(n.id)} progress={progress} />}
              <text x={px(n.x) + 12} y={n.y + NODE_H / 2 + 4} fill="var(--color-paper)" fontSize={12} fontFamily="var(--font-sans)" fontWeight={500}>
                {n.label}
              </text>
            </motion.g>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="top"
              sideOffset={8}
              collisionPadding={16}
              className="tooltip-content z-30 max-w-[28ch] border border-rule-strong bg-ink-3 px-3 py-2 text-[13px] leading-snug text-paper"
            >
              {n.detail}
              <Tooltip.Arrow className="fill-ink-3" width={10} height={5} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      ))}
    </svg>
  );
}

function ProjectCard({
  project,
  index,
  count,
  stackProgress,
  reduce,
}: {
  project: Project;
  index: number;
  count: number;
  stackProgress: MotionValue<number>;
  reduce: boolean;
}) {
  const slot = 1 / count;
  const beam = useTransform(stackProgress, [index * slot, (index + 1) * slot - slot * 0.15], [0, 1], { clamp: true });
  const covered = (index + 1) * slot;
  const opacity = useTransform(stackProgress, [covered - 0.06, covered + 0.02], [1, 0.35]);
  const last = index === count - 1;
  const top = NAV_REM + TITLE_REM + index * HEADER_REM;
  const minH = CARD_REM + (count - 1 - index) * HEADER_REM;

  return (
    <article
      className="stack-card border-t border-rule bg-ink lg:sticky"
      style={{ "--top": `${top}rem`, "--min-h": `${minH}rem` } as React.CSSProperties}
    >
      <motion.div className="stack-card-body" style={{ opacity: last || reduce ? 1 : opacity }}>
        <header className="flex min-h-[3.75rem] flex-col justify-center gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <h3 className="text-[17px] font-medium tracking-[-0.01em] sm:text-lg">{project.title}</h3>
          <p className="shrink-0 text-[13px] text-accent">{project.result}</p>
        </header>
        <div className="grid grid-cols-1 gap-10 pb-12 pt-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <p className="max-w-[40ch] text-[15px] leading-relaxed text-paper-2">{project.summary}</p>
            <ul className="mt-8 flex flex-col gap-2 text-[13px] text-paper-3">
              <li className="flex items-center gap-3">
                <span aria-hidden className="inline-block h-3 w-5 border border-accent bg-ink-3" />
                Model call
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden className="inline-block h-3 w-5 border border-rule-strong bg-ink-2" />
                Deterministic step or system of record
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden className="inline-block h-3 w-5 border border-dashed border-paper-2 bg-ink-2" />
                Human touchpoint
              </li>
            </ul>
          </div>
          <div className="overflow-x-auto lg:col-span-9">
            <Diagram project={project} reduce={reduce} progress={beam} />
          </div>
        </div>
      </motion.div>
    </article>
  );
}

export function ArchitectureDiagrams() {
  const reduce = useReducedMotion() ?? false;
  const stack = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stack, offset: ["start 55%", "end end"] });

  return (
    <section id="projects" className="border-t border-rule">
      <div className="mx-auto max-w-[1400px] px-4 pt-28 pb-12 sm:px-8 lg:pt-40 lg:pb-16">
        <Reveal>
          <Item as="h2" index={0} className="text-balance max-w-[18ch] text-4xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Interactive architecture diagrams
          </Item>
          <Item as="p" index={1} className="mt-6 max-w-[60ch] text-lg leading-relaxed text-paper-2">
            Four production systems, drawn as they run. Scroll to send a request through each one. Hover or focus a node to see what it does.
          </Item>
        </Reveal>

        <div className="mt-16 lg:mt-24">
          <div
            className="z-10 hidden h-12 items-center border-b border-rule bg-ink text-[13px] text-paper-2 lg:sticky lg:flex"
            style={{ top: `${NAV_REM}rem` }}
          >
            Interactive architecture diagrams
          </div>
          <Tooltip.Provider delayDuration={200} skipDelayDuration={600}>
            <div ref={stack}>
              {projects.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} count={projects.length} stackProgress={scrollYProgress} reduce={reduce} />
              ))}
            </div>
          </Tooltip.Provider>
        </div>

        {links.portfolioPdf ? (
          <div className="mt-12 border-t border-rule pt-8">
            <a
              href={links.portfolioPdf}
              className="pressable inline-flex items-center gap-2 text-[15px] font-medium underline decoration-accent underline-offset-4 hover:decoration-paper"
            >
              Download the PDF portfolio, with more projects and detail
              <ArrowUpRight size={16} weight="bold" aria-hidden />
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
