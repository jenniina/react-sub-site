import { FormEvent, useState, useRef, useEffect, lazy, Suspense, useContext } from 'react'
import { RiMailSendLine } from 'react-icons/ri'
import { useMultistepForm } from './hooks/useMultistepForm'
import { ELanguages, RefObject } from '../../types'
import { FormData, INITIAL_DATA } from './types'
import styles from './form.module.css'
import { sendEmail } from './services/email'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { LanguageContext } from '../../contexts/LanguageContext'

const MessageForm = lazy(() => import('./components/MessageForm'))
const ExtrasForm = lazy(() => import('./components/ExtrasForm'))
const InitialForm = lazy(() => import('./components/InitialForm'))

function FormMulti({ language }: { language: ELanguages }) {
  const { t } = useContext(LanguageContext)!

  const form = useRef() as RefObject<HTMLFormElement>

  const [data, setData] = useState(INITIAL_DATA)
  const [sending, setSending] = useState(false)

  const dispatch = useAppDispatch()

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields }
    })
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } =
    useMultistepForm([
      <Suspense
        fallback={
          <div className='flex center margin0auto textcenter'>{t('ELoading')}...</div>
        }
      >
        <InitialForm
          {...data}
          updateFields={updateFields}
          key={`InitialForm`}
          language={language}
        />
      </Suspense>,
      <Suspense
        fallback={
          <div className='flex center margin0auto textcenter'>{t('ELoading')}...</div>
        }
      >
        <MessageForm
          {...data}
          updateFields={updateFields}
          key={`MessageForm`}
          language={language}
        />
      </Suspense>,
      <Suspense
        fallback={
          <div className='flex center margin0auto textcenter'>{t('ELoading')}...</div>
        }
      >
        <ExtrasForm
          {...data}
          updateFields={updateFields}
          key={`ExtrasForm`}
          language={language}
        />
      </Suspense>,
    ])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!isLastStep) return next()

    if (form.current) {
      try {
        setSending(true)
        await sendEmail(data).then(() => {
          setSending(false)
          goTo(0)
          setData(INITIAL_DATA)
          setShowMessage(true)
          setTimeout(() => {
            setShowMessage(false)
          }, 100000)
          dispatch(notify(t('EThankYouForYourMessage'), false, 8))
        })
      } catch (error) {
        console.error('error', error)
        alert(t('EThereWasAnErrorSendingTheMessage'))
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
        data.email.trim() == '' ||
        data.message == null ||
        data.message.trim() == '')
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
      {language !== ELanguages.fi && language !== ELanguages.en && (
        <p>{t('EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo')}</p>
      )}
      <form ref={form} onSubmit={handleSubmit} aria-labelledby='steps'>
        <span id='steps' className={styles.steps}>
          {t('EContactForm')} {t('EPart')}&nbsp;
          <span>
            {currentStepIndex + 1}&nbsp;/&nbsp;{steps.length}
          </span>
        </span>
        <div className={styles.hiddenform}>
          {isLastStep ? (
            <>
              {' '}
              <Suspense
                fallback={
                  <div className='flex center margin0auto textcenter'>
                    {t('ELoading')}...
                  </div>
                }
              >
                <InitialForm
                  {...data}
                  updateFields={updateFields}
                  language={language}
                  key={`InitialForm2`}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className='flex center margin0auto textcenter'>
                    {t('ELoading')}...
                  </div>
                }
              >
                <MessageForm
                  {...data}
                  updateFields={updateFields}
                  language={language}
                  key={`MessageForm2`}
                />
              </Suspense>
            </>
          ) : (
            ''
          )}
        </div>

        {step}

        <div className={styles.btns} style={{ position: 'relative' }}>
          {!isFirstStep && (
            <button type='button' onClick={back}>
              <span aria-hidden='true'>«</span> {t('EBack')}
            </button>
          )}
          {!isLastStep && (
            <button
              ref={nextButton}
              type='button'
              className={isLastStep ? styles.submit : styles.next}
              onClick={handleNext}
            >
              {sending ? t('ESendingEmail') : t('ENext')}{' '}
              <span aria-hidden='true'>»</span>
            </button>
          )}
          {isLastStep && (
            <button
              className={isLastStep ? styles.submit : styles.next}
              type='submit'
              disabled={sending}
            >
              {sending ? t('ESendingEmail') : t('ESend')} <RiMailSendLine />
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
              {t('EPleaseFillInTheFields')}
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
              {t('EThankYouForYourMessage')}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default FormMulti
