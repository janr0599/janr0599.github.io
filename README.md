<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=26&duration=2600&pause=900&color=2DD4BF&center=true&vCenter=true&width=720&lines=I+build+automations+that+keep+running.;n8n+%7C+Claude+%7C+OpenAI+%7C+Airtable;25+workflows+%C2%B7+~380+runs%2Fday+%C2%B7+0%25+failures" alt="Automation & AI Engineer" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white" alt="n8n" />
  <img src="https://img.shields.io/badge/Claude_API-8B7CF6?style=for-the-badge&logo=anthropic&logoColor=white" alt="Claude API" />
  <img src="https://img.shields.io/badge/OpenAI_API-10A37F?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI API" />
  <img src="https://img.shields.io/badge/Airtable-18BFFF?style=for-the-badge&logo=airtable&logoColor=white" alt="Airtable" />
  <img src="https://img.shields.io/badge/Make-6D00CC?style=for-the-badge&logo=make&logoColor=white" alt="Make" />
  <img src="https://img.shields.io/badge/Zapier-FF4A00?style=for-the-badge&logo=zapier&logoColor=white" alt="Zapier" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white" alt="AWS" />
</p>

# Javier Noguera Rodríguez

Automation and AI engineer. Four years designing, shipping and operating the workflows and AI agents US businesses run on. Currently the sole technical owner for a Boston law firm's operations and the technical half of a small automation agency. Remote from Venezuela, US hours, English and Spanish.

**Site:** https://javiernoguera.com · **LinkedIn:** [javier-noguera-rodriguez](https://www.linkedin.com/in/javier-noguera-rodriguez) · **Email:** javiernr0599@gmail.com

## Featured work

### Client onboarding, 40 minutes to 40 seconds
`n8n` `Airtable` `Clockify` `Google Docs` `SharePoint` `Outlook`
One Airtable trigger. Dedupe, create client, project and billing records, set up the time-tracking project, pick the document template by case type, generate it, upload to SharePoint, send the welcome email. 60 nodes, 33 with retry or error handling. Live since mid-2024.

### WhatsApp intake agent with a human handoff
`n8n` `OpenAI` `Redis` `Airtable` `WhatsApp Business`
Trilingual agent with 20-turn memory, Redis buffering so rapid messages become one reply, Airtable and email tools it calls itself, structured output with an auto-fixing parser, and a classifier that hands off to staff when someone asks for a person.

### Outbound system, scrape to reply
`n8n` `Apify` `GPT-5 mini` `Airtable` `Resend`
Six workflows: weekly scrape and dedupe, LLM fit scoring and drafting against a JSON schema with deterministic fallbacks, business-hours sequencing, delivery-event webhooks, AI reply classification and suppression.

### Measuring a legal-AI parser instead of trusting it
`n8n` `Claude API` `Python` `pdftotext`
Same document, two input paths, same model and prompt; a Python probe checks every claim against the source PDF. Result: 51 to 93% fewer input tokens, 24 of 24 citations correct, one reproducible defect the vendor confirmed.

## How I work

- Every automation gets retries, error branches and a dashboard. I measure hours saved and cost per run rather than estimating them.
- LLM output never drives a decision without a deterministic fallback behind it.
- Runbooks for everything I run, because I'm the one following them at 2am.

## Templates (in progress)

Three patterns being packaged as n8n community templates, rebuilt clean: inbound email to CRM threading with attachments · scheduled reminders with Data Table dedupe · chat intake agent with human handoff.

## This site

Plain HTML and CSS with a little vanilla JS for the how-I-work stepper and a fade-up on scroll. No framework, no tracking. Source in `build/classic.html`; `python3 build/make.py` regenerates `index.html`. Earlier experiments (a 3D scroll-through workflow, a paper-document version) live in `build/archive/`.
