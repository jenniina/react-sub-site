import { useEffect, useState } from 'react'
import FormJoke from './components/FormJoke'
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
} from '../../interfaces'
import { useSelector } from 'react-redux'
import useLocalStorage from '../../hooks/useStorage'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import Notification from './components/Notification'
import {
  createJoke,
  deleteUserFromJoke,
  initializeJokes,
  updateJoke,
} from './reducers/jokeReducer'
import { initializeUser } from '../../reducers/authReducer'
import UserJokes from './components/UserJokes'
import norrisService from './services/chucknorris'
import dadjokeService from './services/dadjokes'
import JokeSubmit from './components/JokeSubmit'
import { useNavigate } from 'react-router-dom'

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
    return state.jokes
  })
  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  const categoryByLanguagesConst = {
    en: ECategory_en,
    es: ECategory_es,
    fr: ECategory_fr,
    de: ECategory_de,
    pt: ECategory_pt,
    cs: ECategory_cs,
    fi: ECategory_fi,
  }

  const title = ETheComediansCompanion[language]
  const titleSaved = ESavedJoke[language]
  const titleCategory = ECategoryTitle[language]
  const titleSafe = ESafeTitle[language]
  const titleUnsafe = EUnsafeTitle[language]
  const titleJoke = EJoke[language]
  const titleSingle = ESingle[language]
  const titleTwoPart = ETwoPart[language]
  const titleClickToReveal = EClickToReveal[language]
  const titleLoginOrRegisterToSave = ELoginOrRegisterToSave[language]
  const titleJokeAlreadySaved = EJokeAlreadySaved[language]
  const titleError = EError[language]
  const deleteJoke = EDelete[language]
  const translateWordLanguage = ELanguageTitle[language]
  const [joke, setJoke] = useState<string>('')
  const [delivery, setDelivery] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [categoryByLanguages, setCategoryByLanguages] = useState<TCategoryByLanguages>(
    categoryByLanguagesConst.en
  )
  const [jokeLanguage, setJokeLanguage] = useState<ELanguages>(language)
  const [jokeCategory, setJokeCategory] = useState<ECategory | null>(
    jokeCategoryByLanguage[language].Misc
  )
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
  const [loading, setLoading] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [reveal, setReveal] = useState<boolean>(true)
  const [jokeId, setJokeId] = useState<IJoke['jokeId']>('')
  const [loginOpen, setLoginOpen] = useState<boolean>(false)
  const [registerOpen, setRegisterOpen] = useState<boolean>(false)
  const [visibleJoke, setVisibleJoke] = useState<boolean>(false)
  const [saveJoke, setSaveJoke] = useLocalStorage<IJoke | null>('savedJoke', null)
  const titleAJokeGeneratorForTheComicallyInclined =
    EAJokeGeneratorForTheComicallyInclined[language]
  const [hasNorris, setHasNorris] = useState<boolean>(false)
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const [editId, setEditId] = useState<IJoke['_id'] | null>(null)

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
    setTimeout(() => {
      dispatch(initializeJokes())
    }, 1000)
  }, [saveJoke])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  // Set the document language and title
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

  // Set loading state
  useEffect(() => {
    if (loading) {
      setJoke('Loading...')
      setDelivery(' ')
    }
  }, [loading])

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
      if (window.confirm(`${deleteJoke} ${titleJoke.toLowerCase()} "${joke}"?`)) {
        try {
          // Make an API request to delete the user's ID from the joke's user array
          dispatch(deleteUserFromJoke(id as string, user._id as string)).then(() => {
            dispatch(initializeJokes())
          })
        } catch (error) {
          console.error(EErrorDeletingJoke[language], error)
        }
      } else return
    }

  const handleUpdate =
    (id: IJoke['_id'], joke: IJoke) =>
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault()
      const jokeObject = jokes.find((j) => j._id === id)
      if (!jokeObject) {
        dispatch(notify(`${titleError}!`, true, 8))
        return
      }
      const update = () => {
        if (jokeObject.private === true && joke.private === false) {
          dispatch(updateJoke({ ...joke, private: true, verified: false, _id: id }))
            .then(() => {
              dispatch(initializeJokes())
            })
            .then(() => {
              dispatch(updateJoke({ ...joke, verified: false, _id: id }))
                .then((r) => {
                  dispatch(initializeJokes())
                  dispatch(notify(`${titleSaved}. ${r.message ?? ''}`, false, 8))
                  setEditId(null)
                  setIsEditOpen(false)
                })
                .catch((e) => {
                  console.log(e)
                  if (e.code === 'ERR_BAD_RESPONSE')
                    dispatch(
                      notify(`${EError[language]}: ${e.response.data.message}`, true, 8)
                    )
                  else dispatch(notify(`${EError[language]}: ${e.message}`, true, 8))
                })
            })
            .catch((e) => {
              console.log(e)
              if (e.code === 'ERR_BAD_RESPONSE')
                dispatch(
                  notify(`${EError[language]}: ${e.response.data.message}`, true, 8)
                )
              else dispatch(notify(`${EError[language]}: ${e.message}`, true, 8))
            })
        } else
          dispatch(updateJoke(joke))
            .then(() => {
              dispatch(initializeJokes())
              dispatch(notify(`${titleSaved}`, false, 8))
              setEditId(null)
              setIsEditOpen(false)
            })
            .catch((e) => {
              console.log(e)
              if (e.code === 'ERR_BAD_RESPONSE')
                dispatch(
                  notify(`${EError[language]}: ${e.response.data.message}`, true, 8)
                )
              else dispatch(notify(`${EError[language]}: ${e.message}`, true, 8))
            })
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

  const options = (
    enumObj: typeof ECategory_en | typeof EJokeType | typeof ESafemode | typeof ELanguages
  ) => {
    return Object.keys(enumObj).map((key) => ({
      value: enumObj[key as keyof typeof enumObj],
      label: key,
    })) as SelectOption[]
  }

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

  const handleJokeSave = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!user) {
      dispatch(notify(`${titleLoginOrRegisterToSave}`, false, 8))
      return
    } else {
      const findJoke = jokes?.find(
        (j: IJoke) =>
          j.jokeId.toString() === saveJoke?.jokeId.toString() &&
          j.language === saveJoke?.language &&
          j.category === saveJoke?.category
      )
      if (findJoke) {
        if (findJoke.user.includes(user._id?.toString())) {
          dispatch(notify(`${titleJokeAlreadySaved}`, false, 8))
          return
        }
        dispatch(updateJoke({ ...findJoke, user: [...findJoke.user, user._id] }))
      } else {
        if (joke && !delivery) {
          dispatch(
            createJoke({
              jokeId: saveJoke?.jokeId.toString() ?? jokeId.toString(),
              joke: joke,
              type: EJokeType.single,
              category: saveJoke?.category ?? jokeCategory ?? ECategory_en.Misc,
              subCategories:
                saveJoke?.subCategories ?? subCategoryResults.length > 0
                  ? subCategoryResults
                  : undefined,
              language: saveJoke?.language ?? jokeLanguage,
              safe: !Object.values(flags).some((value) => value),
              user: [user._id],

              flags: {
                nsfw: flags.nsfw,
                religious: flags.religious,
                political: flags.political,
                racist: flags.racist,
                sexist: flags.sexist,
                explicit: flags.explicit,
              },
            })
          ).then(() => {
            dispatch(initializeJokes())
          })
        } else if (delivery) {
          dispatch(
            createJoke({
              jokeId: saveJoke?.jokeId.toString() ?? jokeId.toString(),
              setup: joke,
              delivery: delivery,
              type: EJokeType.twopart,
              category: saveJoke?.category ?? jokeCategory ?? ECategory_en.Misc,
              subCategories:
                subCategoryResults.length > 0 ? subCategoryResults : undefined,
              language: saveJoke?.language ?? jokeLanguage,
              safe: !Object.values(flags).some((value) => value),
              user: [user._id],

              flags: {
                nsfw: flags.nsfw,
                religious: flags.religious,
                political: flags.political,
                racist: flags.racist,
                sexist: flags.sexist,
                explicit: flags.explicit,
              },
            })
          ).then(() => {
            dispatch(initializeJokes())
          })
        }
      }
      dispatch(notify(`${titleSaved}`, false, 8))
    }
  }

  //for ChuckNorris and DadJoke
  const setJokeData = async (
    jokeData: any,
    category: ECategory_en,
    subCategories: string[] | undefined
  ) => {
    setLoading(false)
    setSaveJoke({
      jokeId: jokeData.id.toString(),
      joke: jokeData.joke || jokeData.value,
      type: EJokeType.single,
      category: category,
      subCategories:
        subCategories && subCategories?.length > 0 ? subCategories : undefined,
      language: ELanguages.English,

      safe:
        (jokeData?.categories?.includes('explicit') ||
          jokeData?.categories?.includes('political') ||
          jokeData?.categories?.includes('religion')) ??
        false
          ? !Object.values(jokeData.categories).some((value) => value)
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
    setJokeCategory(category)
    setSubCategoryResults(subCategories ?? [])

    setFlags({
      explicit: jokeData?.categories?.includes('explicit') ?? false,
      religious: jokeData?.categories?.includes('religious') ?? false,
      political: false,
      racist: false,
      sexist: false,
      nsfw: jokeData?.categories?.includes('explicit') ?? false,
    })
    setJokeCategory(category)
    setJoke(jokeData.joke || jokeData.value)
    setDelivery('')
    setJokeId(jokeData.id)
    setJokeLanguage(ELanguages.English)
    setJoke(jokeData.joke || jokeData.value)
    setDelivery('')
  }

  const users = useSelector((state: ReducerProps) => {
    return state.users
  })

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

    const randomIndex = Math.floor(Math.random() * filteredCategories.length)
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
      jokes.length > 0 &&
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
              return b.user.length - a.user.length
            }) //.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
        : isCheckedSafemode
        ? updatedJokes
            .filter((joke) => joke.safe)
            .sort((a, b) => {
              return b.user.length - a.user.length
            }) //.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
        : []

      setUserJokes(updatedJokes)
    }
  }, [jokes, users, language, isCheckedSafemode])

  // Fetch joke from API or database
  const fetchApi = async () => {
    setLoading(true)
    const categories = categoryValues.map((category) => category.value)

    const handleJokes = (jokes: IJoke[] | undefined) => {
      if (jokes && jokes.length > 0 && Array.isArray(users) && users?.length > 0) {
        const random = jokes[Math.floor(Math.random() * jokes.length)]
        if (random) {
          setLoading(false)
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
            const author = users.find((user: IUser) => user._id == random.author)
            setAuthor(author?.name ?? '')
          } else {
            setAuthor('')
          }
          setJokeId(random.jokeId)
          setJokeLanguage(language)
          setJokeCategory(random.category)
          setSaveJoke(random)
          return
        } else {
          dispatch(
            notify(
              `${titleError}! ${ENoJokeFoundWithThisSearchTerm[language]}. ${ETryAnotherSearchTerm[language]}`,
              true,
              8
            )
          )
          setLoading(false)
          setJoke('')
          setDelivery('')
          setAuthor('')
          return
        }
      } else {
        dispatch(
          notify(
            `${titleError}! ${ENoJokeFoundWithThisSearchTerm[language]}. ${ETryAnotherSearchTerm[language]}`,
            true,
            8
          )
        )
        setLoading(false)
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
        (categories.length === 0 || categories.includes(joke.category)) &&
        (joke.private === false || joke.private === undefined) &&
        joke.safe === isCheckedSafemode &&
        joke.type === jokeType
    )
    // const amountOfCategories =
    //   categoryValues.length < 1 ? 9 : categoryValues.length + 0.999
    // const random1 = Math.floor(getRandomMinMax(1, amountOfCategories))
    const isEmpty = categoryValues.length < 1
    const isChuckNorris = categoryValues.some(
      (category) => category.value === 'ChuckNorris'
    )
    const isDadJoke = categoryValues.some((category) => category.value === 'DadJoke')
    const isQueryNotEmpty = queryValue.trim() !== ''
    setJokeLanguage(language)

    let newFilteredJokes = filteredJokes

    if (isQueryNotEmpty) {
      //remove &-sign from queryValue's end
      const queryValueWithoutAnd = queryValue.replace(/&$/, '')

      newFilteredJokes = filteredJokes?.filter((joke) => {
        const searchTermMatches =
          ('joke' in joke
            ? joke.joke.toLowerCase().includes(queryValueWithoutAnd.toLowerCase())
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
          categories.length > 0 ? categories.includes(joke.category) : true

        const languageMatches = joke.language === language

        const norrisCategoryMatches =
          selectedNorrisCategory?.value !== '' && selectedNorrisCategory?.value !== 'any'
            ? joke.subCategories?.includes(selectedNorrisCategory?.value as string)
            : true

        if (
          (joke.safe === isCheckedSafemode &&
            joke.type === jokeType &&
            joke.private === false &&
            joke.verified === true) ||
          joke.private === undefined
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
      })
    }

    if (
      newFilteredJokes &&
      newFilteredJokes.length > 0 &&
      language === ELanguages.Suomi
    ) {
      handleJokes(newFilteredJokes)
      return
    } else if (newFilteredJokes && newFilteredJokes.length > 0 && Math.random() < 0.3) {
      handleJokes(newFilteredJokes)
      return
    }

    if (isChuckNorris || isDadJoke) {
      if (language !== ELanguages.English) {
        handleJokes(newFilteredJokes)
        return
      } else {
        if (isChuckNorris && isDadJoke) {
          const random = Math.floor(getRandomMinMax(1, 2.999))
          if (random === 1 && isChuckNorris && isQueryNotEmpty) {
            const norrisJoke = await norrisService.searchNorrisJoke(queryValue)
            if (!norrisJoke) {
              noJoke()
              return
            }
            await setJokeData(
              norrisJoke,
              ECategory_en.ChuckNorris,
              norrisJoke?.categories ?? []
            )
            setFlags({
              explicit: norrisJoke?.categories?.includes('explicit') ?? false,
              religious: norrisJoke?.categories?.includes('religious') ?? false,
              political: false,
              racist: false,
              sexist: false,
              nsfw: norrisJoke?.categories?.includes('explicit') ?? false,
            })
          } else if (random === 1 && isChuckNorris) {
            const randomCategory = getRandomNorrisCategory()
            const norrisJoke = await norrisService.getRandomJokeFromNorrisCategory(
              (randomCategory?.value as string) ?? ''
            )
            if (!norrisJoke) {
              noJoke()
              return
            }
            await setJokeData(
              norrisJoke,
              ECategory_en.ChuckNorris,
              norrisJoke?.categories ?? []
            )
            setFlags({
              explicit: norrisJoke?.categories?.includes('explicit') ?? false,
              religious: norrisJoke?.categories?.includes('religious') ?? false,
              political: false,
              racist: false,
              sexist: false,
              nsfw: norrisJoke?.categories?.includes('explicit') ?? false,
            })
          } else if (random > 1 && isDadJoke && isQueryNotEmpty) {
            const dadJoke = await dadjokeService.searchDadJokes(queryValue)
            if (!dadJoke) {
              noJoke()
              return
            }
            await setJokeData(dadJoke, ECategory_en.DadJoke, undefined)
          } else {
            const dadJoke = await dadjokeService.getRandomDadJoke()
            if (!dadJoke) {
              noJoke()
              return
            }
            await setJokeData(dadJoke, ECategory_en.DadJoke, undefined)
          }
        } else if (isChuckNorris && isQueryNotEmpty) {
          const norrisJoke = await norrisService.searchNorrisJoke(queryValue)
          if (!norrisJoke) {
            noJoke()
            return
          }
          await setJokeData(
            norrisJoke,
            ECategory_en.ChuckNorris,
            norrisJoke?.categories ?? []
          )
        } else if (
          isChuckNorris &&
          selectedNorrisCategory?.value &&
          selectedNorrisCategory?.value !== 'any'
        ) {
          const norrisJoke = await norrisService.getRandomJokeFromNorrisCategory(
            (selectedNorrisCategory?.value as string) ?? ''
          )
          if (!norrisJoke) {
            noJoke()
            return
          }
          await setJokeData(
            norrisJoke,
            ECategory_en.ChuckNorris,
            norrisJoke?.categories ?? []
          )
        } else if (isChuckNorris) {
          const randomCategory = getRandomNorrisCategory()
          const norrisJoke = await norrisService.getRandomJokeFromNorrisCategory(
            randomCategory.value as string
          )
          if (!norrisJoke) {
            noJoke()
            return
          }
          await setJokeData(
            norrisJoke,
            ECategory_en.ChuckNorris,
            norrisJoke?.categories ?? []
          )
        } else if (isDadJoke && isQueryNotEmpty) {
          const dadJoke = await dadjokeService.searchDadJokes(queryValue)
          if (!dadJoke) {
            noJoke()
            return
          }
          await setJokeData(dadJoke, ECategory_en.DadJoke, undefined)
        } else {
          const dadJoke = await dadjokeService.getRandomDadJoke()
          if (!dadJoke) {
            noJoke()
            return
          }
          await setJokeData(dadJoke, ECategory_en.DadJoke, undefined)
        }
      }
    } else if (isEmpty && !isCheckedJokeType && !isQueryNotEmpty) {
      const random = Math.floor(getRandomMinMax(1, 10.999))
      if (random === 1) {
        const randomCategory = getRandomNorrisCategory()
        const norrisJoke = await norrisService.getRandomJokeFromNorrisCategory(
          randomCategory.value as string
        )
        if (!norrisJoke) {
          noJoke()
          return
        }
        await setJokeData(
          norrisJoke,
          ECategory_en.ChuckNorris,
          norrisJoke?.categories ?? []
        )
      } else if (random === 2) {
        const dadJoke = await dadjokeService.getRandomDadJoke()
        if (!dadJoke) {
          noJoke()
          return
        }
        await setJokeData(dadJoke, ECategory_en.DadJoke, undefined)
      } else {
        fetchFromJokeAPI()
      }
    } else {
      fetchFromJokeAPI()
    }
  }

  const noJoke = () => {
    dispatch(
      notify(`${titleError}! ${ENoJokeFoundWithThisSearchTerm[language]}`, true, 8)
    )
    setLoading(false)
    setJoke('')
    setDelivery('')
  }

  useEffect(() => {
    if (categoryValues.length < 1) {
      setJokeCategory(null)
    }
  }, [categoryValues])

  const fetchFromJokeAPI = () => {
    const categories = categoryValues.map((category) => category.value)
    const filteredCategories = categories.filter(
      (category) => category !== 'ChuckNorris' && category !== 'DadJoke'
    )
    // const category = filteredCategories.length > 0 ? filteredCategories.join(',') : 'Any'
    const category = filteredCategories.length > 0 ? filteredCategories.join(',') : 'Any'
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
        setFlags({
          nsfw: data.flags?.nsfw ?? false,
          religious: data.flags?.religious ?? false,
          political: data.flags?.political ?? false,
          racist: data.flags?.racist ?? false,
          sexist: data.flags?.sexist ?? false,
          explicit: data.flags?.explicit ?? false,
        })
        setLoading(false)
        setJokeCategory(data.category)
        if (data.error) {
          if (category === 'Any') {
            dispatch(
              notify(
                `${titleError}! ${ENoJokeFoundWithThisSearchTerm[language]}. ${EMaybeTryAnotherLanguage[language]}`,
                true,
                10
              )
            )
            setJoke('')
            setDelivery('')
            setLoading(false)
            setJokeId('')
            return
          } else {
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
            setJokeId('')
            return
          }
        }
        if (jokeType === EJokeType.twopart) {
          setSaveJoke({
            jokeId: data.id.toString(),
            setup: data.setup,
            delivery: data.delivery,
            type: EJokeType.twopart,
            category: data.category,
            subCategories: subCategoryResults.length > 0 ? subCategoryResults : undefined,
            language: language,
            safe: !Object.values(flags).some((value) => value),
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
          setJoke(data.setup)
          setDelivery(data.delivery)
          setJokeId(data.id)
          setJokeCategory(data.category)
        } else {
          setSaveJoke({
            jokeId: data.id.toString(),
            joke: data.joke,
            type: EJokeType.single,
            category: data.category,
            subCategories: subCategoryResults.length > 0 ? subCategoryResults : undefined,
            language: language,
            safe: !Object.values(flags).some((value) => value),
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
          setJoke(data.joke)
          setDelivery('')
          setJokeId(data.id)
          setJokeCategory(data.category)
        }
      })
      .catch((e) => {
        console.log(e)
        dispatch(notify(`${titleError}! ${e.response.data.message}`, true, 8))
      })
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
    category: ECategory_en,
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

    if (category === ECategory_en.ChuckNorris) {
      modifiedCategory = 'ChuckNorris' as unknown as ECategory_en
    }
    if (category === ECategory_en.DadJoke) {
      modifiedCategory = 'DadJoke' as unknown as ECategory_en
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

  return (
    <>
      <section className={`joke-container card ${language}`} id='jokeform'>
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
              categoryValues={categoryValues}
              setCategoryValues={setCategoryValues}
              setQueryValue={setQueryValue}
              setLanguage={setLanguage}
              language={language}
              joke={joke}
              delivery={delivery}
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
              hasNorris={hasNorris}
              getCategoryInLanguage={getCategoryInLanguage}
              subCategoryResults={subCategoryResults}
            />
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
            <JokeSubmit
              userId={user?._id}
              language={language}
              categoryByLanguages={categoryByLanguages}
              getKeyByValue={getKeyByValue}
              options={options}
              titleTwoPart={titleTwoPart}
              titleSingle={titleSingle}
              optionsCategory={optionsCategory}
              jokeCategoryByLanguage={jokeCategoryByLanguage}
              norrisCategories={norrisCategories}
            />
          )}
        </div>
      </section>

      <section className={`joke-container card ${language}`}>
        <div>
          <UserJokes
            userId={user?._id}
            handleDelete={handleDelete}
            deleteJoke={deleteJoke}
            titleCategory={titleCategory}
            titleSafe={titleSafe}
            titleUnsafe={titleUnsafe}
            language={language}
            isCheckedSafemode={isCheckedSafemode}
            setIsCheckedSafemode={setIsCheckedSafemode}
            handleToggleChangeSafemode={handleToggleChangeSafemode}
            titleClickToReveal={titleClickToReveal}
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
          />
        </div>
      </section>
      <Notification language={language} />
    </>
  )
}

export default Jokes
