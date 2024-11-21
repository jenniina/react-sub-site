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
  EEightSidedJewels,
  EEmail,
  EEyes,
  EFeatures,
  EFourSidedJewels,
  EGraphQLSite,
  EHairSalonWebsite,
  EInvertedTriangles,
  EItIsAlrightToSendTheEnteredInformationToJenniina,
  EJokePage,
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
  EQuizApp,
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
import { RiMailSendLine } from 'react-icons/ri'
import { EComposerPage, EMusicNotes } from '../../interfaces/composer'
import { createSelectOptions } from '../../utils'

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
  const issueEnums = [
    ENoIssues,
    EAccessibility,
    EAppearance,
    EText,
    ETranslations,
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
    EJokePage,
    EQuizApp,
    EComposerPage,
    EHairSalonWebsite,
    EGraphQLSite,
    EOther,
  ]

  const enumOptions2 = [
    EPleaseSelectAnOption,
    EBlobs,
    EBubbles,
    EEyes,
    EDiamondShapes,
    EInvertedTriangles,
    EFourSidedJewels,
    EEightSidedJewels,
    EMusicNotes,
  ]

  const options1 = createSelectOptions(issueEnums, language)

  const options2 = createSelectOptions(enumOptions2, language)

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

  useEffect(() => {
    const translateIssues = (issues: string, newLanguage: ELanguages) => {
      const translatedIssues = issues
        .split(', ')
        .map((issue) => {
          const enumObj = issueEnums.find((enumObj) => enumObj[oldLanguage] === issue)
          return enumObj ? enumObj[newLanguage] : issue
        })
        .join(', ')
      return translatedIssues
    }

    setData((prevData) => ({
      ...prevData,
      issues: translateIssues(prevData.issues || '', language),
    }))

    const translateValue1 = (valueArray: SelectOption[], newLanguage: ELanguages) => {
      return valueArray.map((option) => {
        const enumObj = issueEnums.find(
          (enumObj) => enumObj[oldLanguage] === option.label
        )
        return enumObj ? { ...option, label: enumObj[newLanguage] } : option
      })
    }

    const translateValue2 = (
      value: SelectOption | undefined,
      newLanguage: ELanguages
    ) => {
      if (value) {
        const enumObj = enumOptions2.find(
          (enumObj) => enumObj[oldLanguage] === value.label
        )
        return enumObj ? { ...value, label: enumObj[newLanguage] } : value
      }
      return value
    }

    setValue1((prevValue1) => translateValue1(prevValue1, language))
    setValue2((prevValue2) => translateValue2(prevValue2, language))
    setTimeout(() => {
      setOldLanguage(language)
    }, 1000)
  }, [language])

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
      dispatch(notify(EPleaseSelectAnOption[language], true, 5))
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
            dispatch(notify(EThankYouForYourMessage[language], false, 8))
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
            ? `${EThereWasAnErrorSendingTheMessage[language]}: ${error}`
            : EThereWasAnErrorSendingTheMessage[language]
          if (err.response?.data?.message)
            dispatch(notify(err.response.data.message, true, 8))
          else dispatch(notify(message, true, 12))
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
            <div className='medium flex column gap'>
              <Accordion
                language={language}
                text={EClickHereToSeeFeatures[language]}
                className='features'
                wrapperClass='features-wrap'
              >
                <>
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
                    <li>
                      {EPressEscapeToCloseDropdownWithoutSelectingAnOption[language]}
                    </li>
                  </ul>
                </>
              </Accordion>
              <a href='https://github.com/jenniina/react-sub-site/tree/main/src/components/Select'>
                Github
              </a>
              <div className={selectStyles['selects-container']}>
                <h2>{ECustomSelect[language]}</h2>
                <FormWrapper
                  className='flex gap column'
                  title={ESurvey[language]}
                  description={EPleaseOfferSomeFeedback[language]}
                >
                  <form
                    ref={form}
                    onSubmit={handleSubmit}
                    id='survey'
                    className='survey-form'
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
                    <button
                      type='submit'
                      disabled={sending}
                      className={`${selectStyles.half} `}
                    >
                      <span>{sending ? ESendingEmail[language] : ESend[language]}</span>{' '}
                      <RiMailSendLine />
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
                  </form>
                </FormWrapper>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
