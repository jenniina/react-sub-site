import axios from 'axios'
import { ELanguages, IUser } from '../interfaces'
import { ICart, ICartItem } from '../interfaces/store'

export interface ICartResponse {
  success: boolean
  message: string
  cart?: ICart
}

const url = import.meta.env.VITE_BASE_URI ?? 'https://bg.jenniina.fi'
const baseUrl = `${url}/api/cart`

const newOrder = async (
  language: ELanguages,
  order: {
    orderID: ICart['orderID']
    info: ICart['info']
    items: ICartItem[]
    total: ICart['total']
    extra: ICart['extra']
  }
) => {
  const response = await axios.post(`${baseUrl}/${language}`, order)
  return response.data as ICartResponse
}

const getOrderByOrderID = async (language: ELanguages, orderID: ICart['orderID']) => {
  const response = await axios.get(`${baseUrl}/${language}/${orderID}`)
  return response.data as ICart
}

const getAllOrders = async (language: ELanguages, userID: IUser['_id']) => {
  const response = await axios.get(`${baseUrl}/${language}?userID=${userID}`)
  return response.data as ICart[]
}

const deleteOrder = async (
  language: ELanguages,
  orderID: ICart['orderID'],
  userID: IUser['_id']
) => {
  const response = await axios.delete(
    `${baseUrl}/${language}/${orderID}?userID=${userID}`
  )
  return response.data as ICartResponse
}

const updateOrder = async (language: ELanguages, order: ICart, userID: IUser['_id']) => {
  const response = await axios.put(
    `${baseUrl}/${language}/${order.orderID}?userID=${userID}`,
    order
  )
  return response.data as ICartResponse
}

export default {
  newOrder,
  getOrderByOrderID,
  getAllOrders,
  deleteOrder,
  updateOrder,
}
