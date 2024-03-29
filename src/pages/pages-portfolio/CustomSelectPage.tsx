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
import { ETranslations } from '../../interfaces/select'
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

  const [data, setData] = useState({})
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [showMessage, setShowMessage] = useState(false)

  const dispatch = useAppDispatch()

  const form = useRef() as RefObject<HTMLFormElement>
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
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
          dispatch(notify(EThankYouForYourMessage[language], false, 8))
        })
      } catch (error) {
        setSending(false)
        setError((error as Error).message)
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
          setError(null)
        }, 10000)
        console.error('error', error)
        dispatch(notify(EThereWasAnErrorSendingTheMessage[language], true, 8))
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
                <li>{EPressTabToMoveToTheSelectedButtonsOrToTheClearButton[language]}</li>
                <li>{EPressEscapeToCloseDropdownWithoutSelectingAnOption[language]}</li>
              </ul>
              <div className={selectStyles['selects-container']}>
                <h3>{ECustomSelect[language]}</h3>
                <form ref={form} onSubmit={handleSubmit} id='survey'>
                  <FormWrapper
                    className='flex'
                    title={ESurvey[language]}
                    description={EPleaseOfferSomeFeedback[language]}
                  >
                    <h4 className='left small margin0 regular'>
                      {EDidYouFindAnyIssuesOnThisSite[language]}
                    </h4>
                    <Select
                      language={language}
                      multiple
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
                    <h4 className='left small margin0 regular'>
                      {EWhichIntroSectionElementWasYourFavourite[language]}
                    </h4>
                    <Select
                      language={language}
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
                    <h4 className='left small margin0 regular'>
                      {EClarificationOrFeedback[language]}
                    </h4>
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
                    <h4 className='left small margin0 regular'>
                      {EEmail[language]} ({EOptional[language].toLowerCase()})
                    </h4>
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
                              email: e.target.value,
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
        <section>
          <div>
            <h2>Codesandbox</h2>
            <iframe
              src='https://codesandbox.io/embed/custom-select-multi-and-single-n5nhwo?fontsize=14&hidenavigation=1&theme=dark'
              style={{
                width: '100%',
                height: '400px',
                border: '0',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
              title='Custom Select Multi and Single'
              allow='accelerometer;camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb;xr-spatial-tracking' // ambient-light-sensor; vr;
              sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'
            ></iframe>
          </div>
        </section>
      </div>
      <Notification language={language} />
    </div>
  )
}
