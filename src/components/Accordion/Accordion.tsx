import {
  useState,
  useImperativeHandle,
  forwardRef,
  Ref,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
} from 'react'
import { EClose, ELanguages } from '../../interfaces'

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
  isOpen?: boolean
  setIsFormOpen?: (isFormOpen: boolean) => void
  language: ELanguages
  onClick?: () => void
  id?: string
  hideBrackets?: boolean
}

const Accordion = forwardRef((props: accordionProps, ref: Ref<unknown> | undefined) => {
  const [visible, setVisible] = useState(false)

  // useEffect(() => {
  //   if (props.isOpen !== undefined) {
  //     setVisible(props.isOpen)
  //     if (props.setIsFormOpen) {
  //       props.setIsFormOpen(props.isOpen)
  //     }
  //   }
  // }, [props.isOpen])

  useEffect(() => {
    setVisible(props.isOpen || false)
    if (props.setIsFormOpen) {
      props.setIsFormOpen(props.isOpen || false)
    }
  }, [props.isOpen])

  useEffect(() => {
    if (visible) props.onClick && props.onClick()
  }, [visible])

  const toggleVisibility = () => {
    setVisible(!visible)
    if (props.setIsFormOpen) {
      props.setIsFormOpen(!visible)
    }
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
      id={`${props.id ?? props.className}-container`}
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
        <span aria-hidden='true' className={props.hideBrackets ? 'hide' : ''}>
          &#xFE3D;
        </span>
        &nbsp;{props.text}&nbsp;
        <span aria-hidden='true' className={props.hideBrackets ? 'hide' : ''}>
          &#xFE3D;
        </span>
      </button>

      <div
        className={`accordion-inner ${props.className}`}
        style={visible ? { display: 'block' } : { display: 'none' }}
      >
        <button type='button' className='accordion-btn close' onClick={toggleVisibility}>
          <span>&#xFE3D;</span>
          {EClose[props.language]}
        </button>

        {props.children}
      </div>
    </div>
  )
})

export default Accordion
