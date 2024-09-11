import { useReducer, FC, ReactNode, createContext, Dispatch } from 'react'
import blobReducer from '../reducers/blobReducer'
import { BackgroundColor, Draggable } from '../interfaces'
import { ReducerProps } from '../interfaces'

export interface Props {
  state: ReducerProps['blob']
  dispatch: Dispatch<any>
}

const initialState: ReducerProps['blob'] = {
  draggables: [] as Draggable[][],
  dragItemList: [] as Draggable[],
  highestBlobNumber: 0,
  hasBeenMadeFromStorage: false,
  backgroundColor: [] as BackgroundColor[],
}

export const BlobContext = createContext<Props | undefined>(undefined)

export const BlobProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(blobReducer, initialState as never)

  return (
    <BlobContext.Provider value={{ state, dispatch }}>{children}</BlobContext.Provider>
  )
}
