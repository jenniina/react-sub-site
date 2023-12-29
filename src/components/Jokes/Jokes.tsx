import { useEffect, useState } from 'react'
import FormJoke from './components/FormJoke'
import Register from './components/Register'
import { SelectOption } from '../Select/Select'
import './css/joke.css'
import {
  IJoke,
  EJokeType,
  ECategory_en,
  ECategory_cs,
  ECategory_de,
  ECategory_es,
  ECategory_fr,
  ECategory_pt,
  ESavedJoke,
  ETheComediansCompanion,
  ESafemode,
  EQueryKey,
  EDelete,
  ECategoryTitle,
  ESafeTitle,
  EUnsafeTitle,
  EJoke,
  ESingle,
  ETwoPart,
  EClickToReveal,
  ECategory,
  IJokeCategoryByLanguage,
  ELoginOrRegisterToSave,
  SortBy,
  EJokeAlreadySaved,
  ENoJokeFound,
  EAJokeGeneratorForTheComicallyInclined,
  EExtraCategories,
  ENoJokeFoundWithThisSearchTerm,
} from './interfaces'
import {
  ELogin,
  ELogout,
  EError,
  EPasswordsDoNotMatch,
  ELanguageTitle,
  ELoggedInAs,
  ELanguages,
  ReducerProps,
} from '../../interfaces'
import { useSelector } from 'react-redux'
import Login from './components/Login'
import useLocalStorage from '../../hooks/useStorage'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import Notification from './components/Notification'
import { createUser, findUserById } from '../../reducers/usersReducer'
import {
  createJoke,
  deleteUserFromJoke,
  initializeJokes,
  updateJoke,
} from './reducers/jokeReducer'
import { initializeUser, login } from '../../reducers/authReducer'
import UserJokes from './components/UserJokes'
import norrisService from './services/chucknorris'
import dadjokeService from './services/dadjokes'
import { AxiosError } from 'axios'

export const jokeCategoryByLanguage: IJokeCategoryByLanguage = {
  en: {
    Programming: ECategory_en.Programming,
    Misc: ECategory_en.Misc,
    Dark: ECategory_en.Dark,
    Pun: ECategory_en.Pun,
    Spooky: ECategory_en.Spooky,
    Christmas: ECategory_en.Christmas,
    ChuckNorris: ECategory_en.ChuckNorris,
    DadJoke: ECategory_en.DadJoke,
  },
  es: {
    Programming: ECategory_es.Programming,
    Misc: ECategory_es.Misc,
    Dark: ECategory_es.Dark,
    Pun: ECategory_es.Pun,
    Spooky: ECategory_es.Spooky,
    Christmas: ECategory_es.Christmas,
    ChuckNorris: ECategory_es.ChuckNorris,
    DadJoke: ECategory_es.DadJoke,
  },
  fr: {
    Programming: ECategory_fr.Programming,
    Misc: ECategory_fr.Misc,
    Dark: ECategory_fr.Dark,
    Pun: ECategory_fr.Pun,
    Spooky: ECategory_fr.Spooky,
    Christmas: ECategory_fr.Christmas,
    ChuckNorris: ECategory_fr.ChuckNorris,
    DadJoke: ECategory_fr.DadJoke,
  },
  de: {
    Programming: ECategory_de.Programming,
    Misc: ECategory_de.Misc,
    Dark: ECategory_de.Dark,
    Pun: ECategory_de.Pun,
    Spooky: ECategory_de.Spooky,
    Christmas: ECategory_de.Christmas,
    ChuckNorris: ECategory_de.ChuckNorris,
    DadJoke: ECategory_de.DadJoke,
  },
  pt: {
    Programming: ECategory_pt.Programming,
    Misc: ECategory_pt.Misc,
    Dark: ECategory_pt.Dark,
    Pun: ECategory_pt.Pun,
    Spooky: ECategory_pt.Spooky,
    Christmas: ECategory_pt.Christmas,
    ChuckNorris: ECategory_pt.ChuckNorris,
    DadJoke: ECategory_pt.DadJoke,
  },
  cs: {
    Programming: ECategory_cs.Programming,
    Misc: ECategory_cs.Misc,
    Dark: ECategory_cs.Dark,
    Pun: ECategory_cs.Pun,
    Spooky: ECategory_cs.Spooky,
    Christmas: ECategory_cs.Christmas,
    ChuckNorris: ECategory_cs.ChuckNorris,
    DadJoke: ECategory_cs.DadJoke,
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
  const categoryByLanguagesConst = {
    en: ECategory_en,
    es: ECategory_es,
    fr: ECategory_fr,
    de: ECategory_de,
    pt: ECategory_pt,
    cs: ECategory_cs,
  }

  const title = ETheComediansCompanion[language]
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
  const titleError = EError[language]
  const titleNoJokeFound = ENoJokeFound[language]
  const deleteJoke = EDelete[language]
  const languageNameFromLanguage = getKeyofEnum(ELanguages, language)
  const translateWordLanguage = ELanguageTitle[language]
  const titleLanguage = languageNameFromLanguage
  const [joke, setJoke] = useState<string>('')
  const [delivery, setDelivery] = useState<string>('')
  const [categoryByLanguages, setCategoryByLanguages] = useState<
    | typeof ECategory_en
    | typeof ECategory_cs
    | typeof ECategory_de
    | typeof ECategory_es
    | typeof ECategory_fr
    | typeof ECategory_pt
  >(categoryByLanguagesConst.en)
  const [jokeCategory, setJokeCategory] = useState<ECategory>(
    jokeCategoryByLanguage[language].Misc
  )
  const [currentCategory, setCurrentCategory] = useState<ECategory>(
    jokeCategoryByLanguage[language].Misc
  )
  const [categoryValues, setCategoryValues] = useState<SelectOption[]>([])
  const [norrisCategories, setNorrisCategories] = useState<SelectOption[]>([
    { value: 'any', label: 'Any' },
  ])
  const [selectedNorrisCategory, setSelectedNorrisCategory] = useState<
    SelectOption | undefined
  >(norrisCategories[0])

  const [jokeType, setEJokeType] = useState<EJokeType>(EJokeType.twopart)
  const [isCheckedJokeType, setIsCheckedJokeType] = useState<boolean>(false)
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
  const titleAJokeGeneratorForTheComicallyInclined =
    EAJokeGeneratorForTheComicallyInclined[language]

  const dispatch = useAppDispatch()

  const getJokeCategories = (
    language: keyof typeof jokeCategoryByLanguage,
    isCheckedJokeType: boolean,
    isCheckedSafemode: boolean
  ) => {
    let categories = jokeCategoryByLanguage[language]

    const categoryKeys = Object.keys(categories)
    let cats:
      | typeof ECategory_en
      | typeof ECategory_es
      | typeof ECategory_fr
      | typeof ECategory_de
      | typeof ECategory_pt
      | typeof ECategory_cs = categoryKeys.reduce((obj, key) => {
      if (isCheckedJokeType && (key === 'ChuckNorris' || key === 'DadJoke')) {
        return obj
      }
      if (isCheckedSafemode && key === 'Dark') {
        return obj
      }
      return {
        ...obj,
        [key as keyof typeof categories]: categories[key as keyof typeof categories],
      }
    }, {}) as
      | typeof ECategory_en
      | typeof ECategory_es
      | typeof ECategory_fr
      | typeof ECategory_de
      | typeof ECategory_pt
      | typeof ECategory_cs
    return cats
  }

  useEffect(() => {
    const categories = getJokeCategories(language, isCheckedJokeType, isCheckedSafemode)
    setCategoryByLanguages(categories)
  }, [language, isCheckedJokeType, isCheckedSafemode])

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

  // Set the document language and title
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = `document.documentElement.lang = '${language}';`
    document.head.appendChild(script)
    document.title = title
    if (language) {
      setCategoryByLanguages(categoryByLanguagesConst[language])
      setCategoryValues(
        categoryValues.map((option) => ({
          ...option,
          label:
            categoryByLanguagesConst[language][
              option.value as keyof (typeof categoryByLanguagesConst)[typeof language]
            ],
        }))
      )
    }
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
    setIsCheckedJokeType(!isCheckedJokeType) // Toggle the state when the button is clicked
  }
  useEffect(() => {
    isCheckedSafemode ? setSafemode(ESafemode.Safe) : setSafemode(ESafemode.Unsafe)
  }, [isCheckedSafemode])

  useEffect(() => {
    isCheckedJokeType ? setEJokeType(EJokeType.twopart) : setEJokeType(EJokeType.single)
    const filteredListJokeCategory: ECategory = categoryValues
      .filter(
        (category) =>
          category.value !== ECategory_en.ChuckNorris &&
          category.value !== ECategory_en.DadJoke
      )
      .map((category) => category.value as ECategory)
      .join(',') as ECategory
    // const filteredList = jokeCategory
    //   ?.split(',')
    //   .filter((category) => category !== 'ChuckNorris' && category !== 'DadJoke')
    //   .join(',')
    const filteredList: SelectOption[] = categoryValues
      .filter(
        (category) =>
          category.value !== ECategory_en.ChuckNorris &&
          category.value !== ECategory_en.DadJoke
      )
      .map((category) => ({
        ...category,
        label: categoryByLanguages[category.value as keyof typeof categoryByLanguages],
      }))
    const categoryListJoin = categoryValues
      .map((category) => category.value)
      .join(',') as ECategory
    if (!isCheckedJokeType) {
      setCategoryValues(filteredList)
      setJokeCategory(filteredListJokeCategory)
    } else {
      setCategoryValues(categoryValues)
      setJokeCategory(categoryListJoin)
    }
  }, [isCheckedJokeType])

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
          j.category === currentCategory &&
          j.type === jokeType
      )
      if (joke && !delivery) {
        setSaveJoke({
          jokeId: jokeId,
          joke: joke,
          type: EJokeType.single,
          category: currentCategory,
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
          category: currentCategory,
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
          j.category === currentCategory &&
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
              category: currentCategory,
              language: language,
              safe: safemode === ESafemode.Safe ? true : false,
              user: [user._id],
            })
          )
          setSaveJoke({
            jokeId: jokeId,
            joke: joke,
            type: EJokeType.single,
            category: currentCategory,
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
              category: currentCategory,
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
            category: currentCategory,
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
      | typeof ELanguages
      | typeof EExtraCategories,
    value: ECategory | EJokeType | ESafemode | ELanguages | EExtraCategories
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

  function getRandomMinMax(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  //for ChuckNorris and DadJoke
  const setJokeData = async (jokeData: any, category: ECategory_en) => {
    setLoading(false)
    setSaveJoke({
      jokeId: jokeData.id,
      joke: jokeData.joke || jokeData.value,
      type: EJokeType.single,
      category: category,
      language: language,
      safe: safemode === ESafemode.Safe ? true : false,
      user: user ? [user._id] : [],
    })
    setJoke(jokeData.joke || jokeData.value)
    setDelivery('')
  }

  // Fetch joke from API
  const fetchApi = async () => {
    setLoading(true)
    const amountOfCategories =
      categoryValues.length < 1 ? 9 : categoryValues.length + 0.999
    const random1 = Math.floor(getRandomMinMax(1, amountOfCategories))
    const isChuckNorris =
      categoryValues.some((category) => category.value === 'ChuckNorris') ||
      categoryValues.length === 0
    const isDadJoke =
      categoryValues.some((category) => category.value === 'DadJoke') ||
      categoryValues.length === 0
    const isQueryNotEmpty = queryValue.trim() !== ''

    if ((random1 === 1 || random1 === 2) && (isChuckNorris || isDadJoke)) {
      if (isChuckNorris && isDadJoke) {
        const random = Math.floor(getRandomMinMax(1, 2.999))
        if (random === 1 && isChuckNorris && isQueryNotEmpty) {
          const norrisJoke = await norrisService.searchNorrisJoke(queryValue)
          if (!norrisJoke) {
            setLoading(false)
            setJoke('')
            setDelivery('')
            dispatch(notify(`${ENoJokeFoundWithThisSearchTerm[language]}`, true, 8))
            return
          }
          await setJokeData(norrisJoke, ECategory_en.ChuckNorris)
          setCurrentCategory(ECategory_en.ChuckNorris)
        } else if (random === 1 && isChuckNorris) {
          const randomCategory = getRandomNorrisCategory()
          const norrisJoke = await norrisService.getRandomJokeFromNorrisCategory(
            (randomCategory?.value as string) ?? ''
          )
          await setJokeData(norrisJoke, ECategory_en.ChuckNorris)
          setCurrentCategory(ECategory_en.ChuckNorris)
        } else if (random > 1 && isDadJoke && isQueryNotEmpty) {
          const dadJoke = await dadjokeService.searchDadJokes(queryValue)
          setCurrentCategory(ECategory_en.DadJoke)
          if (!dadJoke) {
            setLoading(false)
            setJoke('')
            setDelivery('')
            dispatch(notify(`${ENoJokeFoundWithThisSearchTerm[language]}`, true, 8))
            return
          }
          setJokeId(dadJoke.id)
          await setJokeData(dadJoke, ECategory_en.DadJoke)
          setCurrentCategory(ECategory_en.DadJoke)
        } else {
          const dadJoke = await dadjokeService.getRandomDadJoke()
          setJokeId(dadJoke.id)
          await setJokeData(dadJoke, ECategory_en.DadJoke)
          setCurrentCategory(ECategory_en.DadJoke)
        }
      } else if (isChuckNorris && isQueryNotEmpty) {
        const norrisJoke = await norrisService.searchNorrisJoke(queryValue)
        if (!norrisJoke) {
          setLoading(false)
          setJoke('')
          setDelivery('')
          dispatch(notify(`${ENoJokeFoundWithThisSearchTerm[language]}`, true, 8))
          return
        }
        await setJokeData(norrisJoke, ECategory_en.ChuckNorris)
        setCurrentCategory(ECategory_en.ChuckNorris)
      } else if (
        isChuckNorris &&
        selectedNorrisCategory?.value &&
        selectedNorrisCategory?.value !== 'any'
      ) {
        const norrisJoke = await norrisService.getRandomJokeFromNorrisCategory(
          (selectedNorrisCategory?.value as string) ?? ''
        )
        await setJokeData(norrisJoke, ECategory_en.ChuckNorris)
        setCurrentCategory(ECategory_en.ChuckNorris)
      } else if (isChuckNorris) {
        const randomCategory = getRandomNorrisCategory()
        const norrisJoke = await norrisService.getRandomJokeFromNorrisCategory(
          randomCategory.value as string
        )
        await setJokeData(norrisJoke, ECategory_en.ChuckNorris)
        setCurrentCategory(ECategory_en.ChuckNorris)
      } else if (isDadJoke && isQueryNotEmpty) {
        const dadJoke = await dadjokeService.searchDadJokes(queryValue)
        if (!dadJoke) {
          setLoading(false)
          setJoke('')
          setDelivery('')
          dispatch(notify(`${ENoJokeFoundWithThisSearchTerm[language]}`, true, 8))
          return
        }
        setCurrentCategory(ECategory_en.DadJoke)
        setJokeId(dadJoke.id)
        await setJokeData(dadJoke, ECategory_en.DadJoke)
      } else {
        const dadJoke = await dadjokeService.getRandomDadJoke()
        setCurrentCategory(ECategory_en.DadJoke)
        setJokeId(dadJoke.id)
        await setJokeData(dadJoke, ECategory_en.DadJoke)
      }
    } else {
      const categories = categoryValues.map((category) => category.value)
      const filteredCategories = categories.filter(
        (category) => category !== 'ChuckNorris' && category !== 'DadJoke'
      )
      const category =
        filteredCategories.length > 0 ? filteredCategories.join(',') : 'Any'

      // const category =
      //   jokeCategory?.length === 0
      //     ? 'Any'
      //     : jokeCategory
      //         ?.split(',')
      //         .filter((category) => category !== 'ChuckNorris' && category !== 'DadJoke')
      //         .join(',')
      // console.log(
      //   `https://v2.jokeapi.dev/joke/${category}?${queryKey}${queryValue}lang=${language}&format=json${safemode}&type=${jokeType}`
      // )

      fetch(
        `https://v2.jokeapi.dev/joke/${category}?${queryKey}${queryValue}lang=${language}&format=json${safemode}&type=${jokeType}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false)
          //setJokeCategory(data.category)
          setCurrentCategory(data.category)
          if (data.error) {
            //console.log(data)
            setJoke('')
            setDelivery('')
            dispatch(
              notify(
                `${titleError}! ${ENoJokeFoundWithThisSearchTerm[language]}`,
                true,
                8
              )
            )
            setLoading(false)
            setQueryValue('')
            setQuery('')
            setJokeId('')
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
          console.log(e)
          dispatch(notify(`${titleError}! ${e.response.data.message}`, true, 8))
        })
    }
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

  const optionsNorris = (enumObj: typeof EExtraCategories, any: boolean) => {
    const options = Object.entries(enumObj).map(([key, value]) => ({
      value: value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
    })) as SelectOption[]
    if (any) options.unshift({ value: 'any', label: 'Any' })
    return options
  }

  const fetchNorrisCategories = async () => {
    const norrisCat = await norrisService.getNorrisCategories()
    const norrisCatOptions = optionsNorris(norrisCat, true)
    setNorrisCategories(norrisCatOptions)
  }

  const getRandomNorrisCategory = () => {
    const filteredCategories =
      safemode === ESafemode.Unsafe
        ? norrisCategories.filter((category) => category.value !== 'any')
        : norrisCategories.filter(
            (category) =>
              category.value !== 'any' &&
              category.value !== 'explicit' &&
              category.value !== 'religious'
          )

    const randomIndex = Math.floor(Math.random() * filteredCategories.length)
    const selectedCategory = filteredCategories[randomIndex]

    return selectedCategory
  }
  useEffect(() => {
    fetchNorrisCategories()
  }, [])

  return (
    <>
      <section className={`joke-container card ${language}`}>
        <div>
          <div className='jokes-wrap'>
            <h2>{title}</h2>
            <p className='center textcenter mb3'>
              {titleAJokeGeneratorForTheComicallyInclined}
            </p>

            <FormJoke
              handleFormSubmit={handleFormSubmit}
              jokeCategory={jokeCategory}
              setJokeCategory={setJokeCategory}
              currentCategory={currentCategory}
              categoryValues={categoryValues}
              setCategoryValues={setCategoryValues}
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
              isCheckedJokeType={isCheckedJokeType}
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
              categoryByLanguages={categoryByLanguages}
              jokeCategoryByLanguage={jokeCategoryByLanguage}
              visibleJoke={visibleJoke}
              setVisibleJoke={setVisibleJoke}
              norrisCategories={norrisCategories}
              selectedNorrisCategory={selectedNorrisCategory}
              setSelectedNorrisCategory={setSelectedNorrisCategory}
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
              categoryByLanguages={categoryByLanguages}
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
