import Joke from './Joke'
import { Select } from '../../Select/Select'
import { SelectOption } from '../../Select/Select'
import { useEffect, useState } from 'react'
import ButtonToggle from '../../ButtonToggle/ButtonToggle'
import {
  ECategory_en,
  ECategory_cs,
  ECategory_de,
  ECategory_es,
  ECategory_fr,
  ECategory_pt,
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
  ESelectExtraCategories,
  ECategory,
  ECategory_fi,
  TCategoryByLanguages,
  IJoke,
} from '../interfaces'
import { ELanguages } from '../../../interfaces'

interface Props {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  jokeCategory: ECategory | null
  setJokeCategory: (jokeCategory: ECategory_en) => void
  setQueryValue: (queryValue: string) => void
  setLanguage: (language: ELanguages) => void
  titleSingle: ESingle
  titleTwoPart: ETwoPart
  optionsCategory: (enumObj: TCategoryByLanguages) => SelectOption[]
  setQuery: (query: string) => void
  categoryByLanguages: TCategoryByLanguages
  jokeCategoryByLanguage: IJokeCategoryByLanguage
  categoryValues: SelectOption[]
  setCategoryValues: (categoryValues: SelectOption[]) => void
  titleSafe: ESafeTitle
  titleUnsafe: EUnsafeTitle
  titleClickToReveal: EClickToReveal
  query: string
  language: ELanguages
  joke: string
  delivery?: string
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
  options: (
    enumObj: typeof ECategory_en | typeof EJokeType | typeof ESafemode | typeof ELanguages
  ) => SelectOption[]
  getKeyByValue: (
    enumObj:
      | typeof ECategory_en
      | typeof EJokeType
      | typeof ESafemode
      | typeof ELanguages,
    value: ECategory_en | EJokeType | ESafemode | ELanguages
  ) => undefined | SelectOption['label']
  norrisCategories: SelectOption[]
  selectedNorrisCategory: SelectOption | undefined
  setSelectedNorrisCategory: (selectedNorrisCategory: SelectOption | undefined) => void
  hasNorris: boolean
  getCategoryInLanguage: (
    category: ECategory_en,
    language: ELanguages
  ) => string | undefined
  subCategoryResults: string[]
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
  titleSafe,
  titleUnsafe,
  titleClickToReveal,
  joke,
  language,
  query,
  delivery,
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
  titleSingle,
  titleTwoPart,
  optionsCategory,
  categoryByLanguages,
  jokeCategoryByLanguage,
  visibleJoke,
  setVisibleJoke,
  norrisCategories,
  selectedNorrisCategory,
  setSelectedNorrisCategory,
  hasNorris,
  getCategoryInLanguage,
  subCategoryResults,
}: Props) => {
  const titleLanguageSelect = ESelectALanguage[language]
  const titleCategorySelect = ESelectACategory[language]
  const titleSearchByKeyword = ESearchByKeyword[language]
  const submit = EFindAJoke[language]
  const titleAny = EAny[language]

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
            id='language'
            className='language full'
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
              setJokeCategory(ECategory_en.Misc)
            }}
          />

          <div className='toggle-wrap'>
            <ButtonToggle
              isChecked={isCheckedSafemode}
              name='safemode'
              id='safemode'
              className={`${language} ${!isCheckedSafemode ? 'unsafe' : ''} safemode`}
              label={`${ESafemodeTitle[language]}: `}
              on={titleSafe}
              off={titleUnsafe}
              handleToggleChange={handleToggleChangeSafemode}
            />

            <ButtonToggle
              isChecked={isCheckedJokeType}
              name='joketype'
              id='joketype'
              className={`${language} joketype`}
              label={`${EJokeTypeTitle[language]}: `}
              on={titleTwoPart}
              off={titleSingle}
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
            instructions={`${titleCategorySelect}:`}
            selectAnOption={titleAny}
            value={categoryValues}
            options={optionsCategory(categoryByLanguages as any)}
            onChange={(o: SelectOption[]) => {
              setCategoryValues(o)
              setJokeCategory(o?.map((s) => s.value).join(',') as ECategory_en)
            }}
          />
        ) : (
          ''
        )}

        <Select
          language={language}
          id='jokeCategoryNorrisCategories'
          className={`category extras ${hasNorris ? '' : 'hidden'}`}
          instructions={`Chuck Norris Category:`}
          selectAnOption={titleAny}
          value={selectedNorrisCategory}
          options={norrisCategories}
          onChange={(o) => {
            setSelectedNorrisCategory(o as SelectOption)
          }}
        />

        <div className='flex column center'>
          <div className='input-wrap '>
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
              <span>{titleSearchByKeyword}</span>
            </label>
          </div>

          <button id='generate-joke' type='submit'>
            {submit}
          </button>
        </div>
      </form>

      <div className={`downwards-arrow ${submitted ? 'play' : ''}`}>&#10225;</div>

      <Joke
        joke={joke}
        delivery={delivery}
        author={author}
        reveal={reveal}
        jokeCategory={jokeCategory}
        setReveal={setReveal}
        handleJokeSave={handleJokeSave}
        titleClickToReveal={titleClickToReveal}
        language={language}
        visibleJoke={visibleJoke}
        getCategoryInLanguage={getCategoryInLanguage}
        subCategoryResults={subCategoryResults}
      />
    </>
  )
}

export default Form
