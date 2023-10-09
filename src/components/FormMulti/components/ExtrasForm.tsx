import { useState, useEffect } from 'react'
import { FormWrapper } from './FormWrapper'
import styles from '../form.module.css'
import { HEX } from '../interfaces'
import { Select, SelectOption } from '../../Select/Select'
import useLocalStorage from '../../../hooks/useStorage'

type ExtrasData = {
  encouragement: string
  color: HEX | string
  dark: string
  light: string
  gdpr: string
  selectmulti: string
}

type ExtrasFormProps = ExtrasData & {
  updateFields: (fields: Partial<ExtrasData>) => void
}

//Keep options outside the export function!
const options: SelectOption[] = [
  { label: 'Yes', value: 'Yes' },
  { label: 'Appearance needs work', value: 'Appearance needs work' },
  { label: 'They have an accessibility issue', value: 'Accessibility issue' },
  { label: 'They have some other issue', value: 'Other issue' },
  { label: 'Not really', value: 'Not really' },
]

export function ExtrasForm({
  encouragement,
  color,
  dark,
  light,
  gdpr,
  selectmulti,
  updateFields,
}: ExtrasFormProps) {
  const [values, setValues] = useLocalStorage<SelectOption[]>('multivalues', [])
  //const [values, setValues] = useState<SelectOption[]>([])

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
        title='Additional information'
        description="Don't worry, none of these are required, but definitely appreciated. Thank you for taking the time to send me a message!"
      >
        <div className={styles.subfield}>
          <label className='full left' htmlFor='form-encouragement'>
            Any encouraging words?
          </label>
          <textarea
            id='form-encouragement'
            className='full'
            autoFocus
            name='encouragement'
            value={encouragement}
            rows={2}
            placeholder='or constructive feedback'
            onChange={(e) => updateFields({ encouragement: e.target.value })}
          />
        </div>
        <div className={styles.subfield}>
          <label
            id='label-color'
            className={`left nowrap full ${styles.colorlabel}`}
            htmlFor='form-color2'
          >
            A Color You Like?
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
            A Color You Like? Color picker
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
          <label className={`full`}>Which mode do you prefer?</label>
          <label className='nowrap'>
            <input
              id='form-dark'
              type='radio'
              name='mode'
              value={'dark mode'}
              onChange={(e) => updateFields({ dark: e.target.value })}
            />{' '}
            Dark Mode
          </label>
          <label htmlFor='form-light' className='nowrap'>
            <input
              id='form-light'
              type='radio'
              name='mode'
              value={'light mode'}
              onChange={(e) => {
                updateFields({ light: e.target.value })
              }}
            />{' '}
            Light Mode
          </label>
        </div>
        <div className={styles.subfield}>
          <label htmlFor='multiple-hide'>Do you like my custom selects?</label>
          <span style={{ position: 'relative', zIndex: '2', width: '100%' }}>
            <Select
              multiple
              id='multiple-hide'
              className={styles.dropdownmultiple}
              instructions='Please select message subject(s)'
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

          <input
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
          />
          <label className={`full`}>
            <span>Clarification</span>
            <input className={`bg`} type='text' name='moreinfo' />
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
            It is alright to send the entered information to Jenniina{' '}
          </label>
        </div>
      </FormWrapper>
    </>
  )
}
