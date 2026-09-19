"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "section" | "dl";
  amount?: number;
  immediate?: boolean;
};

export function Reveal({ children, className, as = "div", amount = 0.25, immediate = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount, margin: "0px 0px -10% 0px" });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const Tag = as as "div";
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      data-reveal=""
      data-inview={inView || (immediate && mounted) ? "" : undefined}
    >
      {children}
    </Tag>
  );
}

export function Item({
  children,
  className,
  as = "div",
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "h1" | "h2" | "p" | "g";
  index?: number;
}) {
  const Tag = as as "div";
  return (
    <Tag className={className} data-item="" style={{ "--i": index } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
