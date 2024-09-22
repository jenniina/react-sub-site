import { useState, useRef, useEffect } from 'react'
import Hero from '../../components/Hero/Hero'
import { Select, SelectOption } from '../../components/Select/Select'
import FormWrapper from '../../components/FormWrapper/FormWrapper'
import selectStyles from '../../components/Select/select.module.css'
import {
  EAccessibility,
  EAnimation,
  EAppearance,
  EBlobApp,
  EBlobs,
  EBubbles,
  EButtons,
  EClarificationOrFeedback,
  ECustomSelect,
  EDarkMode,
  EDiamondShapes,
  EDragAndDrop,
  EEmail,
  EEyes,
  EFeatures,
  EItIsAlrightToSendTheEnteredInformationToJenniina,
  EKeyboardUse,
  ELanguages,
  ELightMode,
  EMultiStepContactForm,
  ENavigation,
  ENoIssues,
  EOptional,
  EOther,
  EPleaseOfferSomeFeedback,
  EPleaseSelectAnOption,
  ESend,
  ESendingEmail,
  ESurvey,
  EText,
  EThankYouForYourMessage,
  EYouMaySelectMultipleOptions,
  RefObject,
} from '../../interfaces'
import {
  EClear,
  ERemove,
  EThisFieldIsRequired,
  ETranslations,
} from '../../interfaces/select'
import { sendEmail, SelectData } from './services/email'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import Notification from '../../components/Notification/Notification'
import {
  EAlternativelyMoveToAnItemOnTheListByWritingTheFirstFewLetters,
  EDidYouFindAnyIssuesOnThisSite,
  EKeyboardUseMoveToOptionWithArrowKeysAndSelectByPressingEnterOrSpace,
  ELabelCanBeHiddenFromViewButIsStillAccessible,
  EMoveToItemWithKeyboardKeys,
  EPressEscapeToCloseDropdownWithoutSelectingAnOption,
  EPressTabToMoveToTheSelectedButtonsOrToTheClearButton,
  ESelectOptionWithEnterOrSpace,
  ESingleSelectOrMultipleSelect,
  ETabToSelectEnterOrSpaceToOpen,
  EUseUpAndDownArrowKeysToMoveToAnOption,
  EWhichIntroSectionElementWasYourFavourite,
} from '../../interfaces/select'
import { ETodoApp } from '../../components/Todo/interfaces'
import { EThereWasAnErrorSendingTheMessage } from '../../interfaces/form'
import { EClickHereToSeeFeatures } from '../../components/Jokes/interfaces'
import Accordion from '../../components/Accordion/Accordion'

export default function CustomSelectPage({
  heading,
  text,
  type,
  language,
}: {
  heading: string
  text: string
  type: string
  language: ELanguages
}) {
  function createSelectOptions(
    enums: Array<Record<ELanguages, string>>,
    language: ELanguages
  ): SelectOption[] {
    return enums.map((enumObj) => {
      const label = enumObj[language]
      return { label, value: label }
    })
  }

  const options1 = createSelectOptions(
    [
      EAccessibility,
      EAppearance,
      EText,
      EAnimation,
      ELightMode,
      EDarkMode,
      ENavigation,
      EButtons,
      EBlobApp,
      EDragAndDrop,
      ETodoApp,
      ECustomSelect,
      EMultiStepContactForm,
      ETranslations,
      EOther,
      ENoIssues,
    ],
    language
  )

  const options2 = createSelectOptions(
    [EPleaseSelectAnOption, EBlobs, EBubbles, EEyes, EDiamondShapes],
    language
  )

  const [value1, setValue1] = useState<SelectOption[]>([])
  const [value2, setValue2] = useState<SelectOption | undefined>(options2[0])
  const [input, setInput] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const [data, setData] = useState<SelectData>({
    language: language,
    issues: '',
    favoriteHero: '',
    clarification: '',
    email: '',
  })
  const [sending, setSending] = useState(false)
  const [hasClickedSubmit, setHasClickedSubmit] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const [showMessage, setShowMessage] = useState(false)

  const dispatch = useAppDispatch()

  const form = useRef() as RefObject<HTMLFormElement>

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (data.issues == '' || data.favoriteHero == '') {
      setHasClickedSubmit(true)
      dispatch(notify(EPleaseSelectAnOption[language], true, 5))
    } else {
      setSending(true)
      if (form.current) {
        try {
          await sendEmail(data as SelectData).then(() => {
            setValue1([])
            setValue2(options2[0])
            setInput('')
            setSending(false)
            setShowMessage(true)
            setTimeout(() => {
              setShowMessage(false)
            }, 100000)
            setHasClickedSubmit(false)
            dispatch(notify(EThankYouForYourMessage[language], false, 8))
          })
        } catch (err) {
          setSending(false)
          setError((err as Error).message)
          setShowMessage(true)
          setTimeout(() => {
            setShowMessage(false)
            setError(null)
          }, 10000)
          console.error('error', error, err)
          const message = error
            ? `${EThereWasAnErrorSendingTheMessage[language]}: ${error}`
            : EThereWasAnErrorSendingTheMessage[language]
          dispatch(notify(message, true, 12))
          setSending(false)
        }
      }
    }
  }
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    setTimeout(() => {
      if (params.get('survey')) {
        const survey = document.getElementById('survey')
        if (survey) {
          survey.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          })
        }
      }
    }, 1000)
  }, [])

  return (
    <div className={`select ${type}`}>
      <Hero language={language} address='select' heading={heading} text={text} />
      <div className='inner-wrap'>
        <section className='card'>
          <div>
            <div className='medium'>
              <Accordion
                language={language}
                text={EClickHereToSeeFeatures[language]}
                className='features'
              >
                <h2>{EFeatures[language]}</h2>
                <ul className='ul'>
                  <li>{ESingleSelectOrMultipleSelect[language]}</li>
                  <li>{EMoveToItemWithKeyboardKeys[language]}</li>
                  <li>{ELabelCanBeHiddenFromViewButIsStillAccessible[language]}</li>
                </ul>
                <h3>{EKeyboardUse[language]}</h3>
                <ul className='ul'>
                  <li>{ETabToSelectEnterOrSpaceToOpen[language]}</li>
                  <li>{EUseUpAndDownArrowKeysToMoveToAnOption[language]}</li>
                  <li>
                    {
                      EAlternativelyMoveToAnItemOnTheListByWritingTheFirstFewLetters[
                        language
                      ]
                    }
                  </li>
                  <li>{ESelectOptionWithEnterOrSpace[language]}</li>
                  <li>
                    {EPressTabToMoveToTheSelectedButtonsOrToTheClearButton[language]}
                  </li>
                  <li>{EPressEscapeToCloseDropdownWithoutSelectingAnOption[language]}</li>
                </ul>
              </Accordion>
              <div className={selectStyles['selects-container']}>
                <h2>{ECustomSelect[language]}</h2>
                <form ref={form} onSubmit={handleSubmit} id='survey'>
                  <FormWrapper
                    className='flex'
                    title={ESurvey[language]}
                    description={EPleaseOfferSomeFeedback[language]}
                  >
                    <h3 className='left small margin0 regular'>
                      {EDidYouFindAnyIssuesOnThisSite[language]}
                    </h3>
                    <Select
                      language={language}
                      multiple
                      required
                      requiredMessage={EThisFieldIsRequired[language]}
                      validated={hasClickedSubmit && value1.length == 0 ? false : true}
                      remove={ERemove[language]}
                      clear={EClear[language]}
                      id='multipleselectdropdown'
                      className={selectStyles.prev2}
                      instructions={EYouMaySelectMultipleOptions[language]}
                      options={options1}
                      value={value1}
                      onChange={(o) => {
                        setValue1(o)
                        setData((prevData) => ({
                          ...prevData,
                          issues: o
                            ?.map((element) => {
                              return element?.value
                            })
                            .join(', '),
                        }))
                      }}
                    />
                    <h3 className='left small margin0 regular'>
                      {EWhichIntroSectionElementWasYourFavourite[language]}
                    </h3>
                    <Select
                      language={language}
                      required
                      requiredMessage={EThisFieldIsRequired[language]}
                      validated={
                        hasClickedSubmit && value2?.label == options2[0].label
                          ? false
                          : true
                      }
                      remove={ERemove[language]}
                      clear={EClear[language]}
                      id='single'
                      className={`full ${selectStyles.prev}`}
                      instructions={`${EKeyboardUseMoveToOptionWithArrowKeysAndSelectByPressingEnterOrSpace[language]}`}
                      hide
                      options={options2}
                      value={value2}
                      onChange={(o) => {
                        setValue2(o)
                        setData((prevData) => ({
                          ...prevData,
                          favoriteHero: o?.label,
                        }))
                      }}
                    />
                    <h3 className='left small margin0 regular'>
                      {EClarificationOrFeedback[language]}
                    </h3>
                    <div className='full'>
                      <label htmlFor='select-clarification'>
                        <input
                          id='select-clarification'
                          autoComplete='off'
                          type='text'
                          name='clarification'
                          value={input}
                          onChange={(e) => {
                            setInput(e.target.value)
                            setData((prevData) => ({
                              ...prevData,
                              clarification: e.target.value,
                            }))
                          }}
                          className='bg'
                        />
                        <span className='scr'>
                          {EClarificationOrFeedback[language]} (
                          {EOptional[language].toLowerCase()})
                        </span>
                      </label>
                    </div>
                    <h3 className='left small margin0 regular'>
                      {EEmail[language]} ({EOptional[language].toLowerCase()})
                    </h3>
                    <div className='full'>
                      <label htmlFor='select-email'>
                        <input
                          id='select-email'
                          autoComplete='email'
                          type='email'
                          name='email'
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            setData((prevData) => ({
                              ...prevData,
                              email: e.target.value.trim(),
                            }))
                          }}
                          className='bg'
                        />
                        <span className='scr'>
                          {EEmail[language]} ({EOptional[language].toLowerCase()}){' '}
                        </span>
                      </label>
                    </div>
                    <div>
                      <input id='form-gdpr' required type='checkbox' name='gdpr' />
                      <label htmlFor='form-gdpr'>
                        <span className='required' aria-hidden='true'>
                          *
                        </span>{' '}
                        {EItIsAlrightToSendTheEnteredInformationToJenniina[language]}{' '}
                      </label>
                    </div>
                    <button type='submit' className={`${selectStyles.half} `}>
                      {sending ? ESendingEmail[language] : ESend[language]}
                    </button>
                    {showMessage && (
                      <div
                        aria-live='assertive'
                        style={{
                          fontWeight: 'bold',
                          color: 'inherit',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {error ? error : EThankYouForYourMessage[language]}
                      </div>
                    )}
                  </FormWrapper>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
