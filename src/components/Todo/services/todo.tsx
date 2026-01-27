import { ITask } from '../types'
import { IUser } from '../../../types'
import api from '../../../services/api'

const baseUrl = `/todo`

const getTodos = async (user: IUser['_id']) => {
  const response = await api.get(`${baseUrl}/${user}`)
  return response.data as ITask[]
}
const updateAllTodos = async (user: IUser['_id'], todos: ITask[]) => {
  const response = await api.put(`${baseUrl}/${user}`, todos)
  return response.data as ITask[]
}

const addTodo = async (user: IUser['_id'], task: ITask) => {
  const response = await api.post(`${baseUrl}/${user}`, task)
  return response.data as ITask
}

const deleteTodo = async (user: IUser['_id'], key: ITask['key']) => {
  const response = await api.delete(`${baseUrl}/${user}/${key}`)
  return response.data as ITask
}

const editTodo = async (user: IUser['_id'], key: ITask['key'], task: ITask) => {
  const response = await api.put(`${baseUrl}/${user}/${key}`, task)
  return response.data as ITask
}

const clearCompletedTodos = async (user: IUser['_id']) => {
  const response = await api.delete(`${baseUrl}/${user}`)
  return response.data as ITask[]
}

// an array of objects with keys: { key, order }
// router.put('/api/todo/:user/order', editTodoOrder)

const editTodoOrder = async (
  user: IUser['_id'],
  order: {
    key: ITask['key']
    order: ITask['order']
  }[]
) => {
  const response = await api.post(`${baseUrl}/${user}/order`, {
    todos: order,
  })
  return response.data as ITask[]
}

// const addOrderToAllTodos = async () => {
//   const response = await api.put(`${baseUrl}`)
//   return response.data
// }

export default {
  getTodos,
  updateAllTodos,
  addTodo,
  deleteTodo,
  editTodo,
  clearCompletedTodos,
  editTodoOrder,
  //addOrderToAllTodos,
}
