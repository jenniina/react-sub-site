import { DragAndDrop } from '../../components/DragAndDrop/components'
import Icon from '../../components/Icon/Icon'
import Accordion from '../../components/Accordion/Accordion'
import { useLanguageContext } from '../../contexts/LanguageContext'
import SEO from '../../components/SEO/SEO'

export default function DragAndDropPage({ type }: { type: string }) {
  const { t } = useLanguageContext()

  return (
    <>
      <SEO
        title={`${t('DragAndDrop')} | ${t('DragAndDropAppIntro')}`}
        description={t('DragAndDropAppIntro')}
        canonicalUrl="https://react.jenniina.fi/portfolio/draganddrop"
        ogTitle={`${t('DragAndDrop')} | react.jenniina.fi`}
      />
      <div className={`draganddrop ${type}`}>
        <div className="inner-wrap">
          <section className="card">
            <div>
              <div className="medium flex column gap">
                <Accordion
                  text={t('ClickHereToSeeFeatures')}
                  className="features"
                  wrapperClass="features-wrap"
                >
                  <h2>{t('Features')}</h2>
                  <ul className="ul">
                    <li>{t('DraggableWithAPointer')}</li>
                    <li>{t('KeyboardUseWithADropdownList')}</li>
                    <li>{t('CanRearrangeWithinTheirContainer')}</li>
                    <li>{t('StateSavedInLocalStorage')}</li>
                    <li>{t('CategoriesCanBeRenamed')}</li>
                    <li>{t('NewColorsCanBeAddedAndRemoved')}</li>
                    <li>
                      {t('YouMayAlsoAddOtherWordsForGenericUse')}.{' '}
                      {t('TipIfYouAddAGenericWordYouCanColorTheCard')}
                    </li>
                    <li>
                      <strong>{t('New')}: </strong>{' '}
                      {t('AlsoWorksWithHexColors')}
                    </li>
                    <li>
                      <strong>{t('New')}: </strong>{' '}
                      {t('YouMayEditTheColorLater')}
                    </li>{' '}
                    <li>
                      <strong>{t('New')}: </strong>{' '}
                      {t('SetCustomBackgroundColors')}
                    </li>
                    <li>
                      <strong>{t('New')}: </strong>{' '}
                      {t('YouMayEditTheBackgroundColorBy')}
                    </li>
                  </ul>
                  <h3>{t('Instructions')}</h3>
                  <h4>{t('PointerAndTouchUse')}</h4>
                  <ul className="ul">
                    <li>{t('HoldPointerButtonDownToDragAnItemFrom')}</li>
                    <li>
                      {t('OnTouchDevicesHoldTouchForAMomentToActivateDrag')}
                    </li>
                    <li>
                      {t('YouMayAlsoUseTheItemMenuToChooseADestination')}:{' '}
                      <Icon
                        lib="md"
                        name="MdOutlineDragIndicator"
                        aria-hidden="true"
                        style={{
                          display: 'inline-block',
                          marginBottom: '-0.15em',
                        }}
                      />{' '}
                    </li>
                  </ul>
                  <h4>{t('KeyboardUse')}</h4>
                  <ul className="ul">
                    <li>
                      {t(
                        'MoveItemsWithinTheirContainerWithTheUpOrDownArrowKeys'
                      )}
                    </li>
                    <li>
                      {t('ToMoveItemsToAnotherContainer')}
                      <ul>
                        <li>
                          {t('UseTabKeyToNavigateToDragButton')}{' '}
                          <Icon
                            lib="md"
                            name="MdOutlineDragIndicator"
                            aria-hidden="true"
                            style={{
                              display: 'inline-block',
                              marginBottom: '-0.15em',
                            }}
                          />{' '}
                          {t('AndPressEnterKeyToOpenMenu')}
                        </li>
                        <li>{t('WithTheMenuOpenUseTabKeyToNavigateAnd')}</li>
                      </ul>
                    </li>
                  </ul>
                </Accordion>
                <a href="https://github.com/jenniina/react-sub-site/tree/main/src/components/DragAndDrop">
                  Github
                </a>
              </div>
              <h2>{t('DragAndDrop')}</h2>
              <p className="textcenter">
                {t('SortTheColorsToADifferentContainerOr')}
              </p>
            </div>
          </section>
          <DragAndDrop />
        </div>
      </div>
    </>
  )
}
