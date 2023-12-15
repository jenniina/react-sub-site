import { useTheme } from '../hooks/useTheme'
import Hero from '../components/Hero/Hero'
import FormMulti from '../components/FormMulti/FormMulti'

export default function Contact({
  heading,
  text,
  type,
}: {
  heading: string
  text: string
  type: string
}) {
  const lightTheme = useTheme()

  return (
    <div
      className={`${heading
        .replace(/\s+/g, '-')
        .toLowerCase()
        .replace(/[^a-zA-Z]/g, '')} ${type}`}
    >
      <Hero heading={heading} text={text} />
      <div className='inner-wrap'>
        <section className='card' style={{ position: 'relative', zIndex: '2' }}>
          <div>
            Temporarily disabled due to EmailJS issues. Please contact me through the main
            page at <a href='https://jenniina.fi/#contact'>jenniina.fi</a>
            {/* <FormMulti /> */}
          </div>
        </section>
      </div>
    </div>
  )
}
