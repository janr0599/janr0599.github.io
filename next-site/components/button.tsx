import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
};

const base =
  "pressable inline-flex h-12 items-center gap-2 px-5 text-[15px] font-medium tracking-[-0.01em] whitespace-nowrap";

const variants = {
  primary: "bg-paper text-ink hover:bg-accent hover:text-ink",
  ghost: "border border-rule-strong text-paper hover:border-paper hover:bg-ink-3",
};

export function Button({ href, children, variant = "primary", external }: Props) {
  const cls = `${base} ${variants[variant]}`;
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
        {children}
        <ArrowUpRight size={16} weight="bold" aria-hidden />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
