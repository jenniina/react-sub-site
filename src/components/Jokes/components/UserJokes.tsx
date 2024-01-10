import { useEffect, useState } from 'react'
import { omit, set } from 'lodash'
import { FaRandom, FaList } from 'react-icons/fa'
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
  ESortByTitle,
  ESortBy,
  ESafemodeTitle,
  ECategory,
  ESelectACategory,
  ESearchByKeyword,
  ECategory_en,
  EAny,
  ESort,
  EYourJokes,
  ELocalJokes,
  ENoJokesYet,
  EUserSubmittedJokes,
  EAnonymous,
  EAuthor,
  EAge,
  EAll,
  ERandom,
  ERandomJoke,
  EAllJokes,
  EPerPage,
  ECategory_cs,
  ECategory_de,
  ECategory_es,
  ECategory_fi,
  ECategory_fr,
  ECategory_pt,
  IJokeCategoryByLanguage,
  ESeeLocalJokes,
  ESaveJoke,
  IJokeSingle,
  IJokeTwoPart,
  CategoryByLanguagesConst,
  CategoryByLanguages,
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
  TCategoryByLanguages,
  ESafemode,
  EExtraCategories,
  EJokeAlreadySaved,
  ENoJokeFound,
  norrisCategoryTranslations as norrisCat,
  ELatest,
  EHowMany,
  EGetLatest,
  EFailedToCopyJokeToClipboard,
  EJokeCopiedToClipboard,
  ECopy,
} from '../interfaces'
import {
  IUser,
  ELanguages,
  LanguageOfLanguage,
  ELanguagesLong,
  TLanguageOfLanguage,
  ESearch,
  EEdit,
  EClose,
  ELanguageTitle,
  ESelectLanguage,
  EFilterByLanguage,
  EFilterByCategory,
  EFilter,
  EReset,
  EOldestFirst,
  ENewestFirst,
  ENewest,
  EOldest,
  ELikedBy,
  ELastPage,
  EFirstPage,
} from '../../../interfaces'
import ButtonToggle from '../../ButtonToggle/ButtonToggle'
import { Select, SelectOption } from '../../Select/Select'
import { useSelector } from 'react-redux'
import { initializeUsers } from '../../../reducers/usersReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import Accordion from '../../Accordion/Accordion'
import { createJoke, initializeJokes, updateJoke } from '../reducers/jokeReducer'
import { notify } from '../../../reducers/notificationReducer'

interface Props {
  userId: IUser['_id']
  handleDelete: (
    jokeId: IJoke['_id'],
    joke: string
  ) => (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>
  handleUpdate: (
    jokeId: IJoke['_id'],
    joke: IJoke
  ) => (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>
  translateWordLanguage: string
  deleteJoke: EDelete
  titleCategory: ECategoryTitle
  titleSafe: ESafeTitle
  titleUnsafe: EUnsafeTitle
  titleClickToReveal: EClickToReveal
  language: ELanguages
  isCheckedSafemode: boolean
  setIsCheckedSafemode: (isCheckedSafemode: boolean) => void
  handleToggleChangeSafemode: () => void
  optionsSortBy: (enumObj: typeof ESortBy) => SelectOption[]
  getKeyofEnum: (enumObj: typeof ELanguages, value: ELanguages) => string
  options: (enumObj: typeof ELanguages) => SelectOption[]
  norrisCategories: SelectOption[]
  getCategoryInLanguage: (
    category: ECategory_en,
    language: ELanguages
  ) => string | undefined
  setIsEditOpen: (isEditOpen: boolean) => void
  editId: IJoke['_id'] | null
  setEditId: (editId: IJoke['_id']) => void
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
  userId,
  handleDelete,
  handleUpdate,
  deleteJoke,
  titleCategory,
  titleSafe,
  titleUnsafe,
  titleClickToReveal,
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
}: Props) => {
  const users = useSelector((state: any) => state.users)
  const jokes = useSelector((state: any) => state.jokes)

  type IJokeVisible = IJoke & {
    visible: boolean
    translatedLanguage: string
    name: string
  }

  const [userJokes, setUserJokes] = useState<IJokeVisible[]>([])
  const [visibleJokes, setVisibleJokes] = useState<Record<IJoke['jokeId'], boolean>>({})
  const [localJokes, setLocalJokes] = useState<boolean>(false)
  const [filteredJokes, setFilteredJokes] = useState<IJokeVisible[]>(userJokes)
  const [isRandom, setIsRandom] = useState<boolean>(false)
  const [randomTrigger, setRandomTrigger] = useState<number>(0)
  const [sortBy, setSortBy] = useState<ESortBy_en>(ESortBy_en.popularity)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<
    ECategory_en | 'ChuckNorris' | ''
  >('')
  const [selectedLanguage, setSelectedLanguage] = useState<ELanguages | ''>('')
  const [hasNorris, setHasNorris] = useState(false)
  const [selectedNorrisCategory, setSelectedNorrisCategory] = useState<
    SelectOption | undefined
  >(norrisCategories[0])
  const [newJoke, setNewJoke] = useState<IJoke | undefined>(undefined)
  const [jokeLanguage, setJokeLanguage] = useState<ELanguages>(ELanguages.English)
  const [jokeCategory, setJokeCategory] = useState<ECategory_en>(ECategory_en.Misc)
  const [sortByAge, setSortByAge] = useState<EOrderByAge.newest | EOrderByAge.oldest>(
    EOrderByAge.newest
  )
  const [isCheckedNewest, setIsCheckedNewest] = useState<boolean>(true)
  const [latestNumber, setLatestNumber] = useState<number>(3)
  const [latest, setLatest] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (Array.isArray(jokes) && jokes.length > 0) {
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
          visible: false,
          translatedLanguage: jokeLanguage ?? '',
          name: joke.anonymous ? 'ÖÖÖ_Anonymous' : author?.name ?? '',
        }
      })
      updatedJokes = !isCheckedSafemode
        ? updatedJokes
            .filter((joke) => joke.safe === false)
            .sort((a, b) => {
              return b.user.length - a.user.length
            })
        : isCheckedSafemode
        ? updatedJokes
            .filter((joke) => joke.safe)
            .sort((a, b) => {
              return b.user.length - a.user.length
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
    dispatch(initializeUsers()).then(() => {
      dispatch(initializeJokes())
    })
  }, [])

  useEffect(() => {
    const norrisExists =
      selectedCategory === ECategory_en.ChuckNorris || selectedCategory === 'ChuckNorris'
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
    setSelectedCategory(o.value as ECategory_en)
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
  }, [])

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
    let newFilteredJokes = userJokes?.filter((joke) => {
      const searchTermMatches =
        ('joke' in joke
          ? joke.joke.toLowerCase().includes(searchTerm.toLowerCase())
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

      const categoryMatches = selectedCategory ? joke.category === selectedCategory : true

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
          languageMatches && categoryMatches && norrisCategoryMatches && searchTermMatches
        )
      } else if (!localJokes && joke.user.includes(userId)) {
        return (
          languageMatches && categoryMatches && norrisCategoryMatches && searchTermMatches
        )
      } else {
        return false
      }
    })
    if (sortBy === ESortBy_en.age) {
      newFilteredJokes = newFilteredJokes?.sort((a, b) => {
        const timeA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0
        const timeB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0
        return sortByAge === EOrderByAge.newest ? timeB - timeA : timeA - timeB
      })
    }

    if (sortBy === ESortBy_en.popularity) {
      newFilteredJokes = newFilteredJokes?.sort((a, b) => {
        return b.user.length - a.user.length
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
    const latestJokes = newFilteredJokes.slice(-1 * latestNumber)

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
    let modifiedCategory: ECategory_en | '' = category as ECategory_en | ''
    if (category === 'Chuck Norris') {
      modifiedCategory = 'ChuckNorris' as ECategory_en
    } else if (category === 'Dad Joke') {
      modifiedCategory = 'DadJoke' as ECategory_en
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
      if (findJoke.user.includes(userId?.toString())) {
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

  const pagination = () => (
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
            className={`inner-nav-btn first ${currentPage === 1 ? 'disabled' : ''} ${
              pageNumbers?.length <= 3 ? 'hidden' : ''
            }`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            <BiChevronsLeft /> <span className='scr'>{EFirstPage[language]}</span>
          </button>
          <button
            className={`inner-nav-btn back ${currentPage === 1 ? 'disabled' : ''} ${
              pageNumbers?.length <= 3 ? 'hidden' : ''
            }`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <BiChevronLeft />
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
            className={`inner-nav-btn forward ${
              currentPage === pageNumbers?.length ? 'disabled' : ''
            } ${pageNumbers?.length <= 3 ? 'hidden' : ''}`}
            disabled={currentPage === pageNumbers?.length}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <BiChevronRight />
          </button>
          <button
            className={`inner-nav-btn last tooltipwrap ${
              currentPage === pageNumbers?.length ? 'disabled' : ''
            } ${pageNumbers?.length <= 3 ? 'hidden' : ''}`}
            disabled={currentPage === pageNumbers?.length}
            onClick={() => handlePageChange(pageNumbers?.length)}
          >
            <BiChevronsRight />
            <span
              className='tooltip right below'
              data-tooltip={`${ELastPage[language]}: ${pageNumbers?.length}`}
            >
              <b className='scr'>
                {ELastPage[language]}: {pageNumbers?.length}
              </b>
            </span>
          </button>
        </div>
      </div>
      <div>
        <input
          className='items-per-page narrow'
          type='number'
          min='1'
          max='100'
          defaultValue={itemsPerPage}
          onChange={(e) =>
            setItemsPerPage(e.target.valueAsNumber > 0 ? e.target.valueAsNumber : 1)
          }
        />{' '}
        <span>{EPerPage[language]}</span>{' '}
      </div>
    </div>
  )
  return (
    <div className='saved' id='saved'>
      {userId && (
        <div className='local-saved-wrap'>
          <button
            className={`btn${localJokes ? ' active' : ''}`}
            onClick={() => setLocalJokes(true)}
          >
            {!localJokes ? ESeeLocalJokes[language] : ELocalJokes[language]}
          </button>
          <button
            className={`btn${!localJokes ? ' active' : ''}`}
            onClick={() => setLocalJokes(false)}
          >
            {EYourSavedJokes[language]}
          </button>
        </div>
      )}
      <div className='saved-inner'>
        <div className='filler'></div>
        <div>
          <h3>{localJokes ? ELocalJokes[language] : EYourSavedJokes[language]}</h3>
          {localJokes && (
            <p className='mb3 flex center textcenter'> {EUserSubmittedJokes[language]}</p>
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
                  on={titleSafe}
                  off={titleUnsafe}
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
                            getKeyofEnum(ELanguages, language) as keyof typeof ELanguages
                          ]
                        ],
                      value:
                        ESortBy[sortBy][
                          ELanguages[
                            getKeyofEnum(ELanguages, language) as keyof typeof ELanguages
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
                    ...Array.from(new Set(userJokes?.map((joke) => joke.language))).map(
                      (language) => {
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
                      }
                    ),
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
                    ...(Object.values(ECategory_en).map((category) => {
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
                            selectedCategory as ECategory_en,
                            language
                          ),
                          value: selectedCategory,
                        } as SelectOption)
                      : { label: ESelectACategory[language], value: '' }
                  }
                  onChange={(o) => {
                    setSelectedCategory(o?.value as ECategory_en)
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
              <div className={hasNorris ? 'search-jokes-wrap' : 'full search-jokes-wrap'}>
                <div className='search-jokes input-wrap'>
                  <label htmlFor='search-jokes' className='visually-hidden'>
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
            <button className='reset-btn delete danger' onClick={() => resetFilters()}>
              <MdOutlineSettingsBackupRestore /> <span>{EReset[language]}</span>
            </button>
          </div>
          <div className='flex center gap-half'>
            <button
              className='icontext'
              onClick={() => {
                setCurrentPage(1)
                setIsRandom(true)
                setRandomTrigger((prev) => prev + 1)
                setLatest(false)
              }}
            >
              <FaRandom />
              {ERandom[language]}
            </button>{' '}
            <button
              className='icontext'
              onClick={() => {
                setIsRandom(false)
                if (!latest) {
                  setSortBy(ESortBy_en.age)
                  setSortByAge(EOrderByAge.newest)
                  setTimeout(() => {
                    setLatest(true)
                  }, 200)
                } else setLatest(false)
              }}
            >
              {!latest && !isRandom ? (
                <>
                  {latestNumber === 3 && <MdOutlineFilter3 />}
                  {latestNumber === 4 && <MdOutlineFilter4 />}
                  {latestNumber === 5 && <MdOutlineFilter5 />}
                  {latestNumber === 6 && <MdOutlineFilter6 />}
                  {latestNumber === 7 && <MdOutlineFilter7 />}
                  {latestNumber === 8 && <MdOutlineFilter8 />}
                  {latestNumber === 9 && <MdOutlineFilter9 />}{' '}
                  {latestNumber > 9 && <MdOutlineFilter9Plus />} {EGetLatest[language]}{' '}
                  <span className='scr'>{latestNumber}</span>
                </>
              ) : (
                <>
                  <FaList /> {EAllJokes[language]}
                </>
              )}
            </button>
            {!latest && !isRandom && (
              <>
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
              </>
            )}
          </div>

          {!isRandom && pagination()}

          <ul className='userjokeslist'>
            {currentItems && currentItems?.length > 0 ? (
              currentItems?.map((joke) => {
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
                                  {titleClickToReveal}
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
                          {titleCategory}:{' '}
                          {getCategoryInLanguage(joke.category as ECategory_en, language)}{' '}
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

                        <span>
                          {ELikedBy[language]} {joke.user.length}
                        </span>
                      </div>
                      <div>
                        {userId && joke.user.includes(userId) && (
                          <form
                            onSubmit={
                              joke.type === EJokeType.single
                                ? handleDelete(joke?._id, joke?.joke as string)
                                : handleDelete(joke?._id, joke?.setup as string)
                            }
                            className='button-wrap'
                          >
                            <button type='submit' className='delete danger'>
                              {deleteJoke}
                            </button>
                          </form>
                        )}
                        {!joke.user.includes(userId) && (
                          <button
                            onClick={() => handleJokeSave(joke._id)}
                            className='save'
                          >
                            {ESaveJoke[language]}
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
                          {ECopy[language]}
                        </button>
                        {userId &&
                          joke.user.includes(userId) &&
                          joke.author === userId && (
                            <Accordion
                              language={language}
                              className='joke-edit'
                              text={EEdit[language]}
                              close={EClose[language]}
                              onClick={() => {
                                setJokeLanguage(joke.language)
                                setJokeCategory(joke.category as ECategory_en)
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
                                        ...(Object.values(ECategory_en).map(
                                          (category) => {
                                            return {
                                              label: getCategoryInLanguage(
                                                category as ECategory_en,
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
                                            jokeCategory as ECategory_en,
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
                                        setJokeCategory(o?.value as ECategory_en)
                                        setNewJoke(() => ({
                                          ...restOfJoke,
                                          category: o?.value as ECategory_en,
                                        }))
                                      }}
                                    />
                                  </>
                                )}
                                <div>
                                  <label htmlFor='edit-anonymous'>Anonymous:</label>
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
                                  <label htmlFor='edit-private'>Private:</label>
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
                                </div>
                                <button type='submit' className='save'>
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
              <li>{ENoJokesYet[language]}</li>
            )}
          </ul>
          {!isRandom && pagination()}
        </div>
        <div className='filler below'></div>
      </div>
      {userId && (
        <div className='local-saved-wrap below'>
          <button
            className={`btn${localJokes ? ' active' : ''}`}
            onClick={() => setLocalJokes(true)}
          >
            {!localJokes ? ESeeLocalJokes[language] : ELocalJokes[language]}
          </button>
          <button
            className={`btn${!localJokes ? ' active' : ''}`}
            onClick={() => setLocalJokes(false)}
          >
            {EYourSavedJokes[language]}
          </button>
        </div>
      )}
    </div>
  )
}

export default UserJokes
