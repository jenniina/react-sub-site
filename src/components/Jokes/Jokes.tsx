import { useEffect, useState } from 'react'
import FormJoke from './components/FormJoke'
import Register from './components/Register'
import { Select, SelectOption } from '../Select/Select'
import './css/joke.css'
import {
  IJoke,
  EJokeType,
  ELanguages,
  ECategory_en,
  ECategory_cs,
  ECategory_de,
  ECategory_es,
  ECategory_fr,
  ECategory_pt,
  IUser,
  ReducerProps,
  ESavedJoke,
  ETitle,
  ESubmit,
  ESafemode,
  EQueryKey,
  EDelete,
  ECategoryTitle,
  ESafeTitle,
  EUnsafeTitle,
  EJoke,
  ELogin,
  ELogout,
  ESingle,
  ETwoPart,
  ELoggedInAs,
  EClickToReveal,
  ECategory,
  IJokeCategoryByLanguage,
  ELoginOrRegisterToSave,
  ELanguageTitle,
  SortBy,
  EJokeAlreadySaved,
  ERegistrationSuccesful,
  ENoJokeFound,
  EError,
  EPasswordsDoNotMatch,
  EAppTranslatedTo,
  EClickHereToSeeFeatures,
  EFeatures,
  EFetchesJokesFrom,
  EFilterJokesBy,
  EJokeTypeTitle,
  EKeyword,
  EOnOff,
  ERegisterAndLoginToUse,
  ESafemodeTitle,
  LanguageOfLanguage,
  ESelectALanguage,
  EAJokeGeneratorForTheComicallyInclied,
} from './interfaces'
import { useSelector } from 'react-redux'
import Login from './components/Login'
import useLocalStorage from '../../hooks/useStorage'
import { useAppDispatch } from './hooks/useAppDispatch'
import { notify } from './reducers/notificationReducer'
import Notification from './components/Notification'
import {
  createUser,
  updateUser,
  findUserById,
  initializeUsers,
  updateUserToken,
} from './reducers/usersReducer'
import {
  createJoke,
  deleteUserFromJoke,
  findJoke,
  initializeJokes,
  updateJoke,
} from './reducers/jokeReducer'
import { initializeUser, login } from './reducers/authReducer'
import UserJokes from './components/UserJokes'
//import JokeSubmit from './components/JokeSubmit'
import Accordion from '../Accordion/Accordion'
import { AxiosResponse } from 'axios'
import UserEdit from './components/UserEdit'

export const jokeCategoryByLanguage: IJokeCategoryByLanguage = {
  en: {
    Programming: ECategory_en.Programming,
    Misc: ECategory_en.Misc,
    Dark: ECategory_en.Dark,
    Pun: ECategory_en.Pun,
    Spooky: ECategory_en.Spooky,
    Christmas: ECategory_en.Christmas,
  },
  es: {
    Programming: ECategory_es.Programming,
    Misc: ECategory_es.Misc,
    Dark: ECategory_es.Dark,
    Pun: ECategory_es.Pun,
    Spooky: ECategory_es.Spooky,
    Christmas: ECategory_es.Christmas,
  },
  fr: {
    Programming: ECategory_fr.Programming,
    Misc: ECategory_fr.Misc,
    Dark: ECategory_fr.Dark,
    Pun: ECategory_fr.Pun,
    Spooky: ECategory_fr.Spooky,
    Christmas: ECategory_fr.Christmas,
  },
  de: {
    Programming: ECategory_de.Programming,
    Misc: ECategory_de.Misc,
    Dark: ECategory_de.Dark,
    Pun: ECategory_de.Pun,
    Spooky: ECategory_de.Spooky,
    Christmas: ECategory_de.Christmas,
  },
  pt: {
    Programming: ECategory_pt.Programming,
    Misc: ECategory_pt.Misc,
    Dark: ECategory_pt.Dark,
    Pun: ECategory_pt.Pun,
    Spooky: ECategory_pt.Spooky,
    Christmas: ECategory_pt.Christmas,
  },
  cs: {
    Programming: ECategory_cs.Programming,
    Misc: ECategory_cs.Misc,
    Dark: ECategory_cs.Dark,
    Pun: ECategory_cs.Pun,
    Spooky: ECategory_cs.Spooky,
    Christmas: ECategory_cs.Christmas,
  },
}

export const jokeCategoryAny = {
  en: 'Any',
  es: 'Cualquiera',
  fr: "N'importe quel",
  de: 'Irgendein',
  pt: 'Qualquer',
  cs: 'Jakýkoliv',
}

function Jokes({
  language,
  setLanguage,
}: {
  language: ELanguages
  setLanguage: (language: ELanguages) => void
}) {
  const categoryLanguagesConst = {
    en: ECategory_en,
    es: ECategory_es,
    fr: ECategory_fr,
    de: ECategory_de,
    pt: ECategory_pt,
    cs: ECategory_cs,
  }

  const title = ETitle[language]
  const titleSaved = ESavedJoke[language]
  const titleCategory = ECategoryTitle[language]
  const titleSafe = ESafeTitle[language]
  const titleUnsafe = EUnsafeTitle[language]
  const titleJoke = EJoke[language]
  const titleSingle = ESingle[language]
  const titleTwoPart = ETwoPart[language]
  const titleLogin = ELogin[language]
  const titleLogout = ELogout[language]
  const titleLoggedInAs = ELoggedInAs[language]
  const titleClickToReveal = EClickToReveal[language]
  const titleLoginOrRegisterToSave = ELoginOrRegisterToSave[language]
  const titleJokeAlreadySaved = EJokeAlreadySaved[language]
  const titlePasswordsDoNotMatch = EPasswordsDoNotMatch[language]
  const titleRegistrationSuccesful = ERegistrationSuccesful[language]
  const titleError = EError[language]
  const titleNoJokeFound = ENoJokeFound[language]
  const deleteJoke = EDelete[language]
  const languageNameFromLanguage = getKeyofEnum(ELanguages, language)
  const translateWordLanguage = ELanguageTitle[language]
  const titleLanguage = languageNameFromLanguage
  const titleLanguageSelect = ESelectALanguage[language]
  const [joke, setJoke] = useState<string>('')
  const [delivery, setDelivery] = useState<string>('')
  const [categoryLanguages, setCategoryLanguages] = useState<
    | typeof ECategory_en
    | typeof ECategory_cs
    | typeof ECategory_de
    | typeof ECategory_es
    | typeof ECategory_fr
    | typeof ECategory_pt
  >(categoryLanguagesConst.en)
  const [jokeCategory, setJokeCategory] = useLocalStorage<ECategory>(
    'jokeCategory',
    jokeCategoryByLanguage[language].Misc
  )
  const [jokeType, setEJokeType] = useState<EJokeType>(EJokeType.twopart)
  const [isCheckedEJokeType, setIsCheckedEJokeType] = useState<boolean>(true)
  const [safemode, setSafemode] = useState<ESafemode>(ESafemode.Safe)
  const [isCheckedSafemode, setIsCheckedSafemode] = useState<boolean>(true)
  const [queryKey, setQueryKey] = useState<EQueryKey>(EQueryKey.None)
  const [queryValue, setQueryValue] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [reveal, setReveal] = useState(true)
  const [jokeId, setJokeId] = useState<IJoke['jokeId']>(0)
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [visibleJoke, setVisibleJoke] = useState(false)
  const [saveJoke, setSaveJoke] = useLocalStorage<IJoke | null>('savedJoke', null)
  const titleFeatures = EFeatures[language]
  const titleFetchesJokesFrom = EFetchesJokesFrom[language]
  const titleAppTranslatedTo = EAppTranslatedTo[language]
  const titleFilterJokesBy = EFilterJokesBy[language]
  const titleJokeType = EJokeTypeTitle[language]
  const titleSafemode = ESafemodeTitle[language]
  const titleOnOff = EOnOff[language]
  const titleKeyword = EKeyword[language]
  const titleJokeCategoryAny = jokeCategoryAny[language]
  const titleClickHereToSeeFeatures = EClickHereToSeeFeatures[language]
  const titleAJokeGeneratorForTheComicallyInclied =
    EAJokeGeneratorForTheComicallyInclied[language]
  const [showToken, setShowToken] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(initializeJokes())
    }, 1000)
  }, [saveJoke])

  const jokes = useSelector((state: ReducerProps) => {
    return state.jokes
  })
  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  useEffect(() => {
    dispatch(initializeUser())
  }, [loggedIn])

  // const users = useSelector((state: ReducerProps) => {
  //   return state.users.users
  // })
  // const currentUser = users?.find((u: IUser) => u.username === user?.username)

  //const userJokes = user ? findUserJokes(user?._id as string) : []

  //console.log(userJokes)

  // Set the document language and title
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = `document.documentElement.lang = '${language}';`
    document.head.appendChild(script)
    document.title = title
    if (language) setCategoryLanguages(categoryLanguagesConst[language])
    return () => {
      document.head.removeChild(script)
    }
  }, [language])

  // Set loading state
  useEffect(() => {
    if (loading) {
      setJoke('Loading...')
      setDelivery(' ')
    }
  }, [loading])

  const handleToggleChangeSafemode = () => {
    setIsCheckedSafemode(!isCheckedSafemode) // Toggle the state when the button is clicked
  }
  const handleToggleChangeEJokeType = () => {
    setIsCheckedEJokeType(!isCheckedEJokeType) // Toggle the state when the button is clicked
  }
  useEffect(() => {
    isCheckedSafemode ? setSafemode(ESafemode.Safe) : setSafemode(ESafemode.Unsafe)
  }, [isCheckedSafemode])

  useEffect(() => {
    isCheckedEJokeType ? setEJokeType(EJokeType.twopart) : setEJokeType(EJokeType.single)
  }, [isCheckedEJokeType])

  // Handle form submit
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setTimeout(() => {
      setVisibleJoke(true)
    }, 400)
    setReveal(true)
    setTimeout(() => {
      fetchApi()
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
      }, 5500)
      // Scroll to the anchor with id "generated-joke"
      const generatedJokeAnchor = document.querySelector('#generate-joke')
      if (generatedJokeAnchor) {
        generatedJokeAnchor.scrollIntoView({ behavior: 'smooth' })
      }
    }, 600)
  }

  const handleJokeSave = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!user) {
      dispatch(notify(`${titleLoginOrRegisterToSave}`, false, 8))
      const findJoke = jokes?.find(
        (j: IJoke) =>
          j.jokeId === jokeId &&
          j.language === language &&
          j.category === jokeCategory &&
          j.type === jokeType
      )
      if (joke && !delivery) {
        setSaveJoke({
          jokeId: jokeId,
          joke: joke,
          type: EJokeType.single,
          category: jokeCategory,
          language: language,
          safe: safemode === ESafemode.Safe ? true : false,
          user: findJoke?.user ?? [],
        })
      } else if (delivery) {
        setSaveJoke({
          jokeId: jokeId,
          setup: joke,
          delivery: delivery,
          type: EJokeType.twopart,
          category: jokeCategory,
          language: language,
          safe: safemode === ESafemode.Safe ? true : false,
          user: findJoke?.user ?? [],
        })
      }
    } else {
      const findJoke = jokes?.find(
        (j: IJoke) =>
          j.jokeId === jokeId &&
          j.language === language &&
          j.category === jokeCategory &&
          j.type === jokeType
      )
      if (findJoke) {
        if (findJoke.user.includes(user._id)) {
          dispatch(notify(`${titleJokeAlreadySaved}`, false, 8))
          return
        }
        dispatch(updateJoke({ ...findJoke, user: [...findJoke.user, user._id] }))
      } else {
        if (joke && !delivery) {
          dispatch(
            createJoke({
              jokeId: jokeId,
              joke: joke,
              type: EJokeType.single,
              category: jokeCategory,
              language: language,
              safe: safemode === ESafemode.Safe ? true : false,
              user: [user._id],
            })
          )
          setSaveJoke({
            jokeId: jokeId,
            joke: joke,
            type: EJokeType.single,
            category: jokeCategory,
            language: language,
            safe: safemode === ESafemode.Safe ? true : false,
            user: user ? [user._id] : [],
          })
        } else if (delivery) {
          dispatch(
            createJoke({
              jokeId: jokeId,
              setup: joke,
              delivery: delivery,
              type: EJokeType.twopart,
              category: jokeCategory,
              language: language,
              safe: safemode === ESafemode.Safe ? true : false,
              user: [user._id],
            })
          )

          setSaveJoke({
            jokeId: jokeId,
            setup: joke,
            delivery: delivery,
            type: EJokeType.twopart,
            category: jokeCategory,
            language: language,
            safe: safemode === ESafemode.Safe ? true : false,
            user: user ? [user._id] : [],
          })
        }
      }
      dispatch(notify(`${titleSaved}`, false, 8))
    }
  }

  const handleDelete =
    (id: IJoke['_id'], joke: string) =>
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault()
      if (window.confirm(`${deleteJoke} ${titleJoke.toLowerCase()} "${joke}"?`)) {
        try {
          // Make an API request to delete the user's ID from the joke's user array
          dispatch(deleteUserFromJoke(id as string, user._id as string)).then(() => {
            dispatch(initializeJokes())
          })
        } catch (error) {
          console.error('Error deleting joke:', error)
        }
      } else return
    }

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      dispatch(notify(`${titlePasswordsDoNotMatch}`, true, 8))
      return false
    }
    dispatch(createUser({ name, username, password, language }))
      .then((r) => {
        //console.log(r)
        const userId = r.user._id
        //dispatch(notify(`${titleRegistrationSuccesful}`, false, 8))
        dispatch(notify(r.message, false, 12))
        dispatch(findUserById(userId || '')).then((searchForUser) => {
          if (!searchForUser) {
            dispatch(notify(`${titleError}!`, true, 8))
            return
          } else if (saveJoke) {
            dispatch(createJoke({ ...saveJoke, user: [searchForUser._id] }))
          } else {
            if (!delivery || delivery === '')
              dispatch(
                createJoke({
                  jokeId: jokeId,
                  joke: joke,
                  type: EJokeType.single,
                  category: jokeCategory,
                  language: language,
                  safe: safemode === ESafemode.Safe ? true : false,
                  user: [searchForUser._id],
                })
              )
            else
              dispatch(
                createJoke({
                  jokeId: jokeId,
                  setup: joke,
                  delivery: delivery,
                  type: EJokeType.twopart,
                  category: jokeCategory,
                  language: language,
                  safe: safemode === ESafemode.Safe ? true : false,
                  user: [searchForUser._id],
                })
              )
          }
        })
      })
      .catch((e) => {
        console.log(e)
        dispatch(notify(`${EError[language]}: ${e.response.data.message}`, true, 8))
      })
  }

  // dispatch(
  //   updateUser({
  //     ...user,
  //     jokes: [...user.jokes, jokeId],
  //   })
  // )

  const options = (
    enumObj: typeof ECategory_en | typeof EJokeType | typeof ESafemode | typeof ELanguages
  ) => {
    return Object.keys(enumObj).map((key) => ({
      value: enumObj[key as keyof typeof enumObj],
      label: key,
    })) as SelectOption[]
  }

  const optionsCategory = (
    enumObj:
      | typeof ECategory_en
      | typeof ECategory_cs
      | typeof ECategory_de
      | typeof ECategory_es
      | typeof ECategory_fr
      | typeof ECategory_pt
  ) => {
    return Object.entries(enumObj).map(([key, value]) => ({
      value: key,
      label: value,
    })) as SelectOption[]
  }

  const optionsSortBy = (enumObj: typeof SortBy) => {
    return Object.entries(enumObj).map(([key, value]) => ({
      value: key,
      label: value[language],
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

  function getKeyofEnum<T extends Record<string, string | number>>(
    obj: T,
    value: string | number
  ) {
    return Object.keys(obj).find((key) => obj[key] === value) as keyof typeof obj
  }

  // Fetch joke from API
  const fetchApi = () => {
    const category = jokeCategory?.length === 0 ? 'Any' : jokeCategory
    // console.log(
    //   `https://v2.jokeapi.dev/joke/${category}?${queryKey}${queryValue}lang=${language}&format=json${safemode}&type=${jokeType}`
    // )
    setLoading(true)
    fetch(
      `https://v2.jokeapi.dev/joke/${category}?${queryKey}${queryValue}lang=${language}&format=json${safemode}&type=${jokeType}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setJokeCategory(data.category)
        if (data.error) {
          //console.log(data)
          setJoke('')
          setDelivery('')
          dispatch(notify(`${titleError}! ${titleNoJokeFound}`, true, 8))
          setLoading(false)
          setQueryValue('')
          setQuery('')
          setJokeId(data.id)
          return
        }
        if (jokeType === EJokeType.twopart) {
          setJoke(data.setup)
          setDelivery(data.delivery)
          setQueryValue('')
          setQuery('')
          setJokeId(data.id)
        } else {
          setJoke(data.joke)
          setDelivery('')
          setQueryValue('')
          setQuery('')
          setJokeId(data.id)
        }
      })
      .catch((e) => {
        dispatch(notify(`${titleError}! ${e.response.data.message}`, true, 8))
      })
  }

  useEffect(() => {
    queryValue.trim() === ''
      ? setQueryKey(EQueryKey.None)
      : setQueryKey(EQueryKey.Contains)
  }, [queryValue])

  useEffect(() => {
    //Close the login or the register form when the other one is opened
    const loginWrapOpen = document.querySelector(
      '.login-container.closed button.open'
    ) as HTMLButtonElement
    const loginWrapClose = document.querySelector(
      '.login-container.open button.close'
    ) as HTMLButtonElement
    const registerWrapOpen = document.querySelector(
      '.register-container.closed button.open'
    ) as HTMLButtonElement
    const registerWrapClose = document.querySelector(
      '.register-container.open button.close'
    ) as HTMLButtonElement

    loginWrapOpen?.addEventListener('click', () => {
      registerOpen === true ? registerWrapClose?.click() : null
      setLoginOpen(true)
      setRegisterOpen(false)
    })
    registerWrapOpen?.addEventListener('click', () => {
      loginOpen === true ? loginWrapClose?.click() : null
      setRegisterOpen(true)
      setLoginOpen(false)
    })
    loginWrapClose?.addEventListener('click', () => {
      setLoginOpen(false)
    })
    registerWrapClose?.addEventListener('click', () => {
      setRegisterOpen(false)
    })
  }, [])

  return (
    <>
      <section className={`joke-container card ${language}`}>
        <div>
          <div className='flex center gap column'>
            <Select
              id='main-language'
              className='language main'
              instructions={`${titleLanguageSelect}:`}
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

            <Accordion text={`» ${titleClickHereToSeeFeatures} «`} className='features'>
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
                  </li>
                </ul>
              </div>
            </Accordion>
          </div>

          <div className='jokes-wrap'>
            <h2>{title}</h2>
            <p className='center mb3'>{titleAJokeGeneratorForTheComicallyInclied}</p>

            <FormJoke
              handleFormSubmit={handleFormSubmit}
              setJokeCategory={setJokeCategory}
              setQueryValue={setQueryValue}
              setLanguage={setLanguage}
              language={language}
              joke={joke}
              delivery={delivery}
              options={options}
              getKeyByValue={getKeyByValue}
              query={query}
              setQuery={setQuery}
              isCheckedSafemode={isCheckedSafemode}
              isCheckedEJokeType={isCheckedEJokeType}
              handleToggleChangeSafemode={handleToggleChangeSafemode}
              handleToggleChangeEJokeType={handleToggleChangeEJokeType}
              submitted={submitted}
              reveal={reveal}
              setReveal={setReveal}
              handleJokeSave={handleJokeSave}
              titleSafe={titleSafe}
              titleUnsafe={titleUnsafe}
              titleSingle={titleSingle}
              titleTwoPart={titleTwoPart}
              titleClickToReveal={titleClickToReveal}
              optionsCategory={optionsCategory}
              categoryLanguages={categoryLanguages}
              jokeCategoryByLanguage={jokeCategoryByLanguage}
              visibleJoke={visibleJoke}
              setVisibleJoke={setVisibleJoke}
            />
          </div>

          <div className={`register-login-wrap`}>
            <Login
              titleLogin={titleLogin}
              titleLogout={titleLogout}
              titleLoggedInAs={titleLoggedInAs}
              language={language}
              setLanguage={setLanguage}
              setLoggedIn={setLoggedIn}
              categoryLanguages={categoryLanguages}
              getKeyByValue={getKeyByValue}
              options={options}
            />
            <Register
              handleRegister={handleRegister}
              options={options}
              language={language}
              getKeyByValue={getKeyByValue}
              setLanguage={setLanguage}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              name={name}
              setName={setName}
              // registerOpen={registerOpen}
            />
          </div>
          {user && jokes && jokes.length > 0 ? (
            <UserJokes
              titleSaved={titleSaved}
              jokes={jokes}
              userId={user._id}
              handleDelete={handleDelete}
              deleteJoke={deleteJoke}
              titleCategory={titleCategory}
              titleSafe={titleSafe}
              titleUnsafe={titleUnsafe}
              language={language}
              isCheckedSafemode={isCheckedSafemode}
              handleToggleChangeSafemode={handleToggleChangeSafemode}
              titleClickToReveal={titleClickToReveal}
              translateWordLanguage={translateWordLanguage}
              titleLanguage={titleLanguage}
              getKeyofEnum={getKeyofEnum}
              optionsSortBy={optionsSortBy}
            />
          ) : (
            ''
          )}
        </div>
      </section>
      <Notification language={language} />
    </>
  )
}

export default Jokes
