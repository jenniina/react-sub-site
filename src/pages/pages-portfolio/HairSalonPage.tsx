import Hero from '../../components/Hero/Hero'
import { ELanguages } from '../../interfaces'

export default function HairSalonPage({
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
    <div className={`form ${type}`}>
      <Hero language={language} address='form' heading={heading} text={text} />
      <div className='inner-wrap'>
        <section className='card'>
          <div>
            <div className='medium'>
              <p>
                <a href='https://hannastiina.jenniina.fi'>Parturi Kampaamo Hannastiina</a>
              </p>
              <p>
                <a href='https://github.com/jenniina/hannastiina'>Github</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
