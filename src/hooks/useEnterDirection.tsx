import React from "react";
import { useIsClient, useWindow } from "./useSSR";

export default function useEnterDirection(e: React.PointerEvent<HTMLElement>) {
  const isClient = useIsClient();
  const windowObj = useWindow();

  const ref = e.target as HTMLElement;
  const { width, height, top, left } = ref.getBoundingClientRect();
  const l = e.pageX - (left + (windowObj ? windowObj.pageXOffset : 0)),
    t = e.pageY - (top + (windowObj ? windowObj.pageYOffset : 0)),
    xx = width > height ? height / width : 1,
    x = l - (width / 2) * xx,
    yy = height > width ? width / height : 1,
    y = t - (height / 2) * yy,
    d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  switch (d) {
    case 0:
      return "top";
    case 1:
      return "right";
    case 2:
      return "bottom";
    case 3:
      return "left";
    default:
      return "";
  }
}
