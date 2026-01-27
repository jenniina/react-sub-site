import { ELanguages, IUser } from '../types'
import { ICart, ICartItem } from '../types/store'
import api from './api'

export interface ICartResponse {
  success: boolean
  message: string
  cart?: ICart
}

const baseUrl = `/cart`

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
  const response = await api.post(`${baseUrl}/${language}`, order)
  return response.data as ICartResponse
}

const getOrderByOrderID = async (
  language: ELanguages,
  orderID: ICart['orderID']
) => {
  const response = await api.get(`${baseUrl}/${language}/${orderID}`)
  return response.data as ICart
}

const getAllOrders = async (language: ELanguages, userID: IUser['_id']) => {
  const response = await api.get(`${baseUrl}/${language}?userID=${userID}`)
  return response.data as ICart[]
}

const deleteOrder = async (
  language: ELanguages,
  orderID: ICart['orderID'],
  userID: IUser['_id']
) => {
  const response = await api.delete(
    `${baseUrl}/${language}/${orderID}?userID=${userID}`
  )
  return response.data as ICartResponse
}

const updateOrder = async (
  language: ELanguages,
  order: ICart,
  userID: IUser['_id']
) => {
  const response = await api.put(
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
