import { useEffect, useState } from "react"

export default function useIsOnScreen(ref: React.MutableRefObject<HTMLElement | null>, rootMargin = "0px", threshold = 0.0) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (ref.current == null) return
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { rootMargin, threshold }
        )
        observer.observe(ref.current)
        return () => {
            if (ref.current == null) return
            observer.unobserve(ref.current)
        }
    }, [ref.current, rootMargin, threshold])

    return isVisible
}
