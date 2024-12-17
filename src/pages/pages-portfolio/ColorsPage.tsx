import { lazy, Suspense } from 'react'
//import AccessibleColors from '../../components/AccessibleColors/AccessibleColors'
import Accordion from '../../components/Accordion/Accordion'
import Hero from '../../components/Hero/Hero'
import { EClickHereToSeeFeatures } from '../../components/Jokes/interfaces'
import {
  EContains,
  EDarkMode,
  EDragAndDrop,
  ELanguages,
  ELightMode,
  ELoading,
  ERemove,
  EReset,
} from '../../interfaces'
import { EToggleControlVisibility } from '../../interfaces/blobs'
import {
  EColorsCanBeReorderedByDragging,
  EEditSize,
  EHintOrganizingColors,
  ETheRoundIndicatorHollowIndicatorAndSmallHollowSquare,
  ESaveAsPNG,
  ESaveAsSVG,
  ESelectColorFormat,
  ETestColorCombinations,
  EToggleColorNameVisibility,
  EWithOrWithoutColorName,
  EGenerateColors,
  ERandomColorGeneration,
  ENeedAFreshSetOfColors,
  EAnalogous,
  EComplementary,
  EMonochromatic,
  ETriad,
  ETetrad,
  EColorModes,
} from '../../interfaces/colors'
import { EColorPicker } from '../../interfaces/form'
import { EClear } from '../../interfaces/select'

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
  return (
    <div className={`colors ${type}`}>
      <Hero language={language} address='colors' heading={heading} text={text} />
      <div className='inner-wrap'>
        <section>
          <Accordion
            text={EClickHereToSeeFeatures[language]}
            className='gray'
            wrapperClass=''
            language={language}
          >
            <ul className='ul medium'>
              <li>{ETestColorCombinations[language]}</li>
              <li>{ETheRoundIndicatorHollowIndicatorAndSmallHollowSquare[language]}</li>
              <li>{EColorsCanBeReorderedByDragging[language]}</li>
              <li>{ERandomColorGeneration[language]}</li>
              <li>{EHintOrganizingColors[language]}</li>
              <li>{ENeedAFreshSetOfColors[language]}</li>
              <li>
                {EColorModes[language]}: {EAnalogous[language]} /{' '}
                {EComplementary[language]} / {EMonochromatic[language]} /{' '}
                {ETriad[language]} / {ETetrad[language]}
              </li>
              <li>
                {EContains[language]}
                <ul>
                  <li>{EColorPicker[language]}</li>
                  <li>{ESelectColorFormat[language]}</li>
                  <li>{EDragAndDrop[language]}</li>
                  <li>{EToggleColorNameVisibility[language]}</li>
                  <li>{EToggleControlVisibility[language]}</li>
                  <li>{EEditSize[language]}</li>
                  <li>
                    {ESaveAsSVG[language]} ({EWithOrWithoutColorName[language]})
                  </li>
                  <li>
                    {ESaveAsPNG[language]} ({EWithOrWithoutColorName[language]})
                  </li>
                  <li>{ERemove[language]}</li>
                  <li>{EReset[language]}</li>
                  <li>{EClear[language]}</li>
                  <li>
                    {ELightMode[language]}/{EDarkMode[language]}
                  </li>
                  <li>{EGenerateColors[language]}</li>
                </ul>
              </li>
            </ul>
          </Accordion>
          <Suspense
            fallback={
              <div className='flex center margin0auto textcenter'>
                {ELoading[language]}...
              </div>
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
