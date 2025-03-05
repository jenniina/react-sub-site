import { lazy, Suspense, useContext } from 'react'
import Accordion from '../../components/Accordion/Accordion'
import { ELanguages } from '../../types'
import { LanguageContext } from '../../contexts/LanguageContext'

const AccessibleColors = lazy(
  () => import('../../components/AccessibleColors/AccessibleColors')
)

const ColorsPage = ({
  heading,
  text,
  type,
  language,
}: {
  heading: string
  text: string
  type: string
  language: ELanguages
}) => {
  const { t } = useContext(LanguageContext)!

  return (
    <div className={`colors ${type}`}>
      <div className='inner-wrap'>
        <section>
          <Accordion
            text={t('EClickHereToSeeFeatures')}
            className='gray'
            wrapperClass=''
            language={language}
          >
            <ul className='ul medium'>
              <li>{t('ETestColorCombinations')}</li>
              <li>{t('ETheRoundIndicatorHollowIndicatorAndSmallHollowSquare')}</li>
              <li>{t('EColorsCanBeReorderedByDragging')}</li>
              <li>{t('ERandomColorGeneration')}</li>
              <li>{t('EHintOrganizingColors')}</li>
              <li>{t('ENeedAFreshSetOfColors')}</li>
              <li>
                {t('EColorModes')}: {t('EAnalogous')} / {t('EComplementary')} /{' '}
                {t('EMonochromatic')} / {t('ETriad')} / {t('ETetrad')}
              </li>
              <li>
                {t('EContains')}
                <ul>
                  <li>{t('EColorPicker')}</li>
                  <li>{t('ESelectColorFormat')}</li>
                  <li>{t('EDragAndDrop')}</li>
                  <li>{t('EToggleColorNameVisibility')}</li>
                  <li>{t('EToggleControlVisibility')}</li>
                  <li>{t('EEditSize')}</li>
                  <li>
                    {t('ESaveAsSVG')} ({t('EWithOrWithoutColorName')})
                  </li>
                  <li>
                    {t('ESaveAsPNG')} ({t('EWithOrWithoutColorName')})
                  </li>
                  <li>{t('ERemove')}</li>
                  <li>{t('EReset')}</li>
                  <li>{t('EClear')}</li>
                  <li>
                    {t('ELightMode')}/{t('EDarkMode')}
                  </li>
                  <li>{t('EGenerateColors')}</li>
                </ul>
              </li>
            </ul>
          </Accordion>
          <Suspense
            fallback={
              <div className='flex center margin0auto textcenter'>{t('ELoading')}...</div>
            }
          >
            <AccessibleColors language={language} />
          </Suspense>
        </section>
      </div>
    </div>
  )
}

export default ColorsPage
