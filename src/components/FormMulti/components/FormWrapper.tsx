import { ReactNode } from 'react'

type FormWrapperProps = {
    title: string
    description: string
    children: ReactNode
}

export function FormWrapper({ title, description, children }: FormWrapperProps) {
    return (
        <>
            <fieldset>
                <legend> {title}
                    <p> {description} </p>
                </legend>
                {children}
            </fieldset>
        </>
    )
}