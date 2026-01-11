import axios from 'axios'
import { ITask } from '../types'
import { IUser } from '../../../types'

const url = import.meta.env.DEV
  ? 'http://localhost:4000'
  : 'https://react.jenniina.fi'
const baseUrl = `${url}/api/todo`

const getTodos = async (user: IUser['_id']) => {
  const response = await axios.get(`${baseUrl}/${user}`)
  return response.data as ITask[]
}
const updateAllTodos = async (user: IUser['_id'], todos: ITask[]) => {
  const response = await axios.put(`${baseUrl}/${user}`, todos)
  return response.data as ITask[]
}

const addTodo = async (user: IUser['_id'], task: ITask) => {
  const response = await axios.post(`${baseUrl}/${user}`, task)
  return response.data as ITask
}

const deleteTodo = async (user: IUser['_id'], key: ITask['key']) => {
  const response = await axios.delete(`${baseUrl}/${user}/${key}`)
  return response.data as ITask
}

const editTodo = async (user: IUser['_id'], key: ITask['key'], task: ITask) => {
  const response = await axios.put(`${baseUrl}/${user}/${key}`, task)
  return response.data as ITask
}

const clearCompletedTodos = async (user: IUser['_id']) => {
  const response = await axios.delete(`${baseUrl}/${user}`)
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
  const response = await axios.post(`${baseUrl}/${user}/order`, {
    todos: order,
  })
  return response.data as ITask[]
}

// const addOrderToAllTodos = async () => {
//   const response = await axios.put(`${baseUrl}`)
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
