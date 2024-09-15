import { BackgroundColor, Draggable } from '../interfaces'
import { ReducerProps } from '../interfaces'

const initialState: ReducerProps['blob'] = {
  draggables: [] as Draggable[][],
  backgroundColor: [['30', '80', '214']] as BackgroundColor[][],
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
          newDraggablesAdd[action.payload.d] = [
            ...newDraggablesAdd[action.payload.d],
            action.payload.draggable,
          ]
        }
      }
      const newStateAdd = {
        ...state,
        draggables: newDraggablesAdd,
      }
      return newStateAdd
    case 'duplicateDraggable':
      const newDraggablesDuplicate = [...state.draggables]
      if (!newDraggablesDuplicate[action.payload.d]) {
        newDraggablesDuplicate[action.payload.d] = []
      }

      if (action.payload.draggable) {
        // Find the highest ID currently in state
        const maxId = Math.max(
          ...newDraggablesDuplicate.flatMap((draggables) =>
            draggables.map((draggable) =>
              parseInt(draggable.id.replace('blob', '').split('-')[0], 10)
            )
          ),
          0 // This is a fallback in case the array is empty
        )

        let newId = maxId + 1
        let newDraggable: Draggable = {
          ...action.payload.draggable,
          id: `blob${newId}-${action.payload.d}`,
          number: newId,
        }
        let draggableExists = true

        // Loop until a unique ID is found
        while (draggableExists) {
          newDraggable = {
            ...action.payload.draggable,
            id: `blob${newId}-${action.payload.d}`,
            number: newId,
          }

          draggableExists = newDraggablesDuplicate[action.payload.d].some(
            (draggable) => draggable.id === newDraggable.id
          )

          if (draggableExists) {
            newId += 1
          }
        }

        newDraggablesDuplicate[action.payload.d] = [
          ...newDraggablesDuplicate[action.payload.d],
          newDraggable,
        ]
      }

      const newStateDuplicate = {
        ...state,
        draggables: newDraggablesDuplicate,
      }
      return newStateDuplicate
    case 'removeDraggable':
      const newDraggables = [...state.draggables]
      newDraggables[action.payload.d] = newDraggables[action.payload.d]?.filter(
        (item) => item.id !== action.payload.id
      )
      const newStateRemove = { ...state, draggables: newDraggables }
      return newStateRemove
    case 'updateDraggable':
      const newDraggablesUpdate = state.draggables.map((subArray) =>
        subArray?.map((draggable) =>
          draggable.id === action.payload.draggable?.id
            ? { ...draggable, ...action.payload.draggable, id: draggable.id }
            : draggable
        )
      )
      return { ...state, draggables: newDraggablesUpdate }
    case 'resetBlobs':
      const d = action.payload.d
      const newDraggablesReset = state.draggables.map((subArray, index) =>
        index === d ? [] : subArray
      )
      return { ...state, draggables: newDraggablesReset }
    case 'moveDraggablesLeft':
      return {
        ...state,
        draggables: state.draggables.map((subArray) =>
          subArray?.map((draggable) => ({
            ...draggable,
            x: `${parseInt(draggable.x) - amount}px`,
          }))
        ),
      }
    case 'moveDraggablesRight':
      return {
        ...state,
        draggables: state.draggables.map((subArray) =>
          subArray?.map((draggable) => ({
            ...draggable,
            x: `${parseInt(draggable.x) + amount}px`,
          }))
        ),
      }
    case 'moveDraggablesUp':
      return {
        ...state,
        draggables: state.draggables.map((subArray) =>
          subArray?.map((draggable) => ({
            ...draggable,
            y: `${parseInt(draggable.y) - amount}px`,
          }))
        ),
      }
    case 'moveDraggablesDown':
      return {
        ...state,
        draggables: state.draggables.map((subArray) =>
          subArray?.map((draggable) => ({
            ...draggable,
            y: `${parseInt(draggable.y) + amount}px`,
          }))
        ),
      }
    case 'setBackgroundColor':
      const newBackgroundColor = [...state.backgroundColor]
      newBackgroundColor[action.payload.d] =
        action.payload.backgroundColor ?? state.backgroundColor[action.payload.d]
      return { ...state, backgroundColor: newBackgroundColor }

    default:
      return state
  }
}

export default blobReducer
