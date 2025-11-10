// export { onRenderClient };

// import React from "react";
// import { createRoot, hydrateRoot } from "react-dom/client";

// async function onRenderClient(pageContext: any) {
//   const { Page } = pageContext;

//   // Check if Page exists
//   if (!Page) {
//     throw new Error("Page component is undefined");
//   }

//   const container = document.getElementById("root");
//   if (!container) throw new Error("DOM element #root not found");

//   const page = React.createElement(Page, { pageContext });

//   // Check if SSR failed or if we have SSR content
//   const hasSSRContent = container.innerHTML.trim() !== "";
//   const ssrFailed = (window as any).__SSR_FAILED__;

//   if (hasSSRContent && !ssrFailed) {
//     try {
//       // Try to hydrate if SSR worked
//       hydrateRoot(container, page);
//     } catch (error) {
//       console.warn("Hydration failed, falling back to client render:", error);
//       const root = createRoot(container);
//       root.render(page);
//     }
//   } else {
//     // No SSR content or SSR failed, use client-side rendering
//     const root = createRoot(container);
//     root.render(page);
//   }
// }

export { onRenderClient }

import React from 'react'
import { createRoot } from 'react-dom/client'

async function onRenderClient(pageContext: any) {
  const { Page } = pageContext

  if (!Page) {
    throw new Error('Page component is undefined')
  }

  const container = document.getElementById('root')
  if (!container) throw new Error('DOM element #root not found')

  const page = React.createElement(Page, { pageContext })

  // Client-side only rendering
  const root = createRoot(container)
  root.render(page)
}
