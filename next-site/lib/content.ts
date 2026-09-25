export const contact = {
  label: "Book a call",
  href: "https://calendar.app.google/JNtcqEEnykn7MLw7A",
  email: "javiernr0599@gmail.com",
  emailHref: "mailto:javiernr0599@gmail.com?subject=Automation%20project",
};

export const links = {
  github: "https://github.com/janr0599",
  linkedin: "https://www.linkedin.com/in/javier-noguera-rodriguez/",
  cv: "/Javier-Noguera-CV.pdf",
  portfolioPdf: "/Javier-Noguera-Automation-Case-Studies.pdf" as string | null,
};

export const figuresNote =
  "Measured on a production environment I built for a client. Running today.";

export const figures = [
  { value: "25", label: "automated processes running in production" },
  { value: "300-400", label: "tasks completed a day, no person involved" },
  { value: "0%", label: "of those tasks failed" },
  { value: "40 s", label: "to onboard a new client, down from 40 min" },
];

export type StackGroup = {
  name: string;
  summary: string;
  items: { name: string; role: string; icon?: string; mark?: string }[];
};

export const stack: StackGroup[] = [
  {
    name: "Orchestration",
    summary:
      "Where the automations run. Self-hosted where it needs control, SaaS where it doesn't.",
    items: [
      { name: "n8n", icon: "n8n", role: "workflow engine, self-hosted" },
      { name: "Make", icon: "make", role: "hosted scenario builder, routers and branching" },
      { name: "Zapier", icon: "zapier", role: "hosted trigger-action automation" },
      { name: "Postgres", icon: "postgres", role: "execution store, queried in SQL" },
      { name: "Redis", icon: "redis", role: "message buffering for chat agents" },
    ],
  },
  {
    name: "AI",
    summary: "Models do the reading and drafting. Deterministic code decides.",
    items: [
      { name: "Claude", icon: "claude", role: "Anthropic API, and Claude Code for build work" },
      { name: "OpenAI", icon: "openai", role: "GPT models with structured JSON output" },
      { name: "LangChain agents", icon: "langchain", role: "tool calling, buffer-window memory" },
      { name: "Pinecone", icon: "pinecone", role: "vector store for retrieval" },
      { name: "MCP", icon: "mcp", role: "open protocol for exposing tools to models" },
    ],
  },
  {
    name: "Systems of record",
    summary: "Every write is idempotent. Every record can be traced to the run that made it.",
    items: [
      { name: "Airtable", icon: "airtable", role: "CRM, leads, billing" },
      { name: "Microsoft 365", icon: "microsoft", role: "Outlook triggers, SharePoint uploads" },
      { name: "Google Workspace", icon: "google", role: "Docs templating, Drive" },
      { name: "Clockify", icon: "clockify", role: "project and time setup" },
      { name: "Monday.com", icon: "monday", role: "CRM and project tracking" },
    ],
  },
  {
    name: "Infrastructure",
    summary:
      "Provisioned as code, monitored, rebuilt from a clean image, backed up nightly.",
    items: [
      { name: "Terraform", icon: "terraform", role: "provisioning as code" },
      { name: "Docker", icon: "docker", role: "one compose stack per client" },
      { name: "Linux", icon: "linux", role: "hardened Debian hosts" },
      { name: "AWS", icon: "aws", role: "IAM Identity Center, SCP guardrails" },
      { name: "Grafana", icon: "grafana", role: "run counts, failures, latency" },
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

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  /** Orders the beam without drawing a line: the target waits for this source. */
  hidden?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  result: string;
  summary: string;
  tools: string[];
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  /** Published pattern for this build. Null until the template is public. */
  repo?: string | null;
  /** Short demo recording. Null until it exists; the link is not rendered. */
  demo?: string | null;
};

export const projects: Project[] = [
  {
    slug: "onboarding",
    repo: "https://github.com/janr0599/n8n-templates/tree/main/05-client-onboarding",
    demo: null,
    title: "Client onboarding",
    result: "40 minutes to 40 seconds",
    summary:
      "When a new client signed, staff spent forty minutes creating records, folders, time tracking and a welcome pack by hand. Now it happens in forty seconds, the same way every time, with nothing forgotten.",
    tools: ["n8n", "Airtable", "Clockify", "Google Docs", "SharePoint", "Outlook"],
    nodes: [
      { id: "trigger", label: "Client signs", detail: "Fires when a lead is marked as signed in the CRM.", x: 60, y: 160, kind: "trigger" },
      { id: "dedupe", label: "Check duplicates", detail: "Looks for an existing client before creating anything.", x: 220, y: 160, kind: "logic" },
      { id: "records", label: "Create records", detail: "Client, project and billing records created in one pass that can be safely re-run.", x: 390, y: 80, kind: "system" },
      { id: "clockify", label: "Time tracking", detail: "Project, tasks and rates set up in the time-tracking tool.", x: 390, y: 240, kind: "system" },
      { id: "template", label: "Pick template", detail: "Chooses one of five document templates based on the case type.", x: 570, y: 160, kind: "logic" },
      { id: "sharepoint", label: "File documents", detail: "Uploads to the firm's document system in chunks, so large files never time out.", x: 740, y: 160, kind: "system" },
      { id: "email", label: "Welcome email", detail: "Sent from the attorney's own mailbox with the links the client needs.", x: 900, y: 160, kind: "human" },
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
    repo: "https://github.com/janr0599/n8n-templates/tree/main/01-chat-intake-agent-human-handoff",
    demo: null,
    title: "Multi-channel intake assistant",
    result: "Text, voice notes and images, with handoff on intent",
    summary:
      "Enquiries arrive on three channels as text, voice notes and screenshots, at all hours. One assistant handles every channel, answers in the language it was written in, books the call, and steps aside the moment someone needs a person.",
    tools: ["n8n", "Chatwoot", "OpenAI", "Redis", "Postgres", "Pinecone", "Airtable"],
    nodes: [
      { id: "inbound", label: "Inbound message", detail: "WhatsApp, Instagram and Messenger all arrive through one webhook.", x: 40, y: 145, kind: "trigger" },
      { id: "text", label: "Text", detail: "Passed through as written.", x: 200, y: 30, kind: "logic" },
      { id: "voice", label: "Voice note", detail: "Downloaded and transcribed before the model sees it.", x: 200, y: 145, kind: "ai" },
      { id: "image", label: "Image", detail: "Downloaded and described, so a screenshot becomes part of the conversation.", x: 200, y: 260, kind: "ai" },
      { id: "buffer", label: "Group messages", detail: "All three become one stream. Rapid-fire messages are held in Redis and answered as a single turn, so the assistant never replies three times to one thought.", x: 360, y: 145, kind: "logic" },
      { id: "guardin", label: "Input guardrails", detail: "Jailbreak, personal data and secret-key checks before the model sees anything. A trip hands the conversation straight to a person.", x: 520, y: 145, kind: "logic" },
      { id: "agent", label: "AI Agent", detail: "Bilingual, with memory per conversation, and tools it can call mid-sentence.", x: 680, y: 145, kind: "ai" },
      { id: "kb", label: "Knowledge base", detail: "Answers come from a vector store of the company's own documents rather than from the model alone.", x: 600, y: 290, kind: "ai" },
      { id: "tools", label: "Look up and book", detail: "Finds the contact, creates the lead, checks availability, then books, moves or cancels the appointment.", x: 760, y: 290, kind: "system" },
      { id: "guardout", label: "Output guardrails", detail: "The reply is checked before it is sent. A trip hands the conversation to a person instead of delivering it.", x: 840, y: 145, kind: "logic" },
      { id: "reply", label: "Reply", detail: "Split into short messages and sent back one at a time with a typing delay.", x: 1160, y: 30, kind: "trigger" },
      { id: "needed", label: "Human needed?", detail: "A classifier reads the turn and answers yes or no to one question: did they ask for a person?", x: 1000, y: 145, kind: "ai" },
      { id: "human", label: "Hand to a person", detail: "The assistant switches off for that conversation and the team is emailed. It stays off until someone turns it back on.", x: 1160, y: 260, kind: "human" },
    ],
    edges: [
      { from: "inbound", to: "text" },
      { from: "inbound", to: "voice" },
      { from: "inbound", to: "image" },
      { from: "text", to: "buffer" },
      { from: "voice", to: "buffer" },
      { from: "image", to: "buffer" },
      { from: "buffer", to: "guardin" },
      { from: "guardin", to: "agent" },
      { from: "agent", to: "kb" },
      { from: "agent", to: "tools" },
      { from: "agent", to: "guardout" },
      { from: "guardout", to: "needed" },
      { from: "needed", to: "reply", label: "no" },
      { from: "needed", to: "human", label: "yes" },
      { from: "kb", to: "guardout", hidden: true },
      { from: "tools", to: "guardout", hidden: true },
    ],
  },
  {
    slug: "outbound",
    repo: "https://github.com/janr0599/n8n-templates/tree/main/04-prospect-research-and-draft",
    demo: null,
    title: "Outbound prospecting system",
    result: "From finding a prospect to a handled reply, no sales team",
    summary:
      "Finds the right prospects every week, researches each one, writes a personal first email, follows up on a schedule and stops the moment someone replies. Built so a small agency can prospect without hiring for it.",
    tools: ["n8n", "Apify", "OpenAI", "Resend", "Airtable"],
    nodes: [
      { id: "apify", label: "Weekly search", detail: "Pulls new firms from Google Maps across six practice areas and four states, removing ones already seen.", x: 60, y: 160, kind: "trigger" },
      { id: "fetch", label: "Read their site", detail: "Finds the contact and team pages, with a fallback to the sitemap when the navigation hides them.", x: 220, y: 160, kind: "logic" },
      { id: "score", label: "Score and draft", detail: "One model call rates the fit, picks the best contact, notes personal hooks and drafts the email.", x: 390, y: 160, kind: "ai" },
      { id: "picker", label: "Verify the address", detail: "Code checks the model's pick and overrules it with a priority list if it fails validation.", x: 570, y: 160, kind: "logic" },
      { id: "sequencer", label: "Send and follow up", detail: "Five touches during business hours. Stops on a reply, an unsubscribe or a bounce.", x: 770, y: 160, kind: "system" },
      { id: "events", label: "Track delivery", detail: "Delivered, opened, clicked, bounced and complained events feed back into the record.", x: 940, y: 80, kind: "trigger" },
      { id: "replies", label: "Handle replies", detail: "Classifies the reply, routes it to a person when it is a real conversation, and stops the sequence.", x: 940, y: 240, kind: "ai" },
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
    slug: "rag",
    repo: "https://github.com/janr0599/n8n-templates/tree/main/02-drive-to-vector-store-upsert",
    demo: null,
    title: "Document knowledge base (RAG)",
    result: "Drop a file in a folder, ask questions, get answers with sources",
    summary:
      "Documents added to a shared folder become searchable knowledge within minutes, and an edited file replaces its old version, so the knowledge base is always current. An assistant answers questions from it and shows the passages it used.",
    tools: ["n8n", "Google Drive", "OpenAI embeddings", "Pinecone"],
    nodes: [
      { id: "drive", label: "New or updated file", detail: "Watches a shared Drive folder for new documents and for edits to existing ones.", x: 60, y: 80, kind: "trigger" },
      { id: "extract", label: "Extract text", detail: "Reads PDFs, Docs and spreadsheets into plain text.", x: 220, y: 80, kind: "logic" },
      { id: "chunk", label: "Split into passages", detail: "Breaks the text into overlapping passages sized for retrieval.", x: 390, y: 80, kind: "logic" },
      { id: "embed", label: "Embed", detail: "Each passage becomes a vector the search engine can compare by meaning.", x: 560, y: 80, kind: "ai" },
      { id: "store", label: "Vector store", detail: "Passages and their vectors are upserted, so a re-uploaded file replaces its old version.", x: 730, y: 160, kind: "system" },
      { id: "question", label: "Question", detail: "A question arrives from chat or a form.", x: 390, y: 240, kind: "trigger" },
      { id: "search", label: "Find passages", detail: "Retrieves the passages closest in meaning to the question.", x: 560, y: 240, kind: "logic" },
      { id: "answer", label: "Answer with sources", detail: "The model answers from the retrieved passages only and cites them.", x: 900, y: 160, kind: "ai" },
    ],
    edges: [
      { from: "drive", to: "extract" },
      { from: "extract", to: "chunk" },
      { from: "chunk", to: "embed" },
      { from: "embed", to: "store" },
      { from: "question", to: "search" },
      { from: "search", to: "store" },
      { from: "store", to: "answer" },
    ],
  },
];
