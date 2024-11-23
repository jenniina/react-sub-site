import AccessibleColors from '../../components/AccessibleColors/AccessibleColors'
import Hero from '../../components/Hero/Hero'
import { ELanguages } from '../../interfaces'

const ColorsPage = ({
  heading,
  text,
  type,
  language,
}: {
  heading: string
  text: string
  type: string
  language: ELanguages
}) => {
  return (
    <div className={`colors ${type}`}>
      <Hero language={language} address='colors' heading={heading} text={text} />
      <div className='inner-wrap'>
        <section>
          <AccessibleColors language={language} />
        </section>
      </div>
    </div>
  )
}

export default ColorsPage
