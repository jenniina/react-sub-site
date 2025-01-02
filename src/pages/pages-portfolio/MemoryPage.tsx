import { lazy, Suspense } from 'react'
import Hero from '../../components/Hero/Hero'
//import Memory from '../../components/Memory/Memory'
import { ELanguages, ELoading } from '../../types'

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
      <div className='inner-wrap'>
        <Suspense
          fallback={
            <div className='flex center margin0auto textcenter'>
              {ELoading[language]}...
            </div>
          }
        >
          <Memory language={language} />
        </Suspense>
      </div>
    </div>
  )
}
