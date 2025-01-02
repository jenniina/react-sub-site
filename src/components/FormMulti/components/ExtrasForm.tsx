import { useState, useEffect } from 'react'
import FormWrapper from './FormWrapper'
import styles from '../form.module.css'
import { HEX } from '../types'
import { Select, SelectOption } from '../../Select/Select'
import useLocalStorage from '../../../hooks/useStorage'
import {
  EClarifiedBelow,
  EDarkMode,
  EItIsAlrightToSendTheEnteredInformationToJenniina,
  ELanguages,
  ELightMode,
  EOther,
  EPleaseSelectAnOption,
  EYes,
  EYouMaySelectMultipleOptions,
} from '../../../types'
import {
  EAColorYouLike,
  EAccessibilityIssue,
  EAdditionalInformation,
  EAnyEncouragingWords,
  EAppearanceNeedsWork,
  EClarification,
  EColorPicker,
  EDoYouLikeMyCustomSelects,
  ENoneOfTheseAreRequired,
  ENotReally,
  EOrConstructiveFeedback,
  EWhichModeDoYouPrefer,
} from '../../../types/form'

type ExtrasData = {
  encouragement: string
  color: HEX | string
  dark: string
  light: string
  gdpr: string
  selectmulti: string
  clarification: string
}

type ExtrasFormProps = ExtrasData & {
  updateFields: (fields: Partial<ExtrasData>) => void
  language: ELanguages
}

export default function ExtrasForm({
  encouragement,
  color,
  dark,
  light,
  gdpr,
  selectmulti,
  clarification,
  updateFields,
  language,
}: ExtrasFormProps) {
  const isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  const [values, setValues] = useLocalStorage<SelectOption[]>(
    `${isLocalhost ? 'local-' : ''}multivalues`,
    []
  )

  const options: SelectOption[] = [
    { label: EYes[language], value: EYes[language] },
    { label: EAppearanceNeedsWork[language], value: EAppearanceNeedsWork[language] },
    { label: EAccessibilityIssue[language], value: EAccessibilityIssue[language] },
    {
      label: `${EOther[language]}, ${EClarifiedBelow[language]}`,
      value: EOther[language],
    },
    {
      label: `${ENotReally[language]}, ${EClarifiedBelow[language]}`,
      value: ENotReally[language],
    },
  ]

  useEffect(() => {
    updateFields({
      selectmulti: values
        ?.map((element) => {
          return element?.value
        })
        .join(', '),
    })
  }, [values])

  return (
    <>
      <FormWrapper
        title={EAdditionalInformation[language]}
        description={ENoneOfTheseAreRequired[language]}
      >
        <div className={styles.subfield}>
          <label className='full left' htmlFor='form-encouragement'>
            {EAnyEncouragingWords[language]}
          </label>
          <textarea
            id='form-encouragement'
            className='full'
            autoFocus
            name='encouragement'
            value={encouragement}
            rows={3}
            placeholder={EOrConstructiveFeedback[language]}
            onChange={(e) => updateFields({ encouragement: e.target.value })}
          />
        </div>
        <div className={styles.subfield}>
          <label
            id='label-color'
            className={`left nowrap full ${styles.colorlabel}`}
            htmlFor='form-color2'
          >
            {EAColorYouLike[language]}
          </label>

          <input
            id='form-color2'
            className={`half bg`}
            aria-labelledby='label-color'
            type='text'
            name='color'
            value={color}
            onChange={(e) => updateFields({ color: e.target.value })}
          />
          <label className='scr' htmlFor='form-color'>
            {EAColorYouLike[language]} {EColorPicker[language]}
          </label>
          <input
            id='form-color'
            className={`half`}
            aria-labelledby='label-color'
            type='color'
            name='color'
            value={color}
            onChange={(e) => updateFields({ color: e.target.value })}
          />
        </div>
        <div className={styles.subfield}>
          <label className={`full`}>{EWhichModeDoYouPrefer[language]}</label>
          <label className='nowrap flex gap-half'>
            <span className='radio-span'>
              <input
                id='form-dark'
                type='radio'
                name='mode'
                value={'dark mode'}
                onChange={(e) => updateFields({ dark: e.target.value })}
              />
            </span>{' '}
            {EDarkMode[language]}
          </label>
          <label htmlFor='form-light' className='nowrap flex gap-half'>
            <span className='radio-span'>
              <input
                id='form-light'
                type='radio'
                name='mode'
                value={'light mode'}
                onChange={(e) => {
                  updateFields({ light: e.target.value })
                }}
              />
            </span>{' '}
            {ELightMode[language]}
          </label>
        </div>
        <div className={styles.subfield}>
          <label htmlFor='multiple-hide'>{EDoYouLikeMyCustomSelects[language]}</label>
          <span style={{ position: 'relative', zIndex: '2', width: '100%' }}>
            <Select
              language={language}
              multiple
              id='multiple-hide'
              className={styles.dropdownmultiple}
              instructions={`${EPleaseSelectAnOption[language]}. ${EYouMaySelectMultipleOptions[language]}`}
              hide
              options={options}
              value={values}
              onChange={(o) => {
                setValues(o)
                updateFields({
                  selectmulti: values
                    ?.map((element) => {
                      return element?.value
                    })
                    .join(', '),
                })
              }}
            />
          </span>

          {/* <input
            multiple
            type='hidden'
            className='form-control'
            name={`multipleselect`}
            value={values
              ?.map((element) => {
                return element?.value
              })
              .join(', ')}
            onChange={(e) => {
              updateFields({
                selectmulti: values
                  ?.map((element) => {
                    return element?.value
                  })
                  .join(', '),
              })
            }}
          /> */}
          <label className={`full`}>
            <span>{EClarification[language]}</span>
            <input
              className={`bg`}
              type='text'
              name='clarification'
              onChange={(e) => {
                updateFields({ clarification: e.target.value })
              }}
            />
          </label>
        </div>
        <div>
          <label className='radio-checkbox'>
            <input
              id='form-gdpr'
              required
              type='checkbox'
              name='gdpr'
              value={'gdpr-ok'}
              onChange={(e) => {
                updateFields({ gdpr: e.target.value })
              }}
            />
            <i className='required' aria-hidden='true'>
              *
            </i>{' '}
            {EItIsAlrightToSendTheEnteredInformationToJenniina[language]}{' '}
          </label>
        </div>
      </FormWrapper>
    </>
  )
}
