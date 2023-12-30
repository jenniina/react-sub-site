import { useTheme } from '../hooks/useTheme'
import Hero from '../components/Hero/Hero'
import FormMulti from '../components/FormMulti/FormMulti'
import { ELanguages } from '../interfaces'

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
            <FormMulti language={language} />
          </div>
        </section>
      </div>
    </div>
  )
}
