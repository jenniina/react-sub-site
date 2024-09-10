import {
  EPrivacyAndSecurityDisclaimer,
  EDataCollectionAndStorage,
  EWeCollectAndStoreTheEmailAddress,
  EYourPasswordIsSecurelyHashed,
  EDataProtection,
  EWeUseIndustryStandardSecurityMeasures,
  EAccessToYourDataIsRestricted,
  EUserResponsibilities,
  EPleaseChooseAStrongAndUniquePassword,
  EDoNotShareYourPasswordWithAnyone,
  EYourRights,
  EYouHaveTheRightToAccessModifyOrDelete,
  EIfYouHaveAnyConcernsAboutYourDataSecurity,
  EChangesToThisDisclaimer,
  EWeMayUpdateThisDisclaimerFromTimeToTime,
  EByUsingOurService,
} from '../interfaces'

import { ELanguages } from '../interfaces'
import Hero from '../components/Hero/Hero'
import { useTheme } from '../hooks/useTheme'
import { Link } from 'react-router-dom'
import styles from './css/disclaimer.module.css'
import { EBack } from '../interfaces/form'

export default function Disclaimer({
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
  const lightTheme = useTheme()

  return (
    <>
      <div className={`welcome ${type} ${lightTheme ? styles.light : ''}`}>
        <Hero language={language} address='welcome' heading={heading} text={text} />

        <div className='inner-wrap'>
          <section className={`card`}>
            <div>
              <h2>{EDataCollectionAndStorage[language]}</h2>
              <p>{EWeCollectAndStoreTheEmailAddress[language]}</p>
              <p>{EYourPasswordIsSecurelyHashed[language]}</p>
              <h2>{EDataProtection[language]}</h2>
              <p>{EWeUseIndustryStandardSecurityMeasures[language]}</p>
              <p>{EAccessToYourDataIsRestricted[language]}</p>
              <h2>{EUserResponsibilities[language]}</h2>
              <p>{EPleaseChooseAStrongAndUniquePassword[language]}</p>
              <p>{EDoNotShareYourPasswordWithAnyone[language]}</p>
              <h2>{EYourRights[language]}</h2>
              <p>{EYouHaveTheRightToAccessModifyOrDelete[language]}</p>
              <p>{EIfYouHaveAnyConcernsAboutYourDataSecurity[language]}</p>
              <h2>{EChangesToThisDisclaimer[language]}</h2>
              <p>{EWeMayUpdateThisDisclaimerFromTimeToTime[language]}</p>
              <p>{EByUsingOurService[language]}</p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
