import React, { FC } from 'react'
import { ColorPair, Modes, RefObject } from '../types'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import Icon from '../../Icon/Icon'

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

  const colorLength = colorBlockProps[d].length

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
        const isLeftSide = index < colorLength / 2
        const slotIndex = index % (colorLength / 2)
        return (
          <button
            ref={colorBlock}
            key={`${colorPairs[d][index].color1}${index}-${d}`}
            onClick={() => handleClick(color)}
            className={`colorblock colorblock${index} ${getRefName(
              map[d],
              colorBlock
            )?.toLowerCase()} tooltip-wrap ${
              !colorsVisible ? 'hidden' : ''
            } ${isActive ? 'active' : ''} ${isLeftSide ? 'left' : 'right'}`}
            id={`color${index}-${d}`}
            style={{
              top: `${colorLength / 2 + 1 + slotIndex * (colorLength / 2 + 3)}%`,
              right: `${!isLeftSide ? '0' : 'unset'}`,
              background: color,
              borderRadius: `${
                isLeftSide
                  ? '5rem 6.7rem 6.7rem 5rem / 0.7rem 8.7rem 8.7rem 0.7rem'
                  : '6.7rem 5rem 5rem 6.7rem / 8.7rem 0.7rem 0.7rem 8.7rem'
              }`,
              ['--full-amount' as string]: colorLength,
            }}
          >
            <i className="color-alert">
              {isLeftSide ? (
                <Icon lib="fa" name="FaArrowLeft" aria-hidden="true" />
              ) : (
                <Icon lib="fa" name="FaArrowRight" aria-hidden="true" />
              )}
              <span className="scr">{t('Active')}</span>
            </i>

            <span
              className={`tooltip narrow2 ${isLeftSide ? 'right' : 'left'}`}
            >
              {t('ChangeColorInstructions')}
            </span>
          </button>
        )
      })}
    </>
  )
}

export default ColorBlocks
