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
  ETermsOfService,
  ESeeAlso,
  ETheFollowingAppliesToLoggingInAndStoringUserInfo,
} from '../types'

import { ELanguages } from '../types'
import Hero from '../components/Hero/Hero'
import { useTheme } from '../hooks/useTheme'
import { Link } from 'react-router-dom'
import styles from './css/disclaimer.module.css'
import { EContactForm } from '../types/form'

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
      <div className={`disclaimer ${type} ${lightTheme ? styles.light : ''}`}>
        <div className='inner-wrap'>
          <section className={`card`}>
            <div>
              <p>
                {ESeeAlso[language]}: <Link to='/terms'>{ETermsOfService[language]}</Link>
              </p>
              <p>{ETheFollowingAppliesToLoggingInAndStoringUserInfo[language]}</p>
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
              <p>
                {EIfYouHaveAnyConcernsAboutYourDataSecurity[language]}:{' '}
                <Link to='/contact'>{EContactForm[language]}</Link>
              </p>
              <h2>{EChangesToThisDisclaimer[language]}</h2>
              <p>{EWeMayUpdateThisDisclaimerFromTimeToTime[language]}</p>
              <p>{EByUsingOurService[language]}</p>
              <p>
                {ESeeAlso[language]}: <Link to='/terms'>{ETermsOfService[language]}</Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
