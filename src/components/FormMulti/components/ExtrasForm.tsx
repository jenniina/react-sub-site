import { useState, useEffect, useContext } from 'react'
import FormWrapper from './FormWrapper'
import styles from '../form.module.css'
import { HEX } from '../types'
import { Select, SelectOption } from '../../Select/Select'
import useLocalStorage from '../../../hooks/useStorage'
import { ELanguages } from '../../../types'
import { LanguageContext } from '../../../contexts/LanguageContext'

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
  const { t } = useContext(LanguageContext)!

  const [values, setValues] = useLocalStorage<SelectOption[]>(`multivalues`, [])

  const options: SelectOption[] = [
    { label: t('EYes'), value: t('EYes') },
    { label: t('EAppearanceNeedsWork'), value: t('EAppearanceNeedsWork') },
    { label: t('EAccessibilityIssue'), value: t('EAccessibilityIssue') },
    {
      label: `${t('EOther')}, ${t('EClarifiedBelow')}`,
      value: t('EOther'),
    },
    {
      label: `${t('ENotReally')}, ${t('EClarifiedBelow')}`,
      value: t('ENotReally'),
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
        title={t('EAdditionalInformation')}
        description={t('ENoneOfTheseAreRequired')}
      >
        <div className={styles.subfield}>
          <label className='full left' htmlFor='form-encouragement'>
            {t('EAnyEncouragingWords')}
          </label>
          <textarea
            id='form-encouragement'
            className='full'
            autoFocus
            name='encouragement'
            value={encouragement}
            rows={3}
            placeholder={t('EOrConstructiveFeedback')}
            onChange={(e) => updateFields({ encouragement: e.target.value })}
          />
        </div>
        <div className={styles.subfield}>
          <label
            id='label-color'
            className={`left nowrap full ${styles.colorlabel}`}
            htmlFor='form-color2'
          >
            {t('EAColorYouLike')}
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
            {t('EAColorYouLike')} {t('EColorPicker')}
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
          <label className={`full`}>{t('EWhichModeDoYouPrefer')}</label>
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
            {t('EDarkMode')}
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
            {t('ELightMode')}
          </label>
        </div>
        <div className={styles.subfield}>
          <label htmlFor='multiple-hide'>{t('EDoYouLikeMyCustomSelects')}</label>
          <span style={{ position: 'relative', zIndex: '2', width: '100%' }}>
            <Select
              language={language}
              multiple
              id='multiple-hide'
              className={styles.dropdownmultiple}
              instructions={`${t('EPleaseSelectAnOption')}. ${t(
                'EYouMaySelectMultipleOptions'
              )}`}
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
            <span>{t('EClarification')}</span>
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
            {t('EItIsAlrightToSendTheEnteredInformationToJenniina')}{' '}
          </label>
        </div>
      </FormWrapper>
    </>
  )
}
