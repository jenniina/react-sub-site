import Joke from './Joke'
import { Select } from '../../Select/Select'
import { SelectOption } from '../../Select/Select'
import { useEffect, useState } from 'react'
import ButtonToggle from '../../ButtonToggle/ButtonToggle'
import {
  ELanguages,
  ECategory_en,
  ECategory_cs,
  ECategory_de,
  ECategory_es,
  ECategory_fr,
  ECategory_pt,
  EJokeType,
  ESafemode,
  ESubmit,
  ECategoryTitle,
  ESafeTitle,
  EUnsafeTitle,
  ESingle,
  ETwoPart,
  ESearch,
  EClickToReveal,
  ESelectAnOption,
  IJokeCategoryByLanguage,
  ELanguageTitle,
  ESafemodeTitle,
  EJokeTypeTitle,
} from '../interfaces'

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
  titleSearch: ESearch
  titleClickToReveal: EClickToReveal
  query: string
  submit: ESubmit
  language: ELanguages
  joke: string
  delivery?: string
  submitted: boolean
  reveal: boolean
  setReveal: (reveal: boolean) => void
  selectAnOption: ESelectAnOption
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
  titleSearch,
  titleClickToReveal,
  joke,
  language,
  query,
  submit,
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
  selectAnOption,
  visibleJoke,
  setVisibleJoke,
}: Props) => {
  const [languageTitle, setLanguageTitle] = useState<ELanguageTitle>(
    ELanguageTitle[language]
  )
  const [categoryTitle, setCategoryTitle] = useState<ECategoryTitle>(
    ECategoryTitle[language]
  )
  const [values, setValues] = useState<SelectOption[]>([
    {
      label: jokeCategoryByLanguage[language].Misc,
      value: ECategory_en.Misc,
    },
  ])
  useEffect(() => {
    setTimeout(() => {
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
    setLanguageTitle(ELanguageTitle[language])
    setCategoryTitle(ECategoryTitle[language])
    setValues([
      {
        label: jokeCategoryByLanguage[language].Misc,
        value: ECategory_en.Misc,
      },
    ])
    setJokeCategory(ECategory_en.Misc)
  }, [language])

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
        {/* <Select
          id='safemode'
          className='safemode third'
          instructions='Safe mode'
          hide
          options={options(ESafemode)}
          value={
            safemode === ESafemode.Safe
              ? { value: ESafemode.Safe, label: 'Safe mode' }
              : { value: ESafemode.Unsafe, label: 'Unsafe mode' }
          }
          onChange={(o) => {
            setSafemode(o?.value as ESafemode)
          }}
        /> */}
        <div className='controls-wrap'>
          <Select
            id='language'
            className='language'
            instructions={`${languageTitle}:`}
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
              label={ESafemodeTitle[language]}
              hideLabel
              on={titleSafe}
              off={titleUnsafe}
              handleToggleChange={handleToggleChangeSafemode}
            />

            <ButtonToggle
              isChecked={isCheckedEJokeType}
              name='joketype'
              id='joketype'
              className={`${language} joketype`}
              label={EJokeTypeTitle[language]}
              hideLabel
              on={titleTwoPart}
              off={titleSingle}
              handleToggleChange={handleToggleChangeEJokeType}
              equal={true}
            />
          </div>
        </div>

        {/* <Select
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
            multiple
            id='jokeCategory'
            className='category'
            instructions={`${categoryTitle}:`}
            selectAnOption={selectAnOption}
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
              <span>{titleSearch}</span>
            </label>
          </div>

          <button type='submit'>{submit}</button>
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
