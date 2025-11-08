export { onRenderClient };

import React from "react";
import { hydrateRoot } from "react-dom/client";

async function onRenderClient(pageContext: any) {
  const { Page } = pageContext;

  // Check if Page exists
  if (!Page) {
    throw new Error("Page component is undefined");
  }

  const page = React.createElement(
    React.Fragment,
    null,
    React.createElement(Page, { pageContext })
  );

  hydrateRoot(document?.getElementById("root")!, page);
}
