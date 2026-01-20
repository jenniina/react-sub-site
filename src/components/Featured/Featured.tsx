import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Icon from "../Icon/Icon"
import { useLanguageContext } from "../../contexts/LanguageContext"
import useSideScroll from "../../hooks/useSideScroll"
import styles from "../../pages/css/portfolio.module.css"
import {
  getPortfolioTitle,
  portfolioItems,
  renderPortfolioIcon,
} from "../../data/portfolioItems"

const Featured: React.FC = () => {
  const { t } = useLanguageContext()
  const {
    ref: scrollRef,
    setRef,
    setScrollLeft,
  } = useSideScroll("featured-portfolio-scroll")

  // Always start from the beginning (useSideScroll restores last position from localStorage).
  // Also reset on language change so text-length changes don't land mid-item.
  useEffect(() => {
    setScrollLeft(0)
  }, [setScrollLeft, t])

  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const setScrollerRef = useCallback(
    (node: HTMLUListElement | null) => {
      setRef(node)
      if (!node) return
      // Ensure we don't paint at a saved mid-scroll position
      node.scrollLeft = 0
      setScrollLeft(0)
      // initialize states
      setAtStart(true)
      setAtEnd(node.scrollLeft + node.clientWidth >= node.scrollWidth - 1)
    },
    [setRef, setScrollLeft]
  )

  const items = useMemo(
    () =>
      portfolioItems.map((item) => ({
        key: item.id,
        to: item.url,
        className:
          item.listClassName === "multistep" ? styles.multistep : undefined,
        icon: renderPortfolioIcon(item.icon),
        title:
          item.id === "composer" ? (
            <span>
              {getPortfolioTitle(item, t)} ({t("Website")})
            </span>
          ) : (
            <span>{getPortfolioTitle(item, t)}</span>
          ),
        description: <p>{item.description(t)}</p>,
      })),
    [t]
  )

  const scrollToNext = useCallback(() => {
    const ul = scrollRef.current as unknown as HTMLUListElement | null
    if (!ul) return

    const lis = Array.from(ul.querySelectorAll("li")) as HTMLLIElement[]
    if (!lis.length) return

    const currentLeft = ul.scrollLeft
    const next = lis.find((li) => li.offsetLeft > currentLeft + 1)
    if (!next) return // at end, do nothing (button will be disabled)

    const target = next.offsetLeft

    ul.scrollTo({ left: target, behavior: "smooth" })
    window.setTimeout(() => setScrollLeft(target), 350)
  }, [scrollRef, setScrollLeft])

  const scrollToPrevious = useCallback(() => {
    const ul = scrollRef.current as unknown as HTMLUListElement | null
    if (!ul) return

    const lis = Array.from(ul.querySelectorAll("li")) as HTMLLIElement[]
    if (!lis.length) return

    const ulRect = ul.getBoundingClientRect()

    // Find first item that is at least partially visible using screen coordinates
    const firstVisibleIndex = lis.findIndex((li) => {
      const r = li.getBoundingClientRect()
      return r.right > ulRect.left + 1 && r.left < ulRect.right - 1
    })

    let targetOffset = 0

    if (firstVisibleIndex === -1) {
      // No visible items (unlikely) -> scroll to start
      targetOffset = 0
    } else if (firstVisibleIndex === 0) {
      // The first item is the first visible one
      const firstRect = lis[0].getBoundingClientRect()
      const isPartiallyHidden = firstRect.left < ulRect.left + 1

      if (isPartiallyHidden) {
        // If partially hidden, scroll to absolute start
        targetOffset = 0
      } else {
        // Fully visible and at start -> do nothing (we're at start)
        return
      }
    } else {
      // Scroll to the item before the first visible one
      targetOffset = lis[firstVisibleIndex - 1].offsetLeft
    }

    ul.scrollTo({ left: targetOffset, behavior: "smooth" })
    window.setTimeout(() => setScrollLeft(targetOffset), 350)
  }, [scrollRef, setScrollLeft])

  // Update `atStart` / `atEnd` on scroll and resize
  useEffect(() => {
    const ul = scrollRef.current as unknown as HTMLUListElement | null
    if (!ul) return

    const update = () => {
      setAtStart(ul.scrollLeft <= 1)
      setAtEnd(ul.scrollLeft + ul.clientWidth >= ul.scrollWidth - 1)
    }

    ul.addEventListener("scroll", update)
    window.addEventListener("resize", update)

    // initial
    update()

    return () => {
      ul.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [scrollRef, items, t])

  return (
    <section className="card">
      <div>
        <div className={styles.featured}>
          <button
            type="button"
            className={`${styles["horizontal-scroll"]} ${styles.left} horizontal-scroll left ${atStart ? "disable" : ""}`}
            aria-label={t("Previous")}
            title={t("Previous")}
            onClick={scrollToPrevious}
            disabled={atStart}
            aria-disabled={atStart}
          >
            <Icon lib="fa6" name="FaAnglesLeft" />
          </button>
          <ul className={styles.list} ref={setScrollerRef}>
            {items.map((item) => (
              <li key={item.key} className={item.className}>
                <Link to={item.to}>
                  <b>{item.icon}</b>
                  <span>{item.title}</span>
                </Link>
                {item.description}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={`${styles["horizontal-scroll"]} ${styles.right} horizontal-scroll right ${atEnd ? "disable" : ""}`}
            aria-label={t("Next")}
            title={t("Next")}
            onClick={scrollToNext}
            disabled={atEnd}
            aria-disabled={atEnd}
          >
            <Icon lib="fa6" name="FaAnglesRight" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Featured
