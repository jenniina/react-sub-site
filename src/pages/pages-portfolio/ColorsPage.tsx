import AccessibleColors from '../../components/AccessibleColors/AccessibleColors'
import Accordion from '../../components/Accordion/Accordion'
import Hero from '../../components/Hero/Hero'
import { EClickHereToSeeFeatures } from '../../components/Jokes/interfaces'
import { EContains, EDragAndDrop, ELanguages, ERemove, EReset } from '../../interfaces'
import { EToggleControlVisibility } from '../../interfaces/blobs'
import {
  EColorsCanBeReorderedByDragging,
  EEditSize,
  EHintOrganizingColors,
  ERoundIndicatorMarks,
  ESaveAsPNG,
  ESaveAsSVG,
  ESelectColorFormat,
  ETestColorCombinations,
  EToggleColorNameVisibility,
  EWithOrWithoutColorName,
} from '../../interfaces/colors'
import { EColorPicker } from '../../interfaces/form'
import { EClear } from '../../interfaces/select'

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
              <li>{ERoundIndicatorMarks[language]}</li>
              <li>{EColorsCanBeReorderedByDragging[language]}</li>
              <li>{EHintOrganizingColors[language]}</li>
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
                </ul>
              </li>
            </ul>
          </Accordion>
          <AccessibleColors language={language} />
        </section>
      </div>
    </div>
  )
}

export default ColorsPage
