import axios from 'axios'
import { ITask } from '../interfaces'
import { IUser } from '../../../interfaces'

const VITE_BASE_URI = import.meta.env.VITE_BASE_URI
const baseUrl = VITE_BASE_URI ? `${VITE_BASE_URI}/api/todo` : '/api/todo'

const getTodos = async (user: IUser['_id']) => {
  const response = await axios.get(`${baseUrl}/${user}`)
  return response.data
}
const updateAllTodos = async (user: IUser['_id'], todos: ITask[]) => {
  const response = await axios.put(`${baseUrl}/${user}`, todos)
  return response.data
}

const addTodo = async (user: IUser['_id'], task: ITask) => {
  const response = await axios.post(`${baseUrl}/${user}`, task)
  console.log('response: ', response.data)
  return response.data
}

const deleteTodo = async (user: IUser['_id'], key: ITask['key']) => {
  const response = await axios.delete(`${baseUrl}/${user}/${key}`)
  return response.data
}

const editTodo = async (user: IUser['_id'], key: ITask['key'], task: ITask) => {
  const response = await axios.put(`${baseUrl}/${user}/${key}`, task)
  return response.data
}

const clearCompletedTodos = async (user: IUser['_id']) => {
  const response = await axios.delete(`${baseUrl}/${user}`)
  return response.data
}

export default {
  getTodos,
  updateAllTodos,
  addTodo,
  deleteTodo,
  editTodo,
  clearCompletedTodos,
}
