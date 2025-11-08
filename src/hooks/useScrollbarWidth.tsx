import { useRef } from "react";
import { useIsClient } from "./useSSR";

export const useScrollbarWidth = () => {
  const isClient = useIsClient();
  const didCompute = useRef(false);
  const widthRef = useRef(0);

  if (!isClient) return 0;
  if (didCompute.current) return widthRef.current;

  // Creating invisible container
  const outer = document ? document?.createElement("div") : null;
  if (!outer) return 0;

  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  outer.style.setProperty("msOverflowStyle", "scrollbar"); // needed for WinJS apps

  if (typeof document === "undefined") return 0;

  document ? document.body.appendChild(outer) : null;

  // Creating inner element and placing it in the container
  const inner = document ? document.createElement("div") : null;
  if (!inner) return 0;
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode?.removeChild(outer);

  didCompute.current = true;
  widthRef.current = scrollbarWidth;

  return scrollbarWidth;
};
