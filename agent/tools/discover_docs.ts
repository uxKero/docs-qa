import { defineTool } from "eve/tools";
import { z } from "zod";

// Conventional agent-readable surfaces, in rough priority order.
const CANDIDATES = [
  "/llms.txt",
  "/llms-full.txt",
  "/agents.md",
  "/.well-known/agents.md",
  "/sitemap.md",
  "/sitemap.xml",
  "/robots.txt",
];

function normalizeBase(site: string): string {
  let s = site.trim();
  if (!/^https?:\/\//i.test(s)) s = "https://" + s;
  const u = new URL(s);
  return `${u.protocol}//${u.host}`;
}

export default defineTool({
  description:
    "Discover a website's agent-readable documentation surfaces. Given a site URL, probes conventional files (llms.txt, agents.md, sitemap.md, robots.txt) and reports which exist, with a short preview of each. Use this FIRST when asked about a product's docs.",
  inputSchema: z.object({
    site: z
      .string()
      .min(1)
      .describe("Base site URL or hostname, e.g. https://eve.dev or eve.dev"),
  }),
  async execute({ site }) {
    const base = normalizeBase(site);
    const results = await Promise.all(
      CANDIDATES.map(async (path) => {
        const url = base + path;
        try {
          const res = await fetch(url, { redirect: "follow" });
          if (!res.ok) return { url, found: false, status: res.status };
          const text = await res.text();
          return {
            url,
            found: true,
            status: res.status,
            bytes: text.length,
            preview: text.slice(0, 500),
          };
        } catch (err) {
          return { url, found: false, error: String(err) };
        }
      })
    );

    const found = results.filter((r) => r.found);
    return {
      base,
      found,
      all: results,
      note: found.length
        ? "Fetch the most relevant found file with fetch_doc, then answer with citations."
        : "No agent-readable surfaces found; fall back to fetching the site's main docs URL directly with fetch_doc.",
    };
  },
});
