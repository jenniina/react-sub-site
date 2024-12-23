import { createRef, FC, Fragment, useRef, lazy, Suspense } from 'react'
import { ELanguages, ELoading, RefObject } from '../../interfaces'
import { EScroll, EToBlobArt } from '../../interfaces/blobs'

const DragContainer = lazy(() => import('./components/DragContainer'))
interface BlobsProps {
  language: ELanguages
}

const Blobs: FC<BlobsProps> = ({ language }) => {
  const containers = Array.from({ length: 3 }, (_, i) => i) // add to length if in need of more blob containers

  const containerRefs = useRef<Record<number, RefObject<HTMLDivElement>>>(
    containers.reduce((acc, container) => {
      acc[container] = createRef<HTMLDivElement>()
      return acc
    }, {} as Record<number, RefObject<HTMLDivElement>>)
  )
  const buttons = (number: number) => {
    return (
      <div className='to-blob-art-btn-wrap flex center gap-half'>
        {containers.map((b, i) => {
          if (number === i) return <Fragment key={i}></Fragment>
          else
            return (
              <button
                key={i}
                style={{ borderRadius: '1rem', flex: '0 0 auto' }}
                className='to-blob-art-btn grayer'
                onClick={() => {
                  const container = document.getElementById(`drag-container${i}`)
                  if (container) {
                    container.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest',
                    })
                  }
                }}
              >
                {EScroll[language]} {EToBlobArt[language]} {i + 1}
              </button>
            )
        })}
      </div>
    )
  }

  return (
    <>
      {containers.map((container, i) => (
        <Fragment key={container}>
          {buttons(i)}
          <Suspense
            fallback={
              <div className='flex center margin0auto textcenter'>
                {ELoading[language]}...
              </div>
            }
          >
            <DragContainer
              language={language}
              d={container}
              ds={containers.length}
              dragWrapOuter={containerRefs.current[container]}
            />
          </Suspense>
        </Fragment>
      ))}
      {buttons(-1)}
    </>
  )
}

export default Blobs
