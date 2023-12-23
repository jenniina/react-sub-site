import { useReducer, FC, ReactNode, createContext, Dispatch } from 'react'
import blobReducer from '../reducers/blobReducer'
import { Draggable } from '../interfaces'

interface State {
  draggables: Draggable[][] | []
}

export interface Props {
  state: State
  dispatch: Dispatch<any>
}

const initialState: State = {
  draggables: [] as Draggable[][],
}

export const BlobContext = createContext<Props | undefined>(undefined)

export const BlobProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(blobReducer, initialState as never)

  return (
    <BlobContext.Provider value={{ state, dispatch }}>{children}</BlobContext.Provider>
  )
}
