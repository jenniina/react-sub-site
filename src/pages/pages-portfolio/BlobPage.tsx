import BlobJS from '../../components/Blob/blobJS'
import Hero from '../../components/Hero/Hero'
import {
  EBlobs,
  EDraggable,
  EFeatures,
  EInstructions,
  EKeyboardUse,
  ELanguages,
  ENew,
} from '../../interfaces'
import {
  EBlurIntoOneAnother,
  EButtonsTo,
  EChangeBlobColorByDraggingToAColorNodeOnTheSides,
  EChangeBlobSizeByDraggingItToEitherTheLOrSLetterOnTheRightHandSide,
  EChangeBlobSizeByScrollingWithTheMouseWheel,
  EChangeTheLayerOfTheFocusedBlobByPressingTheNumber,
  EChangeableColor,
  EChangeableSize,
  ECloneABlobByDraggingItToTheTopLeftPlusSign,
  ECloneABlobByPressingCOr,
  ECloneable,
  EHue,
  ELayer,
  ELayerInstructions,
  ELayers,
  ELightness,
  EMakeARandomBlobByClickingThePlusSign,
  EMakeBlobLargerByPressingBL,
  EMakeBlobSmallerByPressingS,
  EMoveViewInDifferentDirections,
  EPointerUse,
  EPressEnterToCycleThroughTheDifferentColors,
  ERemovable,
  ERemoveABlobByDraggingItToTheBottomLeftXSign,
  ERemoveABlobByPressingDeleteOr,
  EResetTheBlobArrayToANewConfiguration,
  ESaturation,
  ESlidersToControlBackground,
  EStopScrollingBehaviorToUseTheMouseWheelFreely,
  ETabToABlobAndWithItInFocus,
  EToggleControlVisibility,
  EToggleTheSubtleMovementOfTheBlobs,
  ETryDraggingTheBlobs,
  EWhichBlobIsCurrentlyActiveCanBeSeenAtTheTopLeftOfTheContainer,
} from '../../interfaces/blobs'
import '../../components/Blob/css/blob.css'

export default function BlobPage({
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
    <div className={`blob ${type}`}>
      <Hero
        language={language}
        address='blob'
        heading={heading}
        text={text}
        instructions={ETryDraggingTheBlobs[language]}
      />
      <div className='inner-wrap'>
        <section>
          <div className='card'>
            <div>
              <div className='medium'>
                <h2>{EFeatures[language]}</h2>
                <ul className='ul'>
                  <li>
                    {EBlobs[language]}:
                    <ul>
                      <li>{EDraggable[language]}</li>
                      <li>{EBlurIntoOneAnother[language]}</li>
                      <li>{EChangeableColor[language]}</li>
                      <li>{EChangeableSize[language]}</li>
                      <li>{ECloneable[language]}</li>
                      <li>{ERemovable[language]}</li>
                    </ul>
                  </li>

                  <li>
                    {ELayers[language]}:{' '}
                    <strong>
                      <i>({ENew[language]}!)</i>
                    </strong>
                    <ul>
                      <li>{ELayerInstructions[language]}</li>
                      <li>
                        {EChangeTheLayerOfTheFocusedBlobByPressingTheNumber[language]}
                      </li>
                    </ul>
                  </li>

                  <li>
                    {ESlidersToControlBackground[language]}:
                    <ul>
                      <li>{ELightness[language]}</li>
                      <li>{ESaturation[language]}</li>
                      <li>{EHue[language]}</li>
                    </ul>
                  </li>

                  <li>
                    {EButtonsTo[language]}:
                    <ul>
                      <li>{EToggleTheSubtleMovementOfTheBlobs[language]}</li>
                      <li>{EResetTheBlobArrayToANewConfiguration[language]}</li>
                      <li>{EStopScrollingBehaviorToUseTheMouseWheelFreely[language]}</li>
                      <li>{EMoveViewInDifferentDirections[language]}</li>
                      <li>{EToggleControlVisibility[language]}</li>
                      <li>{EMakeARandomBlobByClickingThePlusSign[language]}</li>
                    </ul>
                  </li>

                  <li>
                    {
                      EWhichBlobIsCurrentlyActiveCanBeSeenAtTheTopLeftOfTheContainer[
                        language
                      ]
                    }
                  </li>
                </ul>
                <h3>{EInstructions[language]}</h3>
                <h4>{EPointerUse[language]}</h4>
                <ul className='ul'>
                  <li>{EChangeBlobColorByDraggingToAColorNodeOnTheSides[language]}</li>
                  <li>
                    {
                      EChangeBlobSizeByDraggingItToEitherTheLOrSLetterOnTheRightHandSide[
                        language
                      ]
                    }
                  </li>
                  <li>{EChangeBlobSizeByScrollingWithTheMouseWheel[language]}</li>
                  <li>{ECloneABlobByDraggingItToTheTopLeftPlusSign[language]}</li>
                  <li>{ERemoveABlobByDraggingItToTheBottomLeftXSign[language]}</li>
                </ul>
                <h4>{EKeyboardUse[language]}</h4>
                <ul className='ul'>
                  <li>
                    {ETabToABlobAndWithItInFocus[language]}
                    <ul>
                      <li>{EPressEnterToCycleThroughTheDifferentColors[language]}</li>
                      <li>{EMakeBlobSmallerByPressingS[language]}</li>
                      <li>{EMakeBlobLargerByPressingBL[language]}</li>
                      <li>{ECloneABlobByPressingCOr[language]}</li>
                      <li>{ERemoveABlobByPressingDeleteOr[language]}</li>
                      <li>
                        {EChangeTheLayerOfTheFocusedBlobByPressingTheNumber[language]}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <BlobJS language={language} />
      </div>
    </div>
  )
}
