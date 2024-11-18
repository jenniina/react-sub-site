import { useEffect, useState } from 'react'
import { IoCopyOutline } from 'react-icons/io5'
import { FaRandom, FaList } from 'react-icons/fa'
import { ImBlocked, ImEyeBlocked } from 'react-icons/im'
import { MdSave } from 'react-icons/md'
import {
  MdOutlineFilter3,
  MdOutlineFilter4,
  MdOutlineFilter5,
  MdOutlineFilter6,
  MdOutlineFilter7,
  MdOutlineFilter8,
  MdOutlineFilter9,
  MdOutlineFilter9Plus,
} from 'react-icons/md'
import {
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronLeft,
  BiChevronRight,
} from 'react-icons/bi'
import { MdOutlineSettingsBackupRestore } from 'react-icons/md'
import {
  EJokeType,
  ESavedJoke,
  EYourSavedJokes,
  IJoke,
  EDelete,
  ECategoryTitle,
  ESafeTitle,
  EUnsafeTitle,
  EClickToReveal,
  ESortBy,
  ESelectACategory,
  ESearchByKeyword,
  EAny,
  ELocalJokes,
  ENoJokesYet,
  EUserSubmittedJokes,
  EAnonymous,
  EAuthor,
  EAge,
  EAll,
  ERandom,
  EAllJokes,
  EPerPage,
  ESeeLocalJokes,
  ESaveJoke,
  EOrderBy,
  EPendingVerification,
  ESelectCategory,
  EJokeSetup,
  EOnlyPrivateJokesCanBeEdited,
  ERepublishingWillRequireVerificationFromAnAdministrator,
  ENote,
  EJokeDelivery,
  EJoke,
  EFilterFurther,
  EPrivate,
  EPublic,
  EJokeAlreadySaved,
  ENoJokeFound,
  norrisCategoryTranslations as norrisCat,
  ELatest,
  EHowMany,
  EFailedToCopyJokeToClipboard,
  EJokeCopiedToClipboard,
  ECopy,
  EBlockedJokes,
  EHideBlockedJokes,
  ERestore,
  ECategories,
  EBlock,
  ERemove,
  EBlocked,
  FlagsLanguage,
  EAddWarningTitle,
  ELoadingJokes,
} from '../interfaces'
import {
  IUser,
  ELanguages,
  LanguageOfLanguage,
  ELanguagesLong,
  TLanguageOfLanguage,
  ESearch,
  EEdit,
  ELanguageTitle,
  EFilterByLanguage,
  EFilterByCategory,
  EFilter,
  EReset,
  ENewest,
  EOldest,
  ELikedBy,
  ELastPage,
  EFirstPage,
  IBlacklistedJoke,
  ESave,
} from '../../../interfaces'
import ButtonToggle from '../../ButtonToggle/ButtonToggle'
import { Select, SelectOption } from '../../Select/Select'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import Accordion from '../../Accordion/Accordion'
import { initializeJokes, saveMostRecentJoke, updateJoke } from '../reducers/jokeReducer'
import { notify } from '../../../reducers/notificationReducer'
import { initializeUser } from '../../../reducers/authReducer'
import norrisService from '../services/chucknorris'
import dadjokeService from '../services/dadjokes'
import { initializeUsers } from '../../../reducers/usersReducer'
import { s } from 'vite/dist/node/types.d-aGj9QkWt'
import { EBack, ENext } from '../../../interfaces/form'

interface Props {
  user: IUser | undefined
  handleDelete: (
    jokeId: IJoke['_id'],
    joke: string
  ) => (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>
  handleUpdate: (
    jokeId: IJoke['_id'],
    joke: IJoke
  ) => (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>
  translateWordLanguage: string
  language: ELanguages
  isCheckedSafemode: boolean
  setIsCheckedSafemode: (isCheckedSafemode: boolean) => void
  handleToggleChangeSafemode: () => void
  optionsSortBy: (enumObj: typeof ESortBy) => SelectOption[]
  getKeyofEnum: (enumObj: typeof ELanguages, value: ELanguages) => string
  options: (enumObj: typeof ELanguages) => SelectOption[]
  norrisCategories: SelectOption[]
  getCategoryInLanguage: (
    category: ECategories | null,
    language: ELanguages
  ) => string | undefined
  setIsEditOpen: (isEditOpen: boolean) => void
  editId: IJoke['_id'] | null
  setEditId: (editId: IJoke['_id']) => void
  handleRemoveJokeFromBlacklisted: (
    e: React.FormEvent<HTMLFormElement>,
    joke: IJoke,
    bjoke_id: IBlacklistedJoke['_id']
  ) => void
  handleBlacklistUpdate: (
    jokeId: IJoke['jokeId'],
    language: ELanguages,
    value: string | undefined
  ) => void
  sending: boolean
}

enum ESortBy_en {
  popularity = 'popularity',
  category = 'category',
  language = 'language',
  name = 'name',
  age = 'age',
}

export enum EOrderByAge {
  newest = 'newest',
  oldest = 'oldest',
}

const UserJokes = ({
  user,
  handleDelete,
  handleUpdate,
  language,
  isCheckedSafemode,
  setIsCheckedSafemode,
  handleToggleChangeSafemode,
  translateWordLanguage,
  optionsSortBy,
  getKeyofEnum,
  options,
  norrisCategories,
  getCategoryInLanguage,
  setIsEditOpen,
  editId,
  setEditId,
  handleRemoveJokeFromBlacklisted,
  handleBlacklistUpdate,
  sending,
}: Props) => {
  const users = useSelector((state: any) => state.users)
  const userId = user?._id
  const jokes = useSelector((state: any) => state.jokes?.jokes)

  type IJokeVisible = IJoke & {
    visible: boolean
    translatedLanguage: string
    name: string
  }

  const [userJokes, setUserJokes] = useState<IJokeVisible[]>([])
  const [visibleJokes, setVisibleJokes] = useState<Record<IJoke['jokeId'], boolean>>({})
  const [localJokes, setLocalJokes] = useState<boolean>(false)
  const [filteredJokes, setFilteredJokes] = useState<IJokeVisible[]>(userJokes)
  const [showBlacklistedJokes, setShowBlacklistedJokes] = useState<boolean>(false)
  const [fetchedJokes, setFetchedJokes] = useState<IJoke[]>([])
  const [isRandom, setIsRandom] = useState<boolean>(false)
  const [randomTrigger, setRandomTrigger] = useState<number>(0)
  const [sortBy, setSortBy] = useState<ESortBy_en>(ESortBy_en.popularity)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<
    ECategories | 'ChuckNorris' | ''
  >('')
  const [selectedLanguage, setSelectedLanguage] = useState<ELanguages | ''>('')
  const [hasNorris, setHasNorris] = useState(false)
  const [selectedNorrisCategory, setSelectedNorrisCategory] = useState<
    SelectOption | undefined
  >(norrisCategories[0])
  const [newJoke, setNewJoke] = useState<IJoke | undefined>(undefined)
  const [jokeLanguage, setJokeLanguage] = useState<ELanguages>(ELanguages.English)
  const [jokeCategory, setJokeCategory] = useState<ECategories>(ECategories.Misc)
  const [sortByAge, setSortByAge] = useState<EOrderByAge.newest | EOrderByAge.oldest>(
    EOrderByAge.newest
  )
  const [isCheckedNewest, setIsCheckedNewest] = useState<boolean>(true)
  const [latestNumber, setLatestNumber] = useState<number>(3)
  const [latest, setLatest] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (
      Array.isArray(jokes) &&
      jokes.length > 0 &&
      Array.isArray(users) &&
      users?.length > 0
    ) {
      let updatedJokes = jokes?.map((joke) => {
        const author = user?.name
        const jokeLanguage = LanguageOfLanguage[language as keyof typeof ELanguagesLong][
          getKeyofEnum(
            ELanguages,
            joke.language as ELanguages
          ) as keyof TLanguageOfLanguage[ELanguages]
        ] as TLanguageOfLanguage[keyof typeof ELanguagesLong][keyof TLanguageOfLanguage[ELanguages]]

        return {
          ...joke,
          visible: false,
          translatedLanguage: jokeLanguage ?? '',
          name: joke.anonymous ? 'ÖÖÖ_Anonymous' : author ?? '',
        }
      })
      updatedJokes = !isCheckedSafemode
        ? updatedJokes
            .filter((joke) => joke.safe === false)
            .sort((a, b) => {
              return b.user?.length - a.user?.length
            })
        : isCheckedSafemode
        ? updatedJokes
            .filter((joke) => joke.safe)
            .sort((a, b) => {
              return b.user?.length - a.user?.length
            })
        : []
      setUserJokes(updatedJokes)
    }
  }, [jokes, users, language, isCheckedSafemode, sortBy, sortByAge, isCheckedNewest])

  useEffect(() => {
    setSortByAge(isCheckedNewest ? EOrderByAge.newest : EOrderByAge.oldest)
  }, [isCheckedNewest])

  const handleToggleChangeNewest = () => {
    setIsCheckedNewest((prev) => !prev)
  }

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeUsers())
    dispatch(initializeJokes())
  }, [])

  useEffect(() => {
    const norrisExists = selectedCategory === ECategories.ChuckNorris
    setHasNorris(norrisExists)
  }, [selectedCategory])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1)
    setSearchTerm(event.target.value)
  }

  const resetFilters = () => {
    setSelectedCategory('')
    setSelectedLanguage('')
    setSelectedNorrisCategory(norrisOptions[0])
    setSearchTerm('')
    setIsRandom(false)
    setRandomTrigger((prev) => prev + 1)
    setSortBy(ESortBy_en.popularity)
    setCurrentPage(1)
    setIsCheckedSafemode(true)
  }

  const handleSelectChange = (o: SelectOption) => {
    setSelectedCategory(o.value as ECategories)
  }

  useEffect(() => {
    setTimeout(() => {
      // Set z-index of select containers so that they do not open behind the next select container
      const selectContainers = document.querySelectorAll(
        '.select-container'
      ) as NodeListOf<HTMLDivElement>
      const totalContainers = selectContainers?.length + 2

      selectContainers?.forEach((container, index) => {
        const zIndex = totalContainers - index
        container.style.zIndex = `${zIndex}`
      })
    }, 500)
  }, [showBlacklistedJokes])

  useEffect(() => {
    if (!userId) {
      setLocalJokes(true)
    } else {
      setLocalJokes(false)
    }
  }, [userId])

  const handleVisibility = (jokeId: IJoke['jokeId']) => {
    setVisibleJokes((prevVisibleJokes) => ({
      ...prevVisibleJokes,
      [jokeId]: !prevVisibleJokes[jokeId],
    }))
  }

  useEffect(() => {
    setCurrentPage(1)
    let newFilteredJokes = [...userJokes]
    if (sortBy === ESortBy_en.age) {
      newFilteredJokes = [...userJokes]?.sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return sortByAge === EOrderByAge.newest ? timeB - timeA : timeA - timeB
      })
    }
    newFilteredJokes = newFilteredJokes?.filter((joke) => {
      if (joke) {
        const searchTermMatches =
          ('joke' in joke
            ? joke.joke?.toLowerCase().includes(searchTerm.toLowerCase())
            : false) ||
          ('setup' in joke
            ? joke.setup?.toLowerCase().includes(searchTerm.toLowerCase())
            : false) ||
          ('delivery' in joke
            ? joke.delivery?.toLowerCase().includes(searchTerm.toLowerCase())
            : false) ||
          joke.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          joke.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          joke.subCategories?.includes(searchTerm?.toLowerCase()) ||
          joke.translatedLanguage?.toLowerCase().includes(searchTerm.toLowerCase())

        const categoryMatches = selectedCategory
          ? joke.category === selectedCategory
          : true

        const languageMatches =
          selectedLanguage !== '' ? joke.language === selectedLanguage : true

        const norrisCategoryMatches =
          selectedNorrisCategory?.value !== '' && selectedNorrisCategory?.value !== 'any'
            ? joke.subCategories?.includes(selectedNorrisCategory?.value as string)
            : true

        if (
          (localJokes && joke.private === false && joke.verified === true) ||
          (localJokes && joke.private === undefined)
        ) {
          return (
            languageMatches &&
            categoryMatches &&
            norrisCategoryMatches &&
            searchTermMatches
          )
        } else if (!localJokes && joke.user?.includes(userId)) {
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

    if (sortBy === ESortBy_en.popularity) {
      newFilteredJokes = newFilteredJokes?.sort((a, b) => {
        return b.user?.length - a.user?.length
      })
    }

    if (sortBy === ESortBy_en.category) {
      newFilteredJokes = newFilteredJokes?.sort((a, b) => {
        return a.category > b.category ? 1 : -1
      })
    }
    if (sortBy === ESortBy_en.language) {
      newFilteredJokes = newFilteredJokes?.sort((a, b) => {
        return a.translatedLanguage > b.translatedLanguage ? 1 : -1
      })
    }
    if (sortBy === ESortBy_en.name) {
      newFilteredJokes = newFilteredJokes?.sort((a, b) => {
        return a.name > b.name ? 1 : -1
      })
    }
    const latestJokes = newFilteredJokes.slice(0, latestNumber)

    if (isRandom && newFilteredJokes.length > 0) {
      const randomJoke =
        newFilteredJokes[Math.floor(Math.random() * newFilteredJokes.length)]
      setFilteredJokes([randomJoke])
    } else {
      latest ? setFilteredJokes(latestJokes) : setFilteredJokes(newFilteredJokes)
    }
  }, [
    localJokes,
    userJokes,
    selectedCategory,
    selectedLanguage,
    selectedNorrisCategory,
    searchTerm,
    isRandom,
    randomTrigger,
    sortByAge,
    sortBy,
    latest,
    latestNumber,
  ])

  const handleCategoryChange = (category: string) => {
    let modifiedCategory: ECategories | '' = category as ECategories | ''
    if (category === 'Chuck Norris') {
      modifiedCategory = 'ChuckNorris' as ECategories
    } else if (category === 'Dad Joke') {
      modifiedCategory = 'DadJoke' as ECategories
    }
    setSelectedCategory(modifiedCategory)
  }

  const handleJokeSave = (_id: IJoke['_id']) => {
    const findJoke = jokes?.find((j: IJoke) => j._id === _id)
    if (!findJoke) {
      dispatch(notify(`${ENoJokeFound[language]}`, true, 8))
      return
    }
    if (findJoke) {
      if (findJoke.user?.includes(userId?.toString())) {
        dispatch(notify(`${EJokeAlreadySaved[language]}`, false, 8))
        return
      }
      dispatch(updateJoke({ ...findJoke, user: [...findJoke.user, userId] })).then(() => {
        dispatch(initializeJokes())
        dispatch(notify(`${ESavedJoke[language]}`, false, 8))
      })
    }
  }

  let norrisOptions = Array.from(
    new Set(
      userJokes
        ?.filter(
          (joke) =>
            (joke.private === false && joke.verified === true) ||
            joke.private === undefined
        )
        ?.flatMap((joke) => joke.subCategories)
    )
  ).map((subCategory) => {
    const translatedLabel = (subCategory as keyof typeof norrisCat)
      ? norrisCat[subCategory as keyof typeof norrisCat][language] || subCategory
      : ''
    const firstLetter = translatedLabel?.charAt(0).toUpperCase() ?? subCategory ?? ''
    const restOfLabel = translatedLabel?.slice(1) ?? subCategory ?? ''
    return {
      label: firstLetter + restOfLabel,
      value: subCategory,
    }
  }) as SelectOption[]

  norrisOptions = norrisOptions.filter((option) => option.value !== 'any')
  norrisOptions.unshift({
    label:
      norrisCat['any'][language].charAt(0).toUpperCase() +
      norrisCat['any'][language].slice(1),
    value: 'any',
  })

  useEffect(() => {
    setSelectedNorrisCategory(norrisOptions[0])
  }, [language])

  useEffect(() => {
    const fetchJokes = async () => {
      if (Array.isArray(jokes) && jokes.length > 0 && user && user?.blacklistedJokes) {
        const fetchedJokes = await Promise.all(
          user?.blacklistedJokes?.map(async (blacklistedJoke: IBlacklistedJoke) => {
            let query = blacklistedJoke.value
            const joke = jokes?.find(
              (joke: IJoke) =>
                joke.jokeId?.toString() === blacklistedJoke.jokeId?.toString() &&
                joke.language === blacklistedJoke.language
            )
            return (
              joke ??
              (await findBlackListedJokeFromAPI(
                blacklistedJoke.jokeId,
                blacklistedJoke.language,
                query ?? undefined
              ))
            )
          }) || []
        )
        setFetchedJokes(fetchedJokes)
      }
    }

    fetchJokes()
  }, [user?.blacklistedJokes, jokes])

  // filter fetchedJokes joke, setup and delivery according to searchTerm

  const filteredFetchedJokes = fetchedJokes?.filter((joke) => {
    if (joke) {
      const searchTermMatches =
        ('joke' in joke
          ? joke.joke?.toLowerCase().includes(searchTerm.toLowerCase())
          : false) ||
        ('setup' in joke
          ? joke.setup?.toLowerCase().includes(searchTerm.toLowerCase())
          : false) ||
        ('delivery' in joke
          ? joke.delivery?.toLowerCase().includes(searchTerm.toLowerCase())
          : false) ||
        joke.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        joke.subCategories?.includes(searchTerm?.toLowerCase())

      return searchTermMatches
    }
  })

  //  https://v2.jokeapi.dev/joke/Any?idRange=3&lang={language}&format=json

  const findBlackListedJokeFromAPI = async (
    id: string,
    language: ELanguages,
    query: string | undefined
  ) => {
    try {
      if (query) {
        let joke: any
        try {
          joke = await norrisService.searchNorrisJoke(query)
        } catch (error: any) {
          if (error.response?.data?.message)
            dispatch(notify(error.response.data.message, true, 8))
          console.error(error)
          return null
        } finally {
          return {
            jokeId: joke.id,
            joke: joke.value,
            category: ECategories.ChuckNorris,
            language: ELanguages.English,
            type: EJokeType.single,
            safe:
              joke.categories?.includes('explicit') ||
              joke.categories?.includes('political') ||
              joke.categories?.includes('religion')
                ? false
                : true,
          }
        }
      } else {
        const response = await fetch(
          `https://v2.jokeapi.dev/joke/Any?idRange=${id}&lang=${language}&format=json`
        )
        const data = await response.json()

        if (data.error) {
          const result = await dadjokeService.getDadJokeById(id)
          return {
            jokeId: result.id,
            joke: result.joke,
            category: ECategories.DadJoke,
            language: ELanguages.English,
            type: EJokeType.single,
            safe: true,
          }
        } else {
          if (data.type === 'twopart') {
            return {
              jokeId: data.id,
              setup: data.setup,
              delivery: data.delivery,
              category: data.category,
              language: data.lang,
              type: EJokeType.twopart,
              safe:
                data.flags?.nsfw ||
                data.flags?.religious ||
                data.flags?.political ||
                data.flags?.racist ||
                data.flags?.sexist ||
                data.flags?.explicit ||
                !data.safe
                  ? false
                  : true,
            }
          } else {
            return {
              jokeId: data.id,
              joke: data.joke,
              category: data.category,
              language: data.lang,
              type: EJokeType.single,
              safe:
                data.flags?.nsfw ||
                data.flags?.religious ||
                data.flags?.political ||
                data.flags?.racist ||
                data.flags?.sexist ||
                data.flags?.explicit ||
                !data.safe
                  ? false
                  : true,
            }
          }
        }
      }
    } catch (error: any) {
      if (error.response?.data?.message)
        dispatch(notify(error.response.data.message, true, 8))
      console.error(error)
      return null
    }
  }

  useEffect(() => {
    if (!userId) {
      setShowBlacklistedJokes(false)
    }
  }, [userId])

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [leftPage, setLeftPage] = useState<number>(1)
  const [rightPage, setRightPage] = useState<number>(3)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    if (pageNumber <= 2) {
      setLeftPage(1)
      setRightPage(3)
    } else if (pageNumber >= pageNumbers.length - 1) {
      setLeftPage(pageNumbers.length - 2)
      setRightPage(pageNumbers.length)
    } else {
      setLeftPage(pageNumber - 1)
      setRightPage(pageNumber + 1)
    }
  }

  useEffect(() => {
    if (!currentPage) {
      setCurrentPage(1)
    }
  }, [currentPage])

  useEffect(() => {
    handlePageChange(1)
    setShowBlacklistedJokes(false)
  }, [localJokes])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredJokes?.slice(indexOfFirstItem, indexOfLastItem)

  const pageNumbers: number[] = []
  for (let i = 1; i <= Math.ceil(filteredJokes?.length / itemsPerPage); i++) {
    pageNumbers?.push(i)
  }

  const visiblePageNumbers = pageNumbers?.slice(leftPage - 1, rightPage)

  useEffect(() => {
    if (currentPage > pageNumbers.length) {
      setCurrentPage(1)
    }
  }, [pageNumbers])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      function () {
        dispatch(notify(`${EJokeCopiedToClipboard[language]}`, false, 3))
      },
      function () {
        dispatch(notify(`${EFailedToCopyJokeToClipboard[language]}`, true, 3))
      }
    )
  }

  const pagination = (index: number) => (
    <div className='pagination'>
      {pageNumbers?.length > 1 && (
        <div>
          <span>
            {currentPage} / {pageNumbers?.length}
          </span>
        </div>
      )}
      <div>
        <div className='chevrons-wrap back'>
          <button
            className={`inner-nav-btn first tooltip-wrap ${
              currentPage === 1 ? 'disabled' : ''
            } ${pageNumbers?.length <= 3 ? 'hidden' : ''}`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            <BiChevronsLeft />{' '}
            <span className='tooltip narrow2 below right'>{EFirstPage[language]}</span>
          </button>
          <button
            className={`inner-nav-btn back tooltip-wrap ${
              currentPage === 1 ? 'disabled' : ''
            } ${pageNumbers?.length <= 3 ? 'hidden' : ''}`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <BiChevronLeft />{' '}
            <span className='tooltip narrow2 below right'>{EBack[language]}</span>
          </button>
        </div>
        <div className={`numbers${pageNumbers?.length === 1 ? ' hidden' : ''}`}>
          {visiblePageNumbers?.map((number) => (
            <button
              key={number}
              className={`${
                number > 9
                  ? 'over9'
                  : number > 99
                  ? 'over99'
                  : number > 999
                  ? 'over999'
                  : ''
              } ${number === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}
        </div>
        <div className='chevrons-wrap forward'>
          <button
            className={`inner-nav-btn forward tooltip-wrap ${
              currentPage === pageNumbers?.length ? 'disabled' : ''
            } ${pageNumbers?.length <= 3 ? 'hidden' : ''}`}
            disabled={currentPage === pageNumbers?.length}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <BiChevronRight />{' '}
            <span className='tooltip narrow2 below left'>{ENext[language]}</span>
          </button>
          <button
            className={`inner-nav-btn last tooltip-wrap ${
              currentPage === pageNumbers?.length ? 'disabled' : ''
            } ${pageNumbers?.length <= 3 ? 'hidden' : ''}`}
            disabled={currentPage === pageNumbers?.length}
            onClick={() => handlePageChange(pageNumbers?.length)}
          >
            <BiChevronsRight />
            <span className='tooltip narrow2 left below'>
              {ELastPage[language]}: {pageNumbers?.length}
            </span>
          </button>
        </div>
      </div>
      <div>
        <input
          aria-labelledby='items-per-page'
          className='items-per-page narrow'
          name='items-per-page'
          id={`items-per-page-input-${index}`}
          type='number'
          min='1'
          max='100'
          defaultValue={itemsPerPage}
          onChange={(e) =>
            setItemsPerPage(e.target.valueAsNumber > 0 ? e.target.valueAsNumber : 1)
          }
        />{' '}
        <span id='items-per-page'>{EPerPage[language]}</span>{' '}
      </div>
    </div>
  )
  return (
    <div className='saved' id='saved'>
      {userId && (
        <div className='local-saved-wrap'>
          <button
            className={`btn${localJokes && !showBlacklistedJokes ? ' active' : ''}`}
            onClick={() => {
              setLocalJokes(true)
              setShowBlacklistedJokes(false)
            }}
          >
            {!localJokes ? ESeeLocalJokes[language] : ELocalJokes[language]}
          </button>
          <button
            className={`btn${!localJokes && !showBlacklistedJokes ? ' active' : ''}`}
            onClick={() => {
              setLocalJokes(false)
              setShowBlacklistedJokes(false)
            }}
          >
            {EYourSavedJokes[language]}
          </button>
        </div>
      )}
      <div className='saved-inner'>
        <div className='filler'></div>
        <div>
          {!showBlacklistedJokes && (
            <>
              <h3>{localJokes ? ELocalJokes[language] : EYourSavedJokes[language]}</h3>
              {localJokes && (
                <p className='mb3 flex center textcenter'>
                  {' '}
                  {EUserSubmittedJokes[language]}
                </p>
              )}

              <div className='toggle-wrap'>
                <div className='toggle-inner-wrap'>
                  <div className='safemode-wrap'>
                    <ButtonToggle
                      isChecked={isCheckedSafemode}
                      name='safemode'
                      id='safemode2'
                      className={`${language} ${
                        !isCheckedSafemode ? 'unsafe' : ''
                      } userjokes safemode`}
                      label={`${EFilter[language]}: `}
                      hideLabel={false}
                      on={ESafeTitle[language]}
                      off={EUnsafeTitle[language]}
                      handleToggleChange={handleToggleChangeSafemode}
                    />
                    {sortBy === ESortBy_en.age && (
                      <ButtonToggle
                        isChecked={isCheckedNewest}
                        name='age'
                        id='age'
                        className={`${language} age`}
                        label={`${EAge[language]}: `}
                        hideLabel={false}
                        on={ENewest[language]}
                        off={EOldest[language]}
                        handleToggleChange={() => {
                          handleToggleChangeNewest()
                        }}
                        equal={true}
                      />
                    )}
                  </div>
                  <div className='sortby-wrap'>
                    <Select
                      language={language}
                      id='sortby'
                      className='sortby'
                      instructions={`${EOrderBy[language]}:`}
                      options={optionsSortBy(ESortBy)}
                      value={
                        {
                          label:
                            ESortBy[sortBy][
                              ELanguages[
                                getKeyofEnum(
                                  ELanguages,
                                  language
                                ) as keyof typeof ELanguages
                              ]
                            ],
                          value:
                            ESortBy[sortBy][
                              ELanguages[
                                getKeyofEnum(
                                  ELanguages,
                                  language
                                ) as keyof typeof ELanguages
                              ]
                            ],
                        } as SelectOption
                      }
                      onChange={(o: SelectOption | undefined) => {
                        setSortBy(o?.value as ESortBy_en)
                      }}
                    />
                  </div>
                </div>
                <div className='toggle-inner-wrap'>
                  <div>
                    <Select
                      language={language}
                      id='joke-languages'
                      className='language-filter'
                      instructions={`${EFilterByLanguage[language]}:`}
                      options={[
                        { label: EAll[language], value: '' },
                        ...Array.from(
                          new Set(userJokes?.map((joke) => joke.language))
                        ).map((language) => {
                          return {
                            label:
                              LanguageOfLanguage[language as keyof typeof ELanguagesLong][
                                getKeyofEnum(
                                  ELanguages,
                                  language as ELanguages
                                ) as keyof TLanguageOfLanguage[ELanguages]
                              ],
                            value: language,
                          }
                        }),
                      ]}
                      value={
                        selectedLanguage
                          ? ({
                              label:
                                LanguageOfLanguage[
                                  selectedLanguage as keyof typeof ELanguagesLong
                                ][
                                  getKeyofEnum(
                                    ELanguages,
                                    selectedLanguage as ELanguages
                                  ) as keyof TLanguageOfLanguage[ELanguages]
                                ],
                              value: selectedLanguage,
                            } as SelectOption)
                          : { label: EAll[language], value: '' }
                      }
                      onChange={(o: SelectOption | undefined) => {
                        setSelectedLanguage(o?.value as ELanguages)
                      }}
                    />
                  </div>
                  <div>
                    <Select
                      language={language}
                      id='single-category-select'
                      className='single-category-select'
                      instructions={`${EFilterByCategory[language]}:`}
                      options={[
                        { label: ESelectACategory[language], value: '' },
                        ...(Object.values(ECategories).map((category) => {
                          return {
                            label: getCategoryInLanguage(category, language),
                            value: category,
                          }
                        }) as SelectOption[]),
                      ]}
                      value={
                        selectedCategory
                          ? ({
                              label: getCategoryInLanguage(
                                selectedCategory as ECategories,
                                language
                              ),
                              value: selectedCategory,
                            } as SelectOption)
                          : { label: ESelectACategory[language], value: '' }
                      }
                      onChange={(o) => {
                        setSelectedCategory(o?.value as ECategories)
                        handleSelectChange(o as SelectOption)
                        handleCategoryChange(o?.value as string)
                      }}
                    />
                  </div>
                </div>
                <div className='toggle-inner-wrap'>
                  <div>
                    <Select
                      language={language}
                      id='userNorrisCategories'
                      className={`category extras ${hasNorris ? '' : 'hidden'}`}
                      instructions={`${EFilterFurther[language]}:`}
                      selectAnOption={norrisOptions[0].label}
                      value={selectedNorrisCategory}
                      options={norrisOptions}
                      onChange={(o) => {
                        setSelectedNorrisCategory(o as SelectOption)
                      }}
                    />
                  </div>
                  <div
                    className={hasNorris ? 'search-jokes-wrap' : 'full search-jokes-wrap'}
                  >
                    <div className='search-jokes input-wrap'>
                      <label htmlFor='search-jokes'>
                        <input
                          type='text'
                          id='search-jokes'
                          value={searchTerm}
                          onChange={handleSearchChange}
                          placeholder={ESearch[language]}
                        />
                        <span>{ESearchByKeyword[language]}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className='reset-btn-wrap mb3'>
                <button
                  className='reset-btn delete danger'
                  onClick={() => resetFilters()}
                >
                  <MdOutlineSettingsBackupRestore /> <span>{EReset[language]}</span>
                </button>
              </div>
            </>
          )}
          <div className='button-wrap'>
            {!showBlacklistedJokes && (
              <>
                <button
                  className={`icontext random-btn ${isRandom ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentPage(1)
                    setShowBlacklistedJokes(false)
                    setIsRandom(true)
                    setRandomTrigger((prev) => prev + 1)
                    setLatest(false)
                  }}
                >
                  {ERandom[language]} <FaRandom />
                </button>{' '}
                <button
                  className={`icontext all-or-latest-btn ${
                    !isRandom && !latest ? 'active' : ''
                  }`}
                  onClick={() => {
                    setIsRandom(false)
                    setShowBlacklistedJokes(false)
                    setLatest(false)
                  }}
                >
                  {EAllJokes[language]} <FaList />
                </button>
                <div className='flex center'>
                  <button
                    className={`icontext all-or-latest-btn ${latest ? 'active' : ''}`}
                    onClick={() => {
                      setIsRandom(false)
                      setShowBlacklistedJokes(false)
                      setSortByAge(EOrderByAge.newest)
                      setSortBy(ESortBy_en.age)
                      setLatest(true)
                    }}
                  >
                    {ELatest[language]}
                    <span className='scr'>{latestNumber}</span>{' '}
                    {latestNumber === 3 && <MdOutlineFilter3 />}
                    {latestNumber === 4 && <MdOutlineFilter4 />}
                    {latestNumber === 5 && <MdOutlineFilter5 />}
                    {latestNumber === 6 && <MdOutlineFilter6 />}
                    {latestNumber === 7 && <MdOutlineFilter7 />}
                    {latestNumber === 8 && <MdOutlineFilter8 />}
                    {latestNumber === 9 && <MdOutlineFilter9 />}
                    {latestNumber > 9 && <MdOutlineFilter9Plus />}
                  </button>
                  <div>
                    <input
                      type='number'
                      min={3}
                      max={100}
                      id='number-of-latest'
                      defaultValue={latestNumber}
                      className='narrow'
                      onChange={(e) => {
                        setLatestNumber(e.target.valueAsNumber)
                      }}
                    />
                    <label htmlFor='number-of-latest' className='scr'>
                      <span>{EHowMany[language]}</span>
                    </label>
                  </div>
                </div>
              </>
            )}
            {user && (
              <button
                className={`blocked-btn danger ${showBlacklistedJokes ? 'active' : ''}`}
                onClick={() => setShowBlacklistedJokes((prev) => !prev)}
              >
                {showBlacklistedJokes ? (
                  <>
                    {EHideBlockedJokes[language]} <ImBlocked />
                  </>
                ) : (
                  <>
                    {EBlocked[language]} <ImEyeBlocked />
                  </>
                )}
              </button>
            )}
          </div>

          {!isRandom && !showBlacklistedJokes && pagination(1)}

          {user && showBlacklistedJokes && filteredFetchedJokes?.length > 0 ? (
            <div className='blocked-controls-wrap'>
              <div className='input-wrap search-blacklist'>
                <label htmlFor='searchBlacklistedJokes'>
                  <input
                    id='searchBlacklistedJokes'
                    type='text'
                    onChange={handleSearchChange}
                  />
                  <span>{ESearchByKeyword[language]}</span>
                </label>
              </div>
            </div>
          ) : showBlacklistedJokes ? (
            <p className='textcenter'>{ENoJokesYet[language]}</p>
          ) : (
            ''
          )}

          <ul className={`userjokeslist ${showBlacklistedJokes ? 'blockedJokes' : ''}`}>
            {user && showBlacklistedJokes ? (
              filteredFetchedJokes?.map((joke, index) => (
                <li key={user?.blacklistedJokes?.[index]?.jokeId ?? index}>
                  <form
                    onSubmit={(e) => {
                      dispatch(saveMostRecentJoke(joke))
                      handleRemoveJokeFromBlacklisted(
                        e,
                        joke,
                        user?.blacklistedJokes?.[index]?._id
                      )
                    }}
                  >
                    <button className='' type='submit' disabled={sending}>
                      {ERestore[language]}
                    </button>
                  </form>
                  {joke ? (
                    joke.type === EJokeType.single ? (
                      <p>{joke.joke}</p>
                    ) : (
                      <div>
                        <p>{joke.setup}</p>
                        <p>{joke.delivery}</p>
                      </div>
                    )
                  ) : (
                    ``
                  )}
                </li>
              ))
            ) : currentItems && currentItems?.length > 0 ? (
              currentItems?.map((joke: IJokeVisible) => {
                const { visible, translatedLanguage, ...restOfJoke } = joke
                return (
                  <li key={joke._id}>
                    <div className='primary-wrap'>
                      {joke.type === EJokeType.single ? (
                        <p className=''>{joke.joke}</p>
                      ) : (
                        <div>
                          <p className=''>{joke.setup}</p>
                          <p>
                            {joke.delivery ? (
                              <button
                                type='button'
                                onClick={() => handleVisibility(joke.jokeId)}
                                className={`${
                                  visibleJokes[joke.jokeId] ? 'reveal' : ''
                                } delivery`}
                              >
                                <span
                                  {...(visibleJokes[joke.jokeId]
                                    ? { 'aria-hidden': true }
                                    : { 'aria-hidden': false })}
                                >
                                  <BiChevronsRight /> {EClickToReveal[language]}{' '}
                                  <BiChevronsLeft />
                                </span>
                                <p aria-live='assertive'>
                                  {visibleJokes[joke.jokeId] ? joke.delivery : ''}
                                </p>
                              </button>
                            ) : (
                              ''
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className='secondary-wrap'>
                      <div>
                        <span>
                          {ECategoryTitle[language]}:{' '}
                          {getCategoryInLanguage(joke.category, language)}{' '}
                          {joke.subCategories &&
                          joke.subCategories?.length > 0 &&
                          joke.subCategories?.find((category) => category !== 'any') ? (
                            <>
                              (
                              {joke.subCategories
                                ?.filter((category) => category !== 'any')
                                ?.map((category) => {
                                  return (
                                    norrisCat[category as keyof typeof norrisCat][
                                      language
                                    ].toLowerCase() ?? category
                                  )
                                })
                                .join(', ')}
                              )
                            </>
                          ) : (
                            ''
                          )}
                        </span>
                        <span>
                          {translateWordLanguage}: {joke.translatedLanguage}
                        </span>
                        {joke.anonymous ? (
                          <span>{EAnonymous[language]} </span>
                        ) : joke.anonymous === false ? (
                          <span>
                            {EAuthor[language]}: {joke.name ?? ''}
                          </span>
                        ) : (
                          ''
                        )}
                        {!localJokes && userId && joke.private ? (
                          <span>{EPrivate[language]}</span>
                        ) : !localJokes && userId && joke.private === false ? (
                          <span>{EPublic[language]}</span>
                        ) : (
                          ''
                        )}
                        {joke.private === false && joke.verified === false && (
                          <span>{EPendingVerification[language]}</span>
                        )}

                        {joke.user?.length > 1 && (
                          <span>
                            {ELikedBy[language]} {joke.user?.length}
                          </span>
                        )}
                      </div>

                      <div>
                        {userId && joke.user?.includes(userId) && (
                          <form
                            onSubmit={
                              joke.type === EJokeType.single
                                ? handleDelete(joke?._id, joke?.joke as string)
                                : handleDelete(joke?._id, joke?.setup as string)
                            }
                            className='button-wrap'
                          >
                            <button
                              type='submit'
                              disabled={sending}
                              className='delete danger'
                            >
                              {joke.user?.length > 1
                                ? ERemove[language]
                                : EDelete[language]}
                            </button>
                          </form>
                        )}
                        {joke.author !== userId && !joke.user?.includes(userId) && (
                          <button
                            onClick={() =>
                              handleBlacklistUpdate(
                                joke.jokeId,
                                joke.language,
                                joke.category === ECategories.ChuckNorris &&
                                  joke.type === EJokeType.single
                                  ? joke.joke
                                  : undefined
                              )
                            }
                            className='delete danger'
                          >
                            {EBlock[language]}
                          </button>
                        )}

                        {!joke.user?.includes(userId) && (
                          <button
                            onClick={() => handleJokeSave(joke._id)}
                            className='save'
                          >
                            {ESaveJoke[language]} <MdSave />
                          </button>
                        )}

                        <button
                          onClick={() =>
                            copyToClipboard(
                              joke.type === EJokeType.single
                                ? joke.joke
                                : joke.setup + ' \n' + joke.delivery
                            )
                          }
                        >
                          {ECopy[language]} <IoCopyOutline />
                        </button>
                        {userId &&
                          joke.user?.includes(userId) &&
                          joke.author === userId && (
                            <Accordion
                              language={language}
                              id={`joke-edit-${joke.jokeId}`}
                              className={`joke-edit`}
                              wrapperClass='joke-edit-wrap'
                              text={EEdit[language]}
                              onClick={() => {
                                setJokeLanguage(joke.language)
                                setJokeCategory(joke.category as ECategories)
                                setNewJoke(restOfJoke as IJoke)
                                setEditId(joke.jokeId)
                              }}
                              isOpen={editId === joke.jokeId}
                              setIsFormOpen={setIsEditOpen}
                            >
                              <form
                                onSubmit={handleUpdate(joke?._id, newJoke ?? joke)}
                                className='joke-edit'
                              >
                                <div className='edit-wrap'>
                                  {joke.private === true &&
                                  joke.type === EJokeType.twopart ? (
                                    <>
                                      <div className='input-wrap'>
                                        <label htmlFor='edit-setup'>
                                          <input
                                            required
                                            type='text'
                                            name='edit-setup'
                                            id='setup'
                                            defaultValue={joke.setup}
                                            onChange={(e) => {
                                              setNewJoke(
                                                (prev) =>
                                                  ({
                                                    ...prev,
                                                    setup: e.target.value,
                                                  } as IJoke)
                                              )
                                            }}
                                          />
                                          <span>{EJokeSetup[language]}</span>
                                        </label>
                                      </div>
                                      <div className='input-wrap'>
                                        <label htmlFor='edit-delivery'>
                                          <input
                                            required
                                            type='text'
                                            name='delivery'
                                            id='edit-delivery'
                                            defaultValue={joke.delivery}
                                            onChange={(e) => {
                                              setNewJoke(
                                                (prev) =>
                                                  ({
                                                    ...prev,
                                                    delivery: e.target.value,
                                                  } as IJoke)
                                              )
                                            }}
                                          />
                                          <span>{EJokeDelivery[language]}</span>{' '}
                                        </label>
                                      </div>
                                    </>
                                  ) : joke.private === true &&
                                    joke.type === EJokeType.single ? (
                                    <div className='input-wrap'>
                                      <label htmlFor='edit-joke'>
                                        <input
                                          required
                                          type='text'
                                          name='joke'
                                          id='edit-joke'
                                          defaultValue={joke.joke}
                                          onChange={(e) => {
                                            setNewJoke(
                                              (prev) =>
                                                ({
                                                  ...prev,
                                                  joke: e.target.value,
                                                } as IJoke)
                                            )
                                          }}
                                        />
                                        <span>{EJoke[language]}</span>
                                      </label>
                                    </div>
                                  ) : (
                                    <div>
                                      {EOnlyPrivateJokesCanBeEdited[language]}.{' '}
                                      {ENote[language]}{' '}
                                      {
                                        ERepublishingWillRequireVerificationFromAnAdministrator[
                                          language
                                        ]
                                      }
                                    </div>
                                  )}
                                </div>
                                {joke.private === true && (
                                  <>
                                    <div className='flex column center gap'>
                                      <Select
                                        language={language}
                                        id='edit-language'
                                        className='edit-language'
                                        instructions={`${ELanguageTitle[language]}:`}
                                        hide
                                        options={options(ELanguages)}
                                        value={
                                          {
                                            label:
                                              LanguageOfLanguage[
                                                jokeLanguage as keyof typeof ELanguagesLong
                                              ][
                                                getKeyofEnum(
                                                  ELanguages,
                                                  jokeLanguage as ELanguages
                                                ) as keyof TLanguageOfLanguage[ELanguages]
                                              ],
                                            value: jokeLanguage,
                                          } as SelectOption
                                        }
                                        onChange={(o: SelectOption | undefined) => {
                                          setJokeLanguage(o?.value as ELanguages)
                                          setNewJoke(
                                            (prev) =>
                                              ({
                                                ...prev,
                                                language: o?.value as ELanguages,
                                              } as IJoke)
                                          )
                                        }}
                                      />
                                      <Select
                                        language={language}
                                        id='edit-category'
                                        className='edit-category'
                                        instructions={`${ESelectCategory[language]}:`}
                                        hide
                                        options={[
                                          { label: EAny[language], value: '' },
                                          ...(Object.values(ECategories).map(
                                            (category) => {
                                              return {
                                                label: getCategoryInLanguage(
                                                  category as ECategories,
                                                  language
                                                ),
                                                value: category,
                                              }
                                            }
                                          ) as SelectOption[]),
                                        ]}
                                        value={
                                          {
                                            label: getCategoryInLanguage(
                                              jokeCategory as ECategories,
                                              language
                                            ),
                                            value: jokeCategory,
                                          } as SelectOption
                                        }
                                        onChange={(o: SelectOption | undefined) => {
                                          const {
                                            visible,
                                            translatedLanguage,
                                            ...restOfJoke
                                          } = joke
                                          setJokeCategory(o?.value as ECategories)
                                          setNewJoke(() => ({
                                            ...restOfJoke,
                                            category: o?.value as ECategories,
                                          }))
                                        }}
                                      />
                                    </div>

                                    <fieldset>
                                      <legend>{EAddWarningTitle[language]}</legend>

                                      <div className='checkbox-wrap'>
                                        <div>
                                          <input
                                            type='checkbox'
                                            id='flag-nsfw'
                                            name='nsfw'
                                            value='nsfw'
                                            onChange={() => {
                                              setNewJoke(() => ({
                                                ...restOfJoke,
                                                nsfw: !joke.flags.nsfw,
                                              }))
                                            }}
                                          />
                                          <label htmlFor='flag-nsfw'>
                                            {FlagsLanguage[language].nsfw}
                                          </label>
                                        </div>
                                        <div>
                                          <input
                                            type='checkbox'
                                            id='flag-religious'
                                            name='religious'
                                            value='religious'
                                            onChange={() => {
                                              setNewJoke(() => ({
                                                ...restOfJoke,
                                                religious: !joke.flags.religious,
                                              }))
                                            }}
                                          />
                                          <label htmlFor='flag-religious'>
                                            {FlagsLanguage[language].religious}
                                          </label>
                                        </div>
                                        <div>
                                          <input
                                            type='checkbox'
                                            id='flag-political'
                                            name='political'
                                            value='political'
                                            onChange={() => {
                                              setNewJoke(() => ({
                                                ...restOfJoke,
                                                political: !joke.flags.political,
                                              }))
                                            }}
                                          />
                                          <label htmlFor='flag-political'>
                                            {FlagsLanguage[language].political}
                                          </label>
                                        </div>
                                        <div>
                                          <input
                                            type='checkbox'
                                            id='flag-racist'
                                            name='racist'
                                            value='racist'
                                            onChange={() => {
                                              setNewJoke(() => ({
                                                ...restOfJoke,
                                                racist: !joke.flags.racist,
                                              }))
                                            }}
                                          />
                                          <label htmlFor='flag-racist'>
                                            {FlagsLanguage[language].racist}
                                          </label>
                                        </div>
                                        <div>
                                          <input
                                            type='checkbox'
                                            id='flag-sexist'
                                            name='sexist'
                                            value='sexist'
                                            onChange={() => {
                                              setNewJoke(() => ({
                                                ...restOfJoke,
                                                sexist: !joke.flags.sexist,
                                              }))
                                            }}
                                          />
                                          <label htmlFor='flag-sexist'>
                                            {FlagsLanguage[language].sexist}
                                          </label>
                                        </div>
                                        <div>
                                          <input
                                            type='checkbox'
                                            id='flag-explicit'
                                            name='explicit'
                                            value='explicit'
                                            onChange={() => {
                                              setNewJoke(() => ({
                                                ...restOfJoke,
                                                explicit: !joke.flags.explicit,
                                              }))
                                            }}
                                          />
                                          <label htmlFor='flag-explicit'>
                                            {FlagsLanguage[language].explicit}
                                          </label>
                                        </div>
                                      </div>
                                    </fieldset>
                                  </>
                                )}
                                <fieldset className='flex center gap margin0auto'>
                                  <div>
                                    <input
                                      type='checkbox'
                                      name='anonymous'
                                      id='edit-anonymous'
                                      defaultChecked={joke.anonymous}
                                      onChange={() => {
                                        const {
                                          visible,
                                          translatedLanguage,
                                          ...restOfJoke
                                        } = joke
                                        setNewJoke(() => ({
                                          ...restOfJoke,
                                          anonymous: !joke.anonymous,
                                        }))
                                      }}
                                    />
                                    <label htmlFor='edit-anonymous'>Anonymous:</label>
                                  </div>
                                  <div>
                                    <input
                                      type='checkbox'
                                      name='private'
                                      id='edit-private'
                                      defaultChecked={joke.private}
                                      onChange={() => {
                                        const {
                                          visible,
                                          translatedLanguage,
                                          ...restOfJoke
                                        } = joke
                                        setNewJoke(() => ({
                                          ...restOfJoke,
                                          private: !joke.private,
                                        }))
                                      }}
                                    />
                                    <label htmlFor='edit-private'>Private:</label>
                                  </div>
                                </fieldset>
                                <button type='submit' disabled={sending} className='save'>
                                  {ESaveJoke[language]}
                                </button>
                              </form>
                            </Accordion>
                          )}
                      </div>
                    </div>
                  </li>
                )
              })
            ) : (
              <li>{ELoadingJokes[language]}</li>
            )}
          </ul>
          {!isRandom && !showBlacklistedJokes && pagination(2)}
        </div>
        <div className='filler below'></div>
      </div>
      {userId && (
        <div className='local-saved-wrap below'>
          <button
            className={`btn${localJokes && !showBlacklistedJokes ? ' active' : ''}`}
            onClick={() => {
              setLocalJokes(true)
              setShowBlacklistedJokes(false)
            }}
          >
            {!localJokes ? ESeeLocalJokes[language] : ELocalJokes[language]}
          </button>
          <button
            className={`btn${!localJokes && !showBlacklistedJokes ? ' active' : ''}`}
            onClick={() => {
              setLocalJokes(false)
              setShowBlacklistedJokes(false)
            }}
          >
            {EYourSavedJokes[language]}
          </button>
        </div>
      )}
    </div>
  )
}

export default UserJokes
