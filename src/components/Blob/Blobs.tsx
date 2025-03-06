import {
  createRef,
  FC,
  Fragment,
  useRef,
  lazy,
  Suspense,
  useState,
  useEffect,
  useContext,
} from 'react'
import { ELanguages, RefObject } from '../../types'
import { useSearchParams } from 'react-router-dom'
import { LanguageContext } from '../../contexts/LanguageContext'

const DragContainer = lazy(() => import('./components/DragContainer'))
interface BlobsProps {
  language: ELanguages
}

const Blobs: FC<BlobsProps> = ({ language }) => {
  const { t } = useContext(LanguageContext)!

  const containers = Array.from({ length: 3 }, (_, i) => i) // add to length if in need of more blob containers

  const containerRefs = useRef<Record<number, RefObject<HTMLDivElement>>>(
    containers.reduce((acc, container) => {
      acc[container] = createRef<HTMLDivElement>()
      return acc
    }, {} as Record<number, RefObject<HTMLDivElement>>)
  )

  const [scroll, setScroll] = useState<boolean>(true)
  const [searchParams, setSearchParams] = useSearchParams({
    scroll: 'true',
  })

  useEffect(() => {
    const scroll = searchParams.get('scroll')
    if (scroll) {
      setScroll(scroll === 'true')
    }
  }, [searchParams])

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('scroll', scroll.toString())
    setSearchParams(newParams)
  }, [scroll, searchParams, setSearchParams])

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
                {t('Scroll')} {t('ToBlobArt')} {i + 1}
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
              <div className='flex center margin0auto textcenter'>{t('Loading')}...</div>
            }
          >
            <DragContainer
              language={language}
              d={container}
              ds={containers.length}
              dragWrapOuter={containerRefs.current[container]}
              scroll={scroll}
              setScroll={setScroll}
            />
          </Suspense>
        </Fragment>
      ))}
      {buttons(-1)}
    </>
  )
}

export default Blobs
