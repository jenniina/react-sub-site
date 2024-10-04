import Blobs from '../../components/Blob/Blobs'
import Hero from '../../components/Hero/Hero'
import {
  EBlobs,
  EButton,
  EDraggable,
  EFeatures,
  EInstructions,
  EKeyboardUse,
  ELanguages,
  ELogin,
  ENew,
  ERegister,
} from '../../interfaces'
import {
  EBlurIntoOneAnother,
  EBubblesAndFish,
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
  EDog,
  EDownloadYourArtwork,
  EDragBlobToIconsNextToLayerButtons,
  EEditArtwork,
  EFlyingBird,
  EHue,
  EIfABlobYouClickedHidesAnotherYouMayPlaceTheBlobBackToTheBottomOfThePile,
  EIfYouNeedToSetABlobNearTheEdgeOfTheScreen,
  EKeysMayBeUsedWhileMouseIsPressedDown,
  ELayerInstructions,
  ELayers,
  ELightness,
  ELoginToSaveBlobsToServer,
  EMakeANewRandomBlobByPressingPlus,
  EMakeARandomBlobByClickingThePlusSign,
  EMakeBlobLargerByPressingBL,
  EMakeBlobSmallerByPressingS,
  EManyVersions,
  EMoreColorsAvailable,
  EMoreColorsAvailableThroughRandomBlobButton,
  EMoveBlobToBottomByPressingZOrToTopByPressingT,
  EMoveEveryBlobUpOrDownOneLayerByPressingTheButtons,
  EMoveViewInDifferentDirections,
  ENameYourArtwork,
  EOnTouchscreensTapTheBlobTwiceToShrinkItAndThriceToEnlargeIt,
  EOverAThousandPossibleColorCombinations,
  EPlacesTheImageDownBelow,
  EPointerUse,
  EPressEnterToCycleThroughTheDifferentColors,
  EPressSpaceOrRWithABlobInFocusToCycleThroughRandomColors,
  EPressTheCameraSymbolToTakeAScreenshot,
  ERegisterAndLogInToSaveYourArtwork,
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
  ESwimmingFish,
  ETabToABlobAndWithItInFocus,
  ETipsAndTricks,
  EToggleControlVisibility,
  EToggleTheSubtleMovementOfTheBlobs,
  ETryDraggingTheBlobs,
  EWhichBlobIsCurrentlyActiveCanBeSeenAtTheTopLeftOfTheContainer,
  EYouCanChangeTheDimensionsOfTheScreenshotByResizingYourBrowserWindow,
  EYouMayAlsoMoveTheEntireViewWithTheAngleQuotationMarkButtons,
  EYouMayChangeBlobSizeWithTheMouseWheel,
  EYouMayCloneARareColorBlobByPressingCOrD,
  EYouMayUseKeyboardShortcutsWhileMouseIsPressedDown,
} from '../../interfaces/blobs'
import '../../components/Blob/css/blob.css'
import Accordion from '../../components/Accordion/Accordion'
import { EClickHereToSeeFeatures } from '../../components/Jokes/interfaces'
import birb from '../../assets/blob-birb.png'
import fish from '../../assets/blob-fish.png'
import bubbly from '../../assets/bubbly-fish.png'
import dog from '../../assets/blob-dog.png'
import { CSSProperties } from 'react'
import { Link } from 'react-router-dom'

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
  const blobStyle: CSSProperties = {
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
                  className='features-blobs'
                  showButton
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
                          <li>
                            {
                              EYouCanChangeTheDimensionsOfTheScreenshotByResizingYourBrowserWindow[
                                language
                              ]
                            }
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
                            {EMakeARandomBlobByClickingThePlusSign[language]}.{' '}
                            {EMoreColorsAvailable[language]}:{' '}
                            {EOverAThousandPossibleColorCombinations[language]}
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
                      <li>
                        {
                          EOnTouchscreensTapTheBlobTwiceToShrinkItAndThriceToEnlargeIt[
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
                          <li>{EMakeANewRandomBlobByPressingPlus[language]}</li>
                          <li>{ERemoveABlobByPressingDeleteOr[language]}</li>
                          <li>
                            {EChangeTheLayerOfTheFocusedBlobByPressingTheNumber[language]}
                          </li>
                          <li>
                            {EMoveBlobToBottomByPressingZOrToTopByPressingT[language]}
                          </li>{' '}
                          <li>
                            {
                              EPressSpaceOrRWithABlobInFocusToCycleThroughRandomColors[
                                language
                              ]
                            }
                            : {EOverAThousandPossibleColorCombinations[language]}
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
                  showButton
                >
                  <figure>
                    <img src={birb} style={blobStyle} alt={EFlyingBird[language]} />
                    <figcaption>
                      {ESampleArtwork[language]}: {EFlyingBird[language]}
                    </figcaption>
                  </figure>
                  <figure>
                    <img src={fish} style={blobStyle} alt={ESwimmingFish[language]} />
                    <figcaption>
                      {ESampleArtwork[language]}: {ESwimmingFish[language]}
                    </figcaption>
                  </figure>
                  <figure>
                    <img src={bubbly} style={blobStyle} alt={EBubblesAndFish[language]} />
                    <figcaption>
                      {ESampleArtwork[language]}: {EBubblesAndFish[language]}
                    </figcaption>
                  </figure>
                  <figure>
                    <img src={dog} style={blobStyle} alt={`${EDog[language]}?`} />
                    <figcaption>
                      {ESampleArtwork[language]}: {`${EDog[language]}?`}
                    </figcaption>
                  </figure>
                </Accordion>
                <Accordion
                  language={language}
                  text={ETipsAndTricks[language]}
                  className='blob-tips-and-tricks'
                >
                  <h2 id='blob-tips-heading'>{ETipsAndTricks[language]}</h2>
                  <ul className='ul' aria-describedby='blob-tips-heading'>
                    <li>
                      {EIfYouNeedToSetABlobNearTheEdgeOfTheScreen[language]}.{' '}
                      {
                        EYouMayAlsoMoveTheEntireViewWithTheAngleQuotationMarkButtons[
                          language
                        ]
                      }{' '}
                    </li>
                    <li>{EYouMayChangeBlobSizeWithTheMouseWheel[language]} </li>
                    <li>
                      {EYouMayUseKeyboardShortcutsWhileMouseIsPressedDown[language]}{' '}
                    </li>
                    <li>
                      {EMoreColorsAvailableThroughRandomBlobButton[language]}.{' '}
                      {EOverAThousandPossibleColorCombinations[language]}{' '}
                      {EYouMayCloneARareColorBlobByPressingCOrD[language]}
                    </li>
                    <li>
                      {
                        EYouCanChangeTheDimensionsOfTheScreenshotByResizingYourBrowserWindow[
                          language
                        ]
                      }
                    </li>
                    <li>
                      {
                        EIfABlobYouClickedHidesAnotherYouMayPlaceTheBlobBackToTheBottomOfThePile[
                          language
                        ]
                      }
                    </li>
                    <li>
                      <>{ERegisterAndLogInToSaveYourArtwork[language]}</>{' '}
                      <div>
                        <Link to='?login=login'>{ELogin[language]}</Link>
                        &nbsp;&nbsp;/&nbsp;&nbsp;
                        <Link to='?register=register'>{ERegister[language]}</Link>
                      </div>
                    </li>
                  </ul>
                </Accordion>
                <a href='https://github.com/jenniina/react-sub-site/tree/main/src/components/Blob'>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
        <Blobs language={language} />
      </div>
    </div>
  )
}
