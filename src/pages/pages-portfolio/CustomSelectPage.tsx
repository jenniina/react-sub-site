import { useState, useRef } from 'react'
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
  EClarifiedBelow,
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
  ENone,
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
  const options1: SelectOption[] = [
    { label: EAccessibility[language], value: EAccessibility[language] },
    { label: EAppearance[language], value: EAppearance[language] },
    { label: EText[language], value: EText[language] },
    { label: EAnimation[language], value: EAnimation[language] },
    { label: ELightMode[language], value: ELightMode[language] },
    { label: EDarkMode[language], value: EDarkMode[language] },
    { label: ENavigation[language], value: ENavigation[language] },
    { label: EButtons[language], value: EButtons[language] },
    { label: EBlobApp[language], value: EBlobApp[language] },
    { label: EDragAndDrop[language], value: EDragAndDrop[language] },
    { label: ETodoApp[language], value: ETodoApp[language] },
    { label: ECustomSelect[language], value: ECustomSelect[language] },
    { label: EMultiStepContactForm[language], value: EMultiStepContactForm[language] },
    {
      label: `${EOther[language]}, ${EClarifiedBelow[language]}`,
      value: `${EOther[language]}, ${EClarifiedBelow[language]}`,
    },
    { label: ENoIssues[language], value: ENoIssues[language] },
  ]
  const options2: SelectOption[] = [
    { label: EPleaseSelectAnOption[language], value: ENone[language] },
    { label: EBlobs[language], value: EBlobs[language] },
    { label: EBubbles[language], value: EBubbles[language] },
    { label: EEyes[language], value: EEyes[language] },
    { label: EDiamondShapes[language], value: EDiamondShapes[language] },
  ]

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
          dispatch(notify('Thank you for your message!', false, 8))
        })
      } catch (error) {
        setSending(false)
        setError((error as Error).message)
        console.log('error', error)
        dispatch(notify('There was an error sending the message!', true, 8))
      }
    }
  }

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
                <form ref={form} onSubmit={handleSubmit}>
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
                      <label>
                        <input
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
                      <label>
                        <input
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
                        {EThankYouForYourMessage[language]}
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
