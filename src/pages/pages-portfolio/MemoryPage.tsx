import { lazy, Suspense } from 'react'
import Hero from '../../components/Hero/Hero'
//import Memory from '../../components/Memory/Memory'
import { ELanguages, ELoading } from '../../interfaces'

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
  return (
    <div className={`memory ${type}`}>
      <Hero language={language} address='memory' heading={heading} text={text} />
      <div className='inner-wrap'>
        <Suspense fallback={<div>{ELoading[language]}...</div>}>
          <Memory language={language} />
        </Suspense>
      </div>
    </div>
  )
}
