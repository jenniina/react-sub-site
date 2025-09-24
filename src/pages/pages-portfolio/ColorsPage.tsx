import { lazy, Suspense, useContext } from 'react'
import Accordion from '../../components/Accordion/Accordion'
import { ELanguages } from '../../types'
import { LanguageContext } from '../../contexts/LanguageContext'
import { Helmet } from 'react-helmet-async'

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
    <>
      <Helmet>
        <title>
          {t('ColorAccessibility')} | {t('WCAGTool')}
        </title>
        <meta
          name='description'
          content={`${t('ColorAccessibility')} - ${t('WCAGTool')} - ${t(
            'TestColorCombinations'
          )}`}
        />
        <link rel='canonical' href={`https://react.jenniina.fi/portfolio/colors`} />
      </Helmet>
      <div className={`colors ${type}`}>
        <div className='inner-wrap'>
          <section>
            <Accordion
              text={t('ClickHereToSeeFeatures')}
              className='gray'
              wrapperClass=''
              language={language}
            >
              <ul className='ul medium'>
                <li>{t('TestColorCombinations')}</li>
                <li>{t('TheRoundIndicatorHollowIndicatorAndSmallHollowSquare')}</li>
                <li>{t('ColorsCanBeReorderedByDragging')}</li>
                <li>{t('RandomColorGeneration')}</li>
                <li>{t('HintOrganizingColors')}</li>
                <li>{t('NeedAFreshSetOfColors')}</li>
                <li>
                  {t('ColorModes')}: {t('Analogous')} / {t('Complementary')} /{' '}
                  {t('Monochromatic')} / {t('Triad')} / {t('Tetrad')}
                </li>
                <li>
                  {t('Contains')}
                  <ul>
                    <li>{t('ColorPicker')}</li>
                    <li>{t('SelectColorFormat')}</li>
                    <li>{t('DragAndDrop')}</li>
                    <li>{t('ToggleColorNameVisibility')}</li>
                    <li>{t('ToggleControlVisibility')}</li>
                    <li>{t('EditSize')}</li>
                    <li>
                      {t('SaveAsSVG')} ({t('WithOrWithoutColorName')})
                    </li>
                    <li>
                      {t('SaveAsPNG')} ({t('WithOrWithoutColorName')})
                    </li>
                    <li>{t('Remove')}</li>
                    <li>{t('Reset')}</li>
                    <li>{t('Clear')}</li>
                    <li>
                      {t('LightMode')}/{t('DarkMode')}
                    </li>
                    <li>{t('GenerateColors')}</li>
                  </ul>
                </li>
              </ul>
            </Accordion>
            <Suspense
              fallback={
                <div className='flex center margin0auto textcenter'>
                  {t('Loading')}...
                </div>
              }
            >
              <AccessibleColors language={language} />
            </Suspense>
          </section>
        </div>
      </div>
    </>
  )
}

export default ColorsPage
