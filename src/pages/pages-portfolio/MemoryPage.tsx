import { lazy, Suspense, useContext } from 'react'
import { ELanguages } from '../../types'
import { LanguageContext } from '../../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'

const Memory = lazy(() => import('../../components/Memory/Memory'))

export default function MemoryPage({
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
  const { t } = useContext(LanguageContext)!

  return (
    <>
      <Helmet>
        <title>
          {t('MemoryGame')} | {t('MemoryGameIntro')}
        </title>
        <meta name='description' content={t('MemoryGameIntro')} />
        <link rel='canonical' href={`https://react.jenniina.fi/portfolio/memory`} />
      </Helmet>
      <div className={`memory ${type}`}>
        <div className='inner-wrap'>
          <Suspense
            fallback={
              <div className='flex center margin0auto textcenter'>{t('Loading')}...</div>
            }
          >
            <Memory language={language} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
