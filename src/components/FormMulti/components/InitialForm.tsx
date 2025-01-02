import { ELanguages } from '../../../types'
import {
  EBasicDetails,
  EFirstName,
  ELastName,
  EThisContactFormIsSplitIntoThreeSteps,
} from '../../../types/form'
import FormWrapper from './FormWrapper'

type UserData = {
  firstName: string
  lastName: string
}

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
  language: ELanguages
}

export default function InitialForm({
  firstName,
  lastName,
  updateFields,
  language,
}: UserFormProps) {
  return (
    <FormWrapper
      title={EBasicDetails[language]}
      description={EThisContactFormIsSplitIntoThreeSteps[language]}
    >
      <div className='input-wrap'>
        <label>
          <input
            // autoFocus
            required
            type='text'
            name='firstname'
            value={firstName}
            onChange={(e) => updateFields({ firstName: e.target.value })}
          />
          <span>
            {EFirstName[language]}{' '}
            <i className='required' aria-hidden='true'>
              *
            </i>
          </span>
        </label>
      </div>
      <div className='input-wrap'>
        <label className='drop'>
          <input
            id='form-last-name'
            required
            type='text'
            name='lastname'
            value={lastName}
            onChange={(e) => updateFields({ lastName: e.target.value })}
          />
          <span>
            {ELastName[language]}{' '}
            <i className='required' aria-hidden='true'>
              *
            </i>
          </span>
        </label>
      </div>
    </FormWrapper>
  )
}
