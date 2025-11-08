import type { Config } from "vike/types";

export default {
  // Enable SSG for all pages
  prerender: true,

  route: "*",

  // Client-side routing
  clientRouting: true,

  // Pass page context to client
  passToClient: ["pageProps"],
} satisfies Config;
