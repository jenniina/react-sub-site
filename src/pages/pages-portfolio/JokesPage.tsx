import { BiChevronsDown } from 'react-icons/bi'
import {
  jokeCategoryByLanguage,
  jokeCategoryAny,
} from '../../components/Jokes/types'
import Accordion from '../../components/Accordion/Accordion'
import { ELanguages, ELanguagesLong, LanguageOfLanguage } from '../../types'
import { SyntheticEvent } from 'react'
import { Select, SelectOption } from '../../components/Select/Select'
import { options } from '../../utils'
import { useLanguageContext } from '../../contexts/LanguageContext'
import Jokes from '../../components/Jokes/Jokes'

export default function JokesPage({ type }: { type: string }) {
  const { t, language, setLanguage } = useLanguageContext()

  const titleLanguage = t('LanguageTitle')

  const handleSkipToJokes = (e: SyntheticEvent) => {
    e.preventDefault()
    const anchor = document?.querySelector('#saved')
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/*  <Helmet prioritizeSeoTags={true}>
        <meta charSet="utf-8" />
        <meta name="author" content="Jenniina Laine" />
        <meta property="og:type" content="website" />

        <title>
          {t("Jokes")} | {t("TheComediansCompanion")}
        </title>
        <meta name="description" content={t("JokesAppIntro")} />
        <link
          rel="canonical"
          href={`https://react.jenniina.fi/portfolio/jokes`}
        />
        <meta
          property="og:title"
          content={`${t("Jokes")} | react.jenniina.fi`}
        />
        <meta property="og:description" content={t("JokesAppIntro")} />
        <meta
          property="og:url"
          content={`https://react.jenniina.fi/portfolio/jokes`}
        />
        <meta property="og:type" content="website" />
      </Helmet> */}
      <div className={`${type} ${language}`}>
        <div className="inner-wrap">
          <section className="joke-container card introduction">
            <div>
              <div className="flex column gap">
                <div className="flex center gap">
                  <a href="#jokeform" className="svg-wrap newline">
                    <span>{t('SkipToJokeSearch')}</span>
                    <BiChevronsDown className="down" />
                  </a>
                  <button
                    className="reset svg-wrap newline"
                    onClick={e => handleSkipToJokes(e)}
                  >
                    <span>{t('SkipToSavedJokes')}</span>
                    <BiChevronsDown className="down" />
                  </button>
                </div>
                <div>
                  <Select
                    language={language}
                    id="main-language"
                    className="language main"
                    instructions={`${titleLanguage}:`}
                    options={options(ELanguagesLong)}
                    value={
                      language
                        ? ({
                            value: language,
                            label: ELanguagesLong[language],
                          } as SelectOption)
                        : undefined
                    }
                    onChange={o => {
                      setLanguage(o?.value as ELanguages)
                    }}
                  />
                </div>
                <Accordion
                  text={t('ClickHereToSeeFeatures')}
                  className="features"
                  wrapperClass="features-wrap"
                >
                  <div className="medium">
                    <h2>{t('Features')}</h2>
                    <ul className="ul">
                      <li>
                        {t('FetchesJokesFrom')}{' '}
                        <a href="https://sv443.net/jokeapi/v2/">JokeAPI</a>
                      </li>
                      <li>{t('RegisterAndLoginToUse')}</li>
                      <li>
                        {t('AppTranslatedTo')}
                        <ul>
                          {Object.values(LanguageOfLanguage[language]).map(
                            (l: string) => {
                              return <li key={l}>{l}</li>
                            }
                          )}
                        </ul>
                      </li>
                      <li>
                        {t('FilterJokesBy')}:
                        <ul>
                          <li>{titleLanguage}</li>
                          <li>
                            {t('JokeTypeTitle')}
                            <ul>
                              <li>{t('TwoPart')}</li>
                              <li>{t('Single')}</li>
                            </ul>
                          </li>
                          <li>
                            {t('SafemodeTitle')} {t('OnOff')}
                          </li>
                          <li>{t('Keyword')}</li>
                          <li>
                            {t('CategoryTitle')}
                            <ul>
                              <li>{jokeCategoryAny[language]}</li>
                              {Object.values(
                                jokeCategoryByLanguage[language]
                              ).map((c: string) => {
                                return <li key={c}>{c}</li>
                              })}
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        {t('Note')}
                        <ul>
                          <li>
                            {t('DarkJokesAreVisibleOnlyWhenSafeModeIsOff')}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </Accordion>
                <a href="https://github.com/jenniina/react-sub-site/tree/main/src/components/Jokes">
                  Github
                </a>
              </div>
            </div>
          </section>
          <Jokes />
        </div>
      </div>
    </>
  )
}
