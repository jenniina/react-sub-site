import { lazy, Suspense } from 'react'
//import Joke from './Joke'
import { Select } from '../../Select/Select'
import { SelectOption } from '../../Select/Select'
import { useEffect } from 'react'
import ButtonToggle from '../../ButtonToggle/ButtonToggle'
import {
  EJokeType,
  ESafemode,
  EFindAJoke,
  ESafeTitle,
  EUnsafeTitle,
  ESingle,
  ETwoPart,
  EClickToReveal,
  IJokeCategoryByLanguage,
  ESafemodeTitle,
  EJokeTypeTitle,
  ESelectACategory,
  ESelectALanguage,
  ESearchByKeyword,
  EAny,
  ECategories,
  TCategoryByLanguages,
  IJoke,
  EChuckNorrisCategory,
} from '../interfaces'
import { ELanguages, ELoading } from '../../../interfaces'
import { FaAnglesDown } from 'react-icons/fa6'

const Joke = lazy(() => import('./Joke'))

interface Props {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  jokeCategory: ECategories | null
  setJokeCategory: (jokeCategory: ECategories) => void
  setQueryValue: (queryValue: string) => void
  setLanguage: (language: ELanguages) => void
  optionsCategory: (enumObj: TCategoryByLanguages) => SelectOption[]
  setQuery: (query: string) => void
  categoryByLanguages: TCategoryByLanguages
  categoryValues: SelectOption[]
  setCategoryValues: (categoryValues: SelectOption[]) => void
  query: string
  language: ELanguages
  joke: string
  delivery?: string
  jokeId: IJoke['jokeId']
  author: string
  submitted: boolean
  reveal: boolean
  setReveal: (reveal: boolean) => void
  isCheckedSafemode: boolean
  isCheckedJokeType: boolean
  visibleJoke: boolean
  setVisibleJoke: (visibleJoke: boolean) => void
  handleToggleChangeSafemode: () => void
  handleToggleChangeEJokeType: () => void
  handleJokeSave: (e: React.FormEvent<HTMLFormElement>) => void
  options: (enumObj: typeof ELanguages) => SelectOption[]
  getKeyByValue: (
    enumObj: typeof ECategories | typeof EJokeType | typeof ESafemode | typeof ELanguages,
    value: ECategories | EJokeType | ESafemode | ELanguages
  ) => undefined | SelectOption['label']
  norrisCategories: SelectOption[]
  selectedNorrisCategory: SelectOption | undefined
  setSelectedNorrisCategory: (selectedNorrisCategory: SelectOption | undefined) => void
  hasNorris: boolean
  getCategoryInLanguage: (
    category: ECategories | null,
    language: ELanguages
  ) => string | undefined
  subCategoryResults: string[]
  handleBlacklistUpdate: (
    jokeId: IJoke['jokeId'],
    language: ELanguages,
    value: string | undefined
  ) => void
  sending: boolean
}
const Form = ({
  handleFormSubmit,
  jokeCategory,
  categoryValues,
  setCategoryValues,
  setJokeCategory,
  setQueryValue,
  getKeyByValue,
  setLanguage,
  setQuery,
  joke,
  language,
  query,
  delivery,
  jokeId,
  author,
  options,
  submitted,
  isCheckedSafemode,
  isCheckedJokeType,
  handleToggleChangeSafemode,
  handleToggleChangeEJokeType,
  reveal,
  setReveal,
  handleJokeSave,
  optionsCategory,
  categoryByLanguages,
  visibleJoke,
  setVisibleJoke,
  norrisCategories,
  selectedNorrisCategory,
  setSelectedNorrisCategory,
  hasNorris,
  getCategoryInLanguage,
  subCategoryResults,
  handleBlacklistUpdate,
  sending,
}: Props) => {
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

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setVisibleJoke(false)
          setTimeout(() => {
            handleFormSubmit(e)
          }, 400)
        }}
        className='joke'
      >
        <div className='controls-wrap'>
          <Select
            language={language}
            id='language-joke'
            className='language full'
            instructions={`${ESelectALanguage[language]}:`}
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
              setJokeCategory(ECategories.Misc)
            }}
          />

          <div className='toggle-wrap'>
            <ButtonToggle
              isChecked={isCheckedSafemode}
              name='safemode'
              id='safemode'
              className={`${language} ${!isCheckedSafemode ? 'unsafe' : ''} safemode`}
              label={`${ESafemodeTitle[language]}: `}
              on={ESafeTitle[language]}
              off={EUnsafeTitle[language]}
              handleToggleChange={handleToggleChangeSafemode}
            />

            <ButtonToggle
              isChecked={isCheckedJokeType}
              name='joketype'
              id='joketype'
              className={`${language} joketype`}
              label={`${EJokeTypeTitle[language]}: `}
              on={ETwoPart[language]}
              off={ESingle[language]}
              handleToggleChange={handleToggleChangeEJokeType}
              equal={true}
            />
          </div>
        </div>

        {categoryByLanguages ? (
          <Select
            language={language}
            multiple
            id='jokeCategory'
            className={`category`}
            instructions={`${ESelectACategory[language]}:`}
            selectAnOption={EAny[language]}
            value={categoryValues}
            options={optionsCategory(categoryByLanguages as any)}
            onChange={(o: SelectOption[]) => {
              setCategoryValues(o)
              setJokeCategory(o?.map((s) => s.value).join(',') as ECategories)
            }}
          />
        ) : (
          ''
        )}

        <Select
          language={language}
          id='jokeCategoryNorrisCategories'
          className={`category extras ${hasNorris ? '' : 'hidden'}`}
          instructions={`${EChuckNorrisCategory[language]}:`}
          selectAnOption={EAny[language]}
          value={selectedNorrisCategory}
          options={norrisCategories}
          onChange={(o) => {
            setSelectedNorrisCategory(o as SelectOption)
          }}
        />

        <div className='flex column center'>
          <div className='input-wrap'>
            <label htmlFor='queryValue'>
              <input
                type='text'
                id='queryValue'
                name='queryValue'
                value={query}
                onChange={(e) => {
                  setQuery((e.target as HTMLInputElement).value)
                  setQueryValue(
                    encodeURIComponent((e.target as HTMLInputElement).value) + '&'
                  )
                }}
              />
              <span>{ESearchByKeyword[language]}</span>
            </label>
          </div>

          <button id='generate-joke' type='submit' disabled={sending}>
            {EFindAJoke[language]}
          </button>
        </div>
      </form>

      <div className={`downwards-arrow ${submitted ? 'play' : ''}`}>
        <FaAnglesDown />
      </div>
      <Suspense fallback={<div>{ELoading[language]}...</div>}>
        <Joke
          sending={sending}
          joke={joke}
          delivery={delivery}
          author={author}
          jokeId={jokeId}
          reveal={reveal}
          jokeCategory={jokeCategory}
          setReveal={setReveal}
          handleJokeSave={handleJokeSave}
          language={language}
          visibleJoke={visibleJoke}
          getCategoryInLanguage={getCategoryInLanguage}
          subCategoryResults={subCategoryResults}
          handleBlacklistUpdate={handleBlacklistUpdate}
        />
      </Suspense>
    </>
  )
}

export default Form
