import { useEffect, useState } from 'react'
import {
  EJokeType,
  ESavedJoke,
  IJoke,
  EDelete,
  ECategoryTitle,
  ESafeTitle,
  EUnsafeTitle,
  ESingle,
  ETwoPart,
  EClickToReveal,
  ESortByTitle,
  SortBy,
  ESafemodeTitle,
} from '../interfaces'
import {
  IUser,
  ELanguages,
  LanguageOfLanguage,
  ELanguagesLong,
  ELanguageOfLanguage,
  TLanguageOfLanguage,
} from '../../../interfaces'
import ButtonToggle from '../../ButtonToggle/ButtonToggle'
import { Select, SelectOption } from '../../Select/Select'

interface Props {
  titleSaved: ESavedJoke
  titleCategory: ECategoryTitle
  titleSafe: ESafeTitle
  jokes: IJoke[]
  userId: IUser['_id']
  deleteJoke: EDelete
  handleDelete: (
    jokeId: IJoke['_id'],
    joke: string
  ) => (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>
}
export interface IJokeVisible {
  _id?: IJoke['_id']
  jokeId: IJoke['jokeId']
  type: EJokeType
  setup?: string
  delivery?: string
  joke?: string
  category: string
  language: string
  safe: boolean
  user: IUser['_id'][]
  visible: boolean
}

interface Props {
  titleSaved: ESavedJoke
  jokes: IJoke[]
  userId: IUser['_id']
  handleDelete: (
    jokeId: IJoke['_id'],
    joke: string
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
}

enum ESortBy {
  jokeId = 'jokeId',
  category = 'category',
  language = 'language',
}

const UserJokes = ({
  titleSaved,
  jokes,
  userId,
  handleDelete,
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
}: Props) => {
  //add visible to jokes
  const withVisibility: IJokeVisible[] = jokes?.map((joke) => {
    return { ...joke, visible: false }
  })
  const [userJokes, setUserJokes] = useState<IJokeVisible[]>(withVisibility)
  const [sortBy, setSortBy] = useState<ESortBy>(ESortBy.category)
  const [titleSortBy, setTitleSortBy] = useState<ESortByTitle>(ESortByTitle.en)

  const [toggle, setToggle] = useState(false)

  const handleVisibility = (jokeId: IJoke['jokeId']) => {
    setToggle(!toggle)
    setUserJokes(
      userJokes?.map((joke) => {
        if (joke.jokeId === jokeId) {
          return { ...joke, visible: !joke.visible }
        }
        return joke
      })
    )
  }

  useEffect(() => {
    !isCheckedSafemode && withVisibility !== undefined
      ? setUserJokes(
          withVisibility
            ?.filter((joke) => joke.user.includes(userId) && joke.safe === false)
            .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
        )
      : isCheckedSafemode && withVisibility !== undefined
      ? setUserJokes(
          withVisibility
            ?.filter((joke) => joke.user.includes(userId) && joke.safe)
            .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
        )
      : ''
  }, [jokes, isCheckedSafemode, sortBy])

  useEffect(() => {
    setTitleSortBy(ESortByTitle[language])
  }, [language])
  return (
    <div className='saved'>
      <h3>{titleSaved}</h3>
      <div className='toggle-wrap'>
        <Select
          id='sortby'
          className='sortby'
          instructions={`${titleSortBy}:`}
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
        <ButtonToggle
          isChecked={isCheckedSafemode}
          name='safemode'
          id='safemode2'
          className={`${language} safemode userjokes`}
          label={ESafemodeTitle[language]}
          hideLabel={true}
          on={titleSafe}
          off={titleUnsafe}
          handleToggleChange={handleToggleChangeSafemode}
        />
      </div>
      <ul className='userjokeslist'>
        {userJokes && userJokes.length > 0 ? (
          userJokes?.map((joke) => (
            <li key={joke.jokeId}>
              <div className='primary-wrap'>
                {joke.type === EJokeType.single ? (
                  <p>{joke.joke}</p>
                ) : (
                  <div>
                    <p>{joke.setup}</p>
                    <p>
                      {joke.delivery ? (
                        <button
                          type='button'
                          onClick={() => handleVisibility(joke.jokeId)}
                          className={`${joke.visible ? 'reveal' : ''} delivery`}
                        >
                          <span
                            {...(joke.visible
                              ? { 'aria-hidden': true }
                              : { 'aria-hidden': false })}
                          >
                            {titleClickToReveal}
                          </span>
                          <p aria-live='assertive'>{joke.visible ? joke.delivery : ''}</p>
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
                  {titleCategory}: {joke.category}
                </span>
                <span>ID: {joke.jokeId}</span>
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
                <form
                  onSubmit={
                    joke.type === EJokeType.single
                      ? handleDelete(joke._id, joke.joke as string)
                      : handleDelete(joke._id, joke.setup as string)
                  }
                  className='button-wrap'
                >
                  <button type='submit' className='delete danger'>
                    {deleteJoke}
                  </button>
                </form>
              </div>
            </li>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </div>
  )
}

export default UserJokes
