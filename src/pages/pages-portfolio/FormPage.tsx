import { ELanguages } from '../../types'
import Accordion from '../../components/Accordion/Accordion'
import { useLanguageContext } from '../../contexts/LanguageContext'
import FormMulti from '../../components/FormMulti/FormMulti'

export default function FormPage({
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
      {/*  <Helmet prioritizeSeoTags={true}>
        <meta charSet="utf-8" />
        <meta name="author" content="Jenniina Laine" />
        <meta property="og:type" content="website" />

        <title>
          {t("MultiStepContactForm")} |{" "}
          {t("ThreeStepFullyFunctionalContactForm")}
        </title>
        <meta
          name="description"
          content={t("ThreeStepFullyFunctionalContactForm")}
        />
        <link
          rel="canonical"
          href={`https://react.jenniina.fi/portfolio/form`}
        />
        <meta
          property="og:title"
          content={`${t("MultiStepContactForm")} | react.jenniina.fi`}
        />
        <meta
          property="og:description"
          content={t("ThreeStepFullyFunctionalContactForm")}
        />
        <meta
          property="og:url"
          content={`https://react.jenniina.fi/portfolio/form`}
        />
        <meta property="og:type" content="website" />
      </Helmet> */}
      <div className={`form ${type}`}>
        <div className="inner-wrap">
          <section className="card">
            <div>
              <div className="medium flex column gap">
                <Accordion
                  language={language}
                  text={t('ClickHereToSeeFeatures')}
                  className="features"
                  wrapperClass="features-wrap"
                >
                  <>
                    <h2>{t('Features')}</h2>
                    <ul className="ul">
                      <li>{t('MultiStep')}</li>
                      <li>{t('BackAndNextButtons')}</li>
                      <li>{t('CustomRadioAndCheckboxInputs')}</li>
                      <li>{t('PromptToFillInRequiredFields')}</li>
                      <li>
                        {t('FormFields')}
                        <ul>
                          <li>{t('FirstName')} * </li>
                          <li>{t('LastName')} *</li>
                          <li>{t('Email')} *</li>
                          <li>{t('MessageSubject')}</li>
                          <li>{t('Message')} *</li>
                          <li>
                            {t('AnyEncouragingWords')}{' '}
                            {t('OrConstructiveFeedback')}
                          </li>
                          <li>{t('AColorYouLike')}</li>
                          <li>{t('WhichModeDoYouPreferLightDark')}</li>
                          <li>{t('DoYouLikeMyCustomSelects')}</li>
                          <li>{t('GDPRConsent')}</li>
                        </ul>
                      </li>
                    </ul>
                  </>
                </Accordion>
                <a href="https://github.com/jenniina/react-sub-site/tree/main/src/components/FormMulti">
                  Github
                </a>
              </div>
            </div>
          </section>
          <section className="card">
            <div>
              <h2>{t('ContactForm')}</h2>
              <FormMulti language={language} />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
