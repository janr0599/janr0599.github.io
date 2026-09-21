import { stack } from "@/lib/content";
import { Item, Reveal } from "@/components/reveal";
import { ToolMark } from "@/components/tool-mark";

export function ArchitectureGrid() {
  return (
    <section id="architecture" className="mx-auto max-w-[1400px] px-4 py-28 sm:px-8 lg:py-40">
      <Reveal>
        <Item as="h2" index={0} className="text-balance max-w-[20ch] text-4xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
          Core architecture
        </Item>
        <Item as="p" index={1} className="mt-6 max-w-[60ch] text-lg leading-relaxed text-paper-2">
          Four layers. Each one is replaceable on its own, and none of them trusts the layer above it to be right.
        </Item>
      </Reveal>

      <Reveal as="ul" className="stack-grid mt-16 grid grid-cols-1 border-t border-rule md:grid-cols-2 lg:mt-24 lg:grid-cols-4">
        {stack.map((group, gi) => (
          <Item
            as="li"
            key={group.name}
            index={gi}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="text-2xl font-medium tracking-[-0.02em]">{group.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-paper-2">{group.summary}</p>
            </div>
            <dl className="flex flex-col gap-5">
              {group.items.map((it) => (
                <div key={it.name} className="grid grid-cols-[18px_1fr] gap-x-3">
                  <div className="pt-[3px]">
                    <ToolMark icon={it.icon} mark={it.mark} name={it.name} />
                  </div>
                  <div>
                    <dt className="text-[15px] font-medium">{it.name}</dt>
                    <dd className="mt-0.5 text-[13px] leading-snug text-paper-3">{it.role}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Item>
        ))}
      </Reveal>
    </section>
  );
}
