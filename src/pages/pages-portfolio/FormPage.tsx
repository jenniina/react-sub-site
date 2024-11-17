import { lazy, Suspense } from 'react'
import Hero from '../../components/Hero/Hero'
// import FormMulti from '../../components/FormMulti/FormMulti'
import { EEmail, EFeatures, ELanguages, ELoading } from '../../interfaces'
import {
  EAColorYouLike,
  EAnyEncouragingWords,
  EBackAndNextButtons,
  EContactForm,
  ECustomRadioAndCheckboxInputs,
  EDoYouLikeMyCustomSelects,
  EFirstName,
  EFormFields,
  EGDPRConsent,
  ELastName,
  EMessage,
  EMessageSubject,
  EMultiStep,
  EOrConstructiveFeedback,
  EPromptToFillInRequiredFields,
  EWhichModeDoYouPreferLightDark,
} from '../../interfaces/form'
import Accordion from '../../components/Accordion/Accordion'
import { EClickHereToSeeFeatures } from '../../components/Jokes/interfaces'

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
  return (
    <div className={`form ${type}`}>
      <Hero language={language} address='form' heading={heading} text={text} />
      <div className='inner-wrap'>
        <section className='card'>
          <div>
            <div className='medium flex column gap'>
              <Accordion
                language={language}
                text={EClickHereToSeeFeatures[language]}
                className='features'
                wrapperClass='features-wrap'
              >
                <>
                  <h2>{EFeatures[language]}</h2>
                  <ul className='ul'>
                    <li>{EMultiStep[language]}</li>
                    <li>{EBackAndNextButtons[language]}</li>
                    <li>{ECustomRadioAndCheckboxInputs[language]}</li>
                    <li>{EPromptToFillInRequiredFields[language]}</li>
                    <li>
                      {EFormFields[language]}
                      <ul>
                        <li>{EFirstName[language]} * </li>
                        <li>{ELastName[language]} *</li>
                        <li>{EEmail[language]} *</li>
                        <li>{EMessageSubject[language]}</li>
                        <li>{EMessage[language]} *</li>
                        <li>
                          {EAnyEncouragingWords[language]}{' '}
                          {EOrConstructiveFeedback[language]}
                        </li>
                        <li>{EAColorYouLike[language]}</li>
                        <li>{EWhichModeDoYouPreferLightDark[language]}</li>
                        <li>{EDoYouLikeMyCustomSelects[language]}</li>
                        <li>{EGDPRConsent[language]}</li>
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
            <h2>{EContactForm[language]}</h2>
            <Suspense
              fallback={
                <div className='flex center margin0auto'>{ELoading[language]}...</div>
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
