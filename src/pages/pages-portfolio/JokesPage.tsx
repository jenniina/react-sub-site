import { lazy, Suspense } from 'react'
import Hero from '../../components/Hero/Hero'
import { BiChevronsDown } from 'react-icons/bi'
// import Jokes from '../../components/Jokes/Jokes'
import { jokeCategoryByLanguage, jokeCategoryAny } from '../../components/Jokes/Jokes'
import Accordion from '../../components/Accordion/Accordion'
import {
  ECategories,
  EJokeType,
  ERegisterAndLoginToUse,
  ESafemode,
  ETheComediansCompanion,
  EFetchesJokesFrom,
  EFilterJokesBy,
  EJokeTypeTitle,
  ETwoPart,
  ESingle,
  ESafemodeTitle,
  EKeyword,
  ECategoryTitle,
  EClickHereToSeeFeatures,
  EDarkJokesAreVisibleOnlyWhenSafeModeIsOff,
  ENote,
  TCategoryByLanguages,
  ESkipToSavedJokes,
  ESkipToJokeSearch,
} from '../../components/Jokes/interfaces'
import {
  EOnOff,
  EFeatures,
  ELanguageTitle,
  ELanguages,
  EAppTranslatedTo,
  LanguageOfLanguage,
  ETryTappingTheShapes,
  EReset,
  ELoading,
} from '../../interfaces'
import { SyntheticEvent, useEffect } from 'react'
import { Select, SelectOption } from '../../components/Select/Select'

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
  const title = ETheComediansCompanion[language]
  const titleLanguage = ELanguageTitle[language]

  const options = (enumObj: typeof ELanguages) => {
    return Object.keys(enumObj).map((key) => ({
      value: enumObj[key as keyof typeof enumObj],
      label: key,
    })) as SelectOption[]
  }

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
    const languageFromStorage = localStorage.getItem('JokeAppLanguage')
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
  }, [language])

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
      <Hero
        language={language}
        address='jokes'
        heading={title}
        text={text}
        reset={EReset[language]}
        instructions={ETryTappingTheShapes[language]}
      />

      <div className='inner-wrap'>
        <section className='joke-container card introduction'>
          <div>
            <div className='flex column gap'>
              <div className='flex center gap'>
                <a href='#jokeform' className='svg-wrap newline'>
                  <span>{ESkipToJokeSearch[language]}</span>
                  <BiChevronsDown className='down' />
                </a>
                <a
                  href='#'
                  className='svg-wrap newline'
                  onClick={(e) => handleSkipToJokes(e)}
                >
                  <span>{ESkipToSavedJokes[language]}</span>
                  <BiChevronsDown className='down' />
                </a>
              </div>
              <div>
                <Select
                  language={language}
                  id='main-language'
                  className='language main'
                  instructions={`${titleLanguage}:`}
                  options={options(ELanguages)}
                  value={
                    language
                      ? ({
                          value: language,
                          label: getKeyByValue(ELanguages, language),
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
                text={EClickHereToSeeFeatures[language]}
                className='features'
              >
                <div className='medium'>
                  <h2>{EFeatures[language]}</h2>
                  <ul className='ul'>
                    <li>
                      {EFetchesJokesFrom[language]}{' '}
                      <a href='https://sv443.net/jokeapi/v2/'>JokeAPI</a>
                    </li>
                    <li>{ERegisterAndLoginToUse[language]}</li>
                    <li>
                      {EAppTranslatedTo[language]}
                      <ul>
                        {Object.values(LanguageOfLanguage[language]).map((l: string) => {
                          return <li key={l}>{l}</li>
                        })}
                      </ul>
                    </li>
                    <li>
                      {EFilterJokesBy[language]}:
                      <ul>
                        <li>{titleLanguage}</li>
                        <li>
                          {EJokeTypeTitle[language]}
                          <ul>
                            <li>{ETwoPart[language]}</li>
                            <li>{ESingle[language]}</li>
                          </ul>
                        </li>
                        <li>
                          {ESafemodeTitle[language]} {EOnOff[language]}
                        </li>
                        <li>{EKeyword[language]}</li>
                        <li>
                          {ECategoryTitle[language]}
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
                      {ENote[language]}
                      <ul>
                        <li>{EDarkJokesAreVisibleOnlyWhenSafeModeIsOff[language]}</li>
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
            <div className='flex center margin0auto'>{ELoading[language]}...</div>
          }
        >
          <Jokes language={language} setLanguage={setLanguage} />
        </Suspense>{' '}
      </div>
    </div>
  )
}
