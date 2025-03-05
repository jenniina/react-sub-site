import { useMemo, lazy, Suspense, useContext } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Link } from 'react-router-dom'
import styles from './css/about.module.css'
import { IoSettingsSharp } from 'react-icons/io5'
import { ELanguages } from '../types'
import { LanguageContext } from '../contexts/LanguageContext'

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
  const { t } = useContext(LanguageContext)!

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
              <p>{t('EAboutThisSite')}</p>
              <p>
                <a href='https://jenniina.fi'>{t('EMainSite')}</a>
              </p>
              <p>
                <a href='https://github.com/jenniina/react-sub-site'>
                  {t('EReactGithubRepository')}
                </a>
              </p>
              <p>
                <a href='https://github.com/jenniina/react-bg'>
                  {t('ENodeGithubRepository')}
                </a>
              </p>
              <p>{t('ETheSiteIsTranslatedToSixLanguagesWhichWere')}</p>
              <p>
                {t('EPleaseReportAnyIssuesWithTheSiteToJenniina')}:{' '}
                <Link to='/portfolio/select?survey=true'>
                  {t('ESurvey').toLowerCase()}
                </Link>{' '}
              </p>

              <h2 id='site-features'>{t('EFeaturesOfThisSite')}</h2>

              <h3 id='settings' className='left'>
                {t('ESiteSettings')}
              </h3>
              <big>
                {t('ESeeSettingsAtMenuBar')}{' '}
                <IoSettingsSharp
                  style={{ display: 'inline-block', marginBottom: '-0.15em' }}
                />{' '}
                <span className='scr'>{t('ESettings')}</span> -{t('EIcon').toLowerCase()}
              </big>
              <ul className='ul'>
                <li>
                  {t('ELanguageSelect')}
                  <ul>
                    <li>{t('ETheTranslationsAreDoneWithTheHelpOfGithubCopilotSo')}</li>
                    {language !== ELanguages.fi && language !== ELanguages.en && (
                      <li>
                        {t(
                          'EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo'
                        )}
                      </li>
                    )}
                  </ul>
                </li>
                <li>{t('ELightDarkModeButton')}</li>
                <li>
                  {t('EButtonToToggleBetweenNavigationStyles')}
                  <ul>
                    <li>{t('ETwoStylesAtSmallScreenSizeAndTwoAtLargeScreenSize')}</li>
                  </ul>
                </li>
                <li>
                  {t('ELogInAndRegisterButtons')}.{' '}
                  {t('EReplacedByUserEditAndLogoutButtonsWhenLoggedIn')}
                </li>
              </ul>

              <h3 id='hero' className='left'>
                {t('EHeroSection')}
              </h3>
              <big>{t('EInteractiveElements')}</big>
              <ul className='ul'>
                <li>{t('EHoverFocusAnimation')}</li>
                <li>{t('EMovementAccordingToPointerEnterDirection')}</li>
                <li>{t('ERemoveWithClickOrEnterWhenFocused')}</li>
                <li>
                  {t('EResetButtonOnTheLowerRightCornerResetsTheInteractiveElements')}
                </li>
                <li>{t('EPressEscapeToSkipToResetButton')}</li>
                <li>{t('EKeyboardFocusMoveItemsWithArrowKeys')}</li>
                <li>
                  {t('EElements')}
                  <ul>
                    <li>
                      {t('EBubbles')} ({t('ESeeTheTopOfTheCurrentPage')})
                    </li>
                    <li>
                      {t('EMusicNotes')}{' '}
                      <Link to='/portfolio/composer'>({t('EComposerPage')})</Link>
                    </li>
                    <li>
                      {t('EFourSidedJewels')} <Link to='/store'>({t('EStore')})</Link>
                    </li>
                    <li>
                      {t('EEightSidedJewels')} <Link to='/cart'>({t('ECart')})</Link>
                    </li>
                    <li>
                      {t('EDraggableBlobs')}{' '}
                      <Link to='/portfolio'>({t('EPortfolio')})</Link>
                    </li>
                    <li>
                      {t('ESquaresStandingOnTheirCorner')}{' '}
                      <Link to='/portfolio/todo'>({t('ETodoApp')})</Link>
                    </li>
                    <li>
                      {t('EInvertedTriangles')}{' '}
                      <Link to='/portfolio/quiz'>({t('EQuizApp')})</Link>
                    </li>
                    <li>
                      {t('EAlienEyes')} <Link to='/contact'>({t('EContact')})</Link>
                      <ul>
                        <li>{t('EElementsRotateToFaceCursor')}</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>

              <h3 id='react' className='left'>
                {t('EReactApps')}
              </h3>
              <big>
                <Link to='/portfolio'>{t('EInThePortfolioSection')}</Link>
              </big>

              <h3 id='other' className='left'>
                {t('EOtherFeatures')}
              </h3>
              <ul className='ul'>
                <li>{t('EPageTransitionAnimation')}</li>
                <li>{t('EWaveAnimationAtTheMainHeading')}</li>
                <li>{t('EBackToTopButtonAtTheLowerRightCornerAndAtTheFooter')}</li>
                <li>{t('EExitLinksAtTheTopAndBottomOfThePages')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={`fullwidth ${styles.section} ${styles.sectioncolor}`}>
          <div className={styles.colortextwrap}>
            <div>
              <div className='wide'>
                <h3 id='color' className='left' style={{ marginTop: 0 }}>
                  {t('ESiteColors')}
                </h3>
                <p>
                  {t('ETheSiteColorsLightnessesSwitchInLightMode1')}{' '}
                  <code>var(--color-primary-1)</code>{' '}
                  {t('ETheSiteColorsLightnessesSwitchInLightMode2')}
                </p>
                <p>{t('EAnimatedClipPathsAndTextRotationOnHoverWithDynamicDelay')}</p>
              </div>
            </div>
          </div>
          <Suspense
            fallback={
              <div className='flex center margin0auto textcenter'>{t('ELoading')}...</div>
            }
          >
            <ColorComponent array={setupColorblocks} />
          </Suspense>
        </section>
      </div>
    </div>
  )
}
