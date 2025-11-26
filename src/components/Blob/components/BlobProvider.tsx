import { useReducer, FC, ReactNode, createContext, Dispatch } from 'react'
import blobReducer from '../reducers/blobReducer'
import { Draggable } from '../types'
import { ReducerProps } from '../types'

export interface Props {
  state: ReducerProps['blob']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>
}

const initialState: Props['state'] = {
  draggables: [] as Draggable[][],
  backgroundColor: [] as string[][],
}

export const BlobContext = createContext<Props | undefined>(undefined)

export const BlobProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(blobReducer, initialState as never)

  return (
    <BlobContext.Provider value={{ state, dispatch }}>
      {children}
    </BlobContext.Provider>
  )
}
