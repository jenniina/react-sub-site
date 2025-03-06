import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../../store' // COMBINE THE STORES
import { ITask, TodosState } from '../types'
import todoService from '../services/todo'
import { IUser } from '../../../types'

const initialState: TodosState = {
  todos: [],
  status: 'idle',
  error: null,
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    getTodosStart: (state) => {
      state.status = 'loading'
    },
    getTodosSuccess: (state, action: PayloadAction<ITask[]>) => {
      state.status = 'idle'
      state.todos = action.payload
    },
    getTodosFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed'
      state.error = action.payload
    },
    addTodo: (state, action: PayloadAction<ITask>) => {
      if (action.payload.priority === 'high') {
        state.todos.unshift(action.payload) // Insert at the beginning
      } else {
        state.todos.push(action.payload) // Insert at the end
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.key !== action.payload)
    },
    clearCompletedTodos: (state) => {
      state.todos = state.todos.filter((todo) => !todo.complete)
    },
    editTodo: (state, action: PayloadAction<ITask>) => {
      const index = state.todos.findIndex((todo) => todo.key === action.payload.key)
      if (index !== -1) {
        state.todos[index] = action.payload
      }
    },
    changeTodoOrder: (state, action: PayloadAction<{ key: string; order: number }[]>) => {
      const updatedTodos = state.todos.map((todo) => {
        const newOrder = action.payload.find((o) => o.key === todo.key)
        return newOrder ? { ...todo, order: newOrder.order } : todo
      })

      updatedTodos.sort((a, b) => a.order - b.order)
      state.todos = updatedTodos
    },
    setAllTodos: (state, action: PayloadAction<ITask[]>) => {
      state.todos = action.payload
    },
  },
})

export const addTodoAsync = (user: IUser['_id'], task: ITask) => {
  return async (dispatch: (arg0: { payload: any; type: 'todos/addTodo' }) => void) => {
    const newTodo = await todoService.addTodo(user, task)

    if (newTodo.order < 0) {
      fetchTodos(user)
    } else
      dispatch(
        addTodo({
          key: newTodo.key,
          name: newTodo.name,
          complete: newTodo.complete,
          order: newTodo.order,
          category: newTodo.category,
          deadline: newTodo.deadline,
          priority: newTodo.priority,
          user,
        })
      )
  }
}

export const fetchTodos = (user: IUser['_id']) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(getTodosStart())
    try {
      const dbTodos = await todoService.getTodos(user)
      let mergedTodos = getState().todos.todos
      //   if (dbTodos) {
      //     mergedTodos = [...new Set([...dbTodos, ...mergedTodos])]
      //   }
      if (dbTodos) {
        mergedTodos = [
          ...dbTodos,
          ...mergedTodos.filter(
            (mTodo) => !dbTodos.find((dbTodo: ITask) => dbTodo.key === mTodo.key)
          ),
        ]
      }
      // Filter out null values from mergedTodos
      mergedTodos = mergedTodos.filter((todo) => todo !== null)
      const result = await todoService.updateAllTodos(user, mergedTodos)
      dispatch(getTodosSuccess(result))
      return result
    } catch (error) {
      console.error(error)
      dispatch(getTodosFailure((error as Error).message))
    }
  }
}

export const editTodoOrder = async (
  user: IUser['_id'],
  order: {
    key: ITask['key']
    order: ITask['order']
  }[]
) => {
  const response = await todoService.editTodoOrder(user, order)
  return response
}

export const deleteTodoAsync = (user: IUser['_id'], key: ITask['key']) => {
  return async (dispatch: (arg0: { payload: any; type: 'todos/deleteTodo' }) => void) => {
    const deleted = await todoService.deleteTodo(user, key)
    dispatch(deleteTodo(key))
    return deleted
  }
}

export const deleteTodoFromState = (key: ITask['key']) => {
  return async (dispatch: (arg0: { payload: any; type: 'todos/deleteTodo' }) => void) => {
    dispatch(deleteTodo(key))
  }
}

export const clearCompletedTodosAsync = (userId: IUser['_id']) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    await todoService.clearCompletedTodos(userId)
    dispatch(clearCompletedTodos())
    // const todos = getState().todos.todos
    // const completedTodos = todos.filter((todo) => todo.complete)
    // completedTodos.forEach(async (todo) => {
    //   try {
    //     await todoService.deleteTodo(userId, todo.key)
    //     dispatch(deleteTodo(todo.key))
    //   } catch (error) {
    //     console.error('Failed to delete todo:', error)
    //   }
    // })
  }
}

export const editTodoAsync = (user: IUser['_id'], key: ITask['key'], task: ITask) => {
  return async (dispatch: (arg0: { payload: any; type: 'todos/editTodo' }) => void) => {
    const newTodo = await todoService.editTodo(user, key, task)
    dispatch(
      editTodo({
        key: newTodo.key,
        name: newTodo.name,
        complete: newTodo.complete,
        order: newTodo.order,
        category: newTodo.category,
        deadline: newTodo.deadline,
        priority: newTodo.priority,
        user,
      })
    )
  }
}

export const syncTodos = (user: IUser['_id']) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      // Fetch todos from the database
      const dbTodos = await todoService.getTodos(user)

      // Get todos from the state
      const stateTodos = getState().todos.todos

      const dbTodoMap = new Map<string, ITask>()
      dbTodos.forEach((todo: ITask) => dbTodoMap.set(todo.key, todo))

      stateTodos.forEach((todo) => {
        if (!dbTodoMap.has(todo.key)) {
          dbTodoMap.set(todo.key, todo)
        }
      })
      const mergedTodos = Array.from(dbTodoMap.values())

      // Update the database with the merged todos
      const updatedTodos = await todoService.updateAllTodos(user, mergedTodos)

      // Update the state with the updated todos
      dispatch(getTodosSuccess(updatedTodos))
    } catch (error) {
      console.error(error)
      dispatch(getTodosFailure((error as Error).message))
    }
  }
}

export const {
  getTodosStart,
  getTodosSuccess,
  getTodosFailure,
  addTodo,
  deleteTodo,
  clearCompletedTodos,
  editTodo,
  changeTodoOrder,
  setAllTodos,
} = todosSlice.actions

export default todosSlice.reducer
