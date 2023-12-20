import {
  useState,
  useImperativeHandle,
  forwardRef,
  Ref,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from 'react'

interface accordionProps {
  text: string
  className: string
  children?:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined
  close?: string
}

const Accordion = forwardRef((props: accordionProps, ref: Ref<unknown> | undefined) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
    const anchor = document.querySelector(`#${props.className}-container`)
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div
      id={`${props.className}-container`}
      className={`${visible ? 'open' : 'closed'} ${
        props.className
      }-container accordion-container`}
    >
      <button
        type='button'
        className='accordion-btn open'
        onClick={toggleVisibility}
        style={visible ? { display: 'none' } : { display: 'inline-block' }}
      >
        {props.text}
      </button>

      <div
        className={`accordion-inner ${props.className}`}
        style={visible ? { display: 'block' } : { display: 'none' }}
      >
        <button type='button' className='accordion-btn close' onClick={toggleVisibility}>
          {props.close ?? 'close'}
        </button>

        {props.children}

        <button type='button' className='accordion-btn close' onClick={toggleVisibility}>
          {props.close ?? 'close'}
        </button>
      </div>
    </div>
  )
})

export default Accordion
