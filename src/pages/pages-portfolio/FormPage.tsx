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
                text={t('EClickHereToSeeFeatures')}
                className='features'
                wrapperClass='features-wrap'
              >
                <>
                  <h2>{t('EFeatures')}</h2>
                  <ul className='ul'>
                    <li>{t('EMultiStep')}</li>
                    <li>{t('EBackAndNextButtons')}</li>
                    <li>{t('ECustomRadioAndCheckboxInputs')}</li>
                    <li>{t('EPromptToFillInRequiredFields')}</li>
                    <li>
                      {t('EFormFields')}
                      <ul>
                        <li>{t('EFirstName')} * </li>
                        <li>{t('ELastName')} *</li>
                        <li>{t('EEmail')} *</li>
                        <li>{t('EMessageSubject')}</li>
                        <li>{t('EMessage')} *</li>
                        <li>
                          {t('EAnyEncouragingWords')} {t('EOrConstructiveFeedback')}
                        </li>
                        <li>{t('EAColorYouLike')}</li>
                        <li>{t('EWhichModeDoYouPreferLightDark')}</li>
                        <li>{t('EDoYouLikeMyCustomSelects')}</li>
                        <li>{t('EGDPRConsent')}</li>
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
            <h2>{t('EContactForm')}</h2>
            <Suspense
              fallback={
                <div className='flex center margin0auto textcenter'>
                  {t('ELoading')}...
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
