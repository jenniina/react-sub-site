import { ReactNode } from 'react'

interface FormWrapperProps {
  title: string
  description?: string
  className: string
  children: ReactNode
}

export default function FormWrapper({
  title,
  description,
  className,
  children,
}: FormWrapperProps) {
  return (
    <>
      <fieldset className={className}>
        <legend>
          {title}
          {description ? <p> {description} </p> : <></>}
        </legend>
        {children}
      </fieldset>
    </>
  )
}
