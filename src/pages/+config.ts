import type { Config } from "vike/types";

// Default config for all pages
export default {
  // Enable SSG for all pages
  prerender: true,

  // Client-side routing
  clientRouting: true,

  // Pass page context to client
  passToClient: ["pageProps"],
} satisfies Config;
