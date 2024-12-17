import { useEffect, useState, lazy, Suspense } from 'react'
// import FormJoke from './components/FormJoke'
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
  ECategories,
  IJokeCategoryByLanguage,
  ELoginOrRegisterToSave,
  ESortBy,
  EJokeAlreadySaved,
  EAJokeGeneratorForTheComicallyInclined,
  EExtraCategories,
  ENoJokeFoundWithThisSearchTerm,
  ECategory_fi,
  TCategoryByLanguages,
  EMaybeTryAnotherLanguage,
  EErrorDeletingJoke,
  ETryAnotherSearchTerm,
  IJokeTwoPart,
  EAreYouSureYouWantToMakeThisJokePublic,
  EAreYouSureYouWantToMakeThisJokePrivate,
  EAnonymous,
  norrisCategoryTranslations as norrisCats,
  EAny,
  EAreYouSureYouWantToHideThisJoke,
  EJokeHidden,
  EThisJokeIsAlreadyBlacklisted,
  EJokeRestored,
  EAreYouSureYouWantToRestoreThisJoke,
  EWouldYouLikeToSaveTheJoke,
  EJokesLoaded,
} from './interfaces'
import {
  ELogin,
  EError,
  ELanguageTitle,
  ELoggedInAs,
  ELanguages,
  ReducerProps,
  IUser,
  ERegister,
  LanguageOfLanguage,
  ELanguagesLong,
  TLanguageOfLanguage,
  IBlacklistedJoke,
  ELoading,
} from '../../interfaces'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import {
  createJoke,
  deleteUserFromJoke,
  getJokesByUserId,
  initializeJokes,
  removeJoke,
  saveMostRecentJoke,
  updateJoke,
} from './reducers/jokeReducer'
import { initializeUser } from '../../reducers/authReducer'
//import UserJokes from './components/UserJokes'
import norrisService from './services/chucknorris'
import dadjokeService from './services/dadjokes'
//import JokeSubmit from './components/JokeSubmit'
import { useNavigate } from 'react-router-dom'
import {
  addToBlacklistedJokes,
  removeJokeFromBlacklisted,
  initializeUsers,
  findUserById,
} from '../../reducers/usersReducer'
import { AxiosError } from 'axios'
import { options, getRandomMinMax } from '../../utils'

const FormJoke = lazy(() => import('./components/FormJoke'))
const JokeSubmit = lazy(() => import('./components/JokeSubmit'))
const UserJokes = lazy(() => import('./components/UserJokes'))

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
  fi: {
    Programming: ECategory_fi.Programming,
    Misc: ECategory_fi.Misc,
    Dark: ECategory_fi.Dark,
    Pun: ECategory_fi.Pun,
    Spooky: ECategory_fi.Spooky,
    Christmas: ECategory_fi.Christmas,
    ChuckNorris: ECategory_fi.ChuckNorris,
    DadJoke: ECategory_fi.DadJoke,
  },
}

export const jokeCategoryAny = {
  en: 'Any',
  es: 'Cualquiera',
  fr: "N'importe quel",
  de: 'Irgendein',
  pt: 'Qualquer',
  cs: 'Jakýkoliv',
  fi: 'Mikä tahansa',
}

function Jokes({
  language,
  setLanguage,
}: {
  language: ELanguages
  setLanguage: (language: ELanguages) => void
}) {
  const jokes = useSelector((state: ReducerProps) => {
    return state.jokes?.jokes
  })
  const recentJoke = useSelector((state: ReducerProps) => {
    return state.jokes?.joke
  })
  const users = useSelector((state: ReducerProps) => {
    return state.users
  })
  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })
  // const user = localUser
  //   ? users?.find((user: IUser) => user._id === localUser.user._id)
  //   : undefined

  const categoryByLanguagesConst = {
    en: ECategory_en,
    es: ECategory_es,
    fr: ECategory_fr,
    de: ECategory_de,
    pt: ECategory_pt,
    cs: ECategory_cs,
    fi: ECategory_fi,
  }

  const translateWordLanguage = ELanguageTitle[language]
  const [joke, setJoke] = useState<string>('')
  const [delivery, setDelivery] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [categoryByLanguages, setCategoryByLanguages] = useState<TCategoryByLanguages>(
    categoryByLanguagesConst.en
  )
  const [jokeLanguage, setJokeLanguage] = useState<ELanguages>(language)
  const [jokeCategory, setJokeCategory] = useState<ECategories | null>(ECategories.Misc)
  const [categoryValues, setCategoryValues] = useState<SelectOption[]>([])
  const [norrisCategories, setNorrisCategories] = useState<SelectOption[]>([
    { value: 'any', label: 'Any' },
  ])
  const [selectedNorrisCategory, setSelectedNorrisCategory] = useState<
    SelectOption | undefined
  >(norrisCategories[0])
  const [subCategoryResults, setSubCategoryResults] = useState<string[]>([])
  const [jokeType, setEJokeType] = useState<EJokeType>(EJokeType.twopart)
  const [isCheckedJokeType, setIsCheckedJokeType] = useState<boolean>(false)
  const [safemode, setSafemode] = useState<ESafemode>(ESafemode.Safe)
  const [isCheckedSafemode, setIsCheckedSafemode] = useState<boolean>(true)
  const [queryKey, setQueryKey] = useState<EQueryKey>(EQueryKey.None)
  const [queryValue, setQueryValue] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [reveal, setReveal] = useState<boolean>(true)
  const [jokeId, setJokeId] = useState<IJoke['jokeId']>('')
  const [loginOpen, setLoginOpen] = useState<boolean>(false)
  const [registerOpen, setRegisterOpen] = useState<boolean>(false)
  const [visibleJoke, setVisibleJoke] = useState<boolean>(false)
  const [hasNorris, setHasNorris] = useState<boolean>(false)
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const [editId, setEditId] = useState<IJoke['_id'] | null>(null)
  const [lastJokes, setLastJokes] = useState<{ jokeId: string; language: string }[]>([])
  const [lastJokesLength, setLastJokesLength] = useState<number>(6)
  const [sending, setSending] = useState<boolean>(false)

  const [flags, setFlags] = useState({
    nsfw: false,
    religious: false,
    political: false,
    racist: false,
    sexist: false,
    explicit: false,
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    const norrisExists = categoryValues?.find((v) => v.value === 'ChuckNorris')
      ? true
      : false
    if (queryValue === '') {
      setHasNorris(norrisExists)
    } else {
      setHasNorris(false)
    }
  }, [queryValue, categoryValues, hasNorris])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    dispatch(initializeJokes())
      .then(() => {
        notify(`${EJokesLoaded[language]}...`, false, 3)
      })
      .catch((e) => {
        if (e.response?.data?.message) dispatch(notify(e.response.data.message, true, 8))
        else
          dispatch(notify(`${EError[language]}: ${(e as Error)?.message ?? ''}`, true, 8))
      })
  }, [])

  useEffect(() => {
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
  }, [language])

  const handleToggleChangeSafemode = () => {
    setIsCheckedSafemode(!isCheckedSafemode)
  }
  const handleToggleChangeEJokeType = () => {
    setIsCheckedJokeType(!isCheckedJokeType)
  }
  useEffect(() => {
    isCheckedSafemode ? setSafemode(ESafemode.Safe) : setSafemode(ESafemode.Unsafe)
  }, [isCheckedSafemode])

  useEffect(() => {
    isCheckedJokeType ? setEJokeType(EJokeType.twopart) : setEJokeType(EJokeType.single)
  }, [isCheckedJokeType]) //, isCheckedSafemode, language

  // Handle form submit
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setVisibleJoke(true)
    }, 400)
    setReveal(true)
    setTimeout(() => {
      fetchApi()
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setSending(false)
      }, 5500)
      // Scroll to the anchor with id "generated-joke"
      const generatedJokeAnchor = document.querySelector('#queryValue')
      if (generatedJokeAnchor) {
        generatedJokeAnchor.scrollIntoView({ behavior: 'smooth' })
      }
    }, 600)
  }

  const handleDelete =
    (id: IJoke['_id'], joke: string) =>
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault()
      setSending(true)
      if (
        window.confirm(`${EDelete[language]} ${EJoke[language].toLowerCase()} "${joke}"?`)
      ) {
        try {
          // Make an API request to delete the user's ID from the joke's user array
          dispatch(deleteUserFromJoke(id as string, user?._id as string)).then(() => {
            dispatch(initializeJokes())
          })
          setSending(false)
        } catch (error: any) {
          if (error.response?.data?.message)
            dispatch(notify(error.response.data.message, true, 8))
          else console.error(EErrorDeletingJoke[language], error)
          setSending(false)
        }
      } else return
    }

  const handleUpdate =
    (id: IJoke['_id'], joke: IJoke) =>
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault()
      setSending(true)
      const jokeObject = jokes.find((j) => j._id === id)
      if (!jokeObject) {
        dispatch(notify(`${EError[language]}!`, true, 8))
        setSending(false)
        return
      }
      const handleDispatch = async (joke: IJoke) => {
        try {
          await dispatch(updateJoke(joke))
          await dispatch(initializeJokes())
          const r = await dispatch(updateJoke({ ...joke, verified: false, _id: id }))
          dispatch(notify(`${ESavedJoke[language]}. ${r.message ?? ''}`, false, 8))
          setEditId(null)
          setIsEditOpen(false)
          setSending(false)
        } catch (e) {
          console.error(e)
          const errorMessage =
            (e as AxiosError)?.code === 'ERR_BAD_RESPONSE'
              ? ((e as AxiosError<AxiosError>)?.response?.data?.message as string)
              : (e as Error)?.message ?? ''
          dispatch(notify(`${EError[language]}: ${errorMessage}`, true, 8))
          setSending(false)
        }
      }
      const update = () => {
        if (jokeObject.private === true && joke.private === false) {
          if (
            joke.category === ECategories.Dark ||
            Object.values(joke.flags).some((value) => value)
          ) {
            handleDispatch({ ...joke, private: true, verified: false, safe: false })
            setSending(false)
          } else {
            handleDispatch({ ...joke, private: true, verified: false, _id: id })
            setSending(false)
          }
        } else if (
          joke.category != ECategories.Dark &&
          !Object.values(joke.flags).some((value) => value)
        ) {
          handleDispatch({ ...joke, safe: true, _id: id })
          setSending(false)
        } else if (
          joke.category === ECategories.Dark ||
          Object.values(joke.flags).some((value) => value)
        ) {
          handleDispatch({ ...joke, safe: false, _id: id })
          setSending(false)
        } else {
          handleDispatch(joke)
          setSending(false)
        }
      }
      if (jokeObject.private === true && joke.private === false) {
        if (window.confirm(EAreYouSureYouWantToMakeThisJokePublic[language])) {
          update()
        }
      } else if (jokeObject.private === false && joke.private === true) {
        if (window.confirm(EAreYouSureYouWantToMakeThisJokePrivate[language])) {
          update()
        }
      } else update()
    }

  // const options = (
  //   enumObj: typeof ECategories | typeof EJokeType | typeof ESafemode | typeof ELanguages
  // ) => {
  //   return Object.keys(enumObj).map((key) => ({
  //     value: enumObj[key as keyof typeof enumObj],
  //     label: key,
  //   })) as SelectOption[]
  // }

  const optionsCategory = (enumObj: TCategoryByLanguages) => {
    return Object.entries(enumObj).map(([key, value]) => ({
      value: key,
      label: value,
    })) as SelectOption[]
  }

  const optionsSortBy = (enumObj: typeof ESortBy) => {
    return Object.entries(enumObj).map(([key, value]) => ({
      value: key,
      label: value[language],
    })) as SelectOption[]
  }

  function getKeyByValue(
    enumObj:
      | TCategoryByLanguages
      | typeof ECategories
      | typeof EJokeType
      | typeof ESafemode
      | typeof ELanguages
      | typeof EExtraCategories,
    value: ECategories | EJokeType | ESafemode | ELanguages | EExtraCategories
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

  const [foundJoke, setFoundJoke] = useState<IJoke | undefined>(undefined)

  useEffect(() => {
    const findJoke = jokes?.find(
      (j: IJoke) =>
        j.jokeId.toString() === recentJoke?.jokeId.toString() &&
        j.language === recentJoke?.language &&
        j.category === recentJoke?.category
    )
    if (findJoke) {
      setFoundJoke(findJoke)
    }
  }, [recentJoke, jokes])

  const handleJokeSave = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!user) {
      dispatch(notify(`${ELoginOrRegisterToSave[language]}`, false, 8))
      return
    } else {
      if (foundJoke) {
        if (foundJoke.user.includes(user?._id?.toString())) {
          dispatch(notify(`${EJokeAlreadySaved[language]}`, false, 8))
          return
        }
        dispatch(updateJoke({ ...foundJoke, user: [...foundJoke.user, user?._id] }))
          .then(() => initializeJokes())
          .catch((e) => {
            if (e.response?.data?.message)
              dispatch(notify(e.response.data.message, true, 8))
            else
              dispatch(
                notify(`${EError[language]}:: ${(e as Error)?.message ?? ''}`, true, 8)
              )
          })
      } else {
        if (recentJoke && recentJoke?.type === EJokeType.single) {
          dispatch(
            createJoke({
              jokeId: recentJoke?.jokeId.toString() ?? jokeId.toString(),
              joke: joke,
              type: EJokeType.single,
              category: recentJoke?.category ?? jokeCategory ?? ECategories.Misc,
              subCategories:
                recentJoke?.subCategories ?? subCategoryResults?.length > 0
                  ? subCategoryResults
                  : undefined,
              language: recentJoke?.language ?? jokeLanguage,
              safe: !Object.values(flags).some((value) => value),
              user: [user._id],

              flags: {
                nsfw: recentJoke?.flags.nsfw,
                religious: recentJoke?.flags.religious,
                political: recentJoke?.flags.political,
                racist: recentJoke?.flags.racist,
                sexist: recentJoke?.flags.sexist,
                explicit: recentJoke?.flags.explicit,
              },
            })
          )
            .then(() => {
              dispatch(initializeJokes())
            })
            .catch((e) => {
              if (e.response?.data?.message)
                dispatch(notify(e.response.data.message, true, 8))
              else
                dispatch(
                  notify(`${EError[language]}*: ${(e as Error)?.message ?? ''}`, true, 8)
                )
            })
        } else if (recentJoke && recentJoke?.type === EJokeType.twopart) {
          dispatch(
            createJoke({
              jokeId: recentJoke?.jokeId.toString() ?? jokeId.toString(),
              setup: joke,
              delivery: delivery,
              type: EJokeType.twopart,
              category: recentJoke?.category ?? jokeCategory ?? ECategories.Misc,
              subCategories:
                subCategoryResults?.length > 0 ? subCategoryResults : undefined,
              language: recentJoke?.language ?? jokeLanguage,
              safe: !Object.values(recentJoke?.flags).some((value) => value),
              user: [user._id],

              flags: {
                nsfw: recentJoke?.flags.nsfw,
                religious: recentJoke?.flags.religious,
                political: recentJoke?.flags.political,
                racist: recentJoke?.flags.racist,
                sexist: recentJoke?.flags.sexist,
                explicit: recentJoke?.flags.explicit,
              },
            })
          )
            .then(() => {
              dispatch(initializeJokes())
            })
            .catch((e) => {
              if (e.response?.data?.message)
                dispatch(notify(e.response.data.message, true, 8))
              else
                dispatch(
                  notify(`${EError[language]}: ${(e as Error)?.message ?? ''}`, true, 8)
                )
            })
        }
      }
      dispatch(notify(`${ESavedJoke[language]}`, false, 8))
    }
  }

  //for ChuckNorris and DadJoke
  const setJokeData = async (
    jokeData: any,
    category: ECategories,
    subCategories: string[] | undefined,
    repeat: boolean
  ) => {
    if (isJokeBlacklisted(jokeData.id)) {
      fetchApi()
      return
    }
    if (
      repeat &&
      lastJokes.some(
        (joke) => joke.jokeId === jokeData.jokeId && joke.language === language
      )
    ) {
      // If it is found in the lastJokes, fetch again
      fetchApi()
      return
    }
    setLastJokes((prevJokes) => [...prevJokes, { jokeId: jokeData.id, language }])
    if (lastJokes?.length > lastJokesLength) {
      setLastJokes((prevJokes) => prevJokes.slice(1))
    }

    setJokeCategory(category)
    setSubCategoryResults(subCategories ?? [])

    dispatch(
      saveMostRecentJoke({
        jokeId: jokeData.id.toString(),
        joke: jokeData.joke || jokeData.value,
        type: EJokeType.single,
        category: category,
        subCategories:
          subCategories && subCategories?.length > 0 ? subCategories : undefined,
        language: ELanguages.English,

        safe:
          jokeData?.categories?.includes('explicit') ||
          jokeData?.categories?.includes('political') ||
          jokeData?.categories?.includes('religion')
            ? false
            : true,
        user: jokeData.user,
        flags: {
          nsfw: jokeData.categories?.nsfw ?? false,
          religious: jokeData.categories?.religion ?? false,
          political: jokeData.categories?.political ?? false,
          racist: jokeData.categories?.racist ?? false,
          sexist: jokeData.categories?.sexist ?? false,
          explicit: jokeData.categories?.explicit ?? false,
        },
      })
    )

    setFlags({
      explicit: jokeData?.categories?.includes('explicit') ?? false,
      religious: jokeData?.categories?.includes('religious') ?? false,
      political: jokeData?.categories?.includes('political') ?? false,
      racist: false,
      sexist: false,
      nsfw: jokeData?.categories?.includes('explicit') ?? false,
    })
    setJoke(jokeData.joke || jokeData.value)
    setDelivery('')
    setJokeId(jokeData.id)
    setJokeLanguage(ELanguages.English)
    setJoke(jokeData.joke || jokeData.value)
  }

  const getRandomNorrisCategory = () => {
    const filteredCategories =
      safemode === ESafemode.Unsafe
        ? norrisCategories.filter((category) => category.value !== 'any')
        : norrisCategories.filter(
            (category) =>
              category.value !== 'any' &&
              category.value !== 'explicit' &&
              category.value !== 'religion' &&
              category.value !== 'political'
          )

    const randomIndex = Math.floor(Math.random() * filteredCategories?.length)
    const selectedCategory = filteredCategories[randomIndex]

    return selectedCategory
  }

  type IJokeExtra = IJoke & {
    translatedLanguage: string
    name: string
  }
  const [userJokes, setUserJokes] = useState<IJokeExtra[]>([])

  useEffect(() => {
    if (
      Array.isArray(jokes) &&
      jokes?.length > 0 &&
      Array.isArray(users) &&
      users?.length > 0
    ) {
      let updatedJokes = jokes?.map((joke) => {
        const author = users?.find((user: IUser) => user._id == joke.author)
        const jokeLanguage = LanguageOfLanguage[language as keyof typeof ELanguagesLong][
          getKeyofEnum(
            ELanguages,
            joke.language as ELanguages
          ) as keyof TLanguageOfLanguage[ELanguages]
        ] as TLanguageOfLanguage[keyof typeof ELanguagesLong][keyof TLanguageOfLanguage[ELanguages]]

        return {
          ...joke,
          translatedLanguage: jokeLanguage ?? '',
          name: joke.anonymous ? EAnonymous[language] : author?.name ?? '',
        }
      })
      updatedJokes = !isCheckedSafemode
        ? updatedJokes
            .filter((joke) => joke.safe === false)
            .sort((a, b) => {
              return b.user?.length - a.user?.length
            }) //.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
        : isCheckedSafemode
        ? updatedJokes
            .filter((joke) => joke.safe)
            .sort((a, b) => {
              return b.user?.length - a.user?.length
            }) //.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
        : []

      setUserJokes(updatedJokes)
    }
  }, [jokes, users, language, isCheckedSafemode])

  // Fetch joke from API or database
  const fetchApi = async (retryCount = 0) => {
    const categories = categoryValues.map((category) => category.value)

    if (retryCount > 5) {
      return
    }

    const handleJokes = (jokes: IJoke[] | undefined) => {
      if (jokes && jokes?.length > 0 && Array.isArray(users) && users?.length > 0) {
        const random = jokes[Math.floor(Math.random() * jokes?.length)]
        if (
          lastJokes.some(
            (joke) => joke.jokeId === random.jokeId && joke.language === language
          )
        ) {
          // If it is found in the lastJokes, fetch again
          fetchApi()
          return
        }
        setLastJokes((prevJokes) => [...prevJokes, { jokeId: random.jokeId, language }])

        if (lastJokes?.length > lastJokesLength) {
          setLastJokes((prevJokes) => prevJokes.slice(1))
        }
        if (random) {
          setJokeId(random.jokeId)
          setJokeLanguage(language)
          setJokeCategory(random.category)
          if ('joke' in random) {
            setJoke(random.joke)
          } else if ('setup' in random) {
            setJoke(random.setup)
          }
          setDelivery('delivery' in random ? (random as IJokeTwoPart)?.delivery : '')
          if (
            (random.private === false || random.private === undefined) &&
            random.anonymous === false
          ) {
            const author = users?.find((user: IUser) => user._id == random.author)
            setAuthor(author?.name ?? '')
          } else {
            setAuthor('')
          }

          dispatch(saveMostRecentJoke(random))
          return
        } else {
          dispatch(
            notify(
              `${EError[language]}! ${ENoJokeFoundWithThisSearchTerm[language]}. ${ETryAnotherSearchTerm[language]}`,
              true,
              8
            )
          )

          setJoke('')
          setDelivery('')
          setAuthor('')
          return
        }
      } else {
        dispatch(
          notify(
            `${EError[language]}! ${ENoJokeFoundWithThisSearchTerm[language]}. ${ETryAnotherSearchTerm[language]}`,
            true,
            8
          )
        )

        setJoke('')
        setDelivery('')
        setAuthor('')
        return
      }
    }

    const jokeType = isCheckedJokeType ? EJokeType.twopart : EJokeType.single
    const filteredJokes = userJokes?.filter(
      (joke) =>
        joke.language === language &&
        (categories?.length === 0 || categories.includes(joke.category)) &&
        ((joke.private === false && joke.verified === true) ||
          joke.private === undefined) &&
        joke.safe === isCheckedSafemode &&
        joke.type === jokeType
    )
    const isEmpty = categoryValues?.length < 1
    const isChuckNorris = categoryValues.some(
      (category) => category.value === 'ChuckNorris'
    )
    const isDadJoke = categoryValues.some((category) => category.value === 'DadJoke')
    const isQueryNotEmpty = queryValue.trim() !== '' || queryValue !== '&'
    setJokeLanguage(language)

    let newFilteredJokes = filteredJokes

    if (isQueryNotEmpty) {
      //remove &-sign from queryValue's end
      const queryValueWithoutAnd = queryValue.replace(/&$/, '')

      newFilteredJokes = filteredJokes?.filter((joke) => {
        if (joke) {
          const searchTermMatches =
            ('joke' in joke
              ? joke.joke?.toLowerCase().includes(queryValueWithoutAnd.toLowerCase())
              : false) ||
            ('setup' in joke
              ? joke.setup?.toLowerCase().includes(queryValueWithoutAnd.toLowerCase())
              : false) ||
            ('delivery' in joke
              ? joke.delivery?.toLowerCase().includes(queryValueWithoutAnd.toLowerCase())
              : false) ||
            joke.name?.toLowerCase().includes(queryValueWithoutAnd.toLowerCase()) ||
            joke.category?.toLowerCase().includes(queryValueWithoutAnd.toLowerCase()) ||
            joke.subCategories?.includes(queryValueWithoutAnd?.toLowerCase()) ||
            joke.translatedLanguage
              ?.toLowerCase()
              .includes(queryValueWithoutAnd.toLowerCase())

          const categoryMatches =
            categories?.length > 0 ? categories.includes(joke.category) : true

          const languageMatches = joke.language === language

          const norrisCategoryMatches =
            selectedNorrisCategory?.value !== '' &&
            selectedNorrisCategory?.value !== 'any'
              ? joke.subCategories?.includes(selectedNorrisCategory?.value as string)
              : true

          if (
            joke.safe === isCheckedSafemode &&
            joke.type === jokeType &&
            ((joke.private === false && joke.verified === true) ||
              joke.private === undefined)
          ) {
            return (
              languageMatches &&
              categoryMatches &&
              norrisCategoryMatches &&
              searchTermMatches
            )
          } else {
            return false
          }
        }
      })
    }

    newFilteredJokes = newFilteredJokes?.filter((joke) => {
      // Check if the joke is blacklisted
      const isBlacklisted = user?.blacklistedJokes?.some(
        (blacklistedJoke: IBlacklistedJoke) =>
          blacklistedJoke.jokeId === joke.jokeId &&
          blacklistedJoke.language === joke.language
      )
      // Return true if the joke is not blacklisted
      return !isBlacklisted
    })

    // Because Finnish jokes are only in the database, we need to handle them differently
    if (
      newFilteredJokes &&
      newFilteredJokes?.length > 0 &&
      language === ELanguages.Suomi
    ) {
      handleJokes(newFilteredJokes)
      return
    }
    // Occasionally get a joke from the database instead of the APIs:
    else if (newFilteredJokes && newFilteredJokes?.length > 0 && Math.random() < 0.1) {
      handleJokes(newFilteredJokes)
      return
    }

    const queryValueWithoutAnd = queryValue.replace(/&$/, '')

    if (isChuckNorris || isDadJoke) {
      // ChuckNorris and DadJoke only appear in English in the API, so for other languages, you search for a joke from the database
      if (language !== ELanguages.English) {
        handleJokes(newFilteredJokes)
        return
      } else if (isChuckNorris && isDadJoke) {
        const random = Math.floor(getRandomMinMax(1, 2.999))
        if (random === 1 && isChuckNorris) {
          const query = isQueryNotEmpty ? queryValueWithoutAnd : null
          const joke = await fetchAndSetJoke(
            norrisService,
            query,
            ECategories.ChuckNorris,
            !isQueryNotEmpty
          )

          if (!joke) {
            noJoke()
            return
          }
        } else if (random > 1 && isDadJoke) {
          const query = isQueryNotEmpty ? queryValueWithoutAnd : null
          const joke = await fetchAndSetJoke(
            dadjokeService,
            query,
            ECategories.DadJoke,
            !isQueryNotEmpty
          )
          if (!joke) {
            noJoke()
            return
          }
        }
      } else if (isChuckNorris) {
        const query = isQueryNotEmpty ? queryValueWithoutAnd : null
        const joke = await fetchAndSetJoke(
          norrisService,
          query,
          ECategories.ChuckNorris,
          !isQueryNotEmpty
        )
        if (!joke) {
          noJoke()
          return
        }
      } else if (isDadJoke) {
        const query = isQueryNotEmpty ? queryValueWithoutAnd : null
        const joke = await fetchAndSetJoke(
          dadjokeService,
          query,
          ECategories.DadJoke,
          !isQueryNotEmpty
        )
        if (!joke) {
          noJoke()
          return
        }
      }
    } else if (isEmpty && !isCheckedJokeType) {
      const rand = Math.floor(getRandomMinMax(1, 10.999))
      const query = isQueryNotEmpty ? queryValueWithoutAnd : null
      if (rand === 1) {
        if (
          !(await fetchAndSetJoke(
            norrisService,
            query,
            ECategories.ChuckNorris,
            !isQueryNotEmpty
          ))
        ) {
          await fetchAndSetJoke(dadjokeService, query, ECategories.DadJoke, false)
        }
      } else if (rand === 2) {
        if (!(await fetchAndSetJoke(dadjokeService, query, ECategories.DadJoke, false))) {
          await fetchAndSetJoke(
            norrisService,
            query,
            ECategories.ChuckNorris,
            !isQueryNotEmpty
          )
        }
      } else if (rand > 2) {
        fetchFromJokeAPI()
      }
    } else {
      fetchFromJokeAPI()
    }
  }

  interface IDadService {
    getRandomDadJoke(): Promise<IJoke | undefined>
    searchDadJokes(query: string): Promise<IJoke | undefined>
  }
  interface INorrisService {
    getFullyRandomNorrisJoke(): Promise<IJoke | undefined>
    getRandomJokeFromNorrisCategory(category: string): Promise<IJoke | undefined>
    searchNorrisJoke(query: string): Promise<IJoke | undefined>
  }

  type TJokeService = IDadService | INorrisService

  async function fetchAndSetJoke(
    service: TJokeService,
    query: string | null,
    category: ECategories.DadJoke | ECategories.ChuckNorris,
    isRandom: boolean
  ) {
    let joke: any

    try {
      if (category === ECategories.ChuckNorris && service === norrisService) {
        if (
          !isCheckedSafemode &&
          (!selectedNorrisCategory?.value || selectedNorrisCategory?.value === 'any')
        ) {
          joke = await service.getFullyRandomNorrisJoke()
        } else if (
          selectedNorrisCategory?.value &&
          selectedNorrisCategory?.value !== 'any'
        ) {
          joke = await service.getRandomJokeFromNorrisCategory(
            selectedNorrisCategory?.value as string
          )
        } else {
          const randomCategory = getRandomNorrisCategory()
          joke = query
            ? await service.searchNorrisJoke(query)
            : await service.getRandomJokeFromNorrisCategory(
                randomCategory.value as string
              )
        }
      } else if (category === ECategories.DadJoke && service === dadjokeService) {
        joke = query
          ? await service.searchDadJokes(query)
          : await service.getRandomDadJoke()
      }

      if (!joke) {
        fetchFromJokeAPI()
      } else {
        if (isJokeBlacklisted(joke.id)) {
          fetchApi()
          return
        }
        setJokeCategory(category)
        setJokeId(joke.id)

        await setJokeData(joke, category, joke?.subCategories ?? [], isRandom)
      }
    } catch (error: any) {
      if (error.response?.data?.message)
        dispatch(notify(error.response.data.message, true, 8))
      else console.error(error)
      fetchFromJokeAPI()
    } finally {
    }

    return !!joke
  }

  const noJoke = () => {
    dispatch(
      notify(`${EError[language]}! ${ENoJokeFoundWithThisSearchTerm[language]}`, true, 8)
    )

    setJoke('')
    setDelivery('')
  }

  useEffect(() => {
    if (categoryValues?.length < 1) {
      setJokeCategory(null)
    }
  }, [categoryValues])

  const fetchFromJokeAPI = (retryCount = 0) => {
    const categories = categoryValues.map((category) => category.value)
    const filteredCategories = categories.filter(
      (category) => category !== 'ChuckNorris' && category !== 'DadJoke'
    )
    const category = filteredCategories?.length > 0 ? filteredCategories.join(',') : 'Any'
    // console.log(
    //   `https://v2.jokeapi.dev/joke/${category}?${queryKey}${queryValue}lang=${language}&format=json${safemode}&type=${jokeType}`
    // )

    fetch(
      `https://v2.jokeapi.dev/joke/${category}?${queryKey}${queryValue}lang=${language}&format=json${safemode}&type=${jokeType}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (retryCount > 5) {
          return
        }
        if (
          isJokeBlacklisted(data.id) ||
          (queryKey === EQueryKey.None &&
            lastJokes.some(
              (joke) => joke.jokeId === data.jokeId && joke.language === language
            ))
        ) {
          fetchFromJokeAPI(retryCount + 1)
          return
        }

        setLastJokes((prevJokes) => [...prevJokes, { jokeId: data.id, language }])
        if (lastJokes?.length > lastJokesLength) {
          setLastJokes((prevJokes) => prevJokes.slice(1))
        }

        setFlags({
          nsfw: data.flags?.nsfw ?? false,
          religious: data.flags?.religious ?? false,
          political: data.flags?.political ?? false,
          racist: data.flags?.racist ?? false,
          sexist: data.flags?.sexist ?? false,
          explicit: data.flags?.explicit ?? false,
        })

        setJokeCategory(data.category)
        if (data.error) {
          if (category === 'Any') {
            dispatch(
              notify(
                `${EError[language]}! ${ENoJokeFoundWithThisSearchTerm[language]}. ${EMaybeTryAnotherLanguage[language]}`,
                true,
                10
              )
            )
            setJoke('')
            setDelivery('')

            setJokeId('')
            return
          } else {
            //console.log(data)
            setJoke('')
            setDelivery('')
            dispatch(
              notify(
                `${EError[language]}! ${ENoJokeFoundWithThisSearchTerm[language]}`,
                true,
                8
              )
            )

            setJokeId('')
            return
          }
        }
        if (jokeType === EJokeType.twopart) {
          dispatch(
            saveMostRecentJoke({
              jokeId: data.id.toString(),
              setup: data.setup,
              delivery: data.delivery,
              type: EJokeType.twopart,
              category: data.category,
              subCategories:
                subCategoryResults?.length > 0 ? subCategoryResults : undefined,
              language: language,
              safe:
                jokeCategory === ECategories.Dark ||
                !Object.values(flags).some((value) => value)
                  ? false
                  : true,
              user: user ? [user._id] : [],
              flags: {
                nsfw: flags.nsfw,
                religious: flags.religious,
                political: flags.political,
                racist: flags.racist,
                sexist: flags.sexist,
                explicit: flags.explicit,
              },
            })
          )
          setJokeCategory(data.category)
          setJoke(data.setup)
          setDelivery(data.delivery)
          setJokeId(data.id)
        } else {
          dispatch(
            saveMostRecentJoke({
              jokeId: data.id.toString(),
              joke: data.joke,
              type: EJokeType.single,
              category: data.category,
              subCategories:
                subCategoryResults?.length > 0 ? subCategoryResults : undefined,
              language: language,
              safe:
                jokeCategory === ECategories.Dark ||
                !Object.values(flags).some((value) => value)
                  ? false
                  : true,
              user: user ? [user._id] : [],
              flags: {
                nsfw: flags.nsfw,
                religious: flags.religious,
                political: flags.political,
                racist: flags.racist,
                sexist: flags.sexist,
                explicit: flags.explicit,
              },
            })
          )
          setJokeCategory(data.category)
          setJoke(data.joke)
          setDelivery('')
          setJokeId(data.id)
        }
      })
      .catch((e) => {
        if (e.response?.data?.message) dispatch(notify(e.response.data.message, true, 8))
        else {
          console.error(e)
          dispatch(notify(`${EError[language]}! ${e.response.data.message}`, true, 8))
        }
      })
  }

  function isJokeBlacklisted(jokeId: string): boolean {
    return (
      user?.blacklistedJokes?.some(
        (blacklistedJoke) =>
          blacklistedJoke.jokeId === jokeId && blacklistedJoke.language === language
      ) ?? false
    )
  }

  const fetchNorrisCategories = async () => {
    const norrisCat = await norrisService.getNorrisCategories()
    const norrisCatOptions = optionsNorris(norrisCat, true)
    const filteredNorrisCategories = isCheckedSafemode
      ? norrisCatOptions.filter(
          (category) =>
            category.value !== 'explicit' &&
            category.value !== 'religion' &&
            category.value !== 'political'
        )
      : norrisCatOptions
    if (isCheckedSafemode) setSelectedNorrisCategory(norrisCatOptions[0])
    setNorrisCategories(filteredNorrisCategories)
  }

  useEffect(() => {
    fetchNorrisCategories()
  }, [safemode])

  useEffect(() => {
    queryValue.trim() === '' || queryValue === '&'
      ? setQueryKey(EQueryKey.None)
      : setQueryKey(EQueryKey.Contains)
    if (queryValue === '&') {
      setQueryValue('')
    }
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

  const optionsNorris = (enumObj: Record<string, string>, any: boolean) => {
    const options = Object.entries(enumObj)?.map(([key, value]) => ({
      value: value,
      label:
        norrisCats[value as keyof typeof norrisCats] &&
        norrisCats[value as keyof typeof norrisCats][language]
          ? norrisCats[value as keyof typeof norrisCats][language]
          : value.charAt(0).toUpperCase() + value.slice(1),
    })) as SelectOption[]
    if (any)
      options.unshift({
        value: 'any',
        label: norrisCats['any'][language] || EAny[language],
      })
    return options
  }

  const getCategoryInLanguage = (
    category: ECategories | null,
    language: ELanguages
  ): string => {
    const categoryMapping: IJokeCategoryByLanguage = {
      en: ECategory_en,
      es: ECategory_es,
      fr: ECategory_fr,
      de: ECategory_de,
      pt: ECategory_pt,
      cs: ECategory_cs,
      fi: ECategory_fi,
    }
    let modifiedCategory = category

    if (category === ECategories.ChuckNorris) {
      modifiedCategory = 'ChuckNorris' as unknown as ECategories
    }
    if (category === ECategories.DadJoke) {
      modifiedCategory = 'DadJoke' as unknown as ECategories
    }

    return categoryMapping[language as keyof typeof categoryMapping][
      modifiedCategory as keyof (typeof categoryMapping)[typeof language]
    ]
  }

  const navigate = useNavigate()

  const navigateToRegister = () => {
    navigate('/portfolio/jokes?register=register')
  }

  const navigateToLogin = () => {
    navigate('/portfolio/jokes?login=login')
  }

  const handleBlacklistUpdate = (
    jokeId: IJoke['jokeId'],
    language: ELanguages,
    value: string | undefined
  ) => {
    if (window.confirm(`${EAreYouSureYouWantToHideThisJoke[language]}`)) {
      const isAlreadyBlacklisted = user?.blacklistedJokes?.some(
        (blacklistedJoke) =>
          blacklistedJoke.jokeId === jokeId && blacklistedJoke.language === language
      )
      if (isAlreadyBlacklisted) {
        dispatch(notify(EThisJokeIsAlreadyBlacklisted[language], true, 3))
        dispatch(findUserById(user?._id as string)).then(() => dispatch(initializeUser()))
        setJoke('')
        setDelivery('')
        setAuthor('')
        setJokeId('')
        return
      } else if (Array.isArray(users) && user) {
        //delete joke from user's array if it is there
        dispatch(getJokesByUserId(user?._id))
          .then((data) => {
            const joke = data?.find(
              (joke: IJoke) =>
                joke.jokeId?.toString() === jokeId?.toString() &&
                joke.language === language
            )
            if (joke) {
              dispatch(removeJoke(joke?._id)).then(() => dispatch(initializeJokes()))
            }
          })
          .then(() => {
            dispatch(addToBlacklistedJokes(user?._id, jokeId, language, value))
              .then(() => {
                dispatch(notify(`${EJokeHidden[language]}`, false, 3))
                dispatch(initializeJokes())
                  .then(() => dispatch(findUserById(user?._id as string)))
                  .then(() => dispatch(initializeUser()))
                  .then(() => {
                    setJoke('')
                    setDelivery('')
                    setAuthor('')
                    setJokeId('')
                  })
              })
              .catch((error) => {
                dispatch(initializeJokes())
                  .then(() => dispatch(findUserById(user?._id as string)))
                  .then(() => dispatch(initializeUser()))
                if (error.response?.data?.message)
                  dispatch(notify(error.response.data.message, true, 8))
                else {
                  console.error(error)
                  dispatch(notify(`${EErrorDeletingJoke[language]}`, false, 5))
                }
                setJoke('')
                setDelivery('')
                setAuthor('')
                setJokeId('')
              })
          })
      } else {
        dispatch(notify(`${EErrorDeletingJoke[language]}`, false, 3))
      }
    }
  }

  const handleRemoveJokeFromBlacklisted = (
    e: React.FormEvent<HTMLFormElement>,
    joke: IJoke,
    bjoke_id: IBlacklistedJoke['_id']
  ) => {
    e.preventDefault()
    dispatch(saveMostRecentJoke(joke))
    setSending(true)
    if (window.confirm(`${EAreYouSureYouWantToRestoreThisJoke[language]}`)) {
      if (user) {
        dispatch(removeJokeFromBlacklisted(user?._id, bjoke_id, joke?.language))
          .then((data) => {
            dispatch(initializeJokes())
              .then(() => dispatch(findUserById(user?._id as string)))
              .then(() => dispatch(initializeUser()))
              .then(() => dispatch(notify(`${EJokeRestored[language]}`, false, 3)))
          })
          .catch((error) => {
            if (error.response?.data?.message)
              dispatch(notify(error.response.data.message, true, 8))
            else {
              console.error(error)
              dispatch(notify(`${EErrorDeletingJoke[language]}`, false, 3))
            }
          })
        setSending(false)
      } else {
        dispatch(notify(`${EErrorDeletingJoke[language]}`, false, 3))
        setSending(false)
      }
    }
    setTimeout(() => {
      if (window.confirm(`${EWouldYouLikeToSaveTheJoke[language]}`)) {
        if (user) {
          handleJokeSave(e)
          dispatch(initializeJokes())
            .then(() => dispatch(findUserById(user?._id as string)))
            .then(() => dispatch(initializeUser()))
            .then(() => dispatch(notify(`${ESavedJoke[language]}`, false, 8)))
            .catch((error) => {
              if (error.response?.data?.message)
                dispatch(notify(error.response.data.message, true, 8))
              else {
                console.error(error)
                dispatch(notify(`${EErrorDeletingJoke[language]}`, false, 3))
              }
            })
          setSending(false)
        } else {
          dispatch(notify(`${EErrorDeletingJoke[language]}`, false, 3))
          setSending(false)
        }
      }
    }, 600)
  }

  return (
    <>
      <section className={`joke-container card ${language}`} id='jokeform'>
        <div>
          <div className='jokes-wrap'>
            <h2>{ETheComediansCompanion[language]}</h2>
            <p className='center textcenter mb3'>
              {EAJokeGeneratorForTheComicallyInclined[language]}
            </p>

            <Suspense
              fallback={
                <div className='flex center margin0auto textcenter'>
                  {ELoading[language]}...
                </div>
              }
            >
              <FormJoke
                sending={sending}
                handleFormSubmit={handleFormSubmit}
                jokeCategory={jokeCategory}
                setJokeCategory={setJokeCategory}
                categoryValues={categoryValues}
                setCategoryValues={setCategoryValues}
                setQueryValue={setQueryValue}
                setLanguage={setLanguage}
                language={language}
                joke={joke}
                delivery={delivery}
                jokeId={jokeId}
                author={author}
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
                optionsCategory={optionsCategory}
                categoryByLanguages={categoryByLanguages}
                visibleJoke={visibleJoke}
                setVisibleJoke={setVisibleJoke}
                norrisCategories={norrisCategories}
                selectedNorrisCategory={selectedNorrisCategory}
                setSelectedNorrisCategory={setSelectedNorrisCategory}
                hasNorris={hasNorris}
                getCategoryInLanguage={getCategoryInLanguage}
                subCategoryResults={subCategoryResults}
                handleBlacklistUpdate={handleBlacklistUpdate}
              />
            </Suspense>
          </div>
        </div>
      </section>

      <section className={`joke-container ${language}`}>
        <div>
          {!user ? (
            <div className={`register-login-wrap`}>
              <button onClick={navigateToLogin}>{ELogin[language]}</button>
              <button onClick={navigateToRegister}>{ERegister[language]}</button>
            </div>
          ) : (
            <p className='textcenter'>
              {ELoggedInAs[language]} {user?.name}
            </p>
          )}
          {user && (
            <Suspense
              fallback={
                <div className='flex center margin0auto textcenter'>
                  {ELoading[language]}...
                </div>
              }
            >
              <JokeSubmit
                userId={user?._id}
                language={language}
                categoryByLanguages={categoryByLanguages}
                getKeyByValue={getKeyByValue}
                options={options}
                optionsCategory={optionsCategory}
                jokeCategoryByLanguage={jokeCategoryByLanguage}
                norrisCategories={norrisCategories}
              />
            </Suspense>
          )}
        </div>
      </section>

      <section className={`joke-container card ${language}`}>
        <div>
          <Suspense
            fallback={
              <div className='flex center margin0auto textcenter'>
                {ELoading[language]}...
              </div>
            }
          >
            <UserJokes
              sending={sending}
              user={user}
              handleDelete={handleDelete}
              language={language}
              isCheckedSafemode={isCheckedSafemode}
              setIsCheckedSafemode={setIsCheckedSafemode}
              handleToggleChangeSafemode={handleToggleChangeSafemode}
              translateWordLanguage={translateWordLanguage}
              getKeyofEnum={getKeyofEnum}
              options={options}
              optionsSortBy={optionsSortBy}
              norrisCategories={norrisCategories}
              getCategoryInLanguage={getCategoryInLanguage}
              handleUpdate={handleUpdate}
              setIsEditOpen={setIsEditOpen}
              editId={editId}
              setEditId={setEditId}
              handleRemoveJokeFromBlacklisted={handleRemoveJokeFromBlacklisted}
              handleBlacklistUpdate={handleBlacklistUpdate}
            />
          </Suspense>
        </div>
      </section>
    </>
  )
}

export default Jokes
