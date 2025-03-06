import { lazy, Suspense, useContext } from 'react'
import { ELanguages } from '../types'
import { LanguageContext } from '../contexts/LanguageContext'

const FormMulti = lazy(() => import('../components/FormMulti/FormMulti'))

export default function Contact({
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
    <div className={`contact ${type}`}>
      <div className='inner-wrap'>
        <section className='card' style={{ position: 'relative', zIndex: '2' }}>
          <div>
            <Suspense
              fallback={
                <div className='flex center margin0auto textcenter'>
                  {t('Loading')}...
                </div>
              }
            >
              <FormMulti language={language} />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  )
}
