import { useMemo, FC } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Link } from 'react-router-dom'
import styles from './css/about.module.css'
import Hero from '../components/Hero/Hero'
import { IoSettingsSharp } from 'react-icons/io5'
import {
  EAboutThisSite,
  EAlienEyes,
  EBubbles,
  EButtonToToggleBetweenNavigationStyles,
  EContact,
  ECustomSelect,
  EDragAndDrop,
  EDraggable,
  EDraggableBlobs,
  EElementsRotateToFaceCursor,
  EFeaturesOfThisSite,
  EFourStylesAltogether,
  EGeometricShapes,
  EGithubRepository,
  EHeroSection,
  EHoverFocusAnimation,
  EIcon,
  EInteractiveElements,
  EKeyboardFocusMoveItemsWithArrowKeys,
  ELanguageSelect,
  ELanguages,
  ELightDarkModeButton,
  ELogInAndRegisterButtons,
  EMainSite,
  EMovementAccordingToPointerEnterDirection,
  EMultistepForm,
  EPointerEnterDirectionAwareMovement,
  EPortfolio,
  EQuizApp,
  ERemoveWithClickOrEnterWhenFocused,
  ESeeSettingsAtMenuBar,
  ESeeTheTopOfTheCurrentPage,
  ESettings,
  ESiteSettings,
  ETwoStylesAtSmallScreenSizeAndTwoAtLargeScreenSize,
  EWelcome,
} from '../interfaces'
import {
  EAddMoreBlobs,
  EAddTasksToList,
  EAnimatedClipPathsAndTextRotationOnHoverWithDynamicDelay,
  EBackToTopButtonAtTheLowerRightCornerAndAtTheFooter,
  EBlobArtApp,
  ECanBeMovedToTwoOtherContainers,
  ECustomizableOptions,
  EDraggableListElements,
  EExitLinksAtTheTopAndBottomOfThePages,
  EFetchesQuestionsFromAnAPI,
  EGoToItemByTypingTheFirstFewLettersOfTheItem,
  EInThePortfolioSection,
  EKeyboardAccessibleDropDownList,
  EMultipleSelect,
  ENavigateWithArrowKeys,
  EOtherFeatures,
  EPageTransitionAnimation,
  EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo,
  EPressEscapeToSkipToResetButton,
  EReactApps,
  ERemoveBlobs,
  ERemoveTasksOneByOneOrEveryFinishedTaskAtOnce,
  EResetButtonOnTheLowerRightCornerResetsTheInteractiveElements,
  ESavesLatestJokeInLocalStorageAndUsesMongoDBToStore,
  ESeeNumberOfUnfinishedTasks,
  ESingleSelect,
  ESiteColors,
  ESortableWithinTheirContainer,
  ETheSiteColorsLightnessesSwitchInLightMode,
  ETheTranslationsAreDoneWithTheHelpOfGithubCopilotSo,
  EThreeStepFullyFunctionalContactForm,
  EUsesANodeBackendToSendTheMessage,
  EUsesLocalStorageToStoreTheInformation,
  EUsesMongoDBToStoreTheInformationWhenLoggedIn,
  EWaveAnimationAtTheMainHeading,
} from '../interfaces/about'
import { EUserCanChooseTheDifficultyLevel } from '../interfaces/quiz'
import { EChangeableColor, EChangeableSize } from '../interfaces/blobs'
import { ETodoApp } from '../components/Todo/interfaces'
import { ETheComediansCompanion } from '../components/Jokes/interfaces'

type colorProps = {
  i: number
  e: number
  background: string
}

export default function About({
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
  const lightTheme = useTheme()

  const colorsArray: colorProps[] = []

  const setupColorblocks: colorProps[] = useMemo(() => {
    for (let i: number = 1; i <= 20; i++) {
      const item: colorProps = {
        i: i,
        e: 41 - i,
        background: `var(--color-primary-${i})`,
      }
      colorsArray.push(item)
    }

    for (let i: number = 1; i <= 20; i++) {
      const item: colorProps = {
        i: 20 + i,
        e: 21 - i,
        background: `var(--color-secondary-${i})`,
      }
      colorsArray.push(item)
    }
    return colorsArray
  }, [])

  const ColorComponent: FC<{ array: colorProps[] }> = ({ array }) => {
    return (
      <ul style={{ marginTop: '3em' }} className={`fullwidth1 ${styles['color-ul']}`}>
        {array.map((item, index: number) => {
          const itemStyle: React.CSSProperties = {
            backgroundColor: `${item.background}`,
            color:
              item.i < 13 || item.i > 31
                ? 'var(--color-primary-20)'
                : 'var(--color-primary-1)',
            ['--i' as string]: `${item.i}`,
            ['--e' as string]: `${item.e}`,
          }
          const spanStyle: React.CSSProperties = {
            ['--i' as string]: `${item.i}`,
            ['--e' as string]: `${item.e}`,
          }

          return (
            <li
              key={`${item.background}${index}`}
              className={styles.shape}
              style={itemStyle}
            >
              <span style={spanStyle}>{itemStyle.backgroundColor}</span>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className={`about ${type} ${lightTheme ? styles.light : ''}`}>
      <Hero address='about' heading={heading} text={text} />
      <div>
        <section className={`card ${styles.section}`}>
          <div>
            <div className='wide'>
              <p>{EAboutThisSite[language]}</p>
              <p>
                <a href='https://jenniina.fi#portfolio'>{EMainSite[language]}</a>
              </p>
              <p>
                <a href='https://github.com/jenniina/react-sub-site'>
                  {EGithubRepository[language]}
                </a>
              </p>

              <h2 id='site-features'>{EFeaturesOfThisSite[language]}</h2>

              <h3 id='settings' className='left'>
                {ESiteSettings[language]}
              </h3>
              <big>
                {ESeeSettingsAtMenuBar[language]}{' '}
                <IoSettingsSharp
                  style={{ display: 'inline-block', marginBottom: '-0.15em' }}
                />{' '}
                <span className='scr'>{ESettings[language]}</span> {EIcon[language]}
              </big>
              <ul className='ul'>
                <li>
                  {ELanguageSelect[language]}
                  <ul>
                    <li>
                      {ETheTranslationsAreDoneWithTheHelpOfGithubCopilotSo[language]}
                    </li>
                    <li>
                      {
                        EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo[
                          language
                        ]
                      }
                    </li>
                  </ul>
                </li>
                <li>{ELightDarkModeButton[language]}</li>
                <li>
                  {EButtonToToggleBetweenNavigationStyles[language]}
                  <ul>
                    <li>{EFourStylesAltogether[language]}</li>
                    <li>
                      {ETwoStylesAtSmallScreenSizeAndTwoAtLargeScreenSize[language]}
                    </li>
                  </ul>
                </li>
                <li>{ELogInAndRegisterButtons[language]}</li>
              </ul>

              <h3 id='hero' className='left'>
                {EHeroSection[language]}
              </h3>
              <big>{EInteractiveElements[language]}</big>
              <ul className='ul'>
                <li>
                  {EBubbles[language]} ({ESeeTheTopOfTheCurrentPage[language]})
                </li>
                <ul>
                  <li>{EHoverFocusAnimation[language]}</li>
                  <li>{EPointerEnterDirectionAwareMovement[language]}</li>
                </ul>

                <li>
                  {EDraggableBlobs[language]}{' '}
                  <Link to='/portfolio'>({EPortfolio[language]})</Link>
                  <ul>
                    <li>{EDraggable[language]}</li>
                    <li>{EKeyboardFocusMoveItemsWithArrowKeys[language]}</li>
                  </ul>
                </li>
                <li>
                  {EGeometricShapes[language]} <Link to='/'>({EWelcome[language]})</Link>
                  <ul></ul>
                </li>
                <li>
                  {EAlienEyes[language]} <Link to='/contact'>({EContact[language]})</Link>
                  <ul>
                    <li>{EElementsRotateToFaceCursor[language]}</li>
                  </ul>
                </li>
                <li>{EHoverFocusAnimation[language]}</li>
                <li>{EMovementAccordingToPointerEnterDirection[language]}</li>
                <li>{ERemoveWithClickOrEnterWhenFocused[language]}</li>
                <li>
                  {
                    EResetButtonOnTheLowerRightCornerResetsTheInteractiveElements[
                      language
                    ]
                  }
                </li>
                <li>{EPressEscapeToSkipToResetButton[language]}</li>
              </ul>

              <h3 id='react' className='left'>
                {EReactApps[language]}
              </h3>
              <big>
                <Link to='/portfolio'>{EInThePortfolioSection[language]}</Link>
              </big>

              <ul className='ul'>
                <li>
                  <big>
                    <Link to='/portfolio/quiz'>{EQuizApp[language]}</Link>
                  </big>
                  <ul>
                    <li>{EFetchesQuestionsFromAnAPI[language]}</li>
                    <li>{EUserCanChooseTheDifficultyLevel[language]}</li>
                    <li>{EUsesMongoDBToStoreTheInformationWhenLoggedIn[language]}</li>
                  </ul>
                </li>
                <li>
                  <big>
                    <Link to='/portfolio/jokes'>{ETheComediansCompanion[language]}</Link>
                  </big>
                  <ul>
                    <li>{EFetchesQuestionsFromAnAPI[language]}</li>
                    <li>{ECustomizableOptions[language]}</li>
                    <li>
                      {ESavesLatestJokeInLocalStorageAndUsesMongoDBToStore[language]}
                    </li>
                  </ul>
                </li>
                <li>
                  <big>
                    <Link to='/portfolio/blob'>{EBlobArtApp[language]}</Link>
                  </big>
                  <ul>
                    <li>{EDraggableBlobs[language]}</li>
                    <li>{EChangeableColor[language]}</li>
                    <li>{EChangeableSize[language]}</li>
                    <li>{EAddMoreBlobs[language]}</li>
                    <li>{ERemoveBlobs[language]}</li>
                  </ul>
                </li>
                <li>
                  <big>
                    <Link to='/portfolio/draganddrop'>{EDragAndDrop[language]}</Link>
                  </big>
                  <ul>
                    <li>{EDraggableListElements[language]}</li>
                    <li>{ESortableWithinTheirContainer[language]}</li>
                    <li>{ECanBeMovedToTwoOtherContainers[language]}</li>
                    <li>{EKeyboardAccessibleDropDownList[language]}</li>
                  </ul>
                </li>
                <li>
                  <big>
                    <Link to='/portfolio/todo'>{ETodoApp[language]}</Link>
                  </big>
                  <ul>
                    <li>{EAddTasksToList[language]}</li>
                    <li>{ERemoveTasksOneByOneOrEveryFinishedTaskAtOnce[language]}</li>
                    <li>{ESeeNumberOfUnfinishedTasks[language]}</li>
                    <li>{EUsesLocalStorageToStoreTheInformation[language]}</li>
                  </ul>
                </li>
                <li>
                  <big>
                    <Link to='/portfolio/select'>{ECustomSelect[language]}</Link>
                  </big>
                  <ul>
                    <li>{ESingleSelect[language]}</li>
                    <li>{EMultipleSelect[language]}</li>
                    <li>{ENavigateWithArrowKeys[language]}</li>
                    <li>{EGoToItemByTypingTheFirstFewLettersOfTheItem[language]}</li>
                  </ul>
                </li>
                <li>
                  <big>
                    <Link to='/portfolio/form'>{EMultistepForm[language]}</Link>
                  </big>
                  <ul>
                    <li>{EThreeStepFullyFunctionalContactForm[language]}</li>
                    <li>{EUsesANodeBackendToSendTheMessage[language]}</li>
                  </ul>
                </li>
              </ul>
              <h3 id='other' className='left'>
                {EOtherFeatures[language]}
              </h3>
              <ul className='ul'>
                <li>{EPageTransitionAnimation[language]}</li>
                <li>{EWaveAnimationAtTheMainHeading[language]}</li>
                <li>{EBackToTopButtonAtTheLowerRightCornerAndAtTheFooter[language]}</li>
                <li>{EExitLinksAtTheTopAndBottomOfThePages[language]}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={`fullwidth ${styles.section} ${styles.sectioncolor}`}>
          <div className={styles.colortextwrap}>
            <div>
              <div className='wide'>
                <h3 id='color' className='left' style={{ marginTop: 0 }}>
                  {ESiteColors[language]}
                </h3>
                <p>{ETheSiteColorsLightnessesSwitchInLightMode[language]}</p>
                <p>
                  {EAnimatedClipPathsAndTextRotationOnHoverWithDynamicDelay[language]}
                </p>
              </div>
            </div>
          </div>

          <ColorComponent array={setupColorblocks} />
        </section>
      </div>
    </div>
  )
}
