import React, { useState, useRef, useEffect, useContext } from 'react'
import { Select, SelectOption } from '../../components/Select/Select'
import FormWrapper from '../../components/FormWrapper/FormWrapper'
import selectStyles from '../../components/Select/select.module.css'
import { ELanguages, RefObject } from '../../types'
import { sendEmail, SelectData } from './services/email'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import Accordion from '../../components/Accordion/Accordion'
import { RiMailSendLine } from 'react-icons/ri'
import { createSelectOptionsFromT } from '../../utils'
import { useLanguageContext } from '../../contexts/LanguageContext'
import { useIsClient, useWindow } from '../../hooks/useSSR'

const issuesArray = [
  'NoIssues',
  'Accessibility',
  'Appearance',
  'Text',
  'Translations',
  'Animation',
  'LightMode',
  'DarkMode',
  'Navigation',
  'Buttons',
  'BlobApp',
  'DragAndDrop',
  'TodoApp',
  'CustomSelect',
  'MultiStepContactForm',
  'JokePage',
  'QuizApp',
  'ComposerPage',
  'HairSalonWebsite',
  'GraphQLSite',
  'Other',
]

const selectOptions = [
  'PleaseSelectAnOption',
  'Blobs',
  'Bubbles',
  'Eyes',
  'DiamondShapes',
  'InvertedTriangles',
  'FourSidedJewels',
  'EightSidedJewels',
  'MusicNotes',
]

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
  const isClient = useIsClient()
  const windowObj = useWindow()

  const { t } = useLanguageContext()

  const options1 = createSelectOptionsFromT(issuesArray, language)

  const options2 = createSelectOptionsFromT(selectOptions, language)

  const [value1, setValue1] = useState<SelectOption[]>([])
  const [value2, setValue2] = useState<SelectOption | undefined>(options2[0])
  const [input, setInput] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [oldLanguage, setOldLanguage] = useState<ELanguages>(language)

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
    setSending(true)
    if (
      data.issues == '' ||
      data.favoriteHero == '' ||
      data.favoriteHero == undefined ||
      data.issues == undefined
    ) {
      setHasClickedSubmit(true)
      dispatch(notify(t('PleaseSelectAnOption'), true, 5))
      setSending(false)
    } else {
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
            setData({
              language: language,
              issues: '',
              favoriteHero: '',
              clarification: '',
              email: '',
            })
            dispatch(notify(t('ThankYouForYourMessage'), false, 8))
          })
        } catch (err: any) {
          setSending(false)
          setError((err as Error).message)
          setShowMessage(true)
          setTimeout(() => {
            setShowMessage(false)
            setError(null)
          }, 10000)
          console.error('error', error, err)
          const message = error
            ? `${t('ThereWasAnErrorSendingTheMessage')}: ${error}`
            : t('ThereWasAnErrorSendingTheMessage')
          if (err.response?.data?.message)
            dispatch(notify(err.response.data.message, true, 8))
          else dispatch(notify(message, true, 12))
          setSending(false)
        }
      }
    }
  }
  useEffect(() => {
    const params = new URLSearchParams(
      windowObj ? windowObj.location.search : ''
    )

    setTimeout(() => {
      if (params.get('survey')) {
        const survey = document?.getElementById('survey')
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
    <>
      {/*  <Helmet prioritizeSeoTags={true}>
        <meta charSet="utf-8" />
        <meta name="author" content="Jenniina Laine" />
        <meta property="og:type" content="website" />

        <title>
          {t("CustomSelect")} | {t("CustomSelectIntro")}
        </title>
        <meta name="description" content={t("CustomSelectIntro")} />
        <link
          rel="canonical"
          href={`https://react.jenniina.fi/portfolio/select`}
        />
        <meta
          property="og:title"
          content={`${t("CustomSelect")} | ${t("CustomSelectIntro")}`}
        />
        <meta property="og:description" content={t("CustomSelectIntro")} />
        <meta
          property="og:url"
          content={`https://react.jenniina.fi/portfolio/select`}
        />
        <meta property="og:type" content="website" />
      </Helmet> */}
      <div className={`select ${type}`}>
        <div className="inner-wrap">
          <section className="card">
            <div>
              <div className="medium flex column gap">
                <Accordion
                  language={language}
                  text={t('ClickHereToSeeFeatures')}
                  className="features"
                  wrapperClass="features-wrap"
                >
                  <>
                    <h2>{t('Features')}</h2>
                    <ul className="ul">
                      <li>{t('SingleSelectOrMultipleSelect')}</li>
                      <li>{t('MoveToItemWithKeyboardKeys')}</li>
                      <li>
                        {t('LabelCanBeHiddenFromViewButIsStillAccessible')}
                      </li>
                    </ul>
                    <h3>{t('KeyboardUse')}</h3>
                    <ul className="ul">
                      <li>{t('TabToSelectEnterOrSpaceToOpen')}</li>
                      <li>{t('UseUpAndDownArrowKeysToMoveToAnOption')}</li>
                      <li>
                        {t(
                          'AlternativelyMoveToAnItemOnTheListByWritingTheFirstFewLetters'
                        )}
                      </li>
                      <li>{t('SelectOptionWithEnterOrSpace')}</li>
                      <li>
                        {t(
                          'PressTabToMoveToTheSelectedButtonsOrToTheClearButton'
                        )}
                      </li>
                      <li>
                        {t(
                          'PressEscapeToCloseDropdownWithoutSelectingAnOption'
                        )}
                      </li>
                    </ul>
                  </>
                </Accordion>
                <a href="https://github.com/jenniina/react-sub-site/tree/main/src/components/Select">
                  Github
                </a>
                <div className={selectStyles['selects-container']}>
                  <h2>{t('CustomSelect')}</h2>
                  <FormWrapper
                    className="flex gap column"
                    title={t('Survey')}
                    description={t('PleaseOfferSomeFeedback')}
                  >
                    <form
                      ref={form}
                      onSubmit={handleSubmit}
                      id="survey"
                      className="survey-form"
                    >
                      <h3 className="left small margin0 regular">
                        {t('DidYouFindAnyIssuesOnThisSite')}
                      </h3>
                      <Select
                        language={language}
                        multiple
                        required
                        requiredMessage={t('ThisFieldIsRequired')}
                        validated={
                          hasClickedSubmit && value1.length == 0 ? false : true
                        }
                        remove={t('Remove')}
                        clear={t('Clear')}
                        id="multipleselectdropdown"
                        className={selectStyles.prev2}
                        instructions={t('YouMaySelectMultipleOptions')}
                        options={options1}
                        value={value1}
                        onChange={(o: SelectOption[]) => {
                          setValue1(o)
                          setData((prevData: SelectData) => ({
                            ...prevData,
                            issues: (o as SelectOption[] | undefined)
                              ?.map((option: SelectOption) => option.label)
                              .join(', '),
                          }))
                        }}
                      />
                      <h3 className="left small margin0 regular">
                        {t('WhichIntroSectionElementWasYourFavourite')}
                      </h3>
                      <Select
                        language={language}
                        required
                        requiredMessage={t('ThisFieldIsRequired')}
                        validated={
                          hasClickedSubmit && value2?.label == options2[0].label
                            ? false
                            : true
                        }
                        remove={t('Remove')}
                        clear={t('Clear')}
                        id="single"
                        className={`full ${selectStyles.prev}`}
                        instructions={`${t(
                          'KeyboardUseMoveToOptionWithArrowKeysAndSelectByPressingEnterOrSpace'
                        )}`}
                        hide
                        options={options2}
                        value={value2}
                        onChange={o => {
                          setValue2(o)
                          setData(prevData => ({
                            ...prevData,
                            favoriteHero: o?.label,
                          }))
                        }}
                      />
                      <h3 className="left small margin0 regular">
                        {t('ClarificationOrFeedback')}
                      </h3>
                      <div className="full">
                        <label htmlFor="select-clarification">
                          <input
                            id="select-clarification"
                            autoComplete="off"
                            type="text"
                            name="clarification"
                            value={input}
                            onChange={e => {
                              setInput(e.target.value)
                              setData(prevData => ({
                                ...prevData,
                                clarification: e.target.value,
                              }))
                            }}
                            className="bg"
                          />
                          <span className="scr">
                            {t('ClarificationOrFeedback')} (
                            {t('Optional').toLowerCase()})
                          </span>
                        </label>
                      </div>
                      <h3 className="left small margin0 regular">
                        {t('Email')} ({t('Optional').toLowerCase()})
                      </h3>
                      <div className="full">
                        <label htmlFor="select-email">
                          <input
                            id="select-email"
                            autoComplete="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => {
                              setEmail(e.target.value)
                              setData(prevData => ({
                                ...prevData,
                                email: e.target.value.trim(),
                              }))
                            }}
                            className="bg"
                          />
                          <span className="scr">
                            {t('Email')} ({t('Optional').toLowerCase()}){' '}
                          </span>
                        </label>
                      </div>
                      <div>
                        <input
                          id="form-gdpr"
                          required
                          type="checkbox"
                          name="gdpr"
                        />
                        <label htmlFor="form-gdpr">
                          <span className="required" aria-hidden="true">
                            *
                          </span>{' '}
                          {t(
                            'ItIsAlrightToSendTheEnteredInformationToJenniina'
                          )}{' '}
                        </label>
                      </div>
                      <button
                        type="submit"
                        disabled={sending}
                        className={`${selectStyles.half} `}
                      >
                        <span>{sending ? t('SendingEmail') : t('Send')}</span>{' '}
                        <RiMailSendLine />
                      </button>
                      {showMessage && (
                        <div
                          aria-live="assertive"
                          style={{
                            fontWeight: 'bold',
                            color: 'inherit',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {error ? error : t('ThankYouForYourMessage')}
                        </div>
                      )}
                    </form>
                  </FormWrapper>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
