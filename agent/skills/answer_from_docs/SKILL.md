---
description: Use when the user asks about a product's documentation or website — discover and read its llms.txt / agents.md / sitemap before answering, and cite sources.
---

# Answering from documentation

Follow this procedure whenever a question is about a specific product, library, or site.

1. **Discover.** Call `discover_docs` with the site URL (or hostname). Note which
   surfaces exist. An `llms.txt` / `llms-full.txt` is the highest-value source — it's
   the docs corpus curated for LLMs. `agents.md` describes how agents should use the
   site. `sitemap.*` lists pages to drill into.

2. **Read selectively.** Call `fetch_doc` on the surface most likely to contain the
   answer. If `llms.txt` is an index of links, fetch the specific linked page that
   matches the question rather than guessing.

3. **Answer from evidence only.** Base every claim on text you fetched. If two sources
   conflict, prefer the more specific/canonical one and say so.

4. **Cite.** End with a `Sources:` list of the exact URLs you used.

5. **Admit gaps.** If the docs don't answer the question, say "the docs don't cover
   this" and, if useful, point to the closest relevant page. Never fabricate APIs,
   flags, or version numbers.
