export const contact = {
  label: "Book a call",
  href: "https://calendar.app.google/JNtcqEEnykn7MLw7A",
};

export const links = {
  github: "https://github.com/janr0599",
  linkedin: "https://www.linkedin.com/in/janr0599/",
  cv: "/Javier-Noguera-CV.pdf",
};

export const proof: { src: string; alt: string; caption: string } | null = {
  src: "/grafana-stats.jpg",
  alt: "Grafana stat row for the client n8n instance: status up, 25 active workflows, 301 executions in 24 hours, 0 failed, 0% failure rate, 355 ms average execution time, 103 MB database",
  caption: "Grafana, one day on the client instance. Queries n8n's Postgres directly.",
};

export const figures = [
  { value: "25", label: "production workflows" },
  { value: "300-400", label: "runs per day" },
  { value: "0%", label: "failure rate" },
  { value: "40 s", label: "client onboarding, down from 40 min" },
];

export type StackGroup = {
  name: string;
  summary: string;
  items: { name: string; role: string; icon?: string; mark?: string }[];
};

export const stack: StackGroup[] = [
  {
    name: "Orchestration",
    summary: "Where the systems live. One isolated VM per client, versioned, monitored.",
    items: [
      { name: "n8n", icon: "n8n", role: "workflow engine, self-hosted" },
      { name: "Postgres", icon: "postgres", role: "execution store, queried in SQL" },
      { name: "Redis", icon: "redis", role: "message buffering for chat agents" },
      { name: "Grafana", icon: "grafana", role: "run counts, failures, latency" },
    ],
  },
  {
    name: "AI",
    summary: "Models do the reading and drafting. Deterministic code decides.",
    items: [
      { name: "OpenAI", mark: "O", role: "GPT models with structured JSON output" },
      { name: "LangChain agents", icon: "langchain", role: "tool calling, buffer-window memory" },
      { name: "Pinecone", mark: "P", role: "vector store for retrieval" },
      { name: "MCP", icon: "mcp", role: "tool servers for a voice agent" },
    ],
  },
  {
    name: "Systems of record",
    summary: "Every write is idempotent. Every record can be traced to the run that made it.",
    items: [
      { name: "Airtable", icon: "airtable", role: "CRM, leads, billing" },
      { name: "Microsoft 365", mark: "M", role: "Outlook triggers, SharePoint uploads" },
      { name: "Google Workspace", icon: "google", role: "Docs templating, Drive" },
      { name: "Clockify", icon: "clockify", role: "project and time setup" },
    ],
  },
  {
    name: "Infrastructure",
    summary: "Provisioned as code, rebuilt from a clean image, backed up nightly.",
    items: [
      { name: "Terraform", icon: "terraform", role: "provisioning as code" },
      { name: "Docker", icon: "docker", role: "one compose stack per client" },
      { name: "Linux", icon: "linux", role: "hardened Debian hosts" },
      { name: "AWS", mark: "A", role: "IAM Identity Center, SCP guardrails" },
    ],
  },
];

export type DiagramNode = {
  id: string;
  label: string;
  detail: string;
  x: number;
  y: number;
  kind: "trigger" | "logic" | "ai" | "system" | "human";
};

export type DiagramEdge = { from: string; to: string; label?: string };

export type Project = {
  slug: string;
  title: string;
  result: string;
  summary: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

export const projects: Project[] = [
  {
    slug: "onboarding",
    title: "Client onboarding",
    result: "40 minutes to 40 seconds",
    summary:
      "Sixty nodes replace a paralegal's checklist for a US immigration law firm. Thirty-three of them carry retry or error handling.",
    nodes: [
      { id: "trigger", label: "Airtable trigger", detail: "Fires when a lead is marked as signed.", x: 60, y: 160, kind: "trigger" },
      { id: "dedupe", label: "Dedupe", detail: "Checks existing clients before creating anything.", x: 220, y: 160, kind: "logic" },
      { id: "records", label: "Create records", detail: "Three linked records created in one idempotent pass.", x: 390, y: 80, kind: "system" },
      { id: "clockify", label: "Clockify", detail: "Project, tasks and rates set up in eleven nodes.", x: 390, y: 240, kind: "system" },
      { id: "template", label: "Pick template", detail: "Picks one of five document templates: NIW, EB1, I-130, O1 or generic.", x: 570, y: 160, kind: "logic" },
      { id: "sharepoint", label: "SharePoint", detail: "Chunked upload session, so large documents never time out.", x: 740, y: 160, kind: "system" },
      { id: "email", label: "Welcome email", detail: "Sent from the attorney's mailbox with the signed links.", x: 900, y: 160, kind: "human" },
    ],
    edges: [
      { from: "trigger", to: "dedupe" },
      { from: "dedupe", to: "records" },
      { from: "dedupe", to: "clockify" },
      { from: "records", to: "template" },
      { from: "clockify", to: "template" },
      { from: "template", to: "sharepoint" },
      { from: "sharepoint", to: "email" },
    ],
  },
  {
    slug: "intake",
    title: "WhatsApp intake agent",
    result: "Trilingual, with a human handoff",
    summary:
      "A production agent with tool calling and memory. A classifier detects when someone asks for a person and turns the bot off for that conversation.",
    nodes: [
      { id: "wa", label: "WhatsApp", detail: "Inbound messages over the YCloud API.", x: 60, y: 160, kind: "trigger" },
      { id: "redis", label: "Redis buffer", detail: "Rapid-fire messages batch into one turn before the model sees them.", x: 220, y: 160, kind: "logic" },
      { id: "classifier", label: "Handoff check", detail: "Detects 'I want a human' in English, Spanish or Portuguese.", x: 390, y: 160, kind: "ai" },
      { id: "agent", label: "Intake agent", detail: "LangChain agent, twenty-turn memory keyed by session, auto-fixing output parser.", x: 570, y: 80, kind: "ai" },
      { id: "human", label: "Hand to a human", detail: "State flag flips over HTTP and the team gets the thread.", x: 570, y: 240, kind: "human" },
      { id: "airtable", label: "Airtable tools", detail: "Create, search and update the lead from inside the agent.", x: 760, y: 40, kind: "system" },
      { id: "outlook", label: "Outlook tool", detail: "Sends the consultation email once a slot is agreed.", x: 760, y: 120, kind: "system" },
      { id: "reply", label: "Reply", detail: "Structured output rendered back into a WhatsApp message.", x: 900, y: 80, kind: "trigger" },
    ],
    edges: [
      { from: "wa", to: "redis" },
      { from: "redis", to: "classifier" },
      { from: "classifier", to: "agent", label: "continue" },
      { from: "classifier", to: "human", label: "handoff" },
      { from: "agent", to: "airtable" },
      { from: "agent", to: "outlook" },
      { from: "agent", to: "reply" },
    ],
  },
  {
    slug: "outbound",
    title: "Outbound research system",
    result: "Scrape to reply, six workflows",
    summary:
      "Built for a small automation agency. The model scores fit and drafts the email; deterministic code chooses the address and can overrule it.",
    nodes: [
      { id: "apify", label: "Weekly scrape", detail: "Google Maps via Apify, six practice areas across four states, deduped.", x: 60, y: 160, kind: "trigger" },
      { id: "fetch", label: "Site fetch", detail: "Finds contact and team pages from anchors, falls back to sitemap.xml.", x: 220, y: 160, kind: "logic" },
      { id: "score", label: "Score and draft", detail: "One structured-output call returns fit, best contact, hooks and a draft.", x: 390, y: 160, kind: "ai" },
      { id: "picker", label: "Email picker", detail: "Validates the model's pick; on failure a priority list decides and blocks generic inboxes.", x: 570, y: 160, kind: "logic" },
      { id: "sequencer", label: "Sequencer", detail: "Five touches in business hours. Stops on reply, unsubscribe or bounce.", x: 740, y: 160, kind: "system" },
      { id: "events", label: "Delivery events", detail: "Resend webhooks: delivered, opened, clicked, bounced, complained.", x: 900, y: 80, kind: "trigger" },
      { id: "replies", label: "Reply handler", detail: "Classifies intent and sentiment, routes the thread, suppresses the contact.", x: 900, y: 240, kind: "ai" },
    ],
    edges: [
      { from: "apify", to: "fetch" },
      { from: "fetch", to: "score" },
      { from: "score", to: "picker" },
      { from: "picker", to: "sequencer", label: "fit >= 60" },
      { from: "sequencer", to: "events" },
      { from: "sequencer", to: "replies" },
    ],
  },
  {
    slug: "evaluation",
    title: "Legal-AI parser evaluation",
    result: "51 to 93% fewer input tokens, 24 of 24 citations",
    summary:
      "Measured a citation parser instead of trusting it. The benchmark surfaced a defect the vendor confirmed.",
    nodes: [
      { id: "corpus", label: "Test corpus", detail: "Twenty-four real filings with known citations.", x: 60, y: 160, kind: "trigger" },
      { id: "baseline", label: "Baseline prompt", detail: "Full document sent to the model, tokens counted.", x: 260, y: 80, kind: "ai" },
      { id: "parser", label: "LexSelect parse", detail: "Parser extracts the citation spans before the model call.", x: 260, y: 240, kind: "logic" },
      { id: "compare", label: "Compare", detail: "Token counts and citation recall side by side per document.", x: 480, y: 160, kind: "logic" },
      { id: "defect", label: "Defect found", detail: "One span class was dropped consistently. Reported with reproduction.", x: 700, y: 80, kind: "human" },
      { id: "report", label: "Benchmark", detail: "51 to 93% input-token reduction, 24 of 24 citations preserved.", x: 700, y: 240, kind: "system" },
    ],
    edges: [
      { from: "corpus", to: "baseline" },
      { from: "corpus", to: "parser" },
      { from: "baseline", to: "compare" },
      { from: "parser", to: "compare" },
      { from: "compare", to: "defect" },
      { from: "compare", to: "report" },
    ],
  },
];
