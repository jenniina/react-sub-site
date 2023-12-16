import { Provider } from 'react-redux'
import Hero from '../../components/Hero/Hero'
import Jokes from '../../components/Jokes/Jokes'
import store from '../../components/Jokes/store'
import {
  ECategory,
  ECategory_cs,
  ECategory_de,
  ECategory_en,
  ECategory_es,
  ECategory_fr,
  ECategory_pt,
  EJokeType,
  ELanguages,
  ESafemode,
  ETitle,
  ETryTappingTheShapes,
  EReset,
} from '../../components/Jokes/interfaces'
import { useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useStorage'
import { Select, SelectOption } from '../../components/Select/Select'

export default function JokesPage({
  heading,
  text,
  type,
}: {
  heading: string
  text: string
  type: string
}) {
  const [language, setLanguage] = useLocalStorage<ELanguages>(
    'language',
    ELanguages.English
  )
  const title = ETitle[language]
  const titleTryTappingTheShapes = ETryTappingTheShapes[language]
  const titleReset = EReset[language]

  // const options = (enumObj: typeof ELanguages) => {
  //   return Object.keys(enumObj).map((key) => ({
  //     value: enumObj[key as keyof typeof enumObj],
  //     label: key,
  //   })) as SelectOption[]
  // }

  // function getKeyByValue(
  //   enumObj:
  //     | typeof ECategory_en
  //     | typeof ECategory_cs
  //     | typeof ECategory_de
  //     | typeof ECategory_es
  //     | typeof ECategory_fr
  //     | typeof ECategory_pt
  //     | typeof EJokeType
  //     | typeof ESafemode
  //     | typeof ELanguages,
  //   value: ECategory | EJokeType | ESafemode | ELanguages
  // ) {
  //   for (const key in enumObj) {
  //     if (enumObj[key as keyof typeof enumObj] === value) {
  //       return key as SelectOption['label']
  //     }
  //   }
  //   // Handle the case where the value is not found in the enum
  //   return undefined
  // }

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
    <Provider store={store}>
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
          <Jokes language={language} setLanguage={setLanguage} />
        </div>
      </div>
    </Provider>
  )
}
