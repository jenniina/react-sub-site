import React from 'react'
import { ColorPair, RefObject } from '../interfaces'
import { EReleaseToChangeColorInstructions } from '../../../interfaces/blobs'
import { ELanguages } from '../../../interfaces'

interface ColorBlockProps {
  d: number
  language: ELanguages
  controlsVisible: boolean
  colorBlockProps: RefObject<HTMLDivElement>[][]
  colorPairs: ColorPair[][]
  map: Map<RefObject<HTMLDivElement>, string>[]
  getRefName: (
    refNameMapping: Map<RefObject<HTMLDivElement>, string>,
    ref: RefObject<HTMLDivElement>
  ) => string | undefined
}

const ColorBlocks: React.FC<ColorBlockProps> = ({
  d,
  language,
  controlsVisible,
  colorBlockProps,
  colorPairs,
  getRefName,
  map,
}) => {
  return (
    <>
      {colorBlockProps[d].map((colorBlock, index) => (
        <div
          ref={colorBlock}
          key={`${colorPairs[d][index].color1}${index}-${d}`}
          className={`colorblock ${getRefName(
            map[d],
            colorBlock
          )?.toLowerCase()} tooltip-wrap ${!controlsVisible ? 'hidden' : ''}`}
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
          <span
            className={`tooltip above ${index < 4 ? 'right' : 'left'}`}
            data-tooltip={EReleaseToChangeColorInstructions[language]}
          ></span>
        </div>
      ))}
    </>
  )
}

export default ColorBlocks
