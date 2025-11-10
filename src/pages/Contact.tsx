import { useContext } from 'react'
import { ELanguages } from '../types'
import { useLanguageContext } from '../contexts/LanguageContext'
import FormMulti from '../components/FormMulti/FormMulti'

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
  const { t } = useLanguageContext()

  return (
    <>
      {/* <Helmet prioritizeSeoTags={true}>
        <meta charSet="utf-8" />
        <meta name="author" content="Jenniina Laine" />
        <meta property="og:type" content="website" />

        <title>{t("ContactForm")} | react.jenniina.fi</title>
        <meta name="description" content={t("ContactForm")} />
        <link rel="canonical" href={`https://react.jenniina.fi/contact`} />
        <meta
          property="og:title"
          content={`${t("ContactForm")} | react.jenniina.fi`}
        />
        <meta property="og:description" content={t("ContactForm")} />
        <meta property="og:url" content={`https://react.jenniina.fi/contact`} />
        <meta property="og:type" content="website" />
      </Helmet> **/}
      <div className={`contact ${type}`}>
        <div className="inner-wrap">
          <section
            className="card"
            style={{ position: 'relative', zIndex: '2' }}
          >
            <div>
              <FormMulti language={language} />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
