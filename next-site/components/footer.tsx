import Image from "next/image";
import { Button } from "@/components/button";
import { contact, links } from "@/lib/content";
import { Item, Reveal } from "@/components/reveal";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-rule">
      <div className="mx-auto max-w-[1400px] px-4 pt-20 pb-16 sm:px-8 lg:pt-24 lg:pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <Item as="h2" index={0} className="text-balance max-w-[16ch] text-4xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Let&apos;s build something that keeps running.
            </Item>
            <Item as="p" index={1} className="mt-6 max-w-[52ch] text-lg leading-relaxed text-paper-2">
              Thirty minutes, your process, and an honest answer on whether automation is the right fix.
            </Item>
            <Item index={2} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={contact.href}>{contact.label}</Button>
              <a href={contact.emailHref} className="pressable text-[15px] text-paper-2 underline decoration-rule-strong underline-offset-4 hover:text-paper hover:decoration-paper">
                {contact.email}
              </a>
            </Item>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <Item index={1}>
              <Image
                src="/javier.jpg"
                alt="Javier Noguera Rodriguez"
                width={900}
                height={1000}
                className="w-full max-w-[320px] border border-rule lg:max-w-none"
                sizes="(min-width: 1024px) 400px, 320px"
              />
            </Item>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 border-t border-rule pt-8 text-[14px] text-paper-3 sm:grid-cols-2 lg:mt-28">
          <p>Javier Noguera Rodriguez. Automation engineer.</p>
          <ul className="flex gap-6 sm:justify-end">
            <li>
              <a href={links.github} className="pressable hover:text-paper" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={links.linkedin} className="pressable hover:text-paper" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={links.cv} target="_blank" rel="noreferrer" className="pressable hover:text-paper">
                CV
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
