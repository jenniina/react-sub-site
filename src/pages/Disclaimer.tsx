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
                {t('SeeAlso')}: <Link to='/terms'>{t('TermsOfService')}</Link>
              </p>
              <p>{t('TheFollowingAppliesToLoggingInAndStoringUserInfo')}</p>
              <h2>{t('DataCollectionAndStorage')}</h2>
              <p>{t('WeCollectAndStoreTheEmailAddress')}</p>
              <p>{t('YourPasswordIsSecurelyHashed')}</p>
              <h2>{t('DataProtection')}</h2>
              <p>{t('WeUseIndustryStandardSecurityMeasures')}</p>
              <p>{t('AccessToYourDataIsRestricted')}</p>
              <h2>{t('UserResponsibilities')}</h2>
              <p>{t('PleaseChooseAStrongAndUniquePassword')}</p>
              <p>{t('DoNotShareYourPasswordWithAnyone')}</p>
              <h2>{t('YourRights')}</h2>
              <p>{t('YouHaveTheRightToAccessModifyOrDelete')}</p>
              <p>
                {t('IfYouHaveAnyConcernsAboutYourDataSecurity')}:{' '}
                <Link to='/contact'>{t('ContactForm')}</Link>
              </p>
              <h2>{t('ChangesToThisDisclaimer')}</h2>
              <p>{t('WeMayUpdateThisDisclaimerFromTimeToTime')}</p>
              <p>{t('ByUsingOurService')}</p>
              <p>
                {t('SeeAlso')}: <Link to='/terms'>{t('TermsOfService')}</Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
