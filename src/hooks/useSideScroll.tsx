import { useRef, useEffect } from "react";
import { RefObject } from '../interfaces'

export default function useSideScroll() {
    const ref = useRef() as RefObject<HTMLElement>
    useEffect(() => {
        const element = ref.current;
        if (element) {
            const onWheel = (e: WheelEvent) => {
                if (e.deltaY == 0) return;
                e.preventDefault();
                element.scrollTo({
                    left: element.scrollLeft + e.deltaY,
                    behavior: "smooth"
                });
            };
            element.addEventListener("wheel", onWheel);
            return () => element.removeEventListener("wheel", onWheel);
        }
    }, []);
    return ref;
}