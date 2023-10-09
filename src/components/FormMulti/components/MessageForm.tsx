import { useState, useEffect } from 'react'
import { FormWrapper } from './FormWrapper'
import styles from '../form.module.css'
import { Select, SelectOption } from '../../Select/Select'
import useLocalStorage from '../../../hooks/useStorage'

const options: SelectOption[] = [
  {
    label: 'Please choose a subject',
    value: 'No Subject',
  },
  {
    label: 'Work',
    value: 'Work',
  },
  {
    label: 'Personal',
    value: 'Personal',
  },
  {
    label: 'Other',
    value: 'Other',
  },
]
type MessageData = {
  email: string
  message: string
  select: SelectOption
}

type MessageFormProps = MessageData & {
  updateFields: (fields: Partial<MessageData>) => void
}

export function MessageForm({ email, message, select, updateFields }: MessageFormProps) {
  const [selectsingle, setSelect] = useLocalStorage<SelectOption | undefined>(
    'selectsingle',
    options[0]
  )
  //const [selectsingle, setSelect] = useState<SelectOption | undefined>(options[0])
  // useEffect(() => {
  //     console.log(selectsingle)

  //     return () => {

  //     }
  // }, [selectsingle])

  return (
    <FormWrapper
      title='Message'
      description="Please send me a few words, and I'll respond as soon as I can."
    >
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
              Your Email{' '}
              <i className='required' aria-hidden='true'>
                *
              </i>
            </span>
          </label>
        </div>
      </div>

      <div className={styles.subfield}>
        <label>Message Subject</label>
        <Select
          id='single'
          className={`${styles.dropdownsingle} full`}
          instructions='Please choose an option'
          hide
          options={options}
          value={selectsingle}
          onChange={(e) => {
            setSelect(e)
            updateFields({
              select: e,
            })
          }}
        />
        <input
          type='hidden'
          className='form-control'
          name={`message-subject`}
          value={selectsingle?.label}
        />
      </div>
      <div className={styles.subfield}>
        <label htmlFor='form-message'>
          Message{' '}
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
          placeholder='Let me know what on your mind'
          onChange={(e) => updateFields({ message: e.target.value })}
        />
      </div>
    </FormWrapper>
  )
}
