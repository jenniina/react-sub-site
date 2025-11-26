import React, { FC, useEffect, useState, useCallback } from 'react'
import styles from '../store.module.css'
import cartService from '../../../services/cart'
import { ICart, IInfo } from '../../../types/store'
import { ELanguages } from '../../../types'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { notify } from '../../../reducers/notificationReducer'
import { useTheme } from '../../../hooks/useTheme'
import { paid, status } from '../../../types/store'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import { getErrorMessage } from '../../../utils'
import { useIsClient, useWindow } from '../../../hooks/useSSR'

interface Props {
  language: ELanguages
  paidStatus: Record<paid, string>
  itemStatus: (status: status) => string
  splitToLines: (details: string) => React.JSX.Element[]
  info: (key: keyof IInfo) => string
}

const Order: FC<Props> = ({
  language,
  paidStatus,
  itemStatus,
  splitToLines,
  info,
}) => {
  const isClient = useIsClient()
  const windowObj = useWindow()

  const { t } = useLanguageContext()

  const dispatch = useAppDispatch()
  const lightTheme = useTheme()

  const [order, setOrder] = useState<ICart | null>(null)
  const [orderID, setOrderID] = useState<ICart['orderID']>('')
  const [sending, setSending] = useState(false)

  const fetchOrder = useCallback(
    async (ID: ICart['orderID'] = orderID) => {
      setSending(true)
      try {
        const order = await cartService.getOrderByOrderID(language, ID)
        const ordersWithDates = {
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
        }
        setOrder(ordersWithDates)
        setSending(false)
        
      } catch (err: unknown) {
        const message = getErrorMessage(err, t('Error'))
        void dispatch(notify(message, true, 8))
        setSending(false)
      }
    },
  [dispatch, language, orderID, t]
  )

  // if the address has ?orderID=123456-AB, fetch the order
  useEffect(() => {
    if (!isClient || !windowObj) return
    const urlParams = new URLSearchParams(windowObj.location.search)
    const ID = urlParams.get('orderID')
    if (ID) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrderID(ID)
      void fetchOrder(ID)
    }
  }, [isClient, windowObj, fetchOrder])

  return (
    <div
      className={`${styles['order-wrap']} ${lightTheme ? styles.light : ''}`}
    >
      <form
        onSubmit={e => {
          e.preventDefault()
          void fetchOrder()
        }}
      >
        <div className="input-wrap">
          <label>
            <input
              type="text"
              required
              name="orderID"
              value={orderID}
              onChange={e => setOrderID(e.target.value)}
            />
            <span className="label">{t('OrderID')}</span>
          </label>
        </div>
        <button type="submit" disabled={sending}>
          {t('Submit')}
        </button>
      </form>
      {order && (
        <div>
          <h2>{order.orderID}</h2>
          <div className={styles['order-items']}>
            {order.items?.map(item => {
              return (
                <div key={item.id} className={styles['order-item']}>
                  <h3>
                    {item.name}
                    {item.id === 'misc-quote' ? '' : ` x ${item.quantity}`}
                  </h3>
                  <p>{item.description}</p>
                  <p>
                    <strong>{t('Price')}:</strong>{' '}
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
                    <strong>{t('Info')}:</strong> <br />{' '}
                    {splitToLines(item.details)}
                  </p>
                  <p>
                    <strong>{t('Status')}:</strong>{' '}
                    {itemStatus(item.status)}{' '}
                  </p>
                  {item.id === 'misc-quote' ? null : (
                    <p key={item.id}>
                      <strong>{t('PaymentState')}:</strong>{' '}
                      {paidStatus[item.paid]}
                    </p>
                  )}
                </div>
              )
            })}{' '}
          </div>
          <div className={styles['info-wrap']}>
            <table className={`${styles['info-table']}`}>
              <caption>{t('Info')}</caption>
              <tbody>
                {Object.keys(order.info).map(key => {
                  if (key === '_id') return null
                  return (
                    order.info[key as keyof typeof order.info] !== null &&
                    order.info[key as keyof typeof order.info]?.trim() !==
                      '' && (
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
              {t('Total')}: <big>{order.total} € </big>
              <br />
            </p>

            <p>
              {t('Status')}: {itemStatus(order.status)}
            </p>
            <p>
              {t('PaymentState')}:{' '}
              {
                paidStatus[
                  order.items.every(item => item.paid === 'full')
                    ? 'full'
                    : order.items.every(item => item.paid === 'none')
                      ? 'none'
                      : 'partial'
                ]
              }
            </p>
            <p>
              <strong>{t('Ordered')}: </strong>
              {order.createdAt?.toLocaleDateString()}{' '}
              {order.createdAt?.toLocaleTimeString()} <br />
              <strong>{t('LastUpdated')}: </strong>
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
