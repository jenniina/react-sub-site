import { createRef, FC, useRef, useState } from 'react'
import BlobJS from './components/DragContainer'
import { ELanguages, RefObject } from '../../interfaces'

interface BlobsProps {
  language: ELanguages
}

const Blobs: FC<BlobsProps> = ({ language }) => {
  const containers = Array.from({ length: 2 }, (_, i) => i) // add to length if in need of more blob containers

  const containerRefs = useRef<Record<number, RefObject<HTMLDivElement>>>(
    containers.reduce((acc, container) => {
      acc[container] = createRef<HTMLDivElement>()
      return acc
    }, {} as Record<number, RefObject<HTMLDivElement>>)
  )

  return (
    <>
      {containers.map((container) => (
        <BlobJS
          key={container}
          language={language}
          d={container}
          dragWrapOuter={containerRefs.current[container]}
        />
      ))}
    </>
  )
}

export default Blobs
