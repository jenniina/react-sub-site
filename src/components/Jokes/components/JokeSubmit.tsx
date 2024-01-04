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
  TCategoryByLanguages,
  EPublic,
  EPrivate,
  ESavedJoke,
  IJoke,
  ECategory,
  ESafemode,
  ESafemodeTitle,
  ESafeTitle,
  EUnsafeTitle,
  EAny,
  EIfTheJokeIsNotPrivateVerificationIsNeeded,
  ENote,
  EJokeIsSetToPrivateAndWillOnlyBeSeenByYouAndTheAdministrator,
  EJokeIsSetToPublicAndWillNeedVerificationFromAnAdministrator,
  EJokeLanguage,
  EAnonymous,
  EPublishWithNickname,
  EPublishAnonymously,
  EPublish,
  EPrivacy,
  EClickHereToWriteYourOwnJoke,
  EReportErrorToAdmin,
} from '../interfaces'
import {
  ESelectAnOption,
  ESend,
  ELanguages,
  ELanguageTitle,
  ELanguagesLong,
  IUser,
  ELanguageSelect,
  ENickname,
  EError,
} from '../../../interfaces'
import { ChangeEvent, useEffect, useState } from 'react'
import ButtonToggle from '../../ButtonToggle/ButtonToggle'
import Accordion from '../../Accordion/Accordion'
import { Select, SelectOption } from '../../Select/Select'
import { createJoke, initializeJokes } from '../reducers/jokeReducer'
import { notify } from '../../../reducers/notificationReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { v4 as uuidv4 } from 'uuid'
import { initializeUser } from '../../../reducers/authReducer'

interface Props {
  userId: IUser['_id']
  language: ELanguages
  titleTwoPart: ETwoPart
  titleSingle: ESingle
  optionsCategory: (enumObj: TCategoryByLanguages) => SelectOption[]
  categoryByLanguages: TCategoryByLanguages
  jokeCategoryByLanguage: IJokeCategoryByLanguage
  options: (enumObj: typeof ELanguages) => SelectOption[]
  getKeyByValue: (
    enumObj: typeof ELanguages,
    value: ELanguages
  ) => undefined | SelectOption['label']
  norrisCategories: SelectOption[]
}
const JokeSubmit = ({
  userId,
  language,
  titleTwoPart,
  titleSingle,
  optionsCategory,
  categoryByLanguages,
  jokeCategoryByLanguage,
  options,
  getKeyByValue,
  norrisCategories,
}: Props) => {
  const [languageSubmit, setLanguageSubmit] = useState<ELanguages>(
    ELanguages[ELanguagesLong[language]]
  )
  const [jokeType, setJokeType] = useState<EJokeType>(EJokeType.single)
  const [setup, setSetup] = useState<EJokeSetup>(EJokeSetup.en)
  const [delivery, setDelivery] = useState<EJokeDelivery>(EJokeDelivery.en)
  const [isCheckedJokeType, setIsCheckedJokeType] = useState(true)
  const [isCheckedPrivate, setIsCheckedPublic] = useState(true)
  const [private_, setPrivate] = useState<EPublic | EPrivate>(EPrivate[language])
  const [anonymous, setAnonymous] = useState<EAnonymous | ENickname>(ENickname[language])
  const [isCheckedAnonymous, setIsCheckedAnonymous] = useState(false)
  const [jokeCategory, setJokeCategory] = useState<SelectOption | undefined>({
    label: jokeCategoryByLanguage[language].Misc,
    value: ECategory_en.Misc,
  } as SelectOption)
  const titleSubmitAJoke = ESubmitAJoke[language]
  const titleCategory = ECategoryTitle[language]
  const titleLanguage = ELanguageTitle[language]
  const titleSubmitAJokeTo = ESubmitAJokeTo[language]
  const selectAnOption = ESelectAnOption[language]
  const [selectedCategory, setSelectedCategory] = useState<ECategory | ''>('')
  const [selectedNorrisCategory, setSelectedNorrisCategory] = useState<
    SelectOption | undefined
  >(norrisCategories[0])
  const [hasNorris, setHasNorris] = useState(false)

  useEffect(() => {
    const norrisExists = selectedCategory === ECategory_en.ChuckNorris
    setHasNorris(norrisExists)
  }, [selectedCategory])
  const dispatch = useAppDispatch()

  const handleNewJokeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isAnyFlagChecked =
      e.currentTarget.nsfw.checked ||
      e.currentTarget.religious.checked ||
      e.currentTarget.political.checked ||
      e.currentTarget.racist.checked ||
      e.currentTarget.sexist.checked ||
      e.currentTarget.explicit.checked

    //const jokeCategory = e.currentTarget.jokeCategory.value
    //const language = e.currentTarget.language.value
    //const jokeType = e.currentTarget.joketype.value
    let jokeObject: IJoke
    if (jokeType === EJokeType.single) {
      const joke = e.currentTarget.joke.value
      jokeObject = {
        jokeId: uuidv4(),
        joke,
        category: (jokeCategory?.value as ECategory_en) ?? ECategory_en.Misc,
        subCategories:
          (jokeCategory?.label as ECategory) === ECategory_en.ChuckNorris
            ? [selectedNorrisCategory?.value as string]
            : [],
        language: languageSubmit,
        type: EJokeType.single,
        user: [userId],
        private: isCheckedPrivate,
        verified: !isCheckedPrivate ? false : true,
        anonymous: isCheckedAnonymous,
        author: userId,
        safe: !(jokeCategory?.value === ECategory_en.Dark || isAnyFlagChecked),
        flags: {
          nsfw: e.currentTarget.nsfw.checked,
          religious: e.currentTarget.religious.checked,
          political: e.currentTarget.political.checked,
          racist: e.currentTarget.racist.checked,
          sexist: e.currentTarget.sexist.checked,
          explicit: e.currentTarget.explicit.checked,
        },
      }
      dispatch(createJoke(jokeObject))
        .then(() => {
          dispatch(initializeUser()).then(() => {
            dispatch(initializeJokes())
          })
          dispatch(notify(`${ESavedJoke[language]}`, false, 8))
        })
        .catch((e) => {
          console.log(e)
          if (e.code === 'ERR_BAD_RESPONSE') {
            dispatch(
              notify(
                `${EError[language]}: ${e.response.data.message}. ${EReportErrorToAdmin[language]}`,
                true,
                8
              )
            )
          } else {
            dispatch(
              notify(
                `${EError[language]}: ${e.message}. ${EReportErrorToAdmin[language]}`,
                true,
                8
              )
            )
          }
        })
    } else {
      const setup = e.currentTarget.setup.value
      const delivery = e.currentTarget.delivery.value
      jokeObject = {
        jokeId: uuidv4(),
        setup,
        delivery,
        language: languageSubmit,
        category: (jokeCategory?.value as ECategory_en) ?? ECategory_en.Misc,
        subCategories:
          (jokeCategory?.label as ECategory) === ECategory_en.ChuckNorris
            ? [selectedNorrisCategory?.value as string]
            : [],
        type: EJokeType.twopart,
        user: [userId],
        private: isCheckedPrivate,
        verified: !isCheckedPrivate ? false : true,
        anonymous: isCheckedAnonymous,
        author: userId,
        safe: !(jokeCategory?.value === ECategory_en.Dark) || !isAnyFlagChecked,
        flags: {
          nsfw: e.currentTarget.nsfw.checked,
          religious: e.currentTarget.religious.checked,
          political: e.currentTarget.political.checked,
          racist: e.currentTarget.racist.checked,
          sexist: e.currentTarget.sexist.checked,
          explicit: e.currentTarget.explicit.checked,
        },
      }

      dispatch(createJoke(jokeObject))
        .then(() => {
          dispatch(initializeUser()).then(() => {
            dispatch(initializeJokes())
          })
          dispatch(notify(`${ESavedJoke[language]}`, false, 8))
        })
        .catch((e) => {
          console.log(e)
          if (e.code === 'ERR_BAD_RESPONSE') {
            dispatch(
              notify(
                `${EError[language]}: ${e.response.data.message}. ${EReportErrorToAdmin[language]}`,
                true,
                8
              )
            )
          } else {
            dispatch(
              notify(
                `${EError[language]}: ${e.message}. ${EReportErrorToAdmin[language]}`,
                true,
                8
              )
            )
          }
        })
    }
  }

  useEffect(() => {
    isCheckedJokeType ? setJokeType(EJokeType.twopart) : setJokeType(EJokeType.single)
  }, [isCheckedJokeType])

  useEffect(() => {
    isCheckedPrivate ? setPrivate(EPrivate[language]) : setPrivate(EPublic[language])
  }, [isCheckedPrivate])

  useEffect(() => {
    isCheckedAnonymous
      ? setAnonymous(EAnonymous[language])
      : setAnonymous(ENickname[language])
  }, [isCheckedAnonymous])

  const handleToggleChangeJokeType = () => {
    setIsCheckedJokeType(!isCheckedJokeType)
  }

  const handleToggleChangePublic = () => {
    setIsCheckedPublic(!isCheckedPrivate)
  }

  const handleToggleChangeAnonymous = () => {
    setIsCheckedAnonymous(!isCheckedAnonymous)
  }

  useEffect(() => {
    setSetup(EJokeSetup[language])
    setDelivery(EJokeDelivery[language])
  }, [language])

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
    <Accordion
      language={language}
      text={EClickHereToWriteYourOwnJoke[language]}
      className='submit'
    >
      <div className='submit-inner'>
        <h3>{titleSubmitAJoke}</h3>
        <p className='textcenter'>{titleSubmitAJokeTo} jenniina.fi</p>
        <p className='textcenter mb3'>
          {EIfTheJokeIsNotPrivateVerificationIsNeeded[language]}
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
            <ButtonToggle
              isChecked={isCheckedPrivate}
              name='submit-private'
              id='submit-private'
              hideLabel={false}
              label={`${EPrivacy[language]}: `}
              className={`${language} submit private`}
              on={EPrivate[language]}
              off={EPublic[language]}
              handleToggleChange={handleToggleChangePublic}
              equal={false}
            />
            <ButtonToggle
              isChecked={isCheckedAnonymous}
              name='submit-anonymous'
              id='submit-anonymous'
              hideLabel={false}
              label={`${EPublishWithNickname[language]}: `}
              className={`${language} submit anonymous`}
              on={EAnonymous[language]}
              off={ENickname[language]}
              handleToggleChange={handleToggleChangeAnonymous}
              equal={false}
            />
          </div>

          {jokeType === EJokeType.single ? (
            <label htmlFor='submit-joke-single-input' className='textarea-wrap'>
              <span>{EJoke[language]}</span>
              <textarea name='joke' id='submit-joke-single-input' required />
            </label>
          ) : (
            <>
              <div className='input-wrap'>
                <label htmlFor='submit-setup-input'>
                  <input type='text' id='submit-setup-input' name='setup' required />
                  <span>{setup}</span>
                </label>
              </div>
              <div className='input-wrap'>
                <label htmlFor='submit-delivery-input'>
                  <input
                    type='text'
                    id='submit-delivery-input'
                    name='delivery'
                    required
                  />
                  <span>{delivery}</span>
                </label>
              </div>
            </>
          )}

          {categoryByLanguages ? (
            <>
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
                  setSelectedCategory(o?.label as ECategory)
                }}
              />
              <Select
                language={language}
                id='jokeCategoryNorrisCategories-submit'
                className={`category extras narrow ${hasNorris ? '' : 'hidden'}`}
                instructions={`Chuck Norris Category:`}
                selectAnOption={EAny[language]}
                value={selectedNorrisCategory}
                options={norrisCategories}
                onChange={(o) => {
                  setSelectedNorrisCategory(o as SelectOption)
                }}
              />
            </>
          ) : (
            ''
          )}
          <Select
            language={language}
            id='submit-language'
            className='submit narrow'
            instructions={`${EJokeLanguage[language]}:`}
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
                <input type='checkbox' id='flag-nsfw' name='nsfw' value='nsfw' />
                <label htmlFor='flag-nsfw'>{FlagsLanguage[language].nsfw}</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  id='flag-religious'
                  name='religious'
                  value='religious'
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
                />
                <label htmlFor='flag-political'>
                  {FlagsLanguage[language].political}
                </label>
              </div>
              <div>
                <input type='checkbox' id='flag-racist' name='racist' value='racist' />
                <label htmlFor='flag-racist'>{FlagsLanguage[language].racist}</label>
              </div>
              <div>
                <input type='checkbox' id='flag-sexist' name='sexist' value='sexist' />
                <label htmlFor='flag-sexist'>{FlagsLanguage[language].sexist}</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  id='flag-explicit'
                  name='explicit'
                  value='explicit'
                />
                <label htmlFor='flag-explicit'>{FlagsLanguage[language].explicit}</label>
              </div>
            </div>
          </fieldset>
          <p>
            {isCheckedPrivate
              ? EJokeIsSetToPrivateAndWillOnlyBeSeenByYouAndTheAdministrator[language]
              : EJokeIsSetToPublicAndWillNeedVerificationFromAnAdministrator[language]}
            <br />
            <br />
            {isCheckedAnonymous
              ? EPublishAnonymously[language]
              : EPublishWithNickname[language]}
          </p>
          <button type='submit' className='small' id='submit-new-joke'>
            {isCheckedPrivate ? EPublish[language] : ESend[language]}
          </button>
        </form>
      </div>
    </Accordion>
  )
}

export default JokeSubmit
