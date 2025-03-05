import { DragAndDrop } from '../../components/DragAndDrop/components'
import { MdOutlineDragIndicator } from 'react-icons/md'
import { ELanguages } from '../../types'
import Accordion from '../../components/Accordion/Accordion'
import { useContext } from 'react'
import { LanguageContext } from '../../contexts/LanguageContext'

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
  const { t } = useContext(LanguageContext)!

  return (
    <div className={`draganddrop ${type}`}>
      <div className='inner-wrap'>
        <section className='card'>
          <div>
            <div className='medium flex column gap'>
              <Accordion
                language={language}
                text={t('EClickHereToSeeFeatures')}
                className='features'
                wrapperClass='features-wrap'
              >
                <h2>{t('EFeatures')}</h2>
                <ul className='ul'>
                  <li>{t('EDraggableWithAnyPointer')}</li>
                  <li>{t('EKeyboardUseWithADropdownList')}</li>
                  <li>{t('ECanRearrangeWithinTheirContainer')}</li>
                  <li>{t('EStateSavedInLocalStorage')}</li>
                  <li>{t('ECategoriesCanBeRenamed')}</li>
                  <li>{t('ENewColorsCanBeAddedAndRemoved')}</li>
                  <li>
                    {t('EYouMayAlsoAddOtherWordsForGenericUse')}.{' '}
                    {t('ETipIfYouAddAGenericWordYouCanColorTheCard')}
                  </li>
                </ul>
                <h3>{t('EInstructions')}</h3>
                <h4>{t('EPointerAndTouchUse')}</h4>
                <ul className='ul'>
                  <li>{t('EHoldPointerButtonDownToDragAnItemFrom')}</li>
                  <li>{t('EOnTouchDevicesHoldTouchForAMomentToActivateDrag')}</li>
                  <li>
                    {t('EYouMayAlsoUseTheItemMenuToChooseADestination')}:{' '}
                    <MdOutlineDragIndicator
                      aria-hidden='true'
                      style={{ display: 'inline-block', marginBottom: '-0.15em' }}
                    />{' '}
                  </li>
                </ul>
                <h4>{t('EKeyboardUse')}</h4>
                <ul className='ul'>
                  <li>{t('EMoveItemsWithinTheirContainerWithTheUpOrDownArrowKeys')}</li>
                  <li>
                    {t('EToMoveItemsToAnotherContainer')}
                    <ul>
                      <li>
                        {t('EUseTabKeyToNavigateToDragButton')}{' '}
                        <MdOutlineDragIndicator
                          aria-hidden='true'
                          style={{ display: 'inline-block', marginBottom: '-0.15em' }}
                        />{' '}
                        {t('EAndPressEnterKeyToOpenMenu')}
                      </li>
                      <li>{t('EWithTheMenuOpenUseTabKeyToNavigateAnd')}</li>
                    </ul>
                  </li>
                </ul>
              </Accordion>
              <a href='https://github.com/jenniina/react-sub-site/tree/main/src/components/DragAndDrop'>
                Github
              </a>
            </div>
            <h2>{t('EDragAndDrop')}</h2>
            <p className='textcenter'>{t('ESortTheColorsToADifferentContainerOr')}</p>
            <DragAndDrop language={language} />
          </div>
        </section>
      </div>
    </div>
  )
}
