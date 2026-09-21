"use client";

import { useRef } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { links, projects, type DiagramNode, type Project } from "@/lib/content";
import { Item, Reveal } from "@/components/reveal";

const NODE_W = 150;
const NODE_H = 44;
const X_SCALE = 1.25;
const HEADER_REM = 3.75;
const NAV_REM = 4;

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

function Edge({
  d,
  index,
  count,
  progress,
  reduce,
}: {
  d: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const start = (index / count) * 0.6;
  const pathLength = useTransform(progress, [start, start + 0.4], [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="var(--color-rule-strong)"
      strokeWidth={1}
      style={reduce ? undefined : { pathLength }}
    />
  );
}

function Diagram({
  project,
  reduce,
  progress,
}: {
  project: Project;
  reduce: boolean;
  progress: MotionValue<number>;
}) {
  const byId = Object.fromEntries(project.nodes.map((n) => [n.id, n]));
  const width = px(Math.max(...project.nodes.map((n) => n.x))) + NODE_W + 40;
  const height = Math.max(...project.nodes.map((n) => n.y)) + NODE_H + 40;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full min-w-[var(--dw)] lg:min-w-0"
      style={{ "--dw": `${Math.round(width * 0.8)}px` } as React.CSSProperties}
      role="group"
      aria-label={`${project.title} architecture`}
    >
      {project.edges.map((e, i) => {
        const a = byId[e.from];
        const b = byId[e.to];
        const mx = (px(a.x) + NODE_W + px(b.x)) / 2;
        const my = (a.y + b.y) / 2 + NODE_H / 2;
        return (
          <g key={`${e.from}-${e.to}`}>
            <Edge
              d={edgePath(a, b)}
              index={i}
              count={project.edges.length}
              progress={progress}
              reduce={reduce}
            />
            {e.label ? (
              <text
                x={mx}
                y={my - 8}
                textAnchor="middle"
                fill="var(--color-paper-3)"
                fontSize={11}
                fontFamily="var(--font-mono)"
              >
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
              whileHover={
                reduce ? undefined : { transform: "translateY(-2px)" }
              }
              transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
            >
              <rect
                x={px(n.x)}
                y={n.y}
                width={NODE_W}
                height={NODE_H}
                fill={
                  n.kind === "ai" ? "var(--color-ink-3)" : "var(--color-ink-2)"
                }
                stroke={strokeFor(n.kind)}
                strokeWidth={n.kind === "ai" ? 1.5 : 1}
                strokeDasharray={n.kind === "human" ? "3 3" : undefined}
                style={{ transition: "stroke 160ms var(--ease-out)" }}
              />
              <text
                x={px(n.x) + 12}
                y={n.y + NODE_H / 2 + 4}
                fill="var(--color-paper)"
                fontSize={12}
                fontFamily="var(--font-sans)"
                fontWeight={500}
              >
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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 35%"],
  });
  const covered = (index + 1) / count;
  const opacity = useTransform(
    stackProgress,
    [covered - 0.08, covered + 0.02],
    [1, 0.35],
  );
  const last = index === count - 1;

  return (
    <article
      ref={ref}
      className="stack-card border-t border-rule bg-ink lg:sticky"
      style={
        { "--top": `${NAV_REM + index * HEADER_REM}rem` } as React.CSSProperties
      }
    >
      <motion.div
        className="stack-card-body"
        style={{ opacity: last || reduce ? 1 : opacity }}
      >
        <header className="flex min-h-[3.75rem] flex-col justify-center gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <h3 className="text-[17px] font-medium tracking-[-0.01em] sm:text-lg">
            {project.title}
          </h3>
          <p className="shrink-0 text-[13px] text-accent">{project.result}</p>
        </header>
        <div className="grid grid-cols-1 gap-10 pb-16 pt-4 lg:grid-cols-12 lg:gap-8 lg:pb-24">
          <div className="lg:col-span-3">
            <p className="max-w-[40ch] text-[15px] leading-relaxed text-paper-2">
              {project.summary}
            </p>
            <ul className="mt-8 flex flex-col gap-2 text-[13px] text-paper-3">
              <li className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-block h-3 w-5 border border-accent bg-ink-3"
                />
                Model call
              </li>
              <li className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-block h-3 w-5 border border-rule-strong bg-ink-2"
                />
                Deterministic step or system of record
              </li>
              <li className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-block h-3 w-5 border border-dashed border-paper-2 bg-ink-2"
                />
                Human touchpoint
              </li>
            </ul>
          </div>
          <div className="overflow-x-auto lg:col-span-9">
            <Diagram
              project={project}
              reduce={reduce}
              progress={scrollYProgress}
            />
          </div>
        </div>
      </motion.div>
    </article>
  );
}

export function ArchitectureDiagrams() {
  const reduce = useReducedMotion() ?? false;
  const stack = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stack,
    offset: ["start start", "end end"],
  });

  return (
    <section id="projects" className="border-t border-rule">
      <div className="mx-auto max-w-[1400px] px-4 py-28 sm:px-8 lg:py-40">
        <Reveal>
          <Item
            as="h2"
            index={0}
            className="text-balance max-w-[18ch] text-4xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl"
          >
            Interactive architecture diagrams
          </Item>
          <Item
            as="p"
            index={1}
            className="mt-6 max-w-[60ch] text-lg leading-relaxed text-paper-2"
          >
            Four production systems, drawn as they run. Keep scrolling to move
            through them. Hover or focus a node to see what it does and why it
            is there.
          </Item>
        </Reveal>

        <Tooltip.Provider delayDuration={200} skipDelayDuration={600}>
          <div ref={stack} className="mt-16 lg:mt-24">
            {projects.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={i}
                count={projects.length}
                stackProgress={scrollYProgress}
                reduce={reduce}
              />
            ))}
          </div>
        </Tooltip.Provider>

        {links.portfolioPdf ? (
          <div className="mt-16 border-t border-rule pt-8 lg:mt-24">
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
