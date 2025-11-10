import {
  EJokeType,
  IJokeCategoryByLanguage,
  ECategory_en,
  FlagsLanguage,
  TCategoryByLanguages,
  IJoke,
  ECategories,
  EJokeDelivery,
  EJokeSetup,
} from '../types'
import { ELanguages, ELanguagesLong, IUser } from '../../../types'
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import ButtonToggle from '../../ButtonToggle/ButtonToggle'
import Accordion from '../../Accordion/Accordion'
import { Select, SelectOption } from '../../Select/Select'
import { createJoke, initializeJokes } from '../reducers/jokeReducer'
import { notify } from '../../../reducers/notificationReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { v4 as uuidv4 } from 'uuid'
import { initializeUser } from '../../../reducers/authReducer'
import { findUserById } from '../../../reducers/usersReducer'
import { useLanguageContext } from '../../../contexts/LanguageContext'

interface Props {
  userId: IUser['_id']
  language: ELanguages
  optionsCategory: (enumObj: TCategoryByLanguages) => SelectOption[]
  categoryByLanguages: TCategoryByLanguages
  jokeCategoryByLanguage: IJokeCategoryByLanguage
  options: (enumObj: typeof ELanguagesLong) => SelectOption[]
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
  const { t } = useLanguageContext()

  const [languageSubmit, setLanguageSubmit] = useState<ELanguages>(
    ELanguages[language]
  )
  const [jokeType, setJokeType] = useState<EJokeType>(EJokeType.single)
  const [setupTitle, setSetupTitle] = useState<EJokeSetup>(EJokeSetup.en)
  const [deliveryTitle, setDeliveryTitle] = useState<EJokeDelivery>(
    EJokeDelivery.en
  )
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
  const selectAnOption = t('SelectAnOption')
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

  const [flags, setFlags] = useState({
    nsfw: false,
    religious: false,
    political: false,
    racist: false,
    sexist: false,
    explicit: false,
  })

  const handleNewJokeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    const isAnyFlagChecked = Object.values(flags).some(flag => flag)

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
      safe:
        jokeCategory?.value === ECategory_en.Dark || isAnyFlagChecked
          ? false
          : true,
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
      .then(r => {
        dispatch(findUserById(userId as string))
          .then(() => dispatch(initializeUser()))
          .then(() => {
            dispatch(initializeJokes())
            setJoke('')
            setSetup('')
            setDelivery('')
            setSaving(false)
          })
        dispatch(notify(`${t('SavedJoke')}. ${r.message ?? ''}`, false, 8))
      })
      .catch(e => {
        console.error(e)
        setSaving(false)
        if (e.code === 'ERR_BAD_RESPONSE') {
          dispatch(
            notify(
              `${t('Error')}: ${e.response.data.message}. ${t(
                'ReportErrorToAdmin'
              )}`,
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
                `${t('Error')}: ${e.message}. ${t('ReportErrorToAdmin')}`,
                true,
                8
              )
            )
        }
      })
  }

  useEffect(() => {
    isCheckedJokeType
      ? setJokeType(EJokeType.twopart)
      : setJokeType(EJokeType.single)
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
      const selectContainers = document?.querySelectorAll(
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
      text={t('ClickHereToWriteYourOwnJoke')}
      className="submit"
      wrapperClass="submit-wrap"
    >
      <div className="submit-inner">
        <h3>{t('SubmitAJoke')}</h3>
        <p className="textcenter">{t('SubmitAJokeTo')} jenniina.fi</p>
        <p className="textcenter mb3">
          {t('IfTheJokeIsNotPrivateVerificationIsNeeded')}
        </p>
        <form onSubmit={handleNewJokeSubmit} className="form-submit-new">
          <div className="toggle-wrap">
            <ButtonToggle
              isChecked={isCheckedJokeType}
              name="submit-joketype"
              id="submit-joketype"
              hideLabel={false}
              label={`${t('JokeTypeTitle')}: `}
              className={`${language} submit joketype`}
              on={t('TwoPart')}
              off={t('Single')}
              handleToggleChange={handleToggleChangeJokeType}
              equal={true}
            />
            <ButtonToggle
              isChecked={isCheckedPrivate}
              name="submit-private"
              id="submit-private"
              hideLabel={false}
              label={`${t('Privacy')}: `}
              className={`${language} submit private`}
              on={t('Private')}
              off={t('Public')}
              handleToggleChange={handleToggleChangePublic}
              equal={false}
            />
            <ButtonToggle
              isChecked={isCheckedAnonymous}
              name="submit-anonymous"
              id="submit-anonymous"
              hideLabel={false}
              label={`${t('PublishWithNickname')}: `}
              className={`${language} submit anonymous`}
              on={t('Anonymous')}
              off={t('Nickname')}
              handleToggleChange={handleToggleChangeAnonymous}
              equal={false}
            />
          </div>

          {jokeType === EJokeType.single ? (
            <label htmlFor="submit-joke-single-input" className="textarea-wrap">
              <span>{t('Joke')}</span>
              <textarea
                name="joke"
                id="submit-joke-single-input"
                required
                rows={4}
                value={joke}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  setJoke(e.target.value)
                }}
              />
            </label>
          ) : (
            <>
              <div className="input-wrap">
                <label htmlFor="submit-setup-input">
                  <input
                    type="text"
                    id="submit-setup-input"
                    name="setup"
                    required
                    value={setup}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setSetup(e.target.value)
                    }}
                  />
                  <span>{setupTitle}</span>
                </label>
              </div>
              <div className="input-wrap">
                <label htmlFor="submit-delivery-input">
                  <input
                    type="text"
                    id="submit-delivery-input"
                    name="delivery"
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
                id="submit-category-select"
                className="submit"
                instructions={`${t('CategoryTitle')}:`}
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
                id="jokeCategoryNorrisCategories-submit"
                className={`category extras narrow ${
                  hasNorris ? '' : 'hidden'
                }`}
                instructions={`Chuck Norris Category:`}
                selectAnOption={t('Any')}
                value={selectedNorrisCategory}
                options={norrisCategories}
                onChange={o => {
                  setSelectedNorrisCategory(o as SelectOption)
                }}
              />
            </>
          ) : (
            ''
          )}
          <Select
            language={language}
            id="submit-language"
            className="submit narrow"
            instructions={`${t('JokeLanguage')}:`}
            options={options(ELanguagesLong)}
            value={
              language
                ? ({
                    value: ELanguages[languageSubmit],
                    label: ELanguagesLong[languageSubmit],
                  } as SelectOption)
                : undefined
            }
            onChange={o => {
              setLanguageSubmit(o?.value as ELanguages)
            }}
          />

          <fieldset>
            <legend>{t('AddWarningTitle')}</legend>

            <div className="checkbox-wrap">
              <div>
                <input
                  type="checkbox"
                  id="flag-nsfw"
                  name="nsfw"
                  value="nsfw"
                />
                <label htmlFor="flag-nsfw">
                  {FlagsLanguage[language].nsfw}
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="flag-religious"
                  name="religious"
                  value="religious"
                />
                <label htmlFor="flag-religious">
                  {FlagsLanguage[language].religious}
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="flag-political"
                  name="political"
                  value="political"
                />
                <label htmlFor="flag-political">
                  {FlagsLanguage[language].political}
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="flag-racist"
                  name="racist"
                  value="racist"
                />
                <label htmlFor="flag-racist">
                  {FlagsLanguage[language].racist}
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="flag-sexist"
                  name="sexist"
                  value="sexist"
                />
                <label htmlFor="flag-sexist">
                  {FlagsLanguage[language].sexist}
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="flag-explicit"
                  name="explicit"
                  value="explicit"
                />
                <label htmlFor="flag-explicit">
                  {FlagsLanguage[language].explicit}
                </label>
              </div>
            </div>
          </fieldset>
          <p>
            {isCheckedPrivate
              ? t('JokeIsSetToPrivateAndWillOnlyBeSeenByYouAndTheAdministrator')
              : t(
                  'JokeIsSetToPublicAndWillNeedVerificationFromAnAdministrator'
                )}
            <br />
            <br />
            {isCheckedAnonymous
              ? t('PublishAnonymously')
              : t('PublishWithNickname')}
          </p>
          <button
            type="submit"
            className="small"
            disabled={saving}
            id="submit-new-joke"
          >
            {saving ? t('Saving') : isCheckedPrivate ? t('Publish') : t('Send')}
          </button>
        </form>
      </div>
    </Accordion>
  )
}

export default JokeSubmit
