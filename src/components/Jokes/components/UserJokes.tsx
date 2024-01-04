import { useEffect, useState } from 'react'
import { omit } from 'lodash'
import { FaRandom, FaList } from 'react-icons/fa'
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
  SortBy,
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
} from '../../../interfaces'
import ButtonToggle from '../../ButtonToggle/ButtonToggle'
import { Select, SelectOption } from '../../Select/Select'
import { useSelector } from 'react-redux'
import { initializeUsers } from '../../../reducers/usersReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import Accordion from '../../Accordion/Accordion'

// export interface IJokeVisible {
//   _id?: IJoke['_id']
//   jokeId: IJoke['jokeId']
//   type: EJokeType
//   setup?: string
//   delivery?: string
//   joke?: string
//   category: string
//   subCategories?: string[]
//   language: string
//   safe: boolean
//   user: IUser['_id'][]
//   private?: boolean
//   verified?: boolean
//   anonymous?: boolean
//   author?: IUser['_id']
//   visible: boolean
//   flags?: {
//     nsfw: boolean
//     religious: boolean
//     political: boolean
//     racist: boolean
//     sexist: boolean
//     explicit: boolean
//   }
// }

interface Props {
  titleSaved: ESavedJoke
  jokes: IJoke[]
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
  titleLanguage: keyof typeof ELanguages
  deleteJoke: EDelete
  titleCategory: ECategoryTitle
  titleSafe: ESafeTitle
  titleUnsafe: EUnsafeTitle
  titleClickToReveal: EClickToReveal
  language: ELanguages
  isCheckedSafemode: boolean
  handleToggleChangeSafemode: () => void
  optionsSortBy: (enumObj: typeof SortBy) => SelectOption[]
  getKeyofEnum: (enumObj: typeof ELanguages, value: ELanguages) => string
  norrisCategories: SelectOption[]
  getCategoryInLanguage: (
    category: ECategory_en,
    language: ELanguages
  ) => string | undefined
}

enum ESortBy {
  category = 'category',
  language = 'language',
  name = 'name',
}

const UserJokes = ({
  titleSaved,
  jokes,
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
  handleToggleChangeSafemode,
  translateWordLanguage,
  titleLanguage,
  optionsSortBy,
  getKeyofEnum,
  norrisCategories,
  getCategoryInLanguage,
}: Props) => {
  const users = useSelector((state: any) => state.users)

  type IJokeVisible = IJoke & {
    visible: boolean
    translatedLanguage: string
    name: string
  }

  //add visible to jokes
  const withVisibility: IJokeVisible[] =
    Array.isArray(jokes) && jokes?.length > 0
      ? jokes?.map((joke) => {
          const author = users.find((user: IUser) => user._id == joke.author)
          const jokeLanguage = LanguageOfLanguage[
            language as keyof typeof ELanguagesLong
          ][
            getKeyofEnum(
              ELanguages,
              joke.language as ELanguages
            ) as keyof TLanguageOfLanguage[ELanguages]
          ] as TLanguageOfLanguage[keyof typeof ELanguagesLong][keyof TLanguageOfLanguage[ELanguages]]
          return {
            ...joke,
            visible: false,
            translatedLanguage: jokeLanguage ?? '',
            name: joke.anonymous ? '_Anonymous' : author?.name ?? '',
          }
        })
      : []
  const [userJokes, setUserJokes] = useState<IJokeVisible[]>(withVisibility)
  const [visibleJokes, setVisibleJokes] = useState<Record<IJoke['jokeId'], boolean>>({})
  const [localJokes, setLocalJokes] = useState<boolean>(false)
  const [filteredJokes, setFilteredJokes] = useState<IJokeVisible[]>(withVisibility)
  const [isRandom, setIsRandom] = useState<boolean>(false)
  const [randomTrigger, setRandomTrigger] = useState<number>(0)
  const [sortBy, setSortBy] = useState<ESortBy>(ESortBy.category)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<
    ECategory_en | 'ChuckNorris' | ''
  >('')
  const [hasNorris, setHasNorris] = useState(false)
  const [selectedNorrisCategory, setSelectedNorrisCategory] = useState<
    SelectOption | undefined
  >(norrisCategories[0])
  const [newJoke, setNewJoke] = useState<IJoke>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
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
    const sortedJokes =
      !isCheckedSafemode && withVisibility !== undefined
        ? withVisibility
            .filter((joke) => joke.safe === false)
            .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
        : isCheckedSafemode && withVisibility !== undefined
        ? withVisibility
            .filter((joke) => joke.safe)
            .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
        : ''

    setUserJokes(sortedJokes as unknown as IJokeVisible[])
  }, [jokes, isCheckedSafemode, sortBy])

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
    const newFilteredJokes = userJokes?.filter((joke) => {
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

      const norrisCategoryMatches =
        selectedNorrisCategory?.value !== '' && selectedNorrisCategory?.value !== 'any'
          ? joke.subCategories?.includes(selectedNorrisCategory?.value as string)
          : true

      if (localJokes && joke.private === false && joke.verified === true) {
        return categoryMatches && norrisCategoryMatches && searchTermMatches
      } else if (!localJokes && joke.user.includes(userId)) {
        return categoryMatches && norrisCategoryMatches && searchTermMatches
      } else {
        return false
      }
    })

    if (isRandom && newFilteredJokes.length > 0) {
      const randomJoke =
        newFilteredJokes[Math.floor(Math.random() * newFilteredJokes.length)]
      setFilteredJokes([randomJoke])
    } else {
      setFilteredJokes(newFilteredJokes)
    }
  }, [
    localJokes,
    userJokes,
    selectedCategory,
    selectedNorrisCategory,
    searchTerm,
    isRandom,
    randomTrigger,
  ])

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredJokes.slice(indexOfFirstItem, indexOfLastItem)

  const pageNumbers: number[] = []
  for (let i = 1; i <= Math.ceil(filteredJokes.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const handleCategoryChange = (category: string) => {
    let modifiedCategory: ECategory_en | '' = category as ECategory_en | ''
    if (category === 'Chuck Norris') {
      modifiedCategory = 'ChuckNorris' as ECategory_en
    } else if (category === 'Dad Joke') {
      modifiedCategory = 'DadJoke' as ECategory_en
    }
    setSelectedCategory(modifiedCategory)
  }

  const pagination = () => (
    <div className='pagination'>
      <div>
        {pageNumbers.length > 1 &&
          pageNumbers.map((number) => (
            <button
              key={number}
              className={number === currentPage ? 'active' : ''}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}
      </div>
      <div>
        <input
          className='items-per-page'
          type='number'
          defaultValue={itemsPerPage}
          onChange={(e) =>
            setItemsPerPage(e.target.valueAsNumber > 0 ? e.target.valueAsNumber : 1)
          }
        />{' '}
        <span>{EPerPage[language]}</span>
      </div>
    </div>
  )

  return (
    <div className='saved'>
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
            <ButtonToggle
              isChecked={isCheckedSafemode}
              name='safemode'
              id='safemode2'
              className={`${language} safemode userjokes`}
              label={ESort[language]}
              hideLabel={false}
              on={titleSafe}
              off={titleUnsafe}
              handleToggleChange={handleToggleChangeSafemode}
            />
            <Select
              language={language}
              id='sortby'
              className='sortby'
              instructions={`${EOrderBy[language]}:`}
              options={optionsSortBy(SortBy)}
              value={
                {
                  label:
                    SortBy[sortBy][
                      ELanguages[
                        getKeyofEnum(ELanguages, language) as keyof typeof ELanguages
                      ]
                    ],
                  value:
                    SortBy[sortBy][
                      ELanguages[
                        getKeyofEnum(ELanguages, language) as keyof typeof ELanguages
                      ]
                    ],
                } as SelectOption
              }
              onChange={(o: SelectOption | undefined) => {
                setSortBy(o?.value as ESortBy)
              }}
            />
            <Select
              language={language}
              id='single-category-select'
              className='single-category-select'
              instructions={`${ESelectCategory[language]}:`}
              options={[
                // { label: ESelectACategory[language], value: '' },
                // ...Array.from(
                //   new Set(
                //     jokes //?.filter((joke) => joke.user.includes(userId))
                //       ?.map((joke) => joke.category)
                //   )
                // ).map((category) => {
                //   return {
                //     label: category,
                //     value: category,
                //   }
                // }),
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

            <Select
              language={language}
              id='userNorrisCategories'
              className={`category extras ${hasNorris ? '' : 'hidden'}`}
              instructions={`Chuck Norris Category:`}
              selectAnOption={EAny[language]}
              value={selectedNorrisCategory}
              options={norrisCategories}
              onChange={(o) => {
                setSelectedNorrisCategory(o as SelectOption)
              }}
            />
          </div>
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
          <div className='flex center gap'>
            <button
              className='icontext'
              onClick={() => {
                setCurrentPage(1)
                setIsRandom(true)
                setRandomTrigger((prev) => prev + 1)
              }}
            >
              <FaRandom />
              {ERandom[language]}
            </button>{' '}
            <button className='icontext' onClick={() => setIsRandom(false)}>
              <FaList /> {EAllJokes[language]}
            </button>
          </div>
          {!isRandom && pagination()}
          <ul className='userjokeslist'>
            {currentItems && currentItems?.length > 0 ? (
              currentItems?.map((joke) => {
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
                      <span>
                        {titleCategory}:{' '}
                        {getCategoryInLanguage(joke.category as ECategory_en, language)}
                      </span>
                      {joke.category === ECategory_en.ChuckNorris ? (
                        <span>
                          {joke.subCategories
                            ? `(${joke.subCategories
                                .map((category) => category)
                                .join(', ')})`
                            : ''}
                        </span>
                      ) : (
                        ''
                      )}
                      {hasNorris &&
                      joke.subCategories?.find((category) => category !== 'any') ? (
                        <span>
                          {joke.subCategories
                            ?.filter((category) => category !== 'any')
                            .join(', ')}
                        </span>
                      ) : (
                        ''
                      )}
                      <span>
                        {translateWordLanguage}: {joke.translatedLanguage}
                        {/* {
                    // LanguageOfLanguage['en']['English'] 
                    LanguageOfLanguage[language as keyof typeof ELanguagesLong][
                      getKeyofEnum(
                        ELanguages,
                        joke.language as ELanguages
                      ) as keyof (typeof LanguageOfLanguage)[typeof language]
                    ]
                  } */}
                      </span>
                      {joke.anonymous ? (
                        <span>{EAnonymous[language]} </span>
                      ) : joke.anonymous === false ? (
                        <span>
                          {EAuthor[language]}: {joke.name}
                        </span>
                      ) : (
                        ''
                      )}
                      {/* <span>ID: {joke.jokeId}</span> */}
                      {joke.private === false && joke.verified === false && (
                        <span>{EPendingVerification[language]}</span>
                      )}

                      {userId && joke.user.includes(userId) && joke.author === userId && (
                        <Accordion
                          language={language}
                          className='joke-edit'
                          text={EEdit[language]}
                          close={EClose[language]}
                        >
                          <form
                            onSubmit={handleUpdate(joke?._id, newJoke ?? joke)}
                            className='joke-edit'
                          >
                            <div>
                              <label htmlFor='edit-anonymous'>Anonymous:</label>
                              <input
                                type='checkbox'
                                name='anonymous'
                                id='edit-anonymous'
                                defaultChecked={joke.anonymous}
                                onChange={() => {
                                  const {
                                    _id,
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
                                    _id,
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
      </div>
    </div>
  )
}

export default UserJokes
