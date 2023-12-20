import Hero from '../../components/Hero/Hero'
import Jokes, {
  jokeCategoryByLanguage,
  jokeCategoryAny,
} from '../../components/Jokes/Jokes'
import Accordion from '../../components/Accordion/Accordion'
import {
  ECategory,
  ECategory_cs,
  ECategory_de,
  ECategory_en,
  ECategory_es,
  ECategory_fr,
  ECategory_pt,
  EJokeType,
  ELanguageTitle,
  ELanguages,
  ERegisterAndLoginToUse,
  ESafemode,
  ETitle,
  EFeatures,
  EFetchesJokesFrom,
  EAppTranslatedTo,
  LanguageOfLanguage,
  EFilterJokesBy,
  EJokeTypeTitle,
  ETwoPart,
  ESingle,
  ESafemodeTitle,
  EOnOff,
  EKeyword,
  ECategoryTitle,
  ETryTappingTheShapes,
  EReset,
} from '../../components/Jokes/interfaces'
import { useEffect } from 'react'
import useLocalStorage from '../../hooks/useStorage'
import { Select, SelectOption } from '../../components/Select/Select'

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
  const title = ETitle[language]
  const titleLanguage = ELanguageTitle[language]
  const titleFeatures = EFeatures[language]
  const titleFetchesJokesFrom = EFetchesJokesFrom[language]
  const titleAppTranslatedTo = EAppTranslatedTo[language]
  const titleFilterJokesBy = EFilterJokesBy[language]
  const titleJokeType = EJokeTypeTitle[language]
  const titleTwoPart = ETwoPart[language]
  const titleSingle = ESingle[language]
  const titleSafemode = ESafemodeTitle[language]
  const titleOnOff = EOnOff[language]
  const titleKeyword = EKeyword[language]
  const titleCategory = ECategoryTitle[language]
  const titleJokeCategoryAny = jokeCategoryAny[language]
  const titleTryTappingTheShapes = ETryTappingTheShapes[language]
  const titleReset = EReset[language]

  const options = (enumObj: typeof ELanguages) => {
    return Object.keys(enumObj).map((key) => ({
      value: enumObj[key as keyof typeof enumObj],
      label: key,
    })) as SelectOption[]
  }

  function getKeyByValue(
    enumObj:
      | typeof ECategory_en
      | typeof ECategory_cs
      | typeof ECategory_de
      | typeof ECategory_es
      | typeof ECategory_fr
      | typeof ECategory_pt
      | typeof EJokeType
      | typeof ESafemode
      | typeof ELanguages,
    value: ECategory | EJokeType | ESafemode | ELanguages
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
    const languageFromStorage = localStorage.getItem('language')
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

  return (
    <div
      className={`${heading
        .replace(/\s+/g, '-')
        .toLowerCase()
        .replace(/[^a-zA-Z]/g, '')} ${type} ${language}`}
    >
      <Hero
        heading={title}
        text={text}
        reset={titleReset}
        instructions={titleTryTappingTheShapes}
      />

      <div className='inner-wrap'>
        <section className='joke-container card introduction'>
          <div>
            <Select
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

            <Accordion text={titleFeatures} className='features'>
              <div className='medium'>
                <h2>{titleFeatures}</h2>
                <ul className='ul'>
                  <li>
                    {titleFetchesJokesFrom}{' '}
                    <a href='https://sv443.net/jokeapi/v2/'>JokeAPI</a>
                  </li>
                  <li>{ERegisterAndLoginToUse[language]}</li>
                  <li>
                    {titleAppTranslatedTo}
                    <ul>
                      {Object.values(LanguageOfLanguage[language]).map((l: string) => {
                        return <li key={l}>{l}</li>
                      })}
                    </ul>
                  </li>
                  <li>
                    {titleFilterJokesBy}:
                    <ul>
                      <li>{titleLanguage}</li>
                      <li>
                        {titleJokeType}
                        <ul>
                          <li>{titleTwoPart}</li>
                          <li>{titleSingle}</li>
                        </ul>
                      </li>
                      <li>
                        {titleSafemode} {titleOnOff}
                      </li>
                      <li>{titleKeyword}</li>
                      <li>
                        {titleCategory}
                        <ul>
                          <li>{titleJokeCategoryAny}</li>
                          {Object.values(jokeCategoryByLanguage[language]).map((c) => {
                            return <li key={c}>{c}</li>
                          })}
                        </ul>
                      </li>
                    </ul>
                  </li>{' '}
                </ul>
              </div>
            </Accordion>
          </div>
        </section>

        <Jokes language={language} setLanguage={setLanguage} />
      </div>
    </div>
  )
}
