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
} from '../interfaces'
import { ELanguages } from '../../../interfaces'

interface Props {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  setJokeCategory: (jokeCategory: ECategory_en) => void
  setQueryValue: (queryValue: string) => void
  setLanguage: (language: ELanguages) => void
  titleSingle: ESingle
  titleTwoPart: ETwoPart
  optionsCategory: (
    enumObj:
      | typeof ECategory_en
      | typeof ECategory_es
      | typeof ECategory_cs
      | typeof ECategory_fr
      | typeof ECategory_pt
      | typeof ECategory_de
  ) => SelectOption[]
  setQuery: (query: string) => void
  categoryLanguages:
    | typeof ECategory_en
    | typeof ECategory_cs
    | typeof ECategory_de
    | typeof ECategory_es
    | typeof ECategory_fr
    | typeof ECategory_pt
  jokeCategoryByLanguage: IJokeCategoryByLanguage
  titleSafe: ESafeTitle
  titleUnsafe: EUnsafeTitle
  titleClickToReveal: EClickToReveal
  query: string
  language: ELanguages
  joke: string
  delivery?: string
  submitted: boolean
  reveal: boolean
  setReveal: (reveal: boolean) => void
  isCheckedSafemode: boolean
  isCheckedEJokeType: boolean
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
}
const Form = ({
  handleFormSubmit,
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
  options,
  submitted,
  isCheckedSafemode,
  isCheckedEJokeType,
  handleToggleChangeSafemode,
  handleToggleChangeEJokeType,
  reveal,
  setReveal,
  handleJokeSave,
  titleSingle,
  titleTwoPart,
  optionsCategory,
  categoryLanguages,
  jokeCategoryByLanguage,
  visibleJoke,
  setVisibleJoke,
}: Props) => {
  const titleLanguageSelect = ESelectALanguage[language]
  const titleCategorySelect = ESelectACategory[language]
  const titleSearchByKeyword = ESearchByKeyword[language]
  const submit = EFindAJoke[language]
  const titleAny = EAny[language]
  const [values, setValues] = useState<SelectOption[]>([
    {
      label: jokeCategoryByLanguage[language].Misc,
      value: ECategory_en.Misc,
    },
  ])

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

  // useEffect(() => {
  // setValues([
  //   {
  //     label: jokeCategoryByLanguage[language].Misc,
  //     value: ECategory_en.Misc,
  //   },
  // ])
  //setJokeCategory(ECategory_en.Misc)
  // }, [language])

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
              className={`${language} safemode`}
              label={`${ESafemodeTitle[language]}: `}
              on={titleSafe}
              off={titleUnsafe}
              handleToggleChange={handleToggleChangeSafemode}
            />

            <ButtonToggle
              isChecked={isCheckedEJokeType}
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

        {/* <Select
        language={language}
          id='jokeType'
          className='jokeType third'
          instructions='Type of joke'
          hide
          options={options(EJokeType)}
          value={
            jokeType === EJokeType.Single
              ? ({
                  value: jokeType,
                  label: 'Single',
                } as SelectOption)
              : ({
                  value: jokeType,
                  label: 'Two-part',
                } as SelectOption)
          }
          onChange={(o) => {
            setEJokeType(o?.value as EJokeType)
          }}
        /> */}

        {categoryLanguages ? (
          <Select
            language={language}
            multiple
            id='jokeCategory'
            className='category'
            instructions={`${titleCategorySelect}:`}
            selectAnOption={titleAny}
            value={values}
            options={optionsCategory(categoryLanguages as any)}
            onChange={(o: SelectOption[]) => {
              setValues(o)
              setJokeCategory(o?.map((s) => s.value).join(',') as ECategory_en)
            }}
          />
        ) : (
          ''
        )}

        {/* <Select
        language={language}
          multiple
          id='jokeCategory'
          className='jokeCategory full'
          instructions='Subject'
          hide
          options={options(ECategory_en)}
          value={jokeCategory.split(',').map((s) => {
            return {
              value: s,
              label: s,
            } as SelectOption
          })}
          onChange={(o) => {
            setJokeCategory(o?.map((s) => s.value).join(',') as ECategory_en)
          }}
        /> */}

        <div className='flex column center'>
          <div className='input-wrap not-required'>
            <label>
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
        reveal={reveal}
        setReveal={setReveal}
        handleJokeSave={handleJokeSave}
        titleClickToReveal={titleClickToReveal}
        language={language}
        visibleJoke={visibleJoke}
      />
    </>
  )
}

export default Form
