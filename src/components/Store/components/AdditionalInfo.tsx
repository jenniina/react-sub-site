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
          {type.startsWith('misc') ? `${t('HourlyWork')}: ` : `${t('PleaseNote')}: `}
        </h3>
        {type.startsWith('graphic') ? (
          <>
            <p>
              {t('PrintingCostsNotIncluded')}. {t('ICanHelpWithFindingPrintingServices')}
            </p>
            <p>{t('ColorsMayVaryInPrintedWorks')}</p>
            {language !== ELanguages.en && language !== ELanguages.fi && (
              <p>
                {t('PleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo')}
              </p>
            )}
          </>
        ) : type.startsWith('react') || type.startsWith('wordpress') ? (
          <>
            <p> {t('IncludesADesignMeetingWithTheClientForWebsite')}</p>
            <p>
              {t('TextAndImageContentIsNotIncluded')}.{' '}
              <button
                className='reset link'
                onClick={() => scrollIntoView('misc-translation')}
              >
                {t('SeeTranslationServiceProduct')}
              </button>
            </p>
            <p>
              {t('WebHostingAndDomainNotIncluded')}. {t('ICanHelpWithFindingHosting')}
            </p>
            {type.startsWith('wordpress') && (
              <p>
                {t('WordPressPaidPluginsNotIncluded')} {t('TheseAreAgreedSeparately')}
              </p>
            )}
            {language !== ELanguages.en && language !== ELanguages.fi && (
              <p>
                {t('PleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo')}
              </p>
            )}
          </>
        ) : type.startsWith('misc') ? (
          <>
            <p>
              {t('PayFor5HoursGet6')} {t('PayFor10HoursGet13')}
            </p>
            <p>{t('HourlyWorkCanBeUsed')}</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default AdditionalInfo
