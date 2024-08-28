import { Draggable } from '../interfaces'

function blobReducer(
  state: { draggables: Draggable[][]; highestBlobNumber: 0 },
  action: {
    type: any
    payload: {
      d: number
      draggables: Draggable[][]
      draggable: Draggable | null
      id: string
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
            ? action.payload.draggable
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
    default:
      return state
  }
}

export default blobReducer
