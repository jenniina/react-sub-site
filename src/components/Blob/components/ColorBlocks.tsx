import { FC, useState } from 'react'
import { ColorPair, Modes, RefObject } from '../interfaces'
import { EChangeColorInstructions } from '../../../interfaces/blobs'
import { ELanguages } from '../../../interfaces'

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
  setMode,
}) => {
  return (
    <>
      {colorBlockProps[d].map((colorBlock, index) => (
        <button
          ref={colorBlock}
          key={`${colorPairs[d][index].color1}${index}-${d}`}
          onClick={() => {
            setMode('changeColor')
            setSelectedColor(
              `linear-gradient(45deg, ${colorPairs[d][index].color1}, ${colorPairs[d][index].color2})`
            )
          }}
          className={`colorblock ${getRefName(
            map[d],
            colorBlock
          )?.toLowerCase()} tooltip-wrap reset ${!controlsVisible ? 'hidden' : ''}`}
          id={`color${index}-${d}`}
          style={{
            background: `linear-gradient(45deg, ${colorPairs[d][index].color1}, ${colorPairs[d][index].color2})`,
            borderRadius: `${
              index < 4
                ? '5rem 6.7rem 6.7rem 5rem / 0.7rem 8.7rem 8.7rem 0.7rem'
                : '6.7rem 5rem 5rem 6.7rem / 8.7rem 0.7rem 0.7rem 8.7rem'
            }`,
          }}
        >
          <span className={`tooltip below ${index < 4 ? 'right' : 'left'}`}>
            {EChangeColorInstructions[language]}
          </span>
        </button>
      ))}
    </>
  )
}

export default ColorBlocks
