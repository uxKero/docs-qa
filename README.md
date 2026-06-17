<div align="center">

# 🌱 Docs Q&A

**An Eve agent that answers questions about any product** by discovering and reading its `llms.txt` / `agents.md` / sitemap, then citing its sources. A web chat plus the agent, ready to deploy.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FuxKero%2Fdocs-qa&env=AI_GATEWAY_API_KEY&envDescription=Model%20access%20via%20the%20Vercel%20AI%20Gateway&envLink=https%3A%2F%2Fgithub.com%2FuxKero%2Fdocs-qa%2Fblob%2Fmain%2Fdocs%2FENVIRONMENT.md&project-name=docs-qa&repository-name=docs-qa)

[![Powered by Vercel](https://img.shields.io/badge/▲%20Powered%20by%20Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Built on Eve](https://img.shields.io/badge/Built%20on%20Eve-000000?style=for-the-badge)](https://eve.dev)
[![License MIT](https://img.shields.io/badge/License-MIT-3b3b3b?style=for-the-badge)](./LICENSE)

**▶ [Live demo](https://docs-qa-uxkero.vercel.app)** · a visual preview (deploy your own, add a key, and it answers)

</div>

---

## How it works

Give it a product or site and a question. It:

- **discovers** the site's agent-readable surfaces (`discover_docs`),
- **reads** the most relevant one (`fetch_doc`, prefers `llms.txt`),
- **answers** only from what it fetched, with a `Sources:` list,
- and says *"the docs don't cover this"* instead of guessing.

Two services run on Vercel from [`vercel.json`](vercel.json): the **web** chat (Next.js) and the **eve** agent runtime. The browser reaches the agent same-origin through `useEveAgent`.

## Deploy

Click the button above. Vercel clones this repo and asks for one variable, `AI_GATEWAY_API_KEY` (or link the project and it uses OIDC). See [docs/ENVIRONMENT.md](docs/ENVIRONMENT.md).

## Run it locally

Requirements: **Node 24+**, pnpm.

```bash
pnpm install
cp .env.example .env.local   # add your AI Gateway key
pnpm dev                     # http://localhost:3000
```

## Inside the agent

```
agent/
├─ agent.ts                         # model (via the AI Gateway) + runtime
├─ instructions.md                  # the persona + rules
├─ tools/
│  ├─ discover_docs.ts              # probes llms.txt / agents.md / sitemap
│  └─ fetch_doc.ts                  # fetches a URL's text (truncated)
└─ skills/
   └─ answer_from_docs/SKILL.md     # discover, read, cite
```

## Make it your own

- Point it at your product, it works on any site shipping `llms.txt` / `agents.md`.
- Add `agent/channels/slack.ts` to answer in Slack.
- Swap the model in `agent/agent.ts` (anything on the AI Gateway).

## Stack

[Vercel Eve](https://eve.dev) · [AI Gateway](https://vercel.com/ai-gateway) · [Next.js](https://nextjs.org) · deployed on [Vercel](https://vercel.com).

<sub>One of the Eve agent templates from <a href="https://github.com/uxKero">Eden</a>. MIT licensed.</sub>
