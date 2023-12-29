import { FormEvent, useState, useRef, useEffect } from 'react'
import { MessageForm } from './components/MessageForm'
import { ExtrasForm } from './components/ExtrasForm'
import { useMultistepForm } from './hooks/useMultistepForm'
import { InitialForm } from './components/InitialForm'
import { ELanguages, ESend, EThankYouForYourMessage, RefObject } from '../../interfaces'
import { FormData, INITIAL_DATA } from './interfaces'
import styles from './form.module.css'
import { sendEmail } from './services/email'
import Notification from '../Notification/Notification'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import {
  EBack,
  EContactForm,
  ENext,
  EPart,
  EPleaseFillInTheFields,
  EThereWasAnErrorSendingTheMessage,
} from '../../interfaces/form'
import { EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo } from '../../interfaces/about'

function FormMulti({ language }: { language: ELanguages }) {
  const form = useRef() as RefObject<HTMLFormElement>

  const [data, setData] = useState(INITIAL_DATA)

  const dispatch = useAppDispatch()

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields }
    })
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } =
    useMultistepForm([
      <InitialForm
        {...data}
        updateFields={updateFields}
        key={`InitialForm`}
        language={language}
      />,
      <MessageForm
        {...data}
        updateFields={updateFields}
        key={`MessageForm`}
        language={language}
      />,
      <ExtrasForm
        {...data}
        updateFields={updateFields}
        key={`ExtrasForm`}
        language={language}
      />,
    ])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!isLastStep) return next()

    if (form.current) {
      try {
        await sendEmail(data).then(() => {
          goTo(0)
          setData(INITIAL_DATA)
          setShowMessage(true)
          setTimeout(() => {
            setShowMessage(false)
          }, 100000)
          dispatch(notify(EThankYouForYourMessage[language], false, 8))
        })
      } catch (error) {
        console.log('error', error)
        alert(EThereWasAnErrorSendingTheMessage[language])
      }
    }
  }

  function handleNext() {
    if (
      /*first step with empty fields*/ isFirstStep &&
      (data.firstName == null ||
        data.firstName == '' ||
        data.lastName == null ||
        data.lastName == '')
    ) {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 3000)
    } else if (
      /*middle step with empty fields*/ !isFirstStep &&
      !isLastStep &&
      (data.email == null ||
        data.email == '' ||
        data.message == null ||
        data.message == '')
    ) {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 3000)
    } else {
      next()
    }
  }

  const [showError, setShowError] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const popup = useRef() as RefObject<HTMLDivElement>
  const nextButton = useRef() as RefObject<HTMLButtonElement>

  useEffect(() => {
    if (popup.current == null || nextButton.current == null) return
    popup.current.style.top = `-2em`
    return () => {}
  }, [showError])

  return (
    <div className={styles.wrapper}>
      <p>
        {EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo[language]}
      </p>
      <form ref={form} onSubmit={handleSubmit} aria-labelledby='steps'>
        <label id='steps' className={styles.steps}>
          {EContactForm[language]} {EPart[language]}&nbsp;
          <span>
            {currentStepIndex + 1}&nbsp;/&nbsp;{steps.length}
          </span>
        </label>
        <div className={styles.hiddenform}>
          {isLastStep ? (
            <>
              <InitialForm
                {...data}
                updateFields={updateFields}
                language={language}
                key={`InitialForm2`}
              />
              <MessageForm
                {...data}
                updateFields={updateFields}
                language={language}
                key={`MessageForm2`}
              />
            </>
          ) : (
            ''
          )}
        </div>

        {step}

        <div className={styles.btns} style={{ position: 'relative' }}>
          {!isFirstStep && (
            <button type='button' onClick={back}>
              <span aria-hidden='true'>«</span> {EBack[language]}
            </button>
          )}
          {!isLastStep && (
            <button
              ref={nextButton}
              type='button'
              className={isLastStep ? styles.submit : styles.next}
              onClick={handleNext}
            >
              {ENext[language]} <span aria-hidden='true'>»</span>
            </button>
          )}
          {isLastStep && (
            <button className={isLastStep ? styles.submit : styles.next} type='submit'>
              {ESend[language]} <span aria-hidden='true'>»</span>
            </button>
          )}
          {showError && (
            <div
              ref={popup}
              aria-live='assertive'
              style={{
                position: 'absolute',
                fontWeight: 'bold',
                color: 'inherit',
                letterSpacing: '0.04em',
              }}
            >
              {EPleaseFillInTheFields[language]}
            </div>
          )}
          {showMessage && (
            <div
              ref={popup}
              aria-live='polite'
              style={{
                position: 'absolute',
                top: '-1.4em',
                fontWeight: 'bold',
                color: 'inherit',
                letterSpacing: '0.04em',
              }}
            >
              {EThankYouForYourMessage[language]}
            </div>
          )}
        </div>
      </form>
      <Notification language={language} />
    </div>
  )
}

export default FormMulti
