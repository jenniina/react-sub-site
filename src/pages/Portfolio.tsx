import { lazy, Suspense } from 'react'
import { useTheme } from '../hooks/useTheme'
import { ELanguages, ELoading } from '../interfaces'
import styles from './css/portfolio.module.css'
import Hero from '../components/Hero/Hero'
import { ETryDraggingTheBlobs } from '../interfaces/blobs'

const PortfolioInfo = lazy(() => import('../components/PortfolioInfo/PortfolioInfo'))

export default function Portfolio({
  heading,
  text,
  type,
  language,
}: {
  heading: string
  text: string
  type: string
  language: ELanguages
}) {
  const lightTheme = useTheme()

  return (
    <div
      className={`portfolio ${styles.portfolio} ${type} ${
        lightTheme ? styles.light : ''
      }`}
    >
      <Hero
        language={language}
        address='portfolio'
        heading={heading}
        text={text}
        instructions={ETryDraggingTheBlobs[language]}
      />
      <div className='inner-wrap'>
        <Suspense
          fallback={
            <div className='flex center margin0auto textcenter'>
              {ELoading[language]}...
            </div>
          }
        >
          <PortfolioInfo language={language} />
        </Suspense>
      </div>
    </div>
  )
}
