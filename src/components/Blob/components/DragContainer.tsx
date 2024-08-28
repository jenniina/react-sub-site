import {
  RefObject,
  Dispatch,
  SetStateAction,
  Dispatch as DispatchReact,
  useRef,
} from 'react'
import { Draggable, focusedBlob, ColorPair } from '../interfaces'
import { ELanguages } from '../../../interfaces'
import DragComponent from './DragComponent'

interface DragComponentProps {
  layer: number
  layerAmount: number
  hiddenLayers: Set<number>
  changeBlobLayer: (draggable: Draggable, layer: number) => void
  paused: boolean
  setPaused: Dispatch<SetStateAction<boolean>>
  prefersReducedMotion: boolean
  language: ELanguages
  dispatch: DispatchReact<any>
  d: number
  items: Draggable[]
  draggables: Draggable[][]
  amountOfBlobs: number
  saveDraggables: () => void
  getPosition: (target: HTMLElement) => void
  dragWrap: RefObject<HTMLDivElement>
  dragWrapOuter: RefObject<HTMLDivElement>
  selectedvalue0: RefObject<HTMLSpanElement>
  stopBlobs: RefObject<HTMLButtonElement>
  disableScrollButton: RefObject<HTMLButtonElement>
  resetBlobs: RefObject<HTMLButtonElement>
  exitApp: RefObject<HTMLDivElement>
  colorBlockYellowLime0: RefObject<HTMLDivElement>
  colorBlockCyanYellow0: RefObject<HTMLDivElement>
  colorBlockCyanPink0: RefObject<HTMLDivElement>
  colorBlockPinkYellow0: RefObject<HTMLDivElement>
  colorBlockOrange: RefObject<HTMLDivElement>
  colorBlockRed: RefObject<HTMLDivElement>
  colorBlockPurple: RefObject<HTMLDivElement>
  colorBlockBlue: RefObject<HTMLDivElement>
  makeLarger0: RefObject<HTMLButtonElement>
  makeSmaller0: RefObject<HTMLButtonElement>
  makeMore0: RefObject<HTMLButtonElement>
  deleteBlob0: RefObject<HTMLButtonElement>
  sliderLightnessInput: RefObject<HTMLInputElement>
  sliderSaturationInput: RefObject<HTMLInputElement>
  sliderHueInput: RefObject<HTMLInputElement>
  getRandomMinMax: (min: number, max: number) => number
  focusedBlob: focusedBlob | null
  setFocusedBlob: Dispatch<SetStateAction<focusedBlob | null>>
  colorIndex: number
  setColorIndex: Dispatch<SetStateAction<number>>
  colorPairs: ColorPair[]
  setScroll: Dispatch<SetStateAction<boolean>>
  scroll: boolean
}

const DragContainer = (props: DragComponentProps) => {
  const sortedDraggables = [...props.items].sort((a, b) => a.layer - b.layer)

  const groupedDraggables = sortedDraggables.reduce((acc, draggable) => {
    if (!acc[draggable.layer]) {
      acc[draggable.layer] = []
    }
    acc[draggable.layer].push(draggable)
    return acc
  }, {} as Record<number, Draggable[]>)

  const layers = Array.from({ length: props.layerAmount }, (_, i) => i)

  const layerRefs = layers.reduce(
    (acc: Record<number, RefObject<HTMLUListElement>>, layer) => {
      acc[layer] = useRef(null)
      return acc
    },
    {} as Record<number, RefObject<HTMLUListElement>>
  )

  return (
    <>
      {layers.map((layer) => (
        <DragComponent
          key={layer}
          layer={layer}
          isCurrentLayer={layer === props.layer}
          changeBlobLayer={props.changeBlobLayer}
          items={groupedDraggables[layer] || []}
          dragUlRef={layerRefs[layer]}
          className={props.hiddenLayers.has(layer) ? 'hidden' : ''}
          paused={props.paused}
          setPaused={props.setPaused}
          prefersReducedMotion={props.prefersReducedMotion}
          language={props.language}
          dispatch={props.dispatch}
          d={props.d}
          amountOfBlobs={props.amountOfBlobs}
          saveDraggables={props.saveDraggables}
          getPosition={props.getPosition}
          colorBlockOrange={props.colorBlockOrange}
          colorBlockRed={props.colorBlockRed}
          colorBlockPurple={props.colorBlockPurple}
          colorBlockBlue={props.colorBlockBlue}
          colorBlockYellowLime0={props.colorBlockYellowLime0}
          colorBlockCyanYellow0={props.colorBlockCyanYellow0}
          colorBlockCyanPink0={props.colorBlockCyanPink0}
          colorBlockPinkYellow0={props.colorBlockPinkYellow0}
          makeLarger0={props.makeLarger0}
          makeSmaller0={props.makeSmaller0}
          makeMore0={props.makeMore0}
          deleteBlob0={props.deleteBlob0}
          dragWrap={props.dragWrap}
          exitApp={props.exitApp}
          selectedvalue0={props.selectedvalue0}
          draggables={props.draggables}
          dragWrapOuter={props.dragWrapOuter}
          stopBlobs={props.stopBlobs}
          disableScrollButton={props.disableScrollButton}
          resetBlobs={props.resetBlobs}
          sliderLightnessInput={props.sliderLightnessInput}
          sliderSaturationInput={props.sliderSaturationInput}
          sliderHueInput={props.sliderHueInput}
          getRandomMinMax={props.getRandomMinMax}
          focusedBlob={props.focusedBlob}
          setFocusedBlob={props.setFocusedBlob}
          colorIndex={props.colorIndex}
          setColorIndex={props.setColorIndex}
          colorPairs={props.colorPairs}
          scroll={props.scroll}
          setScroll={props.setScroll}
        />
      ))}
    </>
  )
}

export default DragContainer
