import { ELanguages } from '../types'
import { useTheme } from '../hooks/useTheme'
import { Link } from 'react-router-dom'
import styles from './css/disclaimer.module.css'
import { useContext } from 'react'
import { LanguageContext } from '../contexts/LanguageContext'

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
  const { t } = useContext(LanguageContext)!

  const lightTheme = useTheme()

  return (
    <>
      <div className={`disclaimer ${type} ${lightTheme ? styles.light : ''}`}>
        <div className='inner-wrap'>
          <section className={`card`}>
            <div>
              <p>
                {t('ESeeAlso')}: <Link to='/terms'>{t('ETermsOfService')}</Link>
              </p>
              <p>{t('ETheFollowingAppliesToLoggingInAndStoringUserInfo')}</p>
              <h2>{t('EDataCollectionAndStorage')}</h2>
              <p>{t('EWeCollectAndStoreTheEmailAddress')}</p>
              <p>{t('EYourPasswordIsSecurelyHashed')}</p>
              <h2>{t('EDataProtection')}</h2>
              <p>{t('EWeUseIndustryStandardSecurityMeasures')}</p>
              <p>{t('EAccessToYourDataIsRestricted')}</p>
              <h2>{t('EUserResponsibilities')}</h2>
              <p>{t('EPleaseChooseAStrongAndUniquePassword')}</p>
              <p>{t('EDoNotShareYourPasswordWithAnyone')}</p>
              <h2>{t('EYourRights')}</h2>
              <p>{t('EYouHaveTheRightToAccessModifyOrDelete')}</p>
              <p>
                {t('EIfYouHaveAnyConcernsAboutYourDataSecurity')}:{' '}
                <Link to='/contact'>{t('EContactForm')}</Link>
              </p>
              <h2>{t('EChangesToThisDisclaimer')}</h2>
              <p>{t('EWeMayUpdateThisDisclaimerFromTimeToTime')}</p>
              <p>{t('EByUsingOurService')}</p>
              <p>
                {t('ESeeAlso')}: <Link to='/terms'>{t('ETermsOfService')}</Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
