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

type IJokeVisible = IJoke & { visible: boolean }

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
  author = 'author',
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
  //add visible to jokes
  const withVisibility: IJokeVisible[] =
    Array.isArray(jokes) && jokes?.length > 0
      ? jokes?.map((joke) => {
          return { ...joke, visible: false }
        })
      : []
  const [userJokes, setUserJokes] = useState<IJokeVisible[]>(withVisibility)
  const [visibleJokes, setVisibleJokes] = useState<Record<IJoke['jokeId'], boolean>>({})
  const [localJokes, setLocalJokes] = useState<boolean>(false)
  const [filteredJokes, setFilteredJokes] = useState<IJokeVisible[]>([])
  const [isRandom, setIsRandom] = useState<boolean>(false)
  const [randomTrigger, setRandomTrigger] = useState<number>(0)
  const [sortBy, setSortBy] = useState<ESortBy>(ESortBy.category)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<ECategory | ''>('')
  const [hasNorris, setHasNorris] = useState(false)
  const [selectedNorrisCategory, setSelectedNorrisCategory] = useState<
    SelectOption | undefined
  >(norrisCategories[0])
  const [newJoke, setNewJoke] = useState<IJoke>()

  const users = useSelector((state: any) => state.users)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const norrisExists = selectedCategory === ECategory_en.ChuckNorris
    setHasNorris(norrisExists)
  }, [selectedCategory])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1)
    setSearchTerm(event.target.value)
  }

  const handleSelectChange = (o: SelectOption) => {
    setSelectedCategory(o.value as ECategory)
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
    const jokesWithAuthorNames = withVisibility?.map((joke) => {
      const author = users.find((user: IUser) => user._id == joke.author)
      return { ...joke, author: author?.name }
    })

    const sortedJokes =
      !isCheckedSafemode && jokesWithAuthorNames !== undefined
        ? jokesWithAuthorNames
            .filter((joke) => joke.safe === false)
            .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
        : isCheckedSafemode && jokesWithAuthorNames !== undefined
        ? jokesWithAuthorNames
            .filter((joke) => joke.safe)
            .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
        : ''

    setUserJokes(sortedJokes as IJokeVisible[])
  }, [jokes, isCheckedSafemode, sortBy])

  const handleToggleChangeLocalJokes = () => {
    setLocalJokes(!localJokes)
  }

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
        joke.author?.toLowerCase().includes(searchTerm.toLowerCase())

      if (localJokes && joke.private === false && joke.verified === true) {
        return searchTermMatches
      } else if (joke.user.includes(userId) && joke.verified === true) {
        return searchTermMatches
      } else {
        // If localJokes is false, filter by category or search term
        if (joke.user.includes(userId) && joke.category === selectedCategory) {
          return searchTermMatches
        }
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
  }, [localJokes, userJokes, selectedCategory, searchTerm, isRandom, randomTrigger])

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
              instructions={`${ESortByTitle[language]}:`}
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
              instructions={`${titleCategory}:`}
              options={[
                { label: ESelectACategory[language], value: '' },
                ...Array.from(
                  new Set(
                    filteredJokes //?.filter((joke) => joke.user.includes(userId))
                      ?.map((joke) => joke.category)
                  )
                ).map((category) => {
                  return {
                    label: category,
                    value: category,
                  }
                }),
              ]}
              value={
                selectedCategory
                  ? ({
                      label: selectedCategory,
                      value: selectedCategory,
                    } as SelectOption)
                  : { label: ESelectACategory[language], value: '' }
              }
              onChange={(o) => {
                setSelectedCategory(o?.value as ECategory)
                handleSelectChange(o as SelectOption)
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
                const author = users.find((user: IUser) => user.name == joke.author)
                return (
                  <li key={joke.jokeId}>
                    <div className='primary-wrap'>
                      {joke.type === EJokeType.single ? (
                        <p className='flex center textcenter'>{joke.joke}</p>
                      ) : (
                        <div>
                          <p className='flex center textcenter'>{joke.setup}</p>
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
                      <span>
                        {translateWordLanguage}:{' '}
                        {
                          /* LanguageOfLanguage['en']['English'] */
                          LanguageOfLanguage[language as keyof typeof ELanguagesLong][
                            getKeyofEnum(
                              ELanguages,
                              joke.language as ELanguages
                            ) as keyof TLanguageOfLanguage[ELanguages]
                          ] as TLanguageOfLanguage[keyof typeof ELanguagesLong][keyof TLanguageOfLanguage[ELanguages]]
                        }
                        {/* {
                    // LanguageOfLanguage['en']['English'] 
                    LanguageOfLanguage[language as keyof typeof ELanguagesLong][
                      getKeyofEnum(
                        ELanguages,
                        joke.language as ELanguages
                      ) as keyof (typeof LanguageOfLanguage)[typeof language]
                    ]
                  } */}
                        {/* {
                    getKeyofEnum(
                      ELanguages,
                      joke.language as ELanguages
                    ) as keyof typeof ELanguages
                  } */}
                      </span>
                      {joke.anonymous ? (
                        <span>{EAnonymous[language]} </span>
                      ) : joke.anonymous === false ? (
                        <span>
                          {EAuthor[language]}: {joke.author}
                        </span>
                      ) : (
                        ''
                      )}
                      {/* <span>ID: {joke.jokeId}</span> */}

                      {userId && joke.user.includes(userId) && author?._id === userId && (
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
                                  setNewJoke(() => ({
                                    ...joke,
                                    anonymous: !joke.anonymous,
                                    author: author._id,
                                  }))
                                }}
                              />
                              {/* <label htmlFor='edit-private'>Private:</label>
                              <input
                                type='checkbox'
                                name='private'
                                id='edit-private'
                                defaultChecked={joke.private}
                                onChange={() => {
                                  setNewJoke(() => ({
                                    ...joke,
                                    private: !joke.private,
                                    author: author._id,
                                  }))
                                }}
                              /> */}
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
