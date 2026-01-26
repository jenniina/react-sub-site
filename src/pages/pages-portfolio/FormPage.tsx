import Accordion from '../../components/Accordion/Accordion'
import { useLanguageContext } from '../../contexts/LanguageContext'
import FormMulti from '../../components/FormMulti/FormMulti'
import SEO from '../../components/SEO/SEO'

export default function FormPage({ type }: { type: string }) {
  const { t } = useLanguageContext()

  return (
    <>
      <SEO
        title={`${t('MultiStepContactForm')} | ${t(
          'ThreeStepFullyFunctionalContactForm'
        )}`}
        description={t('ThreeStepFullyFunctionalContactForm')}
        canonicalUrl="https://react.jenniina.fi/portfolio/form"
        ogTitle={`${t('MultiStepContactForm')} | react.jenniina.fi`}
      />
      <div className={`form ${type}`}>
        <div className="inner-wrap">
          <section className="card">
            <div>
              <div className="medium flex column gap">
                <Accordion
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
              <FormMulti />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
