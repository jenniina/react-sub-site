{
  /* "Joke submissions are disabled for the forseeable future." */
}
{
  /* <JokeSubmit
            language={language}
            titleTwoPart={titleTwoPart}
            titleSingle={titleSingle}
            optionsCategory={optionsCategory}
            categoryByLanguages={categoryByLanguages}
            jokeCategoryByLanguage={jokeCategoryByLanguage}
            options={options}
            getKeyByValue={getKeyByValue}
          /> */
}
import {
  ECategory_cs,
  ECategory_de,
  ECategory_es,
  ECategory_fr,
  ECategory_pt,
  EJoke,
  EJokeType,
  ESingle,
  ETwoPart,
  IJokeCategoryByLanguage,
  EJokeSetup,
  EJokeDelivery,
  ESubmitAJoke,
  ECategoryTitle,
  ECategory_en,
  FlagsLanguage,
  EAddWarningTitle,
  EJokeTypeTitle,
  ESubmitAJokeTo,
  IJokeSubmissionSingleJSON,
  IJokeSubmissionTwoPartJSON,
} from '../interfaces'
import {
  ESelectAnOption,
  ESend,
  ELanguages,
  ELanguageTitle,
  ELanguagesLong,
} from '../../../interfaces'
import { useEffect, useState } from 'react'
import ButtonToggle from '../../ButtonToggle/ButtonToggle'
import Accordion from '../../Accordion/Accordion'
import { Select, SelectOption } from '../../Select/Select'

interface Props {
  language: ELanguages
  titleTwoPart: ETwoPart
  titleSingle: ESingle
  optionsCategory: (
    enumObj:
      | typeof ECategory_en
      | typeof ECategory_es
      | typeof ECategory_cs
      | typeof ECategory_fr
      | typeof ECategory_pt
      | typeof ECategory_de
  ) => SelectOption[]
  categoryByLanguages:
    | typeof ECategory_en
    | typeof ECategory_cs
    | typeof ECategory_de
    | typeof ECategory_es
    | typeof ECategory_fr
    | typeof ECategory_pt
  jokeCategoryByLanguage: IJokeCategoryByLanguage
  options: (enumObj: typeof ELanguages) => SelectOption[]
  getKeyByValue: (
    enumObj: typeof ELanguages,
    value: ELanguages
  ) => undefined | SelectOption['label']
}
const JokeSubmit = ({
  language,
  titleTwoPart,
  titleSingle,
  optionsCategory,
  categoryByLanguages,
  jokeCategoryByLanguage,
  options,
  getKeyByValue,
}: Props) => {
  const [languageSubmit, setLanguageSubmit] = useState<ELanguages>(
    ELanguages[ELanguagesLong[language]]
  )
  const [jokeType, setJokeType] = useState<EJokeType>(EJokeType.single)
  const [setup, setSetup] = useState<EJokeSetup>(EJokeSetup.en)
  const [delivery, setDelivery] = useState<EJokeDelivery>(EJokeDelivery.en)
  const [isCheckedJokeType, setIsCheckedJokeType] = useState(true)
  const [jokeCategory, setJokeCategory] = useState<SelectOption | undefined>({
    label: jokeCategoryByLanguage[language].Misc,
    value: ECategory_en.Misc,
  } as SelectOption)
  const titleSubmitAJoke = ESubmitAJoke[language]
  const titleCategory = ECategoryTitle[language]
  const titleLanguage = ELanguageTitle[language]
  const titleSubmitAJokeTo = ESubmitAJokeTo[language]
  const selectAnOption = ESelectAnOption[language]

  const handleNewJokeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //const jokeCategory = e.currentTarget.jokeCategory.value
    //const language = e.currentTarget.language.value
    //const jokeType = e.currentTarget.joketype.value
    let jokeObject = {}
    if (jokeType === EJokeType.single) {
      const joke = e.currentTarget.joke.value
      jokeObject = {
        formatVersion: 3,
        joke,
        category: jokeCategory?.value,
        lang: languageSubmit,
        type: jokeType,
        flags: {
          nsfw: e.currentTarget.nsfw.checked,
          religious: e.currentTarget.religious.checked,
          political: e.currentTarget.political.checked,
          racist: e.currentTarget.racist.checked,
          sexist: e.currentTarget.sexist.checked,
          explicit: e.currentTarget.explicit.checked,
        },
      } as IJokeSubmissionSingleJSON
    } else {
      const setup = e.currentTarget.setup.value
      const delivery = e.currentTarget.delivery.value
      jokeObject = {
        formatVersion: 3,
        setup,
        delivery,
        category: jokeCategory?.value,
        lang: languageSubmit,
        type: jokeType,
        flags: {
          nsfw: e.currentTarget.nsfw.checked,
          religious: e.currentTarget.religious.checked,
          political: e.currentTarget.political.checked,
          racist: e.currentTarget.racist.checked,
          sexist: e.currentTarget.sexist.checked,
          explicit: e.currentTarget.explicit.checked,
        },
      } as IJokeSubmissionTwoPartJSON
    }

    //https://v2.jokeapi.dev/submit?dry-run

    postJoke(jokeObject)
  }

  const postJoke = (jokeObject: {}) => {
    fetch(`https://v2.jokeapi.dev/submit?dry-run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jokeObject),
    })
      .then((res: Response) => res.json())
      .then((data) => {
        //console.log(data)
      })
    //console.log(jokeObject)
    //e.currentTarget.reset()
  }

  useEffect(() => {
    isCheckedJokeType ? setJokeType(EJokeType.twopart) : setJokeType(EJokeType.single)
  }, [isCheckedJokeType])

  const handleToggleChangeJokeType = () => {
    setIsCheckedJokeType(!isCheckedJokeType) // Toggle the state when the button is clicked
  }

  useEffect(() => {
    setSetup(EJokeSetup[language])
    setDelivery(EJokeDelivery[language])
  }, [language])

  //?dry-run

  return (
    <Accordion language={language} text={titleSubmitAJoke} className='submit'>
      <h3>{titleSubmitAJoke}</h3>
      <p>
        {titleSubmitAJokeTo} <a href='https://sv443.net/jokeapi/v2/'>JokeAPI</a>
      </p>
      <form onSubmit={handleNewJokeSubmit} className='form-submit-new'>
        <div className='toggle-wrap'>
          <ButtonToggle
            isChecked={isCheckedJokeType}
            name='submit-joketype'
            id='submit-joketype'
            hideLabel={false}
            label={`${EJokeTypeTitle[language]}: `}
            className={`${language} submit joketype`}
            on={titleTwoPart}
            off={titleSingle}
            handleToggleChange={handleToggleChangeJokeType}
            equal={true}
          />
        </div>

        {jokeType === EJokeType.single ? (
          <div className='input-wrap'>
            <label>
              <input type='text' name='joke' id='submit-joke-single-input' required />
              <span>{EJoke[language]}</span>
            </label>
          </div>
        ) : (
          <>
            <div className='input-wrap'>
              <label htmlFor='submit-setup-input'>
                <input type='text' id='submit-setup-input' name='setup' required />
                <span>{setup}</span>
              </label>
            </div>
            <div className='input-wrap'>
              <label htmlFor='submit-delivery'>
                <input type='text' id='submit-delivery-input' name='delivery' required />
                <span>{delivery}</span>
              </label>
            </div>
          </>
        )}

        {categoryByLanguages ? (
          <Select
            language={language}
            id='submit-category-select'
            className='submit'
            instructions={`${titleCategory}:`}
            selectAnOption={selectAnOption}
            value={jokeCategory}
            options={optionsCategory(categoryByLanguages as any)}
            onChange={(o: SelectOption | undefined) => {
              setJokeCategory(o)
            }}
          />
        ) : (
          ''
        )}
        <Select
          language={language}
          id='submit-language'
          className='submit'
          instructions={`${titleLanguage}:`}
          options={options(ELanguages)}
          value={
            language
              ? ({
                  value: ELanguages[ELanguagesLong[languageSubmit]],
                  label: getKeyByValue(ELanguages, languageSubmit),
                } as SelectOption)
              : undefined
          }
          onChange={(o) => {
            setLanguageSubmit(o?.value as ELanguages)
          }}
        />

        <fieldset>
          <legend>{EAddWarningTitle[language]}</legend>

          <div className='checkbox-wrap'>
            <div>
              <input type='checkbox' id='nsfw' name='nsfw' value='nsfw' />
              <label htmlFor='nsfw'>{FlagsLanguage[language].nsfw}</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='flag-religious'
                name='religious'
                value='religious'
              />
              <label htmlFor='religious'>{FlagsLanguage[language].religious}</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='flag-political'
                name='political'
                value='political'
              />
              <label htmlFor='political'>{FlagsLanguage[language].political}</label>
            </div>
            <div>
              <input type='checkbox' id='flag-racist' name='racist' value='racist' />
              <label htmlFor='racist'>{FlagsLanguage[language].racist}</label>
            </div>
            <div>
              <input type='checkbox' id='flag-sexist' name='sexist' value='sexist' />
              <label htmlFor='sexist'>{FlagsLanguage[language].sexist}</label>
            </div>
            <div>
              <input
                type='checkbox'
                id='flag-explicit'
                name='explicit'
                value='explicit'
              />
              <label htmlFor='explicit'>{FlagsLanguage[language].explicit}</label>
            </div>
          </div>
        </fieldset>

        <button type='submit' className='small' id='submit-new-joke'>
          {ESend[language]}
        </button>
      </form>
    </Accordion>
  )
}

export default JokeSubmit
