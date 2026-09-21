import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  icon?: boolean;
};

const base =
  "pressable inline-flex h-12 items-center gap-2 px-5 text-[15px] font-medium tracking-[-0.01em] whitespace-nowrap";

const variants = {
  primary: "bg-paper text-ink hover:bg-accent hover:text-ink",
  ghost: "border border-rule-strong text-paper hover:border-paper hover:bg-ink-3",
};

export function Button({ href, children, variant = "primary", external, icon = true }: Props) {
  const cls = `${base} ${variants[variant]}`;
  const isMail = href.startsWith("mailto:");
  if (external || isMail || /^https?:/.test(href)) {
    return (
      <a href={href} className={cls} target={isMail ? undefined : "_blank"} rel="noreferrer">
        {children}
        {icon ? <ArrowUpRight size={16} weight="bold" aria-hidden /> : null}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
