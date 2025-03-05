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
      label: t('EPleaseSelectAnOption'),
      value: t('ENone'),
    },
    {
      label: t('EWork'),
      value: t('EWork'),
    },
    {
      label: t('EPersonal'),
      value: t('EPersonal'),
    },
    {
      label: t('EOther'),
      value: t('EOther'),
    },
  ]

  const [selectsingle, setSelect] = useState<SelectOption | undefined>(options[0])

  return (
    <FormWrapper title='Message' description={t('EPleaseSendMeAFewWords')}>
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
              {t('EYourEmail')}{' '}
              <i className='required' aria-hidden='true'>
                *
              </i>
            </span>
          </label>
        </div>
      </div>

      <div className={styles.subfield}>
        <label>{t('EMessageSubject')}</label>
        <Select
          language={language}
          id='single'
          className={`${styles.dropdownsingle} full`}
          instructions={t('EPleaseSelectAnOption')}
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
          {t('EMessage')}{' '}
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
          placeholder={t('ELetMeKnowWhatOnYourMind')}
          onChange={(e) => updateFields({ message: e.target.value })}
        />
      </div>
    </FormWrapper>
  )
}
