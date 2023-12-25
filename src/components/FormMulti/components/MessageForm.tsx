import { useState, useEffect } from 'react'
import { FormWrapper } from './FormWrapper'
import styles from '../form.module.css'
import { Select, SelectOption } from '../../Select/Select'
import useLocalStorage from '../../../hooks/useStorage'
import { ELanguages, ENone, EOther, EPleaseSelectAnOption } from '../../../interfaces'
import {
  ELetMeKnowWhatOnYourMind,
  EMessage,
  EMessageSubject,
  EPersonal,
  EPleaseSendMeAFewWords,
  EWork,
  EYourEmail,
} from '../../../interfaces/form'

type MessageData = {
  email: string
  message: string
  select: string
}

type MessageFormProps = MessageData & {
  updateFields: (fields: Partial<MessageData>) => void
  language: ELanguages
}

export function MessageForm({
  email,
  message,
  select,
  updateFields,
  language,
}: MessageFormProps) {
  const options: SelectOption[] = [
    {
      label: EPleaseSelectAnOption[language],
      value: ENone[language],
    },
    {
      label: EWork[language],
      value: EWork[language],
    },
    {
      label: EPersonal[language],
      value: EPersonal[language],
    },
    {
      label: EOther[language],
      value: EOther[language],
    },
  ]

  const [selectsingle, setSelect] = useState<SelectOption | undefined>(options[0])

  return (
    <FormWrapper title='Message' description={EPleaseSendMeAFewWords[language]}>
      <div className={styles.subfield} style={{ paddingTop: '4em' }}>
        <div className='input-wrap'>
          <label>
            <input
              id='form-email'
              autoFocus
              required
              type='email'
              name='email'
              value={email}
              onChange={(e) => updateFields({ email: e.target.value })}
            />
            <span>
              {EYourEmail[language]}{' '}
              <i className='required' aria-hidden='true'>
                *
              </i>
            </span>
          </label>
        </div>
      </div>

      <div className={styles.subfield}>
        <label>{EMessageSubject[language]}</label>
        <Select
          language={language}
          id='single'
          className={`${styles.dropdownsingle} full`}
          instructions={EPleaseSelectAnOption[language]}
          hide
          options={options}
          value={selectsingle}
          onChange={(e) => {
            setSelect(e)
            updateFields({
              select: e?.label ?? selectsingle?.label,
            })
          }}
        />
      </div>
      <div className={styles.subfield}>
        <label htmlFor='form-message'>
          {EMessage[language]}{' '}
          <i className='required' aria-hidden='true'>
            *
          </i>
        </label>
        <textarea
          id='form-message'
          required
          name='message'
          value={message}
          rows={3}
          placeholder={ELetMeKnowWhatOnYourMind[language]}
          onChange={(e) => updateFields({ message: e.target.value })}
        />
      </div>
    </FormWrapper>
  )
}
