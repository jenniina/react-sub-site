import { useMemo, lazy, Suspense } from 'react'
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
  EEightSidedJewels,
  EElements,
  EElementsRotateToFaceCursor,
  EFeaturesOfThisSite,
  EFourSidedJewels,
  EHeroSection,
  EHoverFocusAnimation,
  EIcon,
  EInteractiveElements,
  EInvertedTriangles,
  EKeyboardFocusMoveItemsWithArrowKeys,
  ELanguageSelect,
  ELanguages,
  ELightDarkModeButton,
  ELoading,
  ELogInAndRegisterButtons,
  EMainSite,
  EMovementAccordingToPointerEnterDirection,
  EMultistepForm,
  EPleaseReportAnyIssuesWithTheSiteToJenniina,
  EPortfolio,
  EQuizApp,
  ERemoveWithClickOrEnterWhenFocused,
  EReplacedByUserEditAndLogoutButtonsWhenLoggedIn,
  ESeeSettingsAtMenuBar,
  ESeeTheTopOfTheCurrentPage,
  ESettings,
  ESiteSettings,
  ESquaresStandingOnTheirCorner,
  EStore,
  ESurvey,
  ETwoStylesAtSmallScreenSizeAndTwoAtLargeScreenSize,
} from '../types'
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
  ENodeGithubRepository,
  EOtherFeatures,
  EPageTransitionAnimation,
  EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo,
  EPressEscapeToSkipToResetButton,
  EReactApps,
  EReactGithubRepository,
  ERemoveBlobs,
  ERemoveTasksOneByOneOrEveryFinishedTaskAtOnce,
  EResetButtonOnTheLowerRightCornerResetsTheInteractiveElements,
  ESavesLatestJokeInLocalStorageAndUsesMongoDBToStore,
  ESeeNumberOfUnfinishedTasks,
  ESingleSelect,
  ESiteColors,
  ESortableWithinTheirContainer,
  ETheSiteColorsLightnessesSwitchInLightMode1,
  ETheSiteColorsLightnessesSwitchInLightMode2,
  ETheSiteIsTranslatedToSixLanguagesWhichWere,
  ETheTranslationsAreDoneWithTheHelpOfGithubCopilotSo,
  EThreeStepFullyFunctionalContactForm,
  EUsesANodeBackendToSendTheMessage,
  EUsesLocalStorageToStoreTheInformation,
  EUsesMongoDBToStoreTheInformationWhenLoggedIn,
  EWaveAnimationAtTheMainHeading,
} from '../types/about'
import { EUserCanChooseTheDifficultyLevel } from '../types/quiz'
import { EChangeableColor, EChangeableSize } from '../types/blobs'
import { ETodoApp } from '../components/Todo/types'
import { ETheComediansCompanion } from '../components/Jokes/types'
import { EComposerPage, EMusicNotes } from '../types/composer'
import { ECart } from '../types/store'

const ColorComponent = lazy(() => import('../components/About/ColorComponent'))

export type colorProps = {
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
        e: 51 - i,
        background: `var(--color-primary-${i})`,
      }
      colorsArray.push(item)
    }

    for (let i: number = 1; i <= 20; i++) {
      const item: colorProps = {
        i: 20 + i,
        e: 31 - i,
        background: `var(--color-secondary-${i})`,
      }
      colorsArray.push(item)
    }

    for (let i: number = 1; i <= 10; i++) {
      const item: colorProps = {
        i: 40 + i,
        e: 11 - i,
        background: `var(--color-gray-${i})`,
      }
      colorsArray.push(item)
    }
    const visitedItem = { i: 51, e: 0, background: 'var(--color-visited)' }

    colorsArray.push(visitedItem)

    return colorsArray
  }, [])

  return (
    <div className={`about ${type} ${lightTheme ? styles.light : ''}`}>
      <div>
        <section className={`card ${styles.section}`}>
          <div>
            <div className='wide'>
              <p>{EAboutThisSite[language]}</p>
              <p>
                <a href='https://jenniina.fi'>{EMainSite[language]}</a>
              </p>
              <p>
                <a href='https://github.com/jenniina/react-sub-site'>
                  {EReactGithubRepository[language]}
                </a>
              </p>
              <p>
                <a href='https://github.com/jenniina/react-bg'>
                  {ENodeGithubRepository[language]}
                </a>
              </p>
              <p>{ETheSiteIsTranslatedToSixLanguagesWhichWere[language]}</p>
              <p>
                {EPleaseReportAnyIssuesWithTheSiteToJenniina[language]}:{' '}
                <Link to='/portfolio/select?survey=true'>
                  {ESurvey[language].toLowerCase()}
                </Link>{' '}
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
                <span className='scr'>{ESettings[language]}</span> -
                {EIcon[language].toLowerCase()}
              </big>
              <ul className='ul'>
                <li>
                  {ELanguageSelect[language]}
                  <ul>
                    <li>
                      {ETheTranslationsAreDoneWithTheHelpOfGithubCopilotSo[language]}
                    </li>
                    {language !== ELanguages.Suomi && language !== ELanguages.English && (
                      <li>
                        {
                          EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo[
                            language
                          ]
                        }
                      </li>
                    )}
                  </ul>
                </li>
                <li>{ELightDarkModeButton[language]}</li>
                <li>
                  {EButtonToToggleBetweenNavigationStyles[language]}
                  <ul>
                    <li>
                      {ETwoStylesAtSmallScreenSizeAndTwoAtLargeScreenSize[language]}
                    </li>
                  </ul>
                </li>
                <li>
                  {ELogInAndRegisterButtons[language]}.{' '}
                  {EReplacedByUserEditAndLogoutButtonsWhenLoggedIn[language]}
                </li>
              </ul>

              <h3 id='hero' className='left'>
                {EHeroSection[language]}
              </h3>
              <big>{EInteractiveElements[language]}</big>
              <ul className='ul'>
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
                <li>{EKeyboardFocusMoveItemsWithArrowKeys[language]}</li>
                <li>
                  {EElements[language]}
                  <ul>
                    <li>
                      {EBubbles[language]} ({ESeeTheTopOfTheCurrentPage[language]})
                    </li>
                    <li>
                      {EMusicNotes[language]}{' '}
                      <Link to='/portfolio/composer'>({EComposerPage[language]})</Link>
                    </li>
                    <li>
                      {EFourSidedJewels[language]}{' '}
                      <Link to='/store'>({EStore[language]})</Link>
                    </li>
                    <li>
                      {EEightSidedJewels[language]}{' '}
                      <Link to='/cart'>({ECart[language]})</Link>
                    </li>
                    <li>
                      {EDraggableBlobs[language]}{' '}
                      <Link to='/portfolio'>({EPortfolio[language]})</Link>
                    </li>
                    <li>
                      {ESquaresStandingOnTheirCorner[language]}{' '}
                      <Link to='/portfolio/todo'>({ETodoApp[language]})</Link>
                    </li>
                    <li>
                      {EInvertedTriangles[language]}{' '}
                      <Link to='/portfolio/quiz'>({EQuizApp[language]})</Link>
                    </li>
                    <li>
                      {EAlienEyes[language]}{' '}
                      <Link to='/contact'>({EContact[language]})</Link>
                      <ul>
                        <li>{EElementsRotateToFaceCursor[language]}</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>

              <h3 id='react' className='left'>
                {EReactApps[language]}
              </h3>
              <big>
                <Link to='/portfolio'>{EInThePortfolioSection[language]}</Link>
              </big>

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
                <p>
                  {ETheSiteColorsLightnessesSwitchInLightMode1[language]}{' '}
                  <code>var(--color-primary-1)</code>{' '}
                  {ETheSiteColorsLightnessesSwitchInLightMode2[language]}
                </p>
                <p>
                  {EAnimatedClipPathsAndTextRotationOnHoverWithDynamicDelay[language]}
                </p>
              </div>
            </div>
          </div>
          <Suspense
            fallback={
              <div className='flex center margin0auto textcenter'>
                {ELoading[language]}...
              </div>
            }
          >
            <ColorComponent array={setupColorblocks} />
          </Suspense>
        </section>
      </div>
    </div>
  )
}
