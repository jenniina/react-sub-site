import BlobJS from '../../components/Blob/blobJS'
import Hero from '../../components/Hero/Hero'
import {
  EBlobs,
  EButton,
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
  EDownloadYourArtwork,
  EDragBlobToIconsNextToLayerButtons,
  EEditArtwork,
  EFlyingBird,
  EHue,
  EKeysMayBeUsedWhileMouseIsPressedDown,
  ELayer,
  ELayerInstructions,
  ELayers,
  ELightness,
  ELoginToSaveBlobsToServer,
  EMakeARandomBlobByClickingThePlusSign,
  EMakeBlobLargerByPressingBL,
  EMakeBlobSmallerByPressingS,
  EManyVersions,
  EMoreColorsAvailable,
  EMoveBlobToBottomByPressingZOrToTopByPressingT,
  EMoveEveryBlobUpOrDownOneLayerByPressingTheButtons,
  EMoveViewInDifferentDirections,
  ENameYourArtwork,
  EPlacesTheImageDownBelow,
  EPointerUse,
  EPressEnterToCycleThroughTheDifferentColors,
  EPressTheCameraSymbolToTakeAScreenshot,
  ERemovable,
  ERemoveABlobByDraggingItToTheBottomLeftXSign,
  ERemoveABlobByPressingDeleteOr,
  ERenameYourArtwork,
  EResetTheBlobArrayToANewConfiguration,
  ESampleArtwork,
  ESaturation,
  ESaving,
  EScreenshot,
  ESeeSampleArtworkCreatedWithTheApp,
  ESlidersToControlBackground,
  EStopScrollingBehaviorToUseTheMouseWheelFreely,
  ETabToABlobAndWithItInFocus,
  EToggleControlVisibility,
  EToggleTheSubtleMovementOfTheBlobs,
  ETryDraggingTheBlobs,
  EWhichBlobIsCurrentlyActiveCanBeSeenAtTheTopLeftOfTheContainer,
} from '../../interfaces/blobs'
import '../../components/Blob/css/blob.css'
import Accordion from '../../components/Accordion/Accordion'
import { EClickHereToSeeFeatures } from '../../components/Jokes/interfaces'
import birb from '../../assets/blob-birb.png'
import { CSSProperties } from 'react'

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
  const birbStyle: CSSProperties = {
    width: '100%',
    height: 'auto',
    maxWidth: '100%',
    display: 'block',
    margin: '1em auto',
  }
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
              <div className='flex column gap'>
                <Accordion
                  language={language}
                  text={EClickHereToSeeFeatures[language]}
                  className='features'
                >
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
                        <big>
                          <i>({ENew[language]}!)</i>
                        </big>
                        <ul>
                          <li>{ELayerInstructions[language]}</li>
                          <li>
                            {EChangeTheLayerOfTheFocusedBlobByPressingTheNumber[language]}
                          </li>
                          <li>{EDragBlobToIconsNextToLayerButtons[language]}</li>
                          <li>
                            {EMoveEveryBlobUpOrDownOneLayerByPressingTheButtons[language]}
                          </li>
                        </ul>
                      </li>
                      <li>
                        {ESaving[language]}:{' '}
                        <big>
                          <i>({ENew[language]}!)</i>
                        </big>
                        <ul>
                          <li>{ELoginToSaveBlobsToServer[language]}</li>
                          <li>{EManyVersions[language]}</li>
                          <li>{ENameYourArtwork[language]}</li>
                          <li>{ERenameYourArtwork[language]}</li>
                          <li>{EEditArtwork[language]}</li>
                        </ul>
                      </li>
                      <li>
                        {EScreenshot[language]}:
                        <big>
                          <i>({ENew[language]}!)</i>
                        </big>
                        <ul>
                          <li>{EPressTheCameraSymbolToTakeAScreenshot[language]}</li>
                          <li>{EPlacesTheImageDownBelow[language]}</li>
                          <li>
                            {EDownloadYourArtwork[language]} ({EButton[language]})
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
                          <li>
                            {EStopScrollingBehaviorToUseTheMouseWheelFreely[language]}
                          </li>
                          <li>{EMoveViewInDifferentDirections[language]}</li>
                          <li>{EToggleControlVisibility[language]}</li>
                          <li>
                            {EMakeARandomBlobByClickingThePlusSign[language]} (
                            {EMoreColorsAvailable[language]})
                          </li>
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
                      <li>
                        {EChangeBlobColorByDraggingToAColorNodeOnTheSides[language]}
                      </li>
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
                      <li>{EDragBlobToIconsNextToLayerButtons[language]}</li>
                      <li>{EKeysMayBeUsedWhileMouseIsPressedDown[language]}</li>
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
                          <li>
                            {EMoveBlobToBottomByPressingZOrToTopByPressingT[language]}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </Accordion>
                <Accordion
                  language={language}
                  text={ESeeSampleArtworkCreatedWithTheApp[language]}
                  className='sample-img'
                >
                  <figure>
                    <img src={birb} style={birbStyle} alt={EFlyingBird[language]} />
                    <figcaption>
                      {ESampleArtwork[language]}: {EFlyingBird[language]}
                    </figcaption>
                  </figure>
                </Accordion>
              </div>
            </div>
          </div>
        </section>
        <BlobJS language={language} />
      </div>
    </div>
  )
}
