import { useState, useContext } from 'react'
import FormWrapper from './FormWrapper'
import styles from '../form.module.css'
import { Select, SelectOption } from '../../Select/Select'
import { ELanguages } from '../../../types'
import { LanguageContext } from '../../../contexts/LanguageContext'

type MessageData = {
  email: string
  message: string
  select: string
}

type MessageFormProps = MessageData & {
  updateFields: (fields: Partial<MessageData>) => void
  language: ELanguages
}

export default function MessageForm({
  email,
  message,
  select,
  updateFields,
  language,
}: MessageFormProps) {
  const { t } = useContext(LanguageContext)!

  const options: SelectOption[] = [
    {
      label: t('PleaseSelectAnOption'),
      value: t('None'),
    },
    {
      label: t('Work'),
      value: t('Work'),
    },
    {
      label: t('Personal'),
      value: t('Personal'),
    },
    {
      label: t('Other'),
      value: t('Other'),
    },
  ]

  const [selectsingle, setSelect] = useState<SelectOption | undefined>(options[0])

  return (
    <FormWrapper title='Message' description={t('PleaseSendMeAFewWords')}>
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
              {t('YourEmail')}{' '}
              <i className='required' aria-hidden='true'>
                *
              </i>
            </span>
          </label>
        </div>
      </div>

      <div className={styles.subfield}>
        <label>{t('MessageSubject')}</label>
        <Select
          language={language}
          id='single'
          className={`${styles.dropdownsingle} full`}
          instructions={t('PleaseSelectAnOption')}
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
          {t('Message')}{' '}
          <i className='required' aria-hidden='true'>
            *
          </i>
        </label>
        <textarea
          id='form-message'
          required
          name='message'
          value={message}
          rows={4}
          placeholder={t('LetMeKnowWhatOnYourMind')}
          onChange={(e) => updateFields({ message: e.target.value })}
        />
      </div>
    </FormWrapper>
  )
}
