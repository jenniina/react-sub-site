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
import { FaAnglesUp } from 'react-icons/fa6'

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
  wrapperClass: string
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
    }
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const scrollToOpenBtn = () => {
    const anchors = document.querySelectorAll(`.${props.wrapperClass}`)
    if (anchors.length > 0) {
      let closestAnchor: Element | null = null
      let closestDistance = Infinity

      anchors.forEach((anchor) => {
        const rect = anchor.getBoundingClientRect()
        const distance = rect.top

        if (distance < 0 && Math.abs(distance) < closestDistance) {
          closestAnchor = anchor
          closestDistance = Math.abs(distance)
        }
      })

      if (closestAnchor) {
        ;(closestAnchor as Element).scrollIntoView({ behavior: 'smooth' })
      }
    }
    toggleVisibility()
  }

  return (
    <div
      id={`${props.id ?? props.className}-container`}
      className={`${visible ? 'open' : 'closed'} ${
        props.className
      }-container accordion-container ${props.wrapperClass}`}
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
          className={`accordion-btn close`}
          onClick={toggleVisibility}
        >
          <FaAnglesUp />
          {EClose[props.language]}
        </button>

        {props.children}

        {props.showButton && (
          <button
            type='button'
            className={`accordion-btn close`}
            onClick={scrollToOpenBtn}
          >
            <FaAnglesUp />
            {EClose[props.language]}
          </button>
        )}
      </div>
    </div>
  )
})

export default Accordion
