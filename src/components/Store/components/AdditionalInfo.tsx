import { FC, Dispatch, SetStateAction, useContext } from 'react'
import { ELanguages } from '../../../types'
import { ICartItem } from '../../../types/store'
import { scrollIntoView } from '../../../utils'
import { LanguageContext } from '../../../contexts/LanguageContext'

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
  const { t } = useContext(LanguageContext)!

  return (
    <div className={styles['addition-wrap']}>
      <div className={styles['additional-information']}>
        <h3 style={{ marginTop: 0 }}>
          {type.startsWith('misc') ? `${t('EHourlyWork')}: ` : `${t('EPleaseNote')}: `}
        </h3>
        {type.startsWith('graphic') ? (
          <>
            <p>
              {t('EPrintingCostsNotIncluded')}. {t('ICanHelpWithFindingPrintingServices')}
            </p>
            <p>{t('EColorsMayVaryInPrintedWorks')}</p>
            {language !== ELanguages.en && language !== ELanguages.fi && (
              <p>
                {t('EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo')}
              </p>
            )}
          </>
        ) : type.startsWith('react') || type.startsWith('wordpress') ? (
          <>
            <p> {t('EIncludesADesignMeetingWithTheClientForWebsite')}</p>
            <p>
              {t('ETextAndImageContentIsNotIncluded')}.{' '}
              <button
                className='reset link'
                onClick={() => scrollIntoView('misc-translation')}
              >
                {t('ESeeTranslationServiceProduct')}
              </button>
            </p>
            <p>
              {t('EWebHostingAndDomainNotIncluded')}. {t('EICanHelpWithFindingHosting')}
            </p>
            {type.startsWith('wordpress') && (
              <p>
                {t('EWordPressPaidPluginsNotIncluded')} {t('ETheseAreAgreedSeparately')}
              </p>
            )}
            {language !== ELanguages.en && language !== ELanguages.fi && (
              <p>
                {t('EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo')}
              </p>
            )}
          </>
        ) : type.startsWith('misc') ? (
          <>
            <p>
              {t('EPayFor5HoursGet6')} {t('EPayFor10HoursGet13')}
            </p>
            <p>{t('EHourlyWorkCanBeUsed')}</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default AdditionalInfo
