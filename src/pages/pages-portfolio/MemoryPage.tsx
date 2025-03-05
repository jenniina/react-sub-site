import { lazy, Suspense, useContext } from 'react'
import { ELanguages } from '../../types'
import { LanguageContext } from '../../contexts/LanguageContext'

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
    <div className={`memory ${type}`}>
      <div className='inner-wrap'>
        <Suspense
          fallback={
            <div className='flex center margin0auto textcenter'>{t('ELoading')}...</div>
          }
        >
          <Memory language={language} />
        </Suspense>
      </div>
    </div>
  )
}
