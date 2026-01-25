import FormMulti from '../components/FormMulti/FormMulti'
import { useLanguageContext } from '../contexts/LanguageContext'
import SEO from '../components/SEO/SEO'

export default function Contact({ type }: { type: string }) {
  const { t } = useLanguageContext()

  return (
    <>
      <SEO
        title={`${t('ContactForm')} | react.jenniina.fi`}
        description={t('ContactForm') + ' | ' + t('GetInTouch')}
        canonicalUrl={'https://react.jenniina.fi/contact'}
      />
      <div className={`contact ${type}`}>
        <div className="inner-wrap">
          <section
            className="card"
            style={{ position: 'relative', zIndex: '2' }}
          >
            <div>
              <FormMulti />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
