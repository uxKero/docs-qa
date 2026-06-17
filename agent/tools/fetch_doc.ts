import { defineTool } from "eve/tools";
import { z } from "zod";

// Cap fetched text so a huge page can't blow the context window.
const MAX_CHARS = 50_000;

export default defineTool({
  description:
    "Fetch the text content of a documentation URL (an llms.txt, agents.md, or a docs page). Returns the body as text, truncated for context safety. Use after discover_docs, or directly when you already have a URL.",
  inputSchema: z.object({
    url: z.string().url().describe("Absolute URL to fetch"),
  }),
  async execute({ url }) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (!res.ok) {
        return { url, ok: false, status: res.status, error: `HTTP ${res.status}` };
      }
      const raw = await res.text();
      const truncated = raw.length > MAX_CHARS;
      return {
        url,
        ok: true,
        status: res.status,
        bytes: raw.length,
        truncated,
        content: raw.slice(0, MAX_CHARS),
      };
    } catch (err) {
      return { url, ok: false, error: String(err) };
    }
  },
});
