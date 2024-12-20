import { FC, useState } from 'react'
import { ColorPair, Modes, RefObject } from '../interfaces'
import { EChangeColorInstructions } from '../../../interfaces/blobs'
import { EActive, ELanguages } from '../../../interfaces'
import { useOutsideClick } from '../../../hooks/useOutsideClick'

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
              background: color,
              borderRadius: `${
                index < 4
                  ? '5rem 6.7rem 6.7rem 5rem / 0.7rem 8.7rem 8.7rem 0.7rem'
                  : '6.7rem 5rem 5rem 6.7rem / 8.7rem 0.7rem 0.7rem 8.7rem'
              }`,
            }}
          >
            <i className='color-alert'>{EActive[language]}</i>

            <span className={`tooltip below ${index < 4 ? 'right' : 'left'}`}>
              {EChangeColorInstructions[language]}
            </span>
          </button>
        )
      })}
    </>
  )
}

export default ColorBlocks
