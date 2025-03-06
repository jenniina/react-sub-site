import { FC, useContext, useState } from 'react'
import { ColorPair, Modes, RefObject } from '../types'
import { ELanguages } from '../../../types'
import { useOutsideClick } from '../../../hooks/useOutsideClick'
import { LanguageContext } from '../../../contexts/LanguageContext'

interface ColorBlockProps {
  d: number
  language: ELanguages
  controlsVisible: boolean
  colorBlockProps: RefObject<HTMLButtonElement>[][]
  colorPairs: ColorPair[][]
  map: Map<RefObject<HTMLButtonElement>, string>[]
  getRefName: (
    refNameMapping: Map<RefObject<HTMLButtonElement>, string>,
    ref: RefObject<HTMLButtonElement>
  ) => string | undefined
  setSelectedColor: (value: string) => void
  selectedColor: string
  setMode: React.Dispatch<React.SetStateAction<Modes>>
}

const ColorBlocks: FC<ColorBlockProps> = ({
  d,
  language,
  controlsVisible,
  colorBlockProps,
  colorPairs,
  getRefName,
  map,
  setSelectedColor,
  selectedColor,
  setMode,
}) => {
  const { t } = useContext(LanguageContext)!

  const handleClick = (color: string) => {
    if (selectedColor === color) {
      setSelectedColor('')
      setMode('none')
    } else {
      setSelectedColor(color)
      setMode('change-color')
    }
  }
  return (
    <>
      {colorBlockProps[d].map((colorBlock, index) => {
        const { color1, color2 } = colorPairs[d][index]
        const color = `linear-gradient(45deg, ${color1}, ${color2})`
        const isActive = selectedColor === color
        return (
          <button
            ref={colorBlock}
            key={`${colorPairs[d][index].color1}${index}-${d}`}
            onClick={() => handleClick(color)}
            className={`colorblock ${getRefName(
              map[d],
              colorBlock
            )?.toLowerCase()} tooltip-wrap ${!controlsVisible ? 'hidden' : ''} ${
              isActive ? 'active' : ''
            } ${index < 4 ? 'left' : 'right'}`}
            id={`color${index}-${d}`}
            style={{
              top: `${index < 4 ? (index + 1) * 18 : (index + 1 - 4) * 18}%`,
              right: `${index >= 4 ? '0' : 'unset'}`,
              background: color,
              borderRadius: `${
                index < 4
                  ? '5rem 6.7rem 6.7rem 5rem / 0.7rem 8.7rem 8.7rem 0.7rem'
                  : '6.7rem 5rem 5rem 6.7rem / 8.7rem 0.7rem 0.7rem 8.7rem'
              }`,
            }}
          >
            <i className='color-alert'>{t('Active')}</i>

            <span className={`tooltip below ${index < 4 ? 'right' : 'left'}`}>
              {t('ChangeColorInstructions')}
            </span>
          </button>
        )
      })}
    </>
  )
}

export default ColorBlocks
