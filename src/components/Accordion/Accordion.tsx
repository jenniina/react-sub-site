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
  showButton?: boolean
  tooltip?: string
  y?: 'above' | 'below'
  x?: 'left' | 'right'
}

const Accordion = forwardRef((props: accordionProps, ref: Ref<unknown> | undefined) => {
  const [visible, setVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

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
    if (visible) {
      setIsAnimating(true)
      setTimeout(() => {
        setVisible(false)
        setIsAnimating(false)
        if (props.setIsFormOpen) {
          props.setIsFormOpen(false)
        }
      }, 300)
    } else {
      setIsAnimating(true)
      setVisible(true)
      setTimeout(() => {
        setIsAnimating(false)
      })
      if (props.setIsFormOpen) {
        props.setIsFormOpen(true)
      }
      const anchor = document.querySelector(`#${props.className}-container`)
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const scrollToOpenBtn = () => {
    toggleVisibility()
    const anchor = document.querySelector(`.${props.className}-container`)
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      id={`${props.id ?? props.className}-container`}
      className={`${visible ? 'open' : 'closed'} ${
        props.className
      }-container accordion-container`}
    >
      <button
        type='button'
        className={`${props.tooltip ? 'tooltip-wrap' : ''} accordion-btn open ${
          props.className
        }`}
        onClick={toggleVisibility}
        style={
          visible
            ? { display: 'none' }
            : { display: 'flex', alignItems: 'center', justifyContent: 'center' }
        }
      >
        <span aria-hidden='true' className={props.hideBrackets ? 'hide' : ''}>
          &raquo;
        </span>
        <i>&nbsp;{props.text}&nbsp;</i>
        <span aria-hidden='true' className={props.hideBrackets ? 'hide' : ''}>
          &laquo;
        </span>
        <strong className={props.tooltip ? `tooltip ${props.x} ${props.y}` : ''}>
          {props.tooltip}
        </strong>
      </button>

      <div
        className={`accordion-inner ${props.className} ${
          isAnimating ? 'animating' : ''
        } ${visible ? 'open' : 'closed'}`}
        // style={visible ? { display: 'block' } : { display: 'none' }}
      >
        <button
          type='button'
          className={`accordion-btn close ${props.className}`}
          onClick={toggleVisibility}
        >
          <span>&#xFE3D;</span>
          {EClose[props.language]}
        </button>

        {props.children}

        {props.showButton && (
          <button
            type='button'
            className={`accordion-btn close ${props.className}`}
            onClick={scrollToOpenBtn}
          >
            <span>&#xFE3D;</span>
            {EClose[props.language]}
          </button>
        )}
      </div>
    </div>
  )
})

export default Accordion
