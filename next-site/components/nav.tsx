import { contact } from "@/lib/content";

export function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-ink/90 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-8">
        <a href="#top" className="text-[15px] font-medium tracking-[-0.01em]">
          Javier Noguera
        </a>
        <ul className="flex items-center gap-6 text-[14px] text-paper-2">
          <li className="hidden sm:block">
            <a href="#architecture" className="pressable hover:text-paper">
              Architecture
            </a>
          </li>
          <li className="hidden sm:block">
            <a href="#projects" className="pressable hover:text-paper">
              Projects
            </a>
          </li>
          <li>
            <a href={contact.href} className="pressable text-paper underline decoration-accent hover:decoration-paper">
              {contact.label}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
