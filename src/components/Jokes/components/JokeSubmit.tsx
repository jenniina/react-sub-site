import {
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
  TCategoryByLanguages,
  EPublic,
  EPrivate,
  ESavedJoke,
  IJoke,
  ECategories,
  EAny,
  EIfTheJokeIsNotPrivateVerificationIsNeeded,
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
  ESaving,
} from '../interfaces'
import {
  ESelectAnOption,
  ESend,
  ELanguages,
  ELanguagesLong,
  IUser,
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
import { findUserById } from '../../../reducers/usersReducer'

interface Props {
  userId: IUser['_id']
  language: ELanguages
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
  const [setupTitle, setSetupTitle] = useState<EJokeSetup>(EJokeSetup.en)
  const [deliveryTitle, setDeliveryTitle] = useState<EJokeDelivery>(EJokeDelivery.en)
  const [joke, setJoke] = useState<string>('')
  const [setup, setSetup] = useState<string>('')
  const [delivery, setDelivery] = useState<string>('')
  const [isCheckedJokeType, setIsCheckedJokeType] = useState(true)
  const [isCheckedPrivate, setIsCheckedPublic] = useState(true)
  const [isCheckedAnonymous, setIsCheckedAnonymous] = useState(false)
  const [jokeCategory, setJokeCategory] = useState<SelectOption | undefined>({
    label: jokeCategoryByLanguage[language].Misc,
    value: ECategory_en.Misc,
  } as SelectOption)
  const selectAnOption = ESelectAnOption[language]
  const [selectedCategory, setSelectedCategory] = useState<ECategories | ''>('')
  const [selectedNorrisCategory, setSelectedNorrisCategory] = useState<
    SelectOption | undefined
  >(norrisCategories[0])
  const [hasNorris, setHasNorris] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const norrisExists = selectedCategory === ECategories.ChuckNorris
    setHasNorris(norrisExists)
  }, [selectedCategory])
  const dispatch = useAppDispatch()

  const handleNewJokeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    const isAnyFlagChecked =
      e.currentTarget.nsfw.checked ||
      e.currentTarget.religious.checked ||
      e.currentTarget.political.checked ||
      e.currentTarget.racist.checked ||
      e.currentTarget.sexist.checked ||
      e.currentTarget.explicit.checked

    let jokeObject

    jokeObject = {
      jokeId: uuidv4(),
      category: (jokeCategory?.value as ECategories) ?? ECategories.Misc,
      subCategories:
        (jokeCategory?.label as ECategories) === ECategories.ChuckNorris
          ? [selectedNorrisCategory?.value as string]
          : [],
      language: languageSubmit,
      type: EJokeType.single,
      user: [userId],
      private: isCheckedPrivate,
      verified: !isCheckedPrivate ? false : true,
      anonymous: isCheckedAnonymous,
      author: userId,
      safe: jokeCategory?.value === ECategory_en.Dark || isAnyFlagChecked ? false : true,
      flags: {
        nsfw: e.currentTarget.nsfw.checked,
        religious: e.currentTarget.religious.checked,
        political: e.currentTarget.political.checked,
        racist: e.currentTarget.racist.checked,
        sexist: e.currentTarget.sexist.checked,
        explicit: e.currentTarget.explicit.checked,
      },
    }

    if (jokeType === EJokeType.single) {
      jokeObject = {
        ...jokeObject,
        joke,
        type: EJokeType.single,
      } as IJoke
    } else {
      jokeObject = {
        ...jokeObject,
        setup,
        delivery,
        type: EJokeType.twopart,
      } as IJoke
    }

    dispatch(createJoke(jokeObject))
      .then((r) => {
        dispatch(findUserById(userId as string))
          .then(() => dispatch(initializeUser()))
          .then(() => {
            dispatch(initializeJokes())
            setJoke('')
            setSetup('')
            setDelivery('')
            setSaving(false)
          })
        dispatch(notify(`${ESavedJoke[language]}. ${r.message ?? ''}`, false, 8))
      })
      .catch((e) => {
        console.error(e)
        setSaving(false)
        if (e.code === 'ERR_BAD_RESPONSE') {
          dispatch(
            notify(
              `${EError[language]}: ${e.response.data.message}. ${EReportErrorToAdmin[language]}`,
              true,
              8
            )
          )
        } else {
          setSaving(false)
          if (e.response?.data?.message)
            dispatch(notify(e.response.data.message, true, 8))
          else
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

  useEffect(() => {
    isCheckedJokeType ? setJokeType(EJokeType.twopart) : setJokeType(EJokeType.single)
  }, [isCheckedJokeType])

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
    setSetupTitle(EJokeSetup[language])
    setDeliveryTitle(EJokeDelivery[language])
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
      wrapperClass='submit-wrap'
    >
      <div className='submit-inner'>
        <h3>{ESubmitAJoke[language]}</h3>
        <p className='textcenter'>{ESubmitAJokeTo[language]} jenniina.fi</p>
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
              on={ETwoPart[language]}
              off={ESingle[language]}
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
              <textarea
                name='joke'
                id='submit-joke-single-input'
                required
                value={joke}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  setJoke(e.target.value)
                }}
              />
            </label>
          ) : (
            <>
              <div className='input-wrap'>
                <label htmlFor='submit-setup-input'>
                  <input
                    type='text'
                    id='submit-setup-input'
                    name='setup'
                    required
                    value={setup}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setSetup(e.target.value)
                    }}
                  />
                  <span>{setupTitle}</span>
                </label>
              </div>
              <div className='input-wrap'>
                <label htmlFor='submit-delivery-input'>
                  <input
                    type='text'
                    id='submit-delivery-input'
                    name='delivery'
                    value={delivery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setDelivery(e.target.value)
                    }}
                    required
                  />
                  <span>{deliveryTitle}</span>
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
                instructions={`${ECategoryTitle[language]}:`}
                selectAnOption={selectAnOption}
                value={jokeCategory}
                options={optionsCategory(categoryByLanguages as any)}
                onChange={(o: SelectOption | undefined) => {
                  setJokeCategory(o)
                  setSelectedCategory(o?.label as ECategories)
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
            {saving
              ? ESaving[language]
              : isCheckedPrivate
              ? EPublish[language]
              : ESend[language]}
          </button>
        </form>
      </div>
    </Accordion>
  )
}

export default JokeSubmit
