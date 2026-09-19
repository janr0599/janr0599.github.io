"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/button";
import Image from "next/image";
import { contact, figures, proof } from "@/lib/content";
import { Item, Reveal } from "@/components/reveal";

const topology = [
  { x: 40, y: 60, w: 150, label: "Outlook trigger" },
  { x: 40, y: 170, w: 150, label: "WhatsApp" },
  { x: 40, y: 280, w: 150, label: "Airtable" },
  { x: 290, y: 170, w: 170, label: "n8n, 25 workflows" },
  { x: 560, y: 60, w: 150, label: "Agent + memory" },
  { x: 560, y: 170, w: 150, label: "Postgres" },
  { x: 560, y: 280, w: 150, label: "SharePoint" },
];

const wires = [
  "M190 90 C 240 90, 240 200, 290 200",
  "M190 200 L 290 200",
  "M190 310 C 240 310, 240 200, 290 200",
  "M460 200 C 510 200, 510 90, 560 90",
  "M460 200 L 560 200",
  "M460 200 C 510 200, 510 310, 560 310",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const transform = useMotionTemplate`translateY(${y}px)`;

  return (
    <section ref={ref} id="top" className="mx-auto max-w-[1400px] px-4 sm:px-8">
      <div className="grid min-h-[calc(100dvh-4rem)] grid-cols-1 items-center gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <Reveal immediate className="lg:col-span-6">
          <Item
            as="h1"
            index={0}
            className="text-balance text-[clamp(2.75rem,6.4vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.03em]"
          >
            Automation that keeps running.
          </Item>
          <Item as="p" index={1} className="mt-8 max-w-[34ch] text-lg leading-relaxed text-paper-2 sm:text-xl">
            I design and operate n8n systems for a US immigration law firm: 25 workflows, 300 to 400 runs a day, zero failures.
          </Item>
          <Item index={2} className="mt-10 flex flex-wrap gap-3">
            <Button href={contact.href}>{contact.label}</Button>
            <Button href="#projects" variant="ghost">
              See the architecture
            </Button>
          </Item>
        </Reveal>

        <motion.div className="hidden md:block lg:col-span-6" style={{ transform }}>
          <Reveal immediate>
            <svg
              viewBox="0 0 750 370"
              role="img"
              aria-label="System topology: Outlook, WhatsApp and Airtable feed n8n, which drives an AI agent, Postgres and SharePoint"
              className="w-full"
            >
              {wires.map((d, i) => (
                <path
                  key={d}
                  d={d}
                  pathLength={1}
                  data-wire=""
                  style={{ "--i": i } as React.CSSProperties}
                  fill="none"
                  stroke="var(--color-rule-strong)"
                  strokeWidth={1}
                />
              ))}
              {wires.map((d, i) => (
                <path
                  key={`pulse-${d}`}
                  d={d}
                  pathLength={1}
                  data-pulse={i < 3 ? "in" : "out"}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth={1.5}
                  strokeLinecap="butt"
                />
              ))}
              {topology.map((n, i) => (
                <Item as="g" key={n.label} index={i + 2}>
                  <rect
                    x={n.x}
                    y={n.y}
                    width={n.w}
                    height={60}
                    fill={i === 3 ? "var(--color-ink-3)" : "var(--color-ink-2)"}
                    stroke={i === 3 ? "var(--color-accent)" : "var(--color-rule-strong)"}
                    strokeWidth={1}
                  />
                  <text
                    x={n.x + 16}
                    y={n.y + 35}
                    fill="var(--color-paper)"
                    fontSize={14}
                    fontFamily="var(--font-sans)"
                    fontWeight={500}
                  >
                    {n.label}
                  </text>
                </Item>
              ))}
            </svg>
          </Reveal>
        </motion.div>
      </div>

      <Reveal as="dl" amount={0.5} className="grid grid-cols-2 border-t border-rule md:grid-cols-4">
        {figures.map((f, i) => (
          <Item
            key={f.label}
            index={i}
            className="border-b border-rule py-6 pr-6 md:border-b-0 md:border-r md:last:border-r-0 md:[&:not(:first-child)]:pl-6"
          >
            <dd className="tabular font-mono text-2xl tracking-[-0.02em] text-paper sm:text-3xl">{f.value}</dd>
            <dt className="mt-2 text-sm leading-snug text-paper-2">{f.label}</dt>
          </Item>
        ))}
      </Reveal>
      {proof ? (
        <Reveal amount={0.5} className="border-t border-rule py-8">
          <Item index={0}>
            <figure>
              <Image
                src={proof.src}
                alt={proof.alt}
                width={1645}
                height={118}
                className="w-full border border-rule"
                sizes="(min-width: 1400px) 1336px, 100vw"
              />
              <figcaption className="mt-3 text-[13px] text-paper-3">{proof.caption}</figcaption>
            </figure>
          </Item>
        </Reveal>
      ) : null}
    </section>
  );
}
