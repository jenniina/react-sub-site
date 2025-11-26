import { createRef, FC, Fragment, useState, useMemo } from 'react'
import { RefObject } from '../../types'
import { useLanguageContext } from '../../contexts/LanguageContext'
import DragContainer from './components/DragContainer'

const Blobs: FC = () => {
  const { t } = useLanguageContext()

  const containers = Array.from({ length: 3 }, (_, i) => i) // add to length if in need of more blob containers

  // const containerRefs = useRef<Record<number, RefObject<HTMLDivElement>>>(
  //   containers.reduce((acc, container) => {
  //     acc[container] = createRef<HTMLDivElement>();
  //     return acc;
  //   }, {} as Record<number, RefObject<HTMLDivElement>>)
  // );

  const containerRefs = useMemo(() => {
    return containers.reduce(
      (acc, container) => {
        acc[container] = createRef<HTMLDivElement>()
        return acc
      },
      {} as Record<number, RefObject<HTMLDivElement>>
    )
  }, [containers])

  const [scroll, setScroll] = useState<boolean>(true)

  const buttons = (number: number) => {
    return (
      <div className="to-blob-art-btn-wrap flex center gap-half">
        {containers.map((b, i) => {
          if (number === i) return <Fragment key={i}></Fragment>
          else
            return (
              <button
                key={i}
                style={{ borderRadius: '1rem', flex: '0 0 auto' }}
                className="to-blob-art-btn grayer"
                onClick={() => {
                  const container = document?.getElementById(
                    `drag-container${i}`
                  )
                  if (container) {
                    container.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest',
                    })
                  }
                }}
              >
                {t('Scroll')} {t('ToBlobArt')} {i + 1}
              </button>
            )
        })}
      </div>
    )
  }

  return (
    <>
      {containers?.map((container, i) => (
        <Fragment key={container}>
          {buttons(i)}
          <DragContainer
            d={container}
            dragWrapOuter={containerRefs?.[container]}
            scroll={scroll}
            setScroll={setScroll}
          />
        </Fragment>
      ))}
      {buttons(-1)}
    </>
  )
}

export default Blobs
