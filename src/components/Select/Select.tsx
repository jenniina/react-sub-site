import { useEffect, useRef, useState } from 'react'
import styles from './select.module.css'
import { ELanguages, translations as t } from '../../types'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { sanitize } from '../../utils'
// import { v4 as uuidv4 } from 'uuid'

export type SelectOption = {
  label: string
  value: string | number
}

type MultipleSelectProps = {
  multiple: true
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
}

type SingleSelectProps = {
  multiple?: false
  value?: SelectOption | null
  onChange: (value: SelectOption | undefined) => void
}

type SelectProps = {
  instructions: string
  hide?: boolean
  hideDelete?: boolean
  id: string
  className: string
  options: SelectOption[]
  selectAnOption?: string
  language?: ELanguages
  required?: boolean
  requiredMessage?: string
  validated?: boolean
  remove?: string
  clear?: string
  z?: number
  tooltip?: boolean
  y?: string
  x?: string
} & (SingleSelectProps | MultipleSelectProps)

let debounceTimeout: ReturnType<typeof setTimeout>
let searchTerm = ''

export function Select({
  z,
  instructions,
  hide,
  hideDelete,
  id,
  className,
  multiple,
  required,
  validated,
  value,
  onChange,
  options,
  language = ELanguages.en,
  requiredMessage = t['ThisFieldIsRequired'][language] ?? 'This field is required',
  remove = t['Remove'][language] ?? 'remove',
  clear = t['Clear'][language] ?? 'clear',
  selectAnOption = t['PleaseSelectAnOption'][language] ?? 'Select an option',
  tooltip,
  y,
  x,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const showValidationError = required && !validated

  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const handleOutsideClick = (e: Event) => {
    setIsOpen(false)
  }
  const containerRef = useRef<HTMLDivElement>(null)

  useOutsideClick({
    ref: containerRef,
    onOutsideClick: handleOutsideClick,
  })

  const ariaLive = useRef<HTMLLabelElement>(null)

  function clearOptions(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    return multiple ? onChange([]) : onChange(options[0])
  }

  function selectOption(option: SelectOption) {
    let reset: boolean = true
    const cooldown = () => {
      reset = true
    }
    if (multiple) {
      if (value?.some((o) => o.label === option.label) && reset) {
        reset = false
        onChange(value?.filter((o) => o.label !== option.label))
        setTimeout(cooldown, 200)
      } else if (reset) {
        reset = false
        onChange([...value, option])
      }
    } else {
      if (option !== value) onChange(option)
    }
  }

  function isOptionSelected(option: SelectOption) {
    if (multiple) {
      return value?.some((selectedOption) => selectedOption.label === option.label)
    } else {
      return value?.label === option.label
    }
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  useEffect(() => {
    if (
      value &&
      Array.isArray(value) &&
      value[0] &&
      value[0].value === '' &&
      value?.length > 1
    ) {
      const newValue = [...value]
      newValue.shift()
      onChange([...newValue] as SelectOption & SelectOption[])
    }
  }, [value, onChange])

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return
      switch (e.code) {
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (isOpen) selectOption(options[highlightedIndex])
          else setIsOpen(true)
          break
        case 'ArrowUp':
        case 'ArrowDown': {
          e.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            break
          }
          const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1)
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)
          }
          break
        }
        case 'Escape':
          e.preventDefault()
          setIsOpen(false)
          containerRef.current?.blur()
          break
        case 'Tab':
          break
        default:
          e.preventDefault()
          clearTimeout(debounceTimeout)
          searchTerm += e.key
          debounceTimeout = setTimeout(() => {
            searchTerm = ''
          }, 600)
          const searchedOption = options.find((option: SelectOption) => {
            return option?.label.toLowerCase().startsWith(searchTerm)
          })

          if (searchedOption) {
            //selectOption(options[options.indexOf(searchedOption)])
            setHighlightedIndex(options.indexOf(searchedOption))
          }
      }
    }
    containerRef.current?.addEventListener('keydown', keyHandler)

    return () => {
      containerRef.current?.removeEventListener('keydown', keyHandler)
    }
  }, [isOpen, highlightedIndex, options])

  return (
    <div
      className={`${styles['select-container']} select-container ${className} ${
        tooltip ? 'tooltip-wrap' : ''
      }`}
      style={{ zIndex: z }}
    >
      <span
        id={`${id}-instructions`}
        className={`
                ${id}-instructions 
                instructions
                ${styles[`${id}-instructions`]} 
                ${styles.instructions}
                ${hide && tooltip ? `tooltip ${y ?? ''} ${x ?? ''}` : ''}
                ${hide && !tooltip ? styles.scr : ''}`}
      >
        {instructions}
      </span>

      <div
        id={`${id}-container`}
        role='combobox'
        aria-labelledby={`${id}-instructions`}
        aria-controls={id}
        aria-expanded={isOpen}
        aria-activedescendant={`${id}-${highlightedIndex}`}
        ref={containerRef}
        //onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
        className={
          multiple
            ? `${styles.multiple} ${styles.container} multiple container ${
                showValidationError ? styles.error : ''
              }`
            : `${styles.container} container ${showValidationError ? styles.error : ''}`
        }
      >
        <span className={styles.scr} aria-live='polite' ref={ariaLive}></span>
        <span className={`${styles.value} value`}>
          {multiple && value?.length === 1 && value[0].value == '' ? (
            <span>{selectAnOption}</span>
          ) : multiple && value?.length > 0 ? (
            value?.map((v) => (
              <button
                type='button'
                key={`${v.value}`}
                onClick={(e) => {
                  e.stopPropagation()
                  selectOption(v)
                }}
                onKeyUp={(e) => {
                  switch (e.code) {
                    case 'Enter':
                    case ' ':
                      e.preventDefault()
                      setIsOpen(false)
                      selectOption(v)
                      if (ariaLive.current)
                        ariaLive.current.textContent = `removed ${v.label}`
                      setTimeout(() => {
                        if (ariaLive.current) ariaLive.current.textContent = ''
                      }, 500)
                      if (containerRef.current) containerRef.current.focus()
                      break
                    case 'ArrowUp':
                    case 'ArrowDown': {
                      e.preventDefault()
                      if (!isOpen) {
                        setIsOpen(true)
                        break
                      }
                      break
                    }
                    case 'Escape':
                      e.preventDefault()
                      setIsOpen(false)
                      containerRef.current?.blur()
                      break
                    case 'Tab':
                      break
                    default:
                  }
                }}
                className={`${styles['option-btn']} option-btn`}
              >
                {v?.label}
                <span aria-hidden='true' className={`${styles['remove-btn']} remove-btn`}>
                  &times;
                </span>
                <span className={`${styles.scr} scr`}>{remove}</span>
              </button>
            ))
          ) : !multiple ? (
            value?.label
          ) : (
            <span>{selectAnOption}</span>
          )}
        </span>
        {!hideDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              clearOptions(e)
            }}
            className={`${styles['clear-btn']} clear-btn`}
          >
            <span aria-hidden='true'>&times;</span>
            <span className={`${styles.scr} scr`}>{clear}</span>
          </button>
        )}

        <div className={`${styles.caret} caret`}></div>
        <ul
          id={id}
          aria-label='options'
          role='listbox'
          aria-multiselectable={multiple ? 'true' : 'false'}
          aria-expanded={isOpen}
          aria-labelledby={`${id}-instructions`}
          className={`${styles.options} options ${isOpen ? `${styles.show} show` : ''}`}
        >
          {options?.map((option, index) => (
            <li
              role='option'
              aria-selected={isOptionSelected(option) ? 'true' : 'false'}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault() //to stop from occasionally running selectOption(option) twice, immediately unselecting the option
                selectOption(option)
                setIsOpen(false)
              }}
              onPointerEnter={() => setHighlightedIndex(index)}
              key={option.value}
              className={`${styles.option} option ${
                isOptionSelected(option) ? `${styles.selected} selected` : ''
              } ${index === highlightedIndex ? `${styles.highlighted} highlighted` : ''}`}
              // id={`${id}-${(option.label).replace(/\s+/g, '-').toLowerCase().replace(/[^a-zA-Z]/g, '')}-${index}`}
              id={`${id}-${index}-${sanitize(option.value.toString())}`}
              onKeyDown={(e) => {
                if (e.code === 'Enter' || e.code === ' ') {
                  e.preventDefault()
                  selectOption(option)
                  setIsOpen(false)
                } else if (e.code === 'Escape') {
                  e.preventDefault()
                  setIsOpen(false)
                  containerRef.current?.focus()
                }
              }}
            >
              <input
                multiple={multiple ? true : false}
                id={`${id}-${
                  typeof option.label === 'string'
                    ? option?.label
                        ?.replace(/\s+/g, '-')
                        .toLowerCase()
                        .replace(/[^a-zA-Z]/g, '')
                    : ''
                }`}
                type='checkbox'
                className={`${styles.scr} scr`}
                value={option?.label}
                name={`${id}-${
                  typeof option.label === 'string'
                    ? option.label
                        .replace(/\s+/g, '-')
                        .toLowerCase()
                        .replace(/[^a-zA-Z]/g, '')
                    : ''
                }-${index}`}
                checked={isOptionSelected(option) ? true : false}
                readOnly
              />
              <label
                htmlFor={`${id}-${
                  typeof option.label === 'string'
                    ? option.label
                        .replace(/\s+/g, '-')
                        .toLowerCase()
                        .replace(/[^a-zA-Z]/g, '')
                    : ''
                }`}
              >
                {option?.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      {showValidationError && (
        <span className={`${styles['required-message']} required-message`}>
          <span className={styles['caret-up']}></span>
          <span>{requiredMessage}</span>
          <span className={styles['caret-up']}></span>
        </span>
      )}
    </div>
  )
}
