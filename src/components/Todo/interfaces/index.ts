import { IUser } from '../../../interfaces'

export interface ITask {
  key: string
  name: string
  complete: boolean
  user?: IUser['_id'] | null
}
export interface ITodos {
  user?: IUser['_id'] | null
  todos: ITask[]
}
export interface TodosState {
  todos: ITask[]
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}
