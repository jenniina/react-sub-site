import { FC, useEffect, useState } from 'react'
import styles from '../store.module.css'
import cartService from '../../../services/cart'
import {
  EContainsVAT,
  EOrder,
  EOrdered,
  EOrderID,
  EPaymentState,
  EPrice,
  ETotal,
  ICart,
  ICartItem,
  IInfo,
} from '../../../interfaces/store'
import { EInfo, ELanguages, ELastUpdated, EStatus, ESubmit } from '../../../interfaces'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { notify } from '../../../reducers/notificationReducer'
import { useTheme } from '../../../hooks/useTheme'
import { paid, status } from '../../../interfaces/store'

interface Props {
  language: ELanguages
  paidStatus: { [key in paid]: string }
  itemStatus: (status: status) => string
  splitToLines: (details: string) => JSX.Element[]
  info: (key: keyof IInfo) => string
}

const Order: FC<Props> = ({ language, paidStatus, itemStatus, splitToLines, info }) => {
  const dispatch = useAppDispatch()
  const lightTheme = useTheme()

  const [order, setOrder] = useState<ICart | null>(null)
  const [orderID, setOrderID] = useState<ICart['orderID']>('')

  const fetchOrder = async (ID: ICart['orderID'] = orderID) => {
    try {
      const order = await cartService.getOrderByOrderID(language, ID)
      const ordersWithDates = {
        ...order,
        createdAt: new Date(order.createdAt),
        updatedAt: new Date(order.updatedAt),
      }
      setOrder(ordersWithDates)
    } catch (error: any) {
      if (error.response?.data?.message)
        dispatch(notify(error.response.data.message, true, 8))
      else dispatch(notify((error as Error).message, true, 8))
    }
  }

  // if the address has ?orderID=123456-AB, fetch the order
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const ID = urlParams.get('orderID')
    if (ID) {
      setOrderID(ID as ICart['orderID'])
      fetchOrder(ID)
    }
  }, [])

  return (
    <div className={`${styles['order-wrap']} ${lightTheme ? styles.light : ''}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          fetchOrder()
        }}
      >
        <div className='input-wrap'>
          <label>
            <input
              type='text'
              required
              name='orderID'
              value={orderID}
              onChange={(e) => setOrderID(e.target.value as ICart['orderID'])}
            />
            <span className='label'>{EOrderID[language]}</span>
          </label>
        </div>
        <button type='submit'>{ESubmit[language]}</button>
      </form>
      {order && (
        <div>
          <h2>{order.orderID}</h2>
          <div className={styles['order-items']}>
            {order.items?.map((item) => {
              return (
                <div key={item.id} className={styles['order-item']}>
                  <h3>
                    {item.name}
                    {item.id === 'misc-quote' ? '' : ` x ${item.quantity}`}
                  </h3>
                  <p>{item.description}</p>
                  <p>
                    <strong>{EPrice[language]}:</strong>{' '}
                    {item.id === 'misc-quote'
                      ? item.price + ' €'
                      : item.price +
                        ' x ' +
                        item.quantity +
                        ' = ' +
                        item.quantity * item.price +
                        ' €'}
                  </p>
                  <p>
                    <strong>{EInfo[language]}:</strong> <br />{' '}
                    {splitToLines(item.details)}
                  </p>
                  <p>
                    <strong>{EStatus[language]}:</strong> {itemStatus(item.status)}{' '}
                  </p>
                  {item.id === 'misc-quote' ? null : (
                    <p key={item.id}>
                      <strong>{EPaymentState[language]}:</strong> {paidStatus[item.paid]}
                    </p>
                  )}
                </div>
              )
            })}{' '}
          </div>
          <div className={styles['info-wrap']}>
            <table className={`${styles['info-table']}`}>
              <caption>{EInfo[language]}</caption>
              <tbody>
                {Object.keys(order.info).map((key) => {
                  if (key === '_id') return null
                  return (
                    order.info[key as keyof typeof order.info] !== null &&
                    order.info[key as keyof typeof order.info]?.trim() !== '' && (
                      <tr key={key}>
                        <th>{info(key as keyof IInfo)}:</th>
                        <td>{order.info[key as keyof typeof order.info]}</td>
                      </tr>
                    )
                  )
                })}
              </tbody>
            </table>
            <p>{order.extra}</p>
            <p>
              {ETotal[language]}: <big>{order.total} € </big>
              <br />
            </p>

            <p>
              {EStatus[language]}: {itemStatus(order.status)}
            </p>
            <p>
              {EPaymentState[language]}:{' '}
              {
                paidStatus[
                  order.items.every((item) => item.paid === 'full')
                    ? 'full'
                    : order.items.every((item) => item.paid === 'none')
                    ? 'none'
                    : 'partial'
                ]
              }
            </p>
            <p>
              <strong>{EOrdered[language]}: </strong>
              {order.createdAt?.toLocaleDateString()}{' '}
              {order.createdAt?.toLocaleTimeString()} <br />
              <strong>{ELastUpdated[language]}: </strong>
              {order.updatedAt.toLocaleDateString()}{' '}
              {order.updatedAt?.toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
export default Order