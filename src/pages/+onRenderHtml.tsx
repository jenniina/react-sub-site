export { onRenderHtml };

import React from "react";
import { renderToString } from "react-dom/server";
import { dangerouslySkipEscape, escapeInject } from "vike/server";

async function onRenderHtml(pageContext: any) {
  const { Page } = pageContext;

  // Check if Page exists before rendering
  if (!Page) {
    console.log("Page component is undefined", pageContext);
    throw new Error("Page component is undefined");
  }

  const pageHtml = renderToString(React.createElement(Page, { pageContext }));

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React Sub Site | Jenniina Laine</title>
        <meta name="description" content="Portfolio and projects by Jenniina Laine" />
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {},
  };
}
