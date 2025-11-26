import React, { FC, useEffect, useState, useCallback } from 'react'
import cartService from '../../../services/cart'
import styles from '../store.module.css'
import selectStyles from '../../Select/select.module.css'
import { status, paid } from '../../../types/store'
import { ICart, IInfo } from '../../../types/store'
import { IUser } from '../../../types'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { notify } from '../../../reducers/notificationReducer'
import Accordion from '../../Accordion/Accordion'
import { Select, SelectOption } from '../../Select/Select'
import { useTheme } from '../../../hooks/useTheme'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import { getErrorMessage } from '../../../utils'
import { useConfirm } from '../../../contexts/ConfirmContext'

interface Props {
  user: IUser
  statusOptions: SelectOption[]
  paidOptions: SelectOption[]
  splitToLines: (details: string) => React.JSX.Element[]
  paidStatus: Record<paid, string>
  itemStatus: (status: status) => string
  info: (key: keyof IInfo) => string
}

const Orders: FC<Props> = ({
  user,
  statusOptions,
  paidOptions,
  splitToLines,
  paidStatus,
  itemStatus,
  info,
}) => {
  const { t, language } = useLanguageContext()
  const confirm = useConfirm()

  const dispatch = useAppDispatch()
  const lightTheme = useTheme()

  const [orders, setOrders] = useState<ICart[] | null>(null)
  const [priceChanged, setPriceChanged] = useState<boolean>(false)
  const [sending, setSending] = useState<boolean>(false)

  const fetchAllOrders = useCallback(async () => {
    try {
      const orders = await cartService.getAllOrders(language, user._id)
      // Convert createdAt and updatedAt to Date objects
      const ordersWithDates = orders
        .map(order => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
        }))
        .sort((a, b) => {
          // Move 'completed' status to the last
          if (a.status === 'cancelled' && b.status !== 'cancelled') return 1
          if (a.status !== 'cancelled' && b.status === 'cancelled') return -1
          // Sort by createdAt, newest first
          return b.createdAt.getTime() - a.createdAt.getTime()
        })
      setOrders(ordersWithDates)
      
    } catch (err: unknown) {
      const message = getErrorMessage(err, t('Error'))
      void dispatch(notify(message, true, 8))
    }
  }, [language, user._id, dispatch, t])

  useEffect(() => {
    if (user?.role && user?.role > 1) {
      void fetchAllOrders()
    }
  }, [user, fetchAllOrders])

  useEffect(() => {
    // Recalculate total price when price has changed
    if (orders) {
      const newOrders = orders.map(order => ({
        ...order,
        total: order.items
          .map(item => item.price * item.quantity)
          .reduce((a, b) => a + b, 0),
      }))

      const timer = window.setTimeout(() => {
        setOrders(newOrders)
      }, 0)

      return () => clearTimeout(timer)
    }
  }, [priceChanged, orders])

  const deleteOrder = async (orderID: ICart['orderID']) => {
    try {
      await cartService.deleteOrder(language, orderID, user._id)
      void dispatch(notify(`${t('Deleted')} ${orderID}`, false, 5))
      await fetchAllOrders()
      
    } catch (err: unknown) {
      const message = getErrorMessage(err, t('Error'))
      void dispatch(notify(message, true, 8))
    }
  }

  const updateOrder = async (order: ICart) => {
    setSending(true)
    try {
      const r = await cartService.updateOrder(language, order, user._id)
      if (r?.success) void dispatch(notify(`${r.message}`, false, 5))
      await fetchAllOrders()
      
    } catch (err: unknown) {
      const message = getErrorMessage(err, t('Error'))
      void dispatch(notify(message, true, 8))
    } finally {
      setSending(false)
    }
  }

  return (
    <div className={`${styles.orders} ${lightTheme ? styles.light : ''}`}>
      {orders?.map((order, index) => (
        <div
          key={`${order.orderID}-${index}`}
          className={`${styles.order} ${
            order.status === 'completed'
              ? styles.completed
              : order.status === 'cancelled'
                ? styles.cancelled
                : order.status === 'pending'
                  ? styles.pending
                  : order.status === 'in progress'
                    ? styles['in-progress']
                    : ''
          }`}
        >
          <Accordion
            text={`${
              order.status === 'completed'
                ? '[ ' + t('OrderCompleted') + ' ] '
                : ''
            }${order.orderID} ${
              order.info.companyName
                ? `${order.info.name} (${order.info.companyName})`
                : order.info.name
            }`}
            hideBrackets
            className={`${
              order.status === 'cancelled' || order.status === 'completed'
                ? 'reset'
                : order.status === 'pending'
                  ? 'grayer'
                  : ''
            } change-status`}
            wrapperClass={styles['change-status-main']}
            showButton
          >
            <>
              <h2>
                {order.info.name}{' '}
                {order.info.companyName ? `(${order.info.companyName})` : ''}
              </h2>

              <div className={styles['info-wrap']}>
                <p>
                  <big>
                    <strong>{t('OrderID')}: </strong>
                    {order.orderID}
                  </big>
                </p>
                <p>
                  <strong>{t('Status')}: </strong>
                  {itemStatus(order.status)}
                </p>
                <p>
                  <strong>{t('PaymentState')}: </strong>
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
                  {t('Total')}: <big>{order.total} € </big>
                </p>
                <table className={`${styles['info-table']}`}>
                  <caption>{t('Ordered')}</caption>
                  <tbody>
                    <tr>
                      <th>{t('Ordered')}: </th>
                      <td>
                        {order.createdAt?.toLocaleDateString()}{' '}
                        {order.createdAt?.toLocaleTimeString()}
                      </td>
                    </tr>
                    <tr>
                      <th>{t('LastUpdated')}: </th>
                      <td>
                        {order.updatedAt.toLocaleDateString()}{' '}
                        {order.updatedAt?.toLocaleTimeString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Accordion
                text={`${t('Edit')} (${t('Status')})`}
                hideBrackets
                className={`narrow2 change-status`}
                wrapperClass={styles['change-status-main']}
              >
                <>
                  <form
                    className={styles['change-status-form']}
                    onSubmit={e => {
                      e.preventDefault()
                      void updateOrder(order)
                    }}
                  >
                    <Select
                      language={language}
                      id={`status-${order.orderID}`}
                      className="status"
                      instructions="Status"
                      options={statusOptions}
                      value={statusOptions.find(o => o.value === order.status)}
                      onChange={c => {
                        //order.status = o?.value as status
                        setOrders(
                          orders?.map(o =>
                            o.orderID === order.orderID
                              ? { ...o, status: c?.value as status }
                              : o
                          )
                        )
                      }}
                    />
                    <button type="submit" disabled={sending}>
                      {t('Submit')}
                    </button>
                  </form>
                </>
              </Accordion>

              {order.items?.map(item => (
                <div className={styles['item-wrap']} key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>
                    <strong>{t('Price')}: </strong>
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
                    <strong>{t('RequestsAndNeeds')}: </strong> <br />
                    {splitToLines(item.details)}
                  </p>
                  <p>
                    <strong>{t('Status')}: </strong>
                    {itemStatus(item.status)}{' '}
                  </p>
                  {item.id === 'misc-quote' ? null : (
                    <p key={item.id}>
                      <strong>{t('PaymentState')}: </strong>
                      {paidStatus[item.paid]}
                    </p>
                  )}

                  <Accordion
                    text={`${t('Edit')}`}
                    hideBrackets
                    className={`narrow2 change-status`}
                    wrapperClass={styles['change-status']}
                  >
                    <>
                      <form
                        className={styles['change-status-form']}
                        onSubmit={e => {
                          e.preventDefault()
                          void updateOrder(order)
                        }}
                      >
                        <label>
                          <span>{t('Price')}</span>
                          <input
                            type="number"
                            className="bg"
                            name={`price-${item.id}`}
                            defaultValue={item.price}
                            onChange={e => {
                              setOrders(
                                orders?.map(o =>
                                  o.orderID === order.orderID
                                    ? {
                                        ...o,
                                        items: o.items.map(i =>
                                          i.id === item.id
                                            ? {
                                                ...i,
                                                price: Number(e.target.value),
                                              }
                                            : i
                                        ),
                                      }
                                    : o
                                )
                              )

                              setPriceChanged(!priceChanged)
                            }}
                          />
                        </label>
                        <label>
                          <span>{t('Quantity')}</span>
                          <input
                            type="number"
                            className="bg"
                            name={`quantity-${item.id}`}
                            defaultValue={item.quantity}
                            onChange={e => {
                              //item.quantity = Number(e.target.value)
                              setOrders(
                                orders?.map(o =>
                                  o.orderID === order.orderID
                                    ? {
                                        ...o,
                                        items: o.items.map(i =>
                                          i.id === item.id
                                            ? {
                                                ...i,
                                                quantity: Number(
                                                  e.target.value
                                                ),
                                              }
                                            : i
                                        ),
                                      }
                                    : o
                                )
                              )
                            }}
                          />
                        </label>

                        <label>
                          <span>{t('Info')}</span>
                          <textarea
                            name={`details-${item.id}`}
                            rows={6}
                            defaultValue={item.details}
                            onChange={e => {
                              // item.details = e.target.value
                              setOrders(
                                orders?.map(o =>
                                  o.orderID === order.orderID
                                    ? {
                                        ...o,
                                        items: o.items.map(i =>
                                          i.id === item.id
                                            ? { ...i, details: e.target.value }
                                            : i
                                        ),
                                      }
                                    : o
                                )
                              )
                            }}
                          />
                        </label>

                        <Select
                          language={language}
                          id={`status-${item.id}`}
                          className={`status ${selectStyles.prev2}`}
                          instructions={t('Status')}
                          options={statusOptions}
                          value={statusOptions.find(
                            o => o.value === item.status
                          )}
                          onChange={c => {
                            // item.status = c?.value as status
                            setOrders(
                              orders?.map(o =>
                                o.orderID === order.orderID
                                  ? {
                                      ...o,
                                      items: o.items.map(i =>
                                        i.id === item.id
                                          ? { ...i, status: c?.value as status }
                                          : i
                                      ),
                                    }
                                  : o
                              )
                            )
                          }}
                        />
                        <Select
                          language={language}
                          id={`paid-${item.id}`}
                          className={`paid ${selectStyles.prev}`}
                          instructions={t('PaymentState')}
                          options={paidOptions}
                          value={paidOptions.find(o => o.value === item.paid)}
                          onChange={c => {
                            // item.paid = c?.value as paid
                            setOrders(
                              orders?.map(o =>
                                o.orderID === order.orderID
                                  ? {
                                      ...o,
                                      items: o.items.map(i =>
                                        i.id === item.id
                                          ? { ...i, paid: c?.value as paid }
                                          : i
                                      ),
                                    }
                                  : o
                              )
                            )
                          }}
                        />

                        <button type="submit" disabled={sending}>
                          {t('Submit')}
                        </button>
                      </form>
                    </>
                  </Accordion>
                </div>
              ))}
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
                            <td>
                              {order.info[key as keyof typeof order.info]}
                            </td>
                          </tr>
                        )
                      )
                    })}
                  </tbody>
                </table>
                {order.extra && order.extra.trim() !== '' && (
                  <p>
                    <strong>{t('AdditionalInformation')}: </strong> <br />
                    {splitToLines(order.extra)}
                  </p>
                )}

                <Accordion
                  text={`${t('Edit')} (${t('Info')})`}
                  hideBrackets
                  className={`narrow2 change-status`}
                  wrapperClass={styles['change-status-info']}
                >
                  <>
                    <form
                      className={styles['change-status-form']}
                      onSubmit={e => {
                        e.preventDefault()
                        void updateOrder(order)
                      }}
                    >
                      {Object.keys(order.info).map((item, index) => {
                        if (item === '_id') return null
                        return (
                          <label key={`${item}-${index}`}>
                            <span>{info(item as keyof IInfo)}</span>
                            <input
                              type="text"
                              className="bg"
                              name={`info-${item}-${index}`}
                              defaultValue={
                                order.info[item as keyof typeof order.info]
                              }
                              onChange={e => {
                                setOrders(
                                  orders?.map(o =>
                                    o.orderID === order.orderID
                                      ? {
                                          ...o,
                                          info: {
                                            ...o.info,
                                            [item as keyof typeof order.info]:
                                              e.target.value,
                                          },
                                        }
                                      : o
                                  )
                                )
                                // order.info[item as keyof typeof order.info] = e.target.value
                              }}
                            />
                          </label>
                        )
                      })}
                      <label>
                        <span>{t('AdditionalInformation')}</span>
                        <textarea
                          rows={6}
                          name={`additional-${order.orderID}`}
                          defaultValue={order.extra}
                          onChange={e => {
                            // order.extra = e.target.value
                            setOrders(
                              orders?.map(o =>
                                o.orderID === order.orderID
                                  ? { ...o, extra: e.target.value }
                                  : o
                              )
                            )
                          }}
                        />
                      </label>

                      {order.items?.every(item => item.paid === 'full') ? (
                        <button
                          key={order.updatedAt.toString()}
                          onClick={() => {
                            const updatedOrder: ICart = {
                              ...order,
                              status: 'completed' as status,
                            }
                            setOrders(
                              orders?.map(o =>
                                o.orderID === order.orderID ? updatedOrder : o
                              )
                            )
                            void updateOrder(updatedOrder)
                          }}
                        >
                          {t('OrderCompleted')}
                        </button>
                      ) : (
                        <div key={order.updatedAt.toString()}>
                          {t('OrderNotCompleted')} <br />
                          {order.items?.some(item => item.paid !== 'full') &&
                            t('MissingPayment')}
                          :{' '}
                          <ul className="ul">
                            {order.items
                              ?.filter(item => item.paid !== 'full')
                              .map((item, index) => (
                                <li key={`${item.paid}-${index}`}>
                                  {item.name} ({paidStatus[item.paid]})
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                      <button type="submit" disabled={sending}>
                        {t('Submit')}
                      </button>
                    </form>
                  </>
                </Accordion>
                {user?.role && user.role > 2 && (
                  <div className={`${styles['delete-order']}`}>
                    <button
                      key={order.createdAt.toString()}
                      className={`danger delete`}
                      onClick={() =>
                        void (async () => {
                          if (
                            await confirm({
                              message: `${t('AreYouSureYouWantToDelete')} ${order.orderID}?`,
                            })
                          )
                            await deleteOrder(order.orderID)
                        })()
                      }
                    >
                      {t('Delete')}: {order.orderID}
                    </button>
                  </div>
                )}
              </div>
            </>
          </Accordion>
        </div>
      ))}
    </div>
  )
}
export default Orders
