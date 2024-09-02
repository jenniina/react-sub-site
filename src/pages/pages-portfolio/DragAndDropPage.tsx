import { DragAndDrop } from '../../components/DragAndDrop/components'
import Hero from '../../components/Hero/Hero'
import { MdOutlineDragIndicator } from 'react-icons/md'
import {
  ECategoriesCanBeRenamed,
  EDragAndDrop,
  EFeatures,
  EInstructions,
  EKeyboardUse,
  ELanguages,
} from '../../interfaces'
import {
  EAndPressEnterKeyToOpenMenu,
  ECanRearrangeWithinTheirContainer,
  EDraggableWithAnyPointer,
  EHoldPointerButtonDownToDragAnItemFrom,
  EKeyboardUseWithADropdownList,
  EMoveItemsWithinTheirContainerWithTheUpOrDownArrowKeys,
  ENewColorsCanBeAdded,
  ENewColorsCanBeAddedAndRemoved,
  EOnTouchDevicesHoldTouchForAMomentToActivateDrag,
  EPointerAndTouchUse,
  ESortTheColorsToADifferentContainerOr,
  EStateSavedInLocalStorage,
  EToMoveItemsToAnotherContainer,
  EUseTabKeyToNavigateToDragButton,
  EWithTheMenuOpenUseTabKeyToNavigateAnd,
  EYouMayAlsoUseTheItemMenuToChooseADestination,
} from '../../interfaces/draganddrop'
import { ETryDraggingTheBlobs } from '../../interfaces/blobs'
import Accordion from '../../components/Accordion/Accordion'
import { EClickHereToSeeFeatures } from '../../components/Jokes/interfaces'

export default function DragAndDropPage({
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
  return (
    <div className={`draganddrop ${type}`}>
      <Hero
        language={language}
        address='draganddrop'
        heading={heading}
        text={text}
        instructions={ETryDraggingTheBlobs[language]}
      />
      <div className='inner-wrap'>
        <section className='card'>
          <div>
            <div className='medium'>
              <Accordion
                language={language}
                text={EClickHereToSeeFeatures[language]}
                className='features'
              >
                <h2>{EFeatures[language]}</h2>
                <ul className='ul'>
                  <li>{EDraggableWithAnyPointer[language]}</li>
                  <li>{EKeyboardUseWithADropdownList[language]}</li>
                  <li>{ECanRearrangeWithinTheirContainer[language]}</li>
                  <li>{EStateSavedInLocalStorage[language]}</li>
                  <li>{ECategoriesCanBeRenamed[language]}</li>
                  <li>{ENewColorsCanBeAddedAndRemoved[language]}</li>
                </ul>
                <h3>{EInstructions[language]}</h3>
                <h4>{EPointerAndTouchUse[language]}</h4>
                <ul className='ul'>
                  <li>{EHoldPointerButtonDownToDragAnItemFrom[language]}</li>
                  <li>{EOnTouchDevicesHoldTouchForAMomentToActivateDrag[language]}</li>
                  <li>
                    {EYouMayAlsoUseTheItemMenuToChooseADestination[language]}:{' '}
                    <MdOutlineDragIndicator
                      aria-hidden='true'
                      style={{ display: 'inline-block', marginBottom: '-0.15em' }}
                    />{' '}
                  </li>
                </ul>
                <h4>{EKeyboardUse[language]}</h4>
                <ul className='ul'>
                  <li>
                    {EMoveItemsWithinTheirContainerWithTheUpOrDownArrowKeys[language]}
                  </li>
                  <li>
                    {EToMoveItemsToAnotherContainer[language]}
                    <ul>
                      <li>
                        {EUseTabKeyToNavigateToDragButton[language]}{' '}
                        <MdOutlineDragIndicator
                          aria-hidden='true'
                          style={{ display: 'inline-block', marginBottom: '-0.15em' }}
                        />{' '}
                        {EAndPressEnterKeyToOpenMenu[language]}
                      </li>
                      <li>{EWithTheMenuOpenUseTabKeyToNavigateAnd[language]}</li>
                    </ul>
                  </li>
                </ul>
              </Accordion>
            </div>
            <h2>{EDragAndDrop[language]}</h2>
            <p>{ESortTheColorsToADifferentContainerOr[language]}</p>
            <DragAndDrop language={language} />
          </div>
        </section>
      </div>
    </div>
  )
}
