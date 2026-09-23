import * as si from "simple-icons";

type Icon = { path: string; title: string };

const icons: Record<string, Icon | undefined> = {
  n8n: si.siN8n,
  make: si.siMake,
  claude: si.siClaude,
  postgres: si.siPostgresql,
  redis: si.siRedis,
  grafana: si.siGrafana,
  langchain: si.siLangchain,
  mcp: si.siModelcontextprotocol,
  airtable: si.siAirtable,
  google: si.siGoogle,
  clockify: si.siClockify,
  terraform: si.siTerraform,
  docker: si.siDocker,
  linux: si.siLinux,
};

const masks: Record<string, string> = {
  openai: "/marks/openai.svg",
  monday: "/marks/monday.svg",
  zapier: "/marks/zapier.svg",
  microsoft: "/marks/microsoft.svg",
  pinecone: "/marks/pinecone.svg",
  aws: "/marks/aws.svg",
};

export function ToolMark({ icon, mark, name }: { icon?: string; mark?: string; name: string }) {
  const masked = icon ? masks[icon] : undefined;
  if (masked) {
    return (
      <span
        aria-hidden
        className="block h-[18px] w-[18px] shrink-0 bg-paper-2"
        style={{
          maskImage: `url(${masked})`,
          WebkitMaskImage: `url(${masked})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
    );
  }
  const found = icon ? icons[icon] : undefined;
  if (found) {
    return (
      <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden className="shrink-0 fill-paper-2">
        <path d={found.path} />
      </svg>
    );
  }
  return (
    <span
      aria-hidden
      className="flex h-[18px] w-[18px] shrink-0 items-center justify-center border border-paper-3 font-mono text-[10px] leading-none text-paper-2"
      title={name}
    >
      {mark ?? name[0]}
    </span>
  );
}
