import { FormWrapper } from './FormWrapper'

type UserData = {
    firstName: string
    lastName: string
}

type UserFormProps = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}

export function InitialForm({
    firstName,
    lastName,
    updateFields,
}: UserFormProps) {
    return (
        <FormWrapper
            title='Basic Details'
            description="This contact form is split into three steps for demonstration purposes. Don't worry, it's not too long.">
            <div className='input-wrap'>
                <label><input
                    // autoFocus
                    required
                    type='text'
                    name='firstname'
                    value={firstName}
                    onChange={e => updateFields({ firstName: e.target.value })} /><span >First Name <i className='required' aria-hidden='true' >*</i></span></label>
            </div>
            <div className='input-wrap'>
                <label htmlFor='form-last-name'
                    className='drop'
                >
                    <input id='form-last-name'
                        required
                        type='text'
                        name='lastname'
                        value={lastName}
                        onChange={e => updateFields({ lastName: e.target.value })}
                    /><span >Last Name <i className='required' aria-hidden='true' >*</i></span></label>
            </div>
        </FormWrapper>
    )
}