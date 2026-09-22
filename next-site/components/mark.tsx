import { markSrc } from "@/lib/brand";

export function Mark({ size = 22 }: { size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={markSrc} alt="" width={size} height={size} className="block shrink-0" aria-hidden />;
}
