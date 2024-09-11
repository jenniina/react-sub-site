import { BackgroundColor, Draggable } from '../interfaces'
import { ReducerProps } from '../interfaces'

const initialState: ReducerProps['blob'] = {
  draggables: [] as Draggable[][],
  dragItemList: [] as Draggable[],
  highestBlobNumber: 0,
  hasBeenMadeFromStorage: false,
  backgroundColor: ['30', '80', '214'] as BackgroundColor[],
}

function blobReducer(
  state = initialState,
  action: {
    type: any
    payload: {
      d: number
      draggables?: Draggable[][]
      draggable?: Draggable | null
      id?: string
      backgroundColor?: BackgroundColor[]
    }
  }
) {
  if (!action) {
    return state
  }
  const amount = 6

  switch (action.type) {
    case 'setDraggables':
      return { ...state, draggables: action.payload }
    case 'setDraggablesAtD':
      return {
        ...state,
        draggables: state.draggables.map((draggables, index) =>
          index === action.payload.d ? action.payload.draggables : draggables
        ),
      }
    case 'addDraggable':
      const newDraggablesAdd = [...state.draggables]
      if (!newDraggablesAdd[action.payload.d]) {
        newDraggablesAdd[action.payload.d] = []
      }
      if (action.payload.draggable) {
        const draggableExists = newDraggablesAdd[action.payload.d].some(
          (draggable) => draggable.id === action.payload.draggable?.id
        )
        if (!draggableExists) {
          newDraggablesAdd[action.payload.d].push(action.payload.draggable)
        }
      }
      return {
        ...state,
        draggables: newDraggablesAdd,
        highestBlobNumber: state.highestBlobNumber + 1,
      }
    case 'removeDraggable':
      const newDraggables = [...state.draggables]
      newDraggables[action.payload.d] = newDraggables[action.payload.d]?.filter(
        (item) => item.id !== action.payload.id
      )
      return { ...state, draggables: newDraggables }
    case 'updateDraggable':
      const newDraggablesUpdate = state.draggables.map((subArray) =>
        subArray.map((draggable) =>
          draggable.id === action.payload.draggable?.id
            ? { ...draggable, ...action.payload.draggable, id: draggable.id }
            : draggable
        )
      )
      return { ...state, draggables: newDraggablesUpdate }
    case 'resetBlobs':
      return { draggables: [], highestBlobNumber: 0 }
    case 'moveDraggablesLeft':
      return {
        ...state,
        draggables: state.draggables.map((subArray) =>
          subArray.map((draggable) => ({
            ...draggable,
            x: `${parseInt(draggable.x) - amount}px`,
          }))
        ),
      }
    case 'moveDraggablesRight':
      return {
        ...state,
        draggables: state.draggables.map((subArray) =>
          subArray.map((draggable) => ({
            ...draggable,
            x: `${parseInt(draggable.x) + amount}px`,
          }))
        ),
      }
    case 'moveDraggablesUp':
      return {
        ...state,
        draggables: state.draggables.map((subArray) =>
          subArray.map((draggable) => ({
            ...draggable,
            y: `${parseInt(draggable.y) - amount}px`,
          }))
        ),
      }
    case 'moveDraggablesDown':
      return {
        ...state,
        draggables: state.draggables.map((subArray) =>
          subArray.map((draggable) => ({
            ...draggable,
            y: `${parseInt(draggable.y) + amount}px`,
          }))
        ),
      }
    case 'setBackgroundColor':
      return { ...state, backgroundColor: action.payload.backgroundColor }

    default:
      return state
  }
}

export default blobReducer
