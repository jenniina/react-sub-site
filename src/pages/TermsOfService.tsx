import { EDisclaimer, ELanguages, ESeeAlso, EStore } from '../interfaces'
import Hero from '../components/Hero/Hero'
import { useTheme } from '../hooks/useTheme'
import styles from './css/disclaimer.module.css'
import {
  EContactMe,
  EContactMeText,
  EEnFi,
  EEnFiAcceptanceOfTerms,
  EEnFiAcceptanceOfTermsText,
  EEnFiCustomer,
  EEnFiCustomerCompany,
  EEnFiChangesToTerms,
  EEnFiChangesToTermsText,
  EEnFiProductionBeginsWhen,
  EEnFiSupplier,
  EEnFiTermination,
  EEnFiTerminationText,
  EEnFiUseOfService,
  EEnFiUseOfServiceText,
  EEnFiWelcomeToTermsOfService,
  EEnFiCustomerResponsibleForCopyright,
  EEnFiSupplierNotResponsibleForErrors,
  EEnFiSupplierNotResponsibleForUpdates,
  EEnFiOrderIsBinding,
  EEnFiColorsMayVaryInPrintedWorks,
  EEnFiPrintingCostsNotIncluded,
  EEnFiSupplierMayUseProductInMarketing,
  EEnFiSupplierMayHelpWithHostingAndPrintingSolutions,
} from '../interfaces/fien'
import { Link } from 'react-router-dom'
import { EProducts } from '../interfaces/store'

export function TermsProducts({ language }: { language: ELanguages }) {
  const lang: EEnFi = language === 'fi' ? EEnFi.Suomi : EEnFi.English

  return (
    <>
      <p>
        <strong>{EEnFiSupplier[lang]}:</strong> Jenniina Laine <br />
        <strong>{EEnFiCustomer[lang]}:</strong> {EEnFiCustomerCompany[lang]}
      </p>
      <p>{EEnFiProductionBeginsWhen[lang]}</p>
      <p>{EEnFiCustomerResponsibleForCopyright[lang]}</p>
      <p>{EEnFiSupplierNotResponsibleForErrors[lang]}</p>
      <p>{EEnFiSupplierNotResponsibleForUpdates[lang]}</p>
      <p>
        {EEnFiPrintingCostsNotIncluded[lang]}{' '}
        {EEnFiSupplierMayHelpWithHostingAndPrintingSolutions[lang]}
      </p>
      <p>{EEnFiColorsMayVaryInPrintedWorks[lang]}</p>
      <p>{EEnFiSupplierMayUseProductInMarketing[lang]}</p>
      <p>{EEnFiOrderIsBinding[lang]}</p>
    </>
  )
}

export default function TermsOfService({
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

  const lang: EEnFi = language === 'fi' ? EEnFi.Suomi : EEnFi.English

  return (
    <>
      <div className={`terms ${type} ${lightTheme ? styles.light : ''}`}>
        <div className='inner-wrap'>
          <section className={`card`}>
            <div>
              <p>{EEnFiWelcomeToTermsOfService[lang]}</p>
              <p>
                {ESeeAlso[language]}:{' '}
                <Link to='/disclaimer'>{EDisclaimer[language]}</Link>
              </p>

              <h2>{EEnFiAcceptanceOfTerms[lang]}</h2>
              <p>{EEnFiAcceptanceOfTermsText[lang]}</p>

              <h2>{EEnFiChangesToTerms[lang]}</h2>
              <p>{EEnFiChangesToTermsText[lang]}</p>

              <h2>{EEnFiUseOfService[lang]}</h2>
              <p>{EEnFiUseOfServiceText[lang]}</p>

              <h2>{EEnFiTermination[lang]}</h2>
              <p>{EEnFiTerminationText[lang]}</p>

              <h2>{EProducts[language]}</h2>
              <TermsProducts language={language} />

              <h2>{EContactMe[lang]}</h2>
              <p>
                {EContactMeText[lang]}{' '}
                <Link to='/contact'>{EContactMe[lang].toLowerCase()}</Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
