import Hero from '../../components/Hero/Hero'
import FormMulti from '../../components/FormMulti/FormMulti'
import { EEmail, EFeatures, ELanguages } from '../../interfaces'
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
            <div className='medium'>
              <Accordion
                language={language}
                text={EClickHereToSeeFeatures[language]}
                className='features'
              >
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
              </Accordion>
            </div>
          </div>
        </section>
        <section className='card'>
          <div>
            <h2>{EContactForm[language]}</h2>
            <FormMulti language={language} />
          </div>
        </section>
      </div>
    </div>
  )
}
