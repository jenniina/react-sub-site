import {
  useState,
  useImperativeHandle,
  forwardRef,
  Ref,
  ReactElement,
  ReactPortal,
  useEffect,
  ReactNode,
} from 'react'
import Icon from '../Icon/Icon'
import { useLanguageContext } from '../../contexts/LanguageContext'

interface accordionProps {
  text: string | ReactNode
  className: string
  children?:
    | string
    | number
    | ReactElement
    | ReactPortal
    | ReactNode
    | null
    | undefined
  isOpen?: boolean
  setIsFormOpen?: (isFormOpen: boolean) => void
  onClick?: () => void
  id?: string
  hideBrackets?: boolean
  showButton?: boolean
  tooltip?: string
  y?: 'above' | 'below'
  x?: 'left' | 'right'
  wrapperClass: string
  closeClass?: string
}

const Accordion = forwardRef(
  (props: accordionProps, ref: Ref<unknown> | undefined) => {
    const { t } = useLanguageContext()

    const [visible, setVisible] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
      if (typeof props.isOpen !== 'boolean') return
      setVisible(props.isOpen)
    }, [props.isOpen])

    useEffect(() => {
      if (visible) props.onClick?.()
    }, [visible, props.onClick])

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
      const anchors = document
        ? document.querySelectorAll(`.${props.wrapperClass}`)
        : []
      if (anchors.length > 0) {
        let closestAnchor: Element | null = null
        let closestDistance = Infinity

        anchors.forEach(anchor => {
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
        className={`${visible ? 'open' : `closed ${props.closeClass}`} ${
          props.className
        }-container accordion-container ${props.wrapperClass}`}
      >
        <button
          type="button"
          className={`${
            props.tooltip ? 'tooltip-wrap' : ''
          } accordion-btn open ${props.className}`}
          onClick={toggleVisibility}
          style={
            visible
              ? { display: 'none' }
              : {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }
          }
        >
          <span aria-hidden="true" className={props.hideBrackets ? 'hide' : ''}>
            &raquo;&nbsp;
          </span>
          <i>{props.text}</i>
          <span aria-hidden="true" className={props.hideBrackets ? 'hide' : ''}>
            &nbsp;&laquo;
          </span>
          <strong
            className={
              props.tooltip ? `tooltip narrow2 ${props.x} ${props.y}` : ''
            }
          >
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
            type="button"
            className={`accordion-btn close`}
            onClick={toggleVisibility}
          >
            <Icon lib="fa6" name="FaAnglesUp" />
            {t('Close')}
          </button>

          {props.children}

          {props.showButton && (
            <button
              type="button"
              className={`accordion-btn close`}
              onClick={scrollToOpenBtn}
            >
              <Icon lib="fa6" name="FaAnglesUp" />
              {t('Close')}
            </button>
          )}
        </div>
      </div>
    )
  }
)

Accordion.displayName = 'Accordion'

export default Accordion
