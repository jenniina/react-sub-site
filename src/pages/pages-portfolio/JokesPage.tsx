import { lazy, Suspense, useContext } from 'react'
import { BiChevronsDown } from 'react-icons/bi'
import {
  jokeCategoryByLanguage,
  jokeCategoryAny,
  ECategories,
} from '../../components/Jokes/types'
import Accordion from '../../components/Accordion/Accordion'
import { EJokeType, ESafemode, TCategoryByLanguages } from '../../components/Jokes/types'
import {
  ELanguageTitle,
  ELanguages,
  ELanguagesLong,
  LanguageOfLanguage,
} from '../../types'
import { SyntheticEvent, useEffect } from 'react'
import { Select, SelectOption } from '../../components/Select/Select'
import { options } from '../../utils'
import { LanguageContext } from '../../contexts/LanguageContext'

const Jokes = lazy(() => import('../../components/Jokes/Jokes'))

export default function JokesPage({
  heading,
  text,
  type,
  language,
  setLanguage,
}: {
  heading: string
  text: string
  type: string
  language: ELanguages
  setLanguage: (language: ELanguages) => void
}) {
  const { t } = useContext(LanguageContext)!

  const title = t('ETheComediansCompanion')
  const titleLanguage = t('ELanguageTitle')

  function getKeyByValue(
    enumObj:
      | TCategoryByLanguages
      | typeof EJokeType
      | typeof ESafemode
      | typeof ELanguages,
    value: ECategories | EJokeType | ESafemode | ELanguages
  ) {
    for (const key in enumObj) {
      if (enumObj[key as keyof typeof enumObj] === value) {
        return key as SelectOption['label']
      }
    }
    // Handle the case where the value is not found in the enum
    return undefined
  }

  useEffect(() => {
    const languageFromStorage = localStorage.getItem('AppLanguage')
    if (languageFromStorage) {
      setLanguage(JSON.parse(languageFromStorage))
    }
  }, [])

  // Set the document language and title
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = `document.documentElement.lang = '${language}';`
    document.head.appendChild(script)
    document.title = title
    return () => {
      document.head.removeChild(script)
    }
  }, [language, title])

  const handleSkipToJokes = (e: SyntheticEvent) => {
    e.preventDefault()
    const anchor = document.querySelector('#saved')
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className={`${heading
        .replace(/\s+/g, '-')
        .toLowerCase()
        .replace(/[^a-zA-Z]/g, '')} ${type} ${language}`}
    >
      <div className='inner-wrap'>
        <section className='joke-container card introduction'>
          <div>
            <div className='flex column gap'>
              <div className='flex center gap'>
                <a href='#jokeform' className='svg-wrap newline'>
                  <span>{t('ESkipToJokeSearch')}</span>
                  <BiChevronsDown className='down' />
                </a>
                <a
                  href='#'
                  className='svg-wrap newline'
                  onClick={(e) => handleSkipToJokes(e)}
                >
                  <span>{t('ESkipToSavedJokes')}</span>
                  <BiChevronsDown className='down' />
                </a>
              </div>
              <div>
                <Select
                  language={language}
                  id='main-language'
                  className='language main'
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
                  onChange={(o) => {
                    setLanguage(o?.value as ELanguages)
                  }}
                />
              </div>
              <Accordion
                language={language}
                text={t('EClickHereToSeeFeatures')}
                className='features'
                wrapperClass='features-wrap'
              >
                <div className='medium'>
                  <h2>{t('EFeatures')}</h2>
                  <ul className='ul'>
                    <li>
                      {t('EFetchesJokesFrom')}{' '}
                      <a href='https://sv443.net/jokeapi/v2/'>JokeAPI</a>
                    </li>
                    <li>{t('ERegisterAndLoginToUse')}</li>
                    <li>
                      {t('EAppTranslatedTo')}
                      <ul>
                        {Object.values(LanguageOfLanguage[language]).map((l: string) => {
                          return <li key={l}>{l}</li>
                        })}
                      </ul>
                    </li>
                    <li>
                      {t('EFilterJokesBy')}:
                      <ul>
                        <li>{titleLanguage}</li>
                        <li>
                          {t('EJokeTypeTitle')}
                          <ul>
                            <li>{t('ETwoPart')}</li>
                            <li>{t('ESingle')}</li>
                          </ul>
                        </li>
                        <li>
                          {t('ESafemodeTitle')} {t('EOnOff')}
                        </li>
                        <li>{t('EKeyword')}</li>
                        <li>
                          {t('ECategoryTitle')}
                          <ul>
                            <li>{jokeCategoryAny[language]}</li>
                            {Object.values(jokeCategoryByLanguage[language]).map((c) => {
                              return <li key={c}>{c}</li>
                            })}
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li>
                      {t('ENote')}
                      <ul>
                        <li>{t('EDarkJokesAreVisibleOnlyWhenSafeModeIsOff')}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </Accordion>
              <a href='https://github.com/jenniina/react-sub-site/tree/main/src/components/Jokes'>
                Github
              </a>
            </div>
          </div>
        </section>
        <Suspense
          fallback={
            <div className='flex center margin0auto textcenter'>{t('ELoading')}...</div>
          }
        >
          <Jokes language={language} setLanguage={setLanguage} />
        </Suspense>
      </div>
    </div>
  )
}
