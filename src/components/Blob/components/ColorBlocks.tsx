import React, { FC } from 'react'
import { ColorPair, Modes, RefObject } from '../types'
import { useLanguageContext } from '../../../contexts/LanguageContext'

interface ColorBlockProps {
  d: number
  colorsVisible: boolean
  colorBlockProps: RefObject<HTMLButtonElement>[][]
  colorPairs: ColorPair[][]
  map: Map<RefObject<HTMLButtonElement>, string>[]
  getRefName: (
    refNameMapping: Map<RefObject<HTMLButtonElement>, string>,
    ref: RefObject<HTMLButtonElement>
  ) => string | undefined
  setSelectedColor: (value: string) => void
  selectedColor: string
  mode: Modes
  setMode: React.Dispatch<React.SetStateAction<Modes>>
}

const ColorBlocks: FC<ColorBlockProps> = ({
  d,
  colorsVisible,
  colorBlockProps,
  colorPairs,
  getRefName,
  map,
  setSelectedColor,
  selectedColor,
  mode,
  setMode,
}) => {
  const { t } = useLanguageContext()

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
        const isActive = selectedColor === color && mode === 'change-color'
        const isLeftSide = index < 8
        const slotIndex = index % 8
        return (
          <button
            ref={colorBlock}
            key={`${colorPairs[d][index].color1}${index}-${d}`}
            onClick={() => handleClick(color)}
            className={`colorblock ${getRefName(
              map[d],
              colorBlock
            )?.toLowerCase()} tooltip-wrap ${
              !colorsVisible ? 'hidden' : ''
            } ${isActive ? 'active' : ''} ${isLeftSide ? 'left' : 'right'}`}
            id={`color${index}-${d}`}
            style={{
              top: `${9 + slotIndex * 11}%`,
              right: `${!isLeftSide ? '0' : 'unset'}`,
              background: color,
              borderRadius: `${
                isLeftSide
                  ? '5rem 6.7rem 6.7rem 5rem / 0.7rem 8.7rem 8.7rem 0.7rem'
                  : '6.7rem 5rem 5rem 6.7rem / 8.7rem 0.7rem 0.7rem 8.7rem'
              }`,
            }}
          >
            <i className="color-alert">{t('Active')}</i>

            <span className={`tooltip below ${isLeftSide ? 'right' : 'left'}`}>
              {t('ChangeColorInstructions')}
            </span>
          </button>
        )
      })}
    </>
  )
}

export default ColorBlocks
