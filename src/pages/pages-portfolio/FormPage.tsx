import { lazy, Suspense, useContext } from 'react'
import { ELanguages } from '../../types'
import Accordion from '../../components/Accordion/Accordion'
import { LanguageContext } from '../../contexts/LanguageContext'

const FormMulti = lazy(() => import('../../components/FormMulti/FormMulti'))

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
  const { t } = useContext(LanguageContext)!

  return (
    <div className={`form ${type}`}>
      <div className='inner-wrap'>
        <section className='card'>
          <div>
            <div className='medium flex column gap'>
              <Accordion
                language={language}
                text={t('ClickHereToSeeFeatures')}
                className='features'
                wrapperClass='features-wrap'
              >
                <>
                  <h2>{t('Features')}</h2>
                  <ul className='ul'>
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
                          {t('AnyEncouragingWords')} {t('OrConstructiveFeedback')}
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
              <a href='https://github.com/jenniina/react-sub-site/tree/main/src/components/FormMulti'>
                Github
              </a>
            </div>
          </div>
        </section>
        <section className='card'>
          <div>
            <h2>{t('ContactForm')}</h2>
            <Suspense
              fallback={
                <div className='flex center margin0auto textcenter'>
                  {t('Loading')}...
                </div>
              }
            >
              <FormMulti language={language} />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  )
}
