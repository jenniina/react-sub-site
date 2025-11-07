import { DragAndDrop } from "../../components/DragAndDrop/components";
import { MdOutlineDragIndicator } from "react-icons/md";
import { ELanguages } from "../../types";
import Accordion from "../../components/Accordion/Accordion";
import { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import * as HelmetAsync from "react-helmet-async";
const { Helmet } = HelmetAsync;

export default function DragAndDropPage({
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

  return (
    <>
      <Helmet prioritizeSeoTags={true}>
        <title>
          {t("DragAndDrop")} | {t("DragAndDropAppIntro")}
        </title>
        <meta name="description" content={t("DragAndDropAppIntro")} />
        <link
          rel="canonical"
          href={`https://react.jenniina.fi/portfolio/draganddrop`}
        />
        <meta
          property="og:title"
          content={`${t("DragAndDrop")} | react.jenniina.fi`}
        />
        <meta property="og:description" content={t("DragAndDropAppIntro")} />
        <meta
          property="og:url"
          content={`https://react.jenniina.fi/portfolio/draganddrop`}
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className={`draganddrop ${type}`}>
        <div className="inner-wrap">
          <section className="card">
            <div>
              <div className="medium flex column gap">
                <Accordion
                  language={language}
                  text={t("ClickHereToSeeFeatures")}
                  className="features"
                  wrapperClass="features-wrap"
                >
                  <h2>{t("Features")}</h2>
                  <ul className="ul">
                    <li>{t("DraggableWithAnyPointer")}</li>
                    <li>{t("KeyboardUseWithADropdownList")}</li>
                    <li>{t("CanRearrangeWithinTheirContainer")}</li>
                    <li>{t("StateSavedInLocalStorage")}</li>
                    <li>{t("CategoriesCanBeRenamed")}</li>
                    <li>{t("NewColorsCanBeAddedAndRemoved")}</li>
                    <li>
                      {t("YouMayAlsoAddOtherWordsForGenericUse")}.{" "}
                      {t("TipIfYouAddAGenericWordYouCanColorTheCard")}
                    </li>
                  </ul>
                  <h3>{t("Instructions")}</h3>
                  <h4>{t("PointerAndTouchUse")}</h4>
                  <ul className="ul">
                    <li>{t("HoldPointerButtonDownToDragAnItemFrom")}</li>
                    <li>
                      {t("OnTouchDevicesHoldTouchForAMomentToActivateDrag")}
                    </li>
                    <li>
                      {t("YouMayAlsoUseTheItemMenuToChooseADestination")}:{" "}
                      <MdOutlineDragIndicator
                        aria-hidden="true"
                        style={{
                          display: "inline-block",
                          marginBottom: "-0.15em",
                        }}
                      />{" "}
                    </li>
                  </ul>
                  <h4>{t("KeyboardUse")}</h4>
                  <ul className="ul">
                    <li>
                      {t(
                        "MoveItemsWithinTheirContainerWithTheUpOrDownArrowKeys"
                      )}
                    </li>
                    <li>
                      {t("ToMoveItemsToAnotherContainer")}
                      <ul>
                        <li>
                          {t("UseTabKeyToNavigateToDragButton")}{" "}
                          <MdOutlineDragIndicator
                            aria-hidden="true"
                            style={{
                              display: "inline-block",
                              marginBottom: "-0.15em",
                            }}
                          />{" "}
                          {t("AndPressEnterKeyToOpenMenu")}
                        </li>
                        <li>{t("WithTheMenuOpenUseTabKeyToNavigateAnd")}</li>
                      </ul>
                    </li>
                  </ul>
                </Accordion>
                <a href="https://github.com/jenniina/react-sub-site/tree/main/src/components/DragAndDrop">
                  Github
                </a>
              </div>
              <h2>{t("DragAndDrop")}</h2>
              <p className="textcenter">
                {t("SortTheColorsToADifferentContainerOr")}
              </p>
              <DragAndDrop language={language} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
