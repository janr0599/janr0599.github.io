"use client";

import { useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import * as Tooltip from "@radix-ui/react-tooltip";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { projects, type DiagramEdge, type DiagramNode, type Project } from "@/lib/content";
import { Item, Reveal } from "@/components/reveal";
import { easeOut } from "@/lib/motion";

const NODE_W = 150;
const NODE_H = 44;
const X_SCALE = 1.25;

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
      className="w-full"
      style={{ minWidth: Math.round(width * 0.8) }}
      role="group"
      aria-label={`${project.title} architecture`}
    >
      {project.edges.map((e: DiagramEdge, i) => {
        const a = byId[e.from];
        const b = byId[e.to];
        const d = edgePath(a, b);
        const mx = (px(a.x) + NODE_W + px(b.x)) / 2;
        const my = (a.y + b.y) / 2 + NODE_H / 2;
        return (
          <g key={`${e.from}-${e.to}`}>
            <Edge d={d} index={i} count={project.edges.length} progress={progress} reduce={reduce} />
            {e.label ? (
              <motion.text
                x={mx}
                y={my - 8}
                textAnchor="middle"
                fill="var(--color-paper-3)"
                fontSize={11}
                fontFamily="var(--font-mono)"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: easeOut, delay: 0.4 + i * 0.05 }}
              >
                {e.label}
              </motion.text>
            ) : null}
          </g>
        );
      })}

      {project.nodes.map((n, i) => (
        <Tooltip.Root key={n.id}>
          <Tooltip.Trigger asChild>
            <motion.g
              tabIndex={0}
              role="button"
              aria-label={`${n.label}: ${n.detail}`}
              className="cursor-help outline-none focus-visible:[&>rect]:stroke-accent"
              initial={reduce ? false : { opacity: 0, transform: "translateY(6px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.05 + i * 0.05 }}
              whileHover={reduce ? undefined : { transform: "translateY(-2px)" }}
            >
              <rect
                x={px(n.x)}
                y={n.y}
                width={NODE_W}
                height={NODE_H}
                fill={n.kind === "ai" ? "var(--color-ink-3)" : "var(--color-ink-2)"}
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

export function ArchitectureDiagrams() {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(projects[0].slug);
  const current = projects.find((p) => p.slug === active) ?? projects[0];
  const stage = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start 90%", "end 60%"] });

  return (
    <section id="projects" className="border-t border-rule">
      <div className="mx-auto max-w-[1400px] px-4 py-28 sm:px-8 lg:py-40">
        <Reveal>
          <Item as="h2" index={0} className="text-balance max-w-[18ch] text-4xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Interactive architecture diagrams
          </Item>
          <Item as="p" index={1} className="mt-6 max-w-[60ch] text-lg leading-relaxed text-paper-2">
            Four production systems, drawn as they run. Hover or focus a node to see what it does and why it is there.
          </Item>
        </Reveal>

        <Tooltip.Provider delayDuration={200} skipDelayDuration={600}>
          <Tabs.Root value={active} onValueChange={setActive} className="mt-16 lg:mt-24">
            <Tabs.List
              aria-label="Projects"
              className="grid grid-cols-1 border-t border-rule sm:grid-cols-2 lg:grid-cols-4"
            >
              {projects.map((p) => (
                <Tabs.Trigger
                  key={p.slug}
                  value={p.slug}
                  className={[
                    "pressable group relative flex flex-col items-start gap-1 border-b border-rule px-0 py-5 text-left",
                    "sm:border-r sm:pr-6 sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:pl-6",
                    "lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(2n)]:pl-0 lg:[&:not(:first-child)]:pl-6 lg:last:border-r-0",
                    "text-paper-2 hover:text-paper data-[state=active]:text-paper",
                  ].join(" ")}
                >
                  <span className="text-[17px] font-medium tracking-[-0.01em]">{p.title}</span>
                  <span className="text-[13px] text-paper-3 group-data-[state=active]:text-accent">{p.result}</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-200 ease-[var(--ease-out)] group-data-[state=active]:scale-x-100"
                  />
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={current.slug}
                    className="max-w-[40ch] text-[15px] leading-relaxed text-paper-2"
                    initial={reduce ? false : { opacity: 0, transform: "translateY(6px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0, transition: { duration: 0.12, ease: easeOut } }}
                    transition={{ duration: 0.3, ease: easeOut }}
                  >
                    {current.summary}
                  </motion.p>
                </AnimatePresence>
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

              <div ref={stage} className="lg:col-span-9">
                {projects.map((p) => (
                  <Tabs.Content key={p.slug} value={p.slug} forceMount className="data-[state=inactive]:hidden">
                    {p.slug === active ? (
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={p.slug}
                          initial={reduce ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, transition: { duration: 0.12, ease: easeOut } }}
                          transition={{ duration: 0.25, ease: easeOut }}
                          className="overflow-x-auto"
                        >
                          <Diagram project={p} reduce={reduce} progress={scrollYProgress} />
                        </motion.div>
                      </AnimatePresence>
                    ) : null}
                  </Tabs.Content>
                ))}
              </div>
            </div>
          </Tabs.Root>
        </Tooltip.Provider>
      </div>
    </section>
  );
}
