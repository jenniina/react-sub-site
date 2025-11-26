import { useMemo } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Link } from 'react-router-dom'
import styles from './css/about.module.css'
import { IoSettingsSharp } from 'react-icons/io5'
import { ELanguages } from '../types'
import { useLanguageContext } from '../contexts/LanguageContext'
import ColorComponent from '../components/About/ColorComponent'

export interface colorProps {
  i: number
  e: number
  background: string
}

export default function About({ type }: { type: string }) {
  const { t, language } = useLanguageContext()

  const lightTheme = useTheme()

  const colorsArray: colorProps[] = useMemo(() => {
    const array: colorProps[] = []
    for (let i = 1; i <= 20; i++) {
      const item: colorProps = {
        i: i,
        e: 51 - i,
        background: `var(--color-primary-${i})`,
      }
      array.push(item)
    }

    for (let i = 1; i <= 20; i++) {
      const item: colorProps = {
        i: 20 + i,
        e: 31 - i,
        background: `var(--color-secondary-${i})`,
      }
      array.push(item)
    }

    for (let i = 1; i <= 10; i++) {
      const item: colorProps = {
        i: 40 + i,
        e: 11 - i,
        background: `var(--color-gray-${i})`,
      }
      array.push(item)
    }
    const visitedItem = { i: 51, e: 0, background: 'var(--color-visited)' }

    array.push(visitedItem)

    return array
  }, [])

  return (
    <>
      {/* <Helmet prioritizeSeoTags={true}>
        <meta charSet="utf-8" />
        <meta name="author" content="Jenniina Laine" />
        <meta property="og:type" content="website" />

        <title>{t("About")} | React, Node.js, Express, MongoDB</title>
        <meta
          name="description"
          content={`react.jenniina.fi | ${t("AboutThisSite")}`}
        />
        <link rel="canonical" href={`https://react.jenniina.fi/about`} />
        <meta
          property="og:title"
          content={`${t("About")} | React, Node.js, Express, MongoDB`}
        />
        <meta
          property="og:description"
          content={`react.jenniina.fi | ${t("AboutThisSite")}`}
        />
        <meta property="og:url" content={`https://react.jenniina.fi/about`} />
        <meta property="og:type" content="website" />
      </Helmet> **/}
      <div className={`about ${type} ${lightTheme ? styles.light : ''}`}>
        <div>
          <section className={`card ${styles.section}`}>
            <div>
              <div className="wide">
                <p>{t('AboutThisSite')}</p>
                <p>
                  <a href="https://jenniina.fi">{t('MainSite')}</a>
                </p>
                <p>
                  <a href="https://github.com/jenniina/react-sub-site">
                    {t('ReactGithubRepository')}
                  </a>
                </p>
                <p>
                  <a href="https://github.com/jenniina/react-bg">
                    {t('NodeGithubRepository')}
                  </a>
                </p>
                <p>{t('TheSiteIsTranslatedToSixLanguagesWhichWere')}</p>
                <p>
                  {t('PleaseReportAnyIssuesWithTheSiteToJenniina')}:{' '}
                  <Link to="/portfolio/select?survey=true">
                    {t('Survey').toLowerCase()}
                  </Link>{' '}
                </p>

                <h2 id="site-features">{t('FeaturesOfThisSite')}</h2>

                <h3 id="settings" className="left">
                  {t('SiteSettings')}
                </h3>
                <big>
                  {t('SeeSettingsAtMenuBar')}{' '}
                  <IoSettingsSharp
                    style={{ display: 'inline-block', marginBottom: '-0.15em' }}
                  />{' '}
                  <span className="scr">{t('Settings')}</span> -
                  {t('Icon').toLowerCase()}
                </big>
                <ul className="ul">
                  <li>
                    {t('LanguageSelect')}
                    <ul>
                      <li>
                        {t(
                          'TheTranslationsAreDoneWithTheHelpOfGithubCopilotSo'
                        )}
                      </li>
                      {language !== ELanguages.fi &&
                        language !== ELanguages.en && (
                          <li>
                            {t(
                              'PleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo'
                            )}
                          </li>
                        )}
                    </ul>
                  </li>
                  <li>{t('LightDarkModeButton')}</li>
                  <li>
                    {t('ButtonToToggleBetweenNavigationStyles')}
                    <ul>
                      <li>
                        {t('TwoStylesAtSmallScreenSizeAndTwoAtLargeScreenSize')}
                      </li>
                    </ul>
                  </li>
                  <li>
                    {t('LogInAndRegisterButtons')}.{' '}
                    {t('ReplacedByUserEditAndLogoutButtonsWhenLoggedIn')}
                  </li>
                </ul>

                <h3 id="hero" className="left">
                  {t('HeroSection')}
                </h3>
                <big>{t('InteractiveElements')}</big>
                <ul className="ul">
                  <li>{t('HoverFocusAnimation')}</li>
                  <li>{t('MovementAccordingToPointerEnterDirection')}</li>
                  <li>{t('RemoveWithClickOrEnterWhenFocused')}</li>
                  <li>
                    {t(
                      'ResetButtonOnTheLowerRightCornerResetsTheInteractiveElements'
                    )}
                  </li>
                  <li>{t('PressEscapeToSkipToResetButton')}</li>
                  <li>{t('KeyboardFocusMoveItemsWithArrowKeys')}</li>
                  <li>
                    {t('Elements')}
                    <ul>
                      <li>
                        {t('Bubbles')} ({t('SeeTheTopOfTheCurrentPage')})
                      </li>
                      <li>
                        {t('MusicNotes')}{' '}
                        <Link to="/portfolio/composer">
                          ({t('ComposerPage')})
                        </Link>
                      </li>
                      <li>
                        {t('FourSidedJewels')}{' '}
                        <Link to="/store">({t('Store')})</Link>
                      </li>
                      <li>
                        {t('EightSidedJewels')}{' '}
                        <Link to="/cart">({t('Cart')})</Link>
                      </li>
                      <li>
                        {t('DraggableBlobs')}{' '}
                        <Link to="/portfolio">({t('Portfolio')})</Link>
                      </li>
                      <li>
                        {t('SquaresStandingOnTheirCorner')}{' '}
                        <Link to="/portfolio/todo">({t('TodoApp')})</Link>
                      </li>
                      <li>
                        {t('InvertedTriangles')}{' '}
                        <Link to="/portfolio/quiz">({t('QuizApp')})</Link>
                      </li>
                      <li>
                        {t('AlienEyes')}{' '}
                        <Link to="/contact">({t('Contact')})</Link>
                        <ul>
                          <li>{t('ElementsRotateToFaceCursor')}</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>

                <h3 id="react" className="left">
                  {t('ReactApps')}
                </h3>
                <big>
                  <Link to="/portfolio">{t('InThePortfolioSection')}</Link>
                </big>

                <h3 id="other" className="left">
                  {t('OtherFeatures')}
                </h3>
                <ul className="ul">
                  <li>{t('PageTransitionAnimation')}</li>
                  <li>{t('WaveAnimationAtTheMainHeading')}</li>
                  <li>
                    {t('BackToTopButtonAtTheLowerRightCornerAndAtTheFooter')}
                  </li>
                  <li>{t('ExitLinksAtTheTopAndBottomOfThePages')}</li>
                </ul>
              </div>
            </div>
          </section>

          <section
            className={`fullwidth ${styles.section} ${styles.sectioncolor}`}
          >
            <div className={styles.colortextwrap}>
              <div>
                <div className="wide">
                  <h3 id="color" className="left" style={{ marginTop: 0 }}>
                    {t('SiteColors')}
                  </h3>
                  <p>
                    {t('TheSiteColorsLightnessesSwitchInLightMode1')}{' '}
                    <code>var(--color-primary-1)</code>{' '}
                    {t('TheSiteColorsLightnessesSwitchInLightMode2')}
                  </p>
                  <p>
                    {t(
                      'AnimatedClipPathsAndTextRotationOnHoverWithDynamicDelay'
                    )}
                  </p>
                </div>
              </div>
            </div>
            <ColorComponent array={colorsArray} />
          </section>
        </div>
      </div>
    </>
  )
}
