import { lazy, Suspense, useContext } from 'react'
import { ELanguages } from '../../types'
import '../../components/Blob/css/blob.css'
import Accordion from '../../components/Accordion/Accordion'
import birb from '../../assets/blob-birb.png'
import fish from '../../assets/blob-fish.png'
import bubbly from '../../assets/bubbly-fish.png'
import dog from '../../assets/blob-dog.png'
import { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../../contexts/LanguageContext'

const Blobs = lazy(() => import('../../components/Blob/Blobs'))

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
  const { t } = useContext(LanguageContext)!

  const blobStyle: CSSProperties = {
    width: '100%',
    height: 'auto',
    maxWidth: '100%',
    display: 'block',
    margin: '1em auto',
  }
  return (
    <div className={`blob ${type}`}>
      <div className='inner-wrap'>
        <section>
          <div className='card'>
            <div>
              <div className='flex column gap'>
                <Accordion
                  language={language}
                  text={t('EClickHereToSeeFeatures')}
                  className='features-blobs'
                  wrapperClass='features-blobs-wrap'
                  showButton
                >
                  <div className='medium'>
                    <h2>{t('EFeatures')}</h2>
                    <ul className='ul'>
                      <li>
                        {t('EBlobs')}:
                        <ul>
                          <li>{t('EDraggable')}</li>
                          <li>{t('EBlurIntoOneAnother')}</li>
                          <li>{t('EChangeableColor')}</li>
                          <li>{t('EChangeableSize')}</li>
                          <li>{t('ECloneable')}</li>
                          <li>{t('ERemovable')}</li>
                        </ul>
                      </li>

                      <li>
                        {t('ELayers')}:{' '}
                        <big>
                          <i>({t('ENew')}!)</i>
                        </big>
                        <ul>
                          <li>{t('ELayerInstructions')}</li>
                          <li>
                            {t('EChangeTheLayerOfTheFocusedBlobByPressingTheNumber')}
                          </li>
                          <li>{t('EDragBlobToIconsNextToLayerButtons')}</li>
                          <li>
                            {t('EMoveEveryBlobUpOrDownOneLayerByPressingTheButtons')}
                          </li>
                        </ul>
                      </li>
                      <li>
                        {t('ESaving')}:{' '}
                        <big>
                          <i>({t('ENew')}!)</i>
                        </big>
                        <ul>
                          <li>{t('ELoginToSaveBlobsToServer')}</li>
                          <li>{t('EManyVersions')}</li>
                          <li>{t('ENameYourArtwork')}</li>
                          <li>{t('ERenameYourArtwork')}</li>
                          <li>{t('EEditArtwork')}</li>
                        </ul>
                      </li>
                      <li>
                        {t('EScreenshot')}:
                        <big>
                          <i>({t('ENew')}!)</i>
                        </big>
                        <ul>
                          <li>{t('EPressTheCameraSymbolToTakeAScreenshot')}</li>
                          <li>{t('EPlacesTheImageDownBelow')}</li>
                          <li>
                            {t('EDownloadYourArtwork')} ({t('EButton')})
                          </li>
                          <li>
                            {t(
                              'EYouCanChangeTheDimensionsOfTheScreenshotByResizingYourBrowserWindow'
                            )}
                          </li>
                        </ul>
                      </li>

                      <li>
                        {t('ESlidersToControlBackground')}:
                        <ul>
                          <li>{t('ELightness')}</li>
                          <li>{t('ESaturation')}</li>
                          <li>{t('EHue')}</li>
                        </ul>
                      </li>

                      <li>
                        {t('EButtonsTo')}:
                        <ul>
                          <li>{t('EToggleTheSubtleMovementOfTheBlobs')}</li>
                          <li>{t('EResetTheBlobArrayToANewConfiguration')}</li>
                          <li>{t('EStopScrollingBehaviorToUseTheMouseWheelFreely')}</li>
                          <li>{t('EMoveViewInDifferentDirections')}</li>
                          <li>{t('EToggleControlVisibility')}</li>
                          <li>
                            {t('EMakeARandomBlobByClickingThePlusSign')}.{' '}
                            {t('EMoreColorsAvailable')}:{' '}
                            {t('EOverAThousandPossibleColorCombinations')}
                          </li>
                        </ul>
                      </li>
                      <li>
                        {t(
                          'EWhichBlobIsCurrentlyActiveCanBeSeenAtTheTopLeftOfTheContainer'
                        )}
                      </li>
                      <li>
                        {t(
                          'EOnTouchscreensTapTheBlobTwiceToShrinkItAndThriceToEnlargeIt'
                        )}
                      </li>
                    </ul>
                    <h3>{t('EInstructions')}</h3>
                    <h4>{t('EPointerUse')}</h4>
                    <ul className='ul'>
                      <li>{t('EChangeBlobColorByDraggingToAColorNodeOnTheSides')}</li>
                      <li>
                        {t(
                          'EChangeBlobSizeByDraggingItToEitherTheLOrSLetterOnTheRightHandSide'
                        )}
                      </li>
                      <li>{t('EChangeBlobSizeByScrollingWithTheMouseWheel')}</li>
                      <li>
                        {t('ECloneABlobByClickingTheTopLeftPlusSign')}.{' '}
                        {t('ERememberToDisableTheButtonWhenFinished')}
                      </li>
                      <li>
                        {t('ERemoveABlobByClickingTheBottomLeftXSign')}.{' '}
                        {t('ERememberToDisableTheButtonWhenFinished')}
                      </li>
                      <li>{t('EDragBlobToIconsNextToLayerButtons')}</li>
                      <li>{t('EKeysMayBeUsedWhileMouseIsPressedDown')}</li>
                    </ul>
                    <h4>{t('EKeyboardUse')}</h4>
                    <ul className='ul'>
                      <li>
                        {t('ETabToABlobAndWithItInFocus')}
                        <ul>
                          <li>{t('EPressEnterToCycleThroughTheDifferentColors')}</li>
                          <li>{t('EMakeBlobSmallerByPressingS')}</li>
                          <li>{t('EMakeBlobLargerByPressingBL')}</li>
                          <li>{t('ECloneABlobByPressingCOr')}</li>
                          <li>{t('EMakeANewRandomBlobByPressingPlus')}</li>
                          <li>{t('ERemoveABlobByPressingDeleteOr')}</li>
                          <li>
                            {t('EChangeTheLayerOfTheFocusedBlobByPressingTheNumber')}
                          </li>
                          <li>{t('EMoveBlobToBottomByPressingZOrToTopByPressingT')}</li>{' '}
                          <li>
                            {t(
                              'EPressSpaceOrRWithABlobInFocusToCycleThroughRandomColors'
                            )}
                            : {t('EOverAThousandPossibleColorCombinations')}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </Accordion>
                <Accordion
                  language={language}
                  text={t('ESeeSampleArtworkCreatedWithTheApp')}
                  className='sample-img'
                  wrapperClass='sample-img-wrap'
                  showButton
                >
                  <>
                    <figure>
                      <img src={birb} style={blobStyle} alt={t('EFlyingBird')} />
                      <figcaption>
                        {t('ESampleArtwork')}: {t('EFlyingBird')}
                      </figcaption>
                    </figure>
                    <figure>
                      <img src={fish} style={blobStyle} alt={t('ESwimmingFish')} />
                      <figcaption>
                        {t('ESampleArtwork')}: {t('ESwimmingFish')}
                      </figcaption>
                    </figure>
                    <figure>
                      <img src={bubbly} style={blobStyle} alt={t('EBubblesAndFish')} />
                      <figcaption>
                        {t('ESampleArtwork')}: {t('EBubblesAndFish')}
                      </figcaption>
                    </figure>
                    <figure>
                      <img src={dog} style={blobStyle} alt={`${t('EDog')}?`} />
                      <figcaption>
                        {t('ESampleArtwork')}: {`${t('EDog')}?`}
                      </figcaption>
                    </figure>
                  </>
                </Accordion>
                <Accordion
                  language={language}
                  text={t('ETipsAndTricks')}
                  className='blob-tips-and-tricks'
                  wrapperClass='blob-tips-and-tricks-wrap'
                >
                  <>
                    <h2 id='blob-tips-heading'>{t('ETipsAndTricks')}</h2>
                    <ul className='ul' aria-describedby='blob-tips-heading'>
                      <li>
                        {t('EIfYouNeedToSetABlobNearTheEdgeOfTheScreen')}.{' '}
                        {t(
                          'EYouMayAlsoMoveTheEntireViewWithTheAngleQuotationMarkButtons'
                        )}{' '}
                      </li>
                      <li>{t('EYouMayChangeBlobSizeWithTheMouseWheel')} </li>
                      <li>{t('EYouMayUseKeyboardShortcutsWhileMouseIsPressedDown')} </li>
                      <li>
                        {t('EMoreColorsAvailableThroughRandomBlobButton')}.{' '}
                        {t('EOverAThousandPossibleColorCombinations')}{' '}
                        {t('EYouMayCloneARareColorBlobByPressingCOrD')}
                      </li>
                      <li>
                        {t(
                          'EYouCanChangeTheDimensionsOfTheScreenshotByResizingYourBrowserWindow'
                        )}
                      </li>
                      <li>
                        {t(
                          'EIfABlobYouClickedHidesAnotherYouMayPlaceTheBlobBackToTheBottomOfThePile'
                        )}
                      </li>
                      <li>
                        <>{t('ERegisterAndLogInToSaveYourArtwork')}</>{' '}
                        <div>
                          <Link to='?login=login'>{t('ELogin')}</Link>
                          &nbsp;&nbsp;/&nbsp;&nbsp;
                          <Link to='?register=register'>{t('ERegister')}</Link>
                        </div>
                      </li>
                    </ul>
                  </>
                </Accordion>
                <a href='https://github.com/jenniina/react-sub-site/tree/main/src/components/Blob'>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
        <Suspense
          fallback={
            <div className='flex center margin0auto textcenter'>{t('ELoading')}...</div>
          }
        >
          <Blobs language={language} />
        </Suspense>
      </div>
    </div>
  )
}
