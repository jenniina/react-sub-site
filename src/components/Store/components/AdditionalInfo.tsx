import { FC, Dispatch, SetStateAction } from 'react'
import { ELanguages, EPleaseNote } from '../../../interfaces'
import {
  EColorsMayVaryInPrintedWorks,
  EHourlyWork,
  EHourlyWorkCanBeUsed,
  EICanHelpWithFindingHosting,
  EIncludesADesignMeetingWithTheClientForWebsite,
  EPayFor10HoursGet13,
  EPayFor5HoursGet6,
  EPrintingCostsNotIncluded,
  ESeeTranslationServiceProduct,
  ETextAndImageContentIsNotIncluded,
  ETheseAreAgreedSeparately,
  EWebHostingAndDomainNotIncluded,
  EWordPressPaidPluginsNotIncluded,
  ICanHelpWithFindingPrintingServices,
  ICartItem,
} from '../../../interfaces/store'
import { EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo } from '../../../interfaces/about'
import { scrollIntoView } from '../../../utils'

export interface AccProps {
  type: ICartItem['id']
  language: ELanguages
  styles: CSSModuleClasses
  classNameWrap: string
  isOpen: boolean
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
  text?: string
}

const AdditionalInfo: FC<AccProps> = ({
  language,
  type,
  styles,
  classNameWrap,
  isOpen,
  setIsFormOpen,
  text,
}) => {
  return (
    <div className={styles['addition-wrap']}>
      <div className={styles['additional-information']}>
        <h3 style={{ marginTop: 0 }}>
          {type.startsWith('misc')
            ? `${EHourlyWork[language]}: `
            : `${EPleaseNote[language]}: `}
        </h3>
        {type.startsWith('graphic') ? (
          <>
            <p>
              {EPrintingCostsNotIncluded[language]}.{' '}
              {ICanHelpWithFindingPrintingServices[language]}
            </p>
            <p>{EColorsMayVaryInPrintedWorks[language]}</p>
            {language !== ELanguages.English && language !== ELanguages.Suomi && (
              <p>
                {
                  EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo[
                    language
                  ]
                }
              </p>
            )}
          </>
        ) : type.startsWith('react') || type.startsWith('wordpress') ? (
          <>
            <p> {EIncludesADesignMeetingWithTheClientForWebsite[language]}</p>
            <p>
              {ETextAndImageContentIsNotIncluded[language]}.{' '}
              <button
                className='reset link'
                onClick={() => scrollIntoView('misc-translation')}
              >
                {ESeeTranslationServiceProduct[language]}
              </button>
            </p>
            <p>
              {EWebHostingAndDomainNotIncluded[language]}.{' '}
              {EICanHelpWithFindingHosting[language]}
            </p>
            {type.startsWith('wordpress') && (
              <p>
                {EWordPressPaidPluginsNotIncluded[language]}{' '}
                {ETheseAreAgreedSeparately[language]}
              </p>
            )}
            {language !== ELanguages.English && language !== ELanguages.Suomi && (
              <p>
                {
                  EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo[
                    language
                  ]
                }
              </p>
            )}
          </>
        ) : type.startsWith('misc') ? (
          <>
            <p>
              {EPayFor5HoursGet6[language]} {EPayFor10HoursGet13[language]}
            </p>
            <p>{EHourlyWorkCanBeUsed[language]}</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default AdditionalInfo
