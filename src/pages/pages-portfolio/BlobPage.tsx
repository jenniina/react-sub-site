import { lazy, Suspense, useContext } from "react";
import { ELanguages } from "../../types";
import "../../components/Blob/css/blob.css";
import Accordion from "../../components/Accordion/Accordion";
import birb from "../../assets/blob-birb.png";
import fish from "../../assets/blob-fish.png";
import bubbly from "../../assets/bubbly-fish.png";
import dog from "../../assets/blob-dog.png";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import * as HelmetAsync from "react-helmet-async";
const { Helmet } = HelmetAsync;

const Blobs = lazy(() => import("../../components/Blob/Blobs"));

export default function BlobPage({
  heading,
  text,
  type,
  language,
}: {
  heading: string;
  text: string;
  type: string;
  language: ELanguages;
}) {
  const { t } = useContext(LanguageContext)!;

  const blobStyle: CSSProperties = {
    width: "100%",
    height: "auto",
    maxWidth: "100%",
    display: "block",
    margin: "1em auto",
  };
  return (
    <>
      <Helmet prioritizeSeoTags={true}>
        <title>
          {t("Blobs")} | {t("BlobAppSlogan")}
        </title>
        <meta name="description" content={t("BlobAppIntro")} />
        <link
          rel="canonical"
          href={`https://react.jenniina.fi/portfolio/blob`}
        />
        <meta
          property="og:title"
          content={`${t("Blobs")} | ${t("BlobAppSlogan")}`}
        />
        <meta property="og:description" content={t("BlobAppIntro")} />
        <meta
          property="og:url"
          content={`https://react.jenniina.fi/portfolio/blob`}
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className={`blob ${type}`}>
        <div className="inner-wrap">
          <section>
            <div className="card">
              <div>
                <div className="flex column gap">
                  <Accordion
                    language={language}
                    text={t("ClickHereToSeeFeatures")}
                    className="features-blobs"
                    wrapperClass="features-blobs-wrap"
                    showButton
                  >
                    <div className="medium">
                      <h2>{t("Features")}</h2>
                      <ul className="ul">
                        <li>
                          {t("Blobs")}:
                          <ul>
                            <li>{t("Draggable")}</li>
                            <li>{t("BlurIntoOneAnother")}</li>
                            <li>{t("ChangeableColor")}</li>
                            <li>{t("ChangeableSize")}</li>
                            <li>{t("Cloneable")}</li>
                            <li>{t("Removable")}</li>
                          </ul>
                        </li>

                        <li>
                          {t("Layers")}:{" "}
                          <big>
                            <i>({t("New")}!)</i>
                          </big>
                          <ul>
                            <li>{t("LayerInstructions")}</li>
                            <li>
                              {t(
                                "ChangeTheLayerOfTheFocusedBlobByPressingTheNumber"
                              )}
                            </li>
                            <li>{t("DragBlobToIconsNextToLayerButtons")}</li>
                            <li>
                              {t(
                                "MoveEveryBlobUpOrDownOneLayerByPressingTheButtons"
                              )}
                            </li>
                          </ul>
                        </li>
                        <li>
                          {t("Saving")}:{" "}
                          <big>
                            <i>({t("New")}!)</i>
                          </big>
                          <ul>
                            <li>{t("LoginToSaveBlobsToServer")}</li>
                            <li>{t("ManyVersions")}</li>
                            <li>{t("NameYourArtwork")}</li>
                            <li>{t("RenameYourArtwork")}</li>
                            <li>{t("EditArtwork")}</li>
                          </ul>
                        </li>
                        <li>
                          {t("Screenshot")}:
                          <big>
                            <i>({t("New")}!)</i>
                          </big>
                          <ul>
                            <li>
                              {t("PressTheCameraSymbolToTakeAScreenshot")}
                            </li>
                            <li>{t("PlacesTheImageDownBelow")}</li>
                            <li>
                              {t("DownloadYourArtwork")} ({t("Button")})
                            </li>
                            <li>
                              {t(
                                "YouCanChangeTheDimensionsOfTheScreenshotByResizingYourBrowserWindow"
                              )}
                            </li>
                          </ul>
                        </li>

                        <li>
                          {t("SlidersToControlBackground")}:
                          <ul>
                            <li>{t("Lightness")}</li>
                            <li>{t("Saturation")}</li>
                            <li>{t("Hue")}</li>
                          </ul>
                        </li>

                        <li>
                          {t("ButtonsTo")}:
                          <ul>
                            <li>{t("ToggleTheSubtleMovementOfTheBlobs")}</li>
                            <li>{t("ResetTheBlobArrayToANewConfiguration")}</li>
                            <li>
                              {t(
                                "StopScrollingBehaviorToUseTheMouseWheelFreely"
                              )}
                            </li>
                            <li>{t("MoveViewInDifferentDirections")}</li>
                            <li>{t("ToggleControlVisibility")}</li>
                            <li>
                              {t("MakeARandomBlobByClickingThePlusSign")}.{" "}
                              {t("MoreColorsAvailable")}:{" "}
                              {t("OverAThousandPossibleColorCombinations")}
                            </li>
                          </ul>
                        </li>
                        <li>
                          {t(
                            "WhichBlobIsCurrentlyActiveCanBeSeenAtTheTopLeftOfTheContainer"
                          )}
                        </li>
                        <li>
                          {t(
                            "OnTouchscreensTapTheBlobTwiceToShrinkItAndThriceToEnlargeIt"
                          )}
                        </li>
                      </ul>
                      <h3>{t("Instructions")}</h3>
                      <h4>{t("PointerUse")}</h4>
                      <ul className="ul">
                        <li>
                          {t("ChangeBlobColorByDraggingToAColorNodeOnTheSides")}
                        </li>
                        <li>
                          {t(
                            "ChangeBlobSizeByDraggingItToEitherTheLOrSLetterOnTheRightHandSide"
                          )}
                        </li>
                        <li>
                          {t("ChangeBlobSizeByScrollingWithTheMouseWheel")}
                        </li>
                        <li>
                          {t("CloneABlobByClickingTheTopLeftPlusSign")}.{" "}
                          {t("RememberToDisableTheButtonWhenFinished")}
                        </li>
                        <li>
                          {t("RemoveABlobByClickingTheBottomLeftXSign")}.{" "}
                          {t("RememberToDisableTheButtonWhenFinished")}
                        </li>
                        <li>{t("DragBlobToIconsNextToLayerButtons")}</li>
                        <li>{t("KeysMayBeUsedWhileMouseIsPressedDown")}</li>
                      </ul>
                      <h4>{t("KeyboardUse")}</h4>
                      <ul className="ul">
                        <li>
                          {t("TabToABlobAndWithItInFocus")}
                          <ul>
                            <li>
                              {t("PressEnterToCycleThroughTheDifferentColors")}
                            </li>
                            <li>{t("MakeBlobSmallerByPressingS")}</li>
                            <li>{t("MakeBlobLargerByPressingBL")}</li>
                            <li>{t("CloneABlobByPressingCOr")}</li>
                            <li>{t("MakeANewRandomBlobByPressingPlus")}</li>
                            <li>{t("RemoveABlobByPressingDeleteOr")}</li>
                            <li>
                              {t(
                                "ChangeTheLayerOfTheFocusedBlobByPressingTheNumber"
                              )}
                            </li>
                            <li>
                              {t(
                                "MoveBlobToBottomByPressingZOrToTopByPressingT"
                              )}
                            </li>{" "}
                            <li>
                              {t(
                                "PressSpaceOrRWithABlobInFocusToCycleThroughRandomColors"
                              )}
                              : {t("OverAThousandPossibleColorCombinations")}
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </Accordion>
                  <Accordion
                    language={language}
                    text={t("SeeSampleArtworkCreatedWithTheApp")}
                    className="sample-img"
                    wrapperClass="sample-img-wrap"
                    showButton
                  >
                    <>
                      <figure>
                        <img
                          src={birb}
                          style={blobStyle}
                          alt={t("FlyingBird")}
                        />
                        <figcaption>
                          {t("SampleArtwork")}: {t("FlyingBird")}
                        </figcaption>
                      </figure>
                      <figure>
                        <img
                          src={fish}
                          style={blobStyle}
                          alt={t("SwimmingFish")}
                        />
                        <figcaption>
                          {t("SampleArtwork")}: {t("SwimmingFish")}
                        </figcaption>
                      </figure>
                      <figure>
                        <img
                          src={bubbly}
                          style={blobStyle}
                          alt={t("BubblesAndFish")}
                        />
                        <figcaption>
                          {t("SampleArtwork")}: {t("BubblesAndFish")}
                        </figcaption>
                      </figure>
                      <figure>
                        <img src={dog} style={blobStyle} alt={`${t("Dog")}?`} />
                        <figcaption>
                          {t("SampleArtwork")}: {`${t("Dog")}?`}
                        </figcaption>
                      </figure>
                    </>
                  </Accordion>
                  <Accordion
                    language={language}
                    text={t("TipsAndTricks")}
                    className="blob-tips-and-tricks"
                    wrapperClass="blob-tips-and-tricks-wrap"
                  >
                    <>
                      <h2 id="blob-tips-heading">{t("TipsAndTricks")}</h2>
                      <ul className="ul" aria-describedby="blob-tips-heading">
                        <li>
                          {t("IfYouNeedToSetABlobNearTheEdgeOfTheScreen")}.{" "}
                          {t(
                            "YouMayAlsoMoveTheEntireViewWithTheAngleQuotationMarkButtons"
                          )}{" "}
                        </li>
                        <li>{t("YouMayChangeBlobSizeWithTheMouseWheel")} </li>
                        <li>
                          {t(
                            "YouMayUseKeyboardShortcutsWhileMouseIsPressedDown"
                          )}{" "}
                        </li>
                        <li>
                          {t("MoreColorsAvailableThroughRandomBlobButton")}.{" "}
                          {t("OverAThousandPossibleColorCombinations")}{" "}
                          {t("YouMayCloneARareColorBlobByPressingCOrD")}
                        </li>
                        <li>
                          {t(
                            "YouCanChangeTheDimensionsOfTheScreenshotByResizingYourBrowserWindow"
                          )}
                        </li>
                        <li>
                          {t(
                            "IfABlobYouClickedHidesAnotherYouMayPlaceTheBlobBackToTheBottomOfThePile"
                          )}
                        </li>
                        <li>
                          <>{t("RegisterAndLogInToSaveYourArtwork")}</>{" "}
                          <div>
                            <Link to="?login=login">{t("Login")}</Link>
                            &nbsp;&nbsp;/&nbsp;&nbsp;
                            <Link to="?register=register">{t("Register")}</Link>
                          </div>
                        </li>
                      </ul>
                    </>
                  </Accordion>
                  <a href="https://github.com/jenniina/react-sub-site/tree/main/src/components/Blob">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </section>
          <Suspense
            fallback={
              <div className="flex center margin0auto textcenter">
                {t("Loading")}...
              </div>
            }
          >
            <Blobs language={language} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
