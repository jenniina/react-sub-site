import { lazy, Suspense } from 'react'
import { useTheme } from '../hooks/useTheme'
import Hero from '../components/Hero/Hero'
// import FormMulti from '../components/FormMulti/FormMulti'
import { ELanguages, ELoading } from '../interfaces'

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
  const lightTheme = useTheme()

  return (
    <div className={`contact ${type}`}>
      <Hero language={language} address='contact' heading={heading} text={text} />
      <div className='inner-wrap'>
        <section className='card' style={{ position: 'relative', zIndex: '2' }}>
          <div>
            <Suspense
              fallback={
                <div className='flex center margin0auto textcenter'>
                  {ELoading[language]}...
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
