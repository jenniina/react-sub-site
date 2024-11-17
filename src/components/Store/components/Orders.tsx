import { FC, useEffect, useState } from 'react'
import cartService from '../../../services/cart'
import styles from '../store.module.css'
import selectStyles from '../../Select/select.module.css'
import {
  status,
  paid,
  EOrderCompleted,
  EOrderNotCompleted,
  EMissingPayment,
  EQuantity,
  EPaymentState,
  EOrdered,
  ERequestsAndNeeds,
} from '../../../interfaces/store'
import { EOrderID, EPrice, ETotal, ICart, IInfo } from '../../../interfaces/store'
import {
  EDelete,
  EDeleted,
  EEdit,
  EInfo,
  ELanguages,
  ELastUpdated,
  EStatus,
  ESubmit,
  IUser,
} from '../../../interfaces'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { notify } from '../../../reducers/notificationReducer'
import { EAreYouSureYouWantToDelete } from '../../UserEdit/interfaces'
import Accordion from '../../Accordion/Accordion'
import { Select, SelectOption } from '../../Select/Select'
import { EAdditionalInformation } from '../../../interfaces/form'
import { useTheme } from '../../../hooks/useTheme'

interface Props {
  language: ELanguages
  user: IUser
  statusOptions: SelectOption[]
  paidOptions: SelectOption[]
  splitToLines: (details: string) => JSX.Element[]
  paidStatus: { [key in paid]: string }
  itemStatus: (status: status) => string
  info: (key: keyof IInfo) => string
}

const Orders: FC<Props> = ({
  language,
  user,
  statusOptions,
  paidOptions,
  splitToLines,
  paidStatus,
  itemStatus,
  info,
}) => {
  const dispatch = useAppDispatch()
  const lightTheme = useTheme()

  const [orders, setOrders] = useState<ICart[] | null>(null)
  const [priceChanged, setPriceChanged] = useState<boolean>(false)

  const fetchAllOrders = async () => {
    try {
      const orders = await cartService.getAllOrders(language, user._id)
      // Convert createdAt and updatedAt to Date objects
      const ordersWithDates = orders
        .map((order) => ({
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
    } catch (error: any) {
      if (error.response?.data?.message)
        dispatch(notify(error.response.data.message, true, 8))
      else dispatch(notify((error as Error).message, true, 8))
    }
  }

  useEffect(() => {
    if (user && user?.role && user?.role > 1) {
      fetchAllOrders()
    }
  }, [user])

  useEffect(() => {
    // Recalculate total price when price has changed
    if (orders) {
      setOrders(
        orders.map((order) => ({
          ...order,
          total: order.items
            .map((item) => item.price * item.quantity)
            .reduce((a, b) => a + b, 0),
        }))
      )
    }
  }, [priceChanged])

  const deleteOrder = async (orderID: ICart['orderID']) => {
    cartService
      .deleteOrder(language, orderID, user._id)
      .then(() => {
        dispatch(notify(`${EDeleted[language]} ${orderID}`, false, 5))
        fetchAllOrders()
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          dispatch(notify(error.response.data.message, true, 8))
        } else dispatch(notify((error as Error).message, true, 8))
      })
  }

  const updateOrder = async (order: ICart) => {
    cartService
      .updateOrder(language, order, user._id)
      .then((r) => {
        if (r.success) dispatch(notify(`${r.message}`, false, 5))
        fetchAllOrders()
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          dispatch(notify(error.response.data.message, true, 8))
        } else dispatch(notify((error as Error).message, true, 8))
      })
  }

  return (
    <div className={`${styles.orders} ${lightTheme ? styles.light : ''}`}>
      {orders?.map((order, index) => (
        <div
          key={`${order.orderID}-${index}`}
          className={`${styles.order} ${
            order.status === 'completed'
              ? styles['completed']
              : order.status === 'cancelled'
              ? styles['cancelled']
              : order.status === 'pending'
              ? styles['pending']
              : order.status === 'in progress'
              ? styles['in-progress']
              : ''
          }`}
        >
          <Accordion
            language={language}
            text={`${
              order.status === 'completed' ? '[ ' + EOrderCompleted[language] + ' ] ' : ''
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
                    <strong>{EOrderID[language]}: </strong>
                    {order.orderID}
                  </big>
                </p>
                <p>
                  <strong>{EStatus[language]}: </strong>
                  {itemStatus(order.status)}
                </p>
                <p>
                  <strong>{EPaymentState[language]}: </strong>
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
                  {ETotal[language]}: <big>{order.total} € </big>
                </p>
                <table className={`${styles['info-table']}`}>
                  <caption>{EOrdered[language]}</caption>
                  <tbody>
                    <tr>
                      <th>{EOrdered[language]}: </th>
                      <td>
                        {order.createdAt?.toLocaleDateString()}{' '}
                        {order.createdAt?.toLocaleTimeString()}
                      </td>
                    </tr>
                    <tr>
                      <th>{ELastUpdated[language]}: </th>
                      <td>
                        {order.updatedAt.toLocaleDateString()}{' '}
                        {order.updatedAt?.toLocaleTimeString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Accordion
                language={language}
                text={`${EEdit[language]} (${EStatus[language]})`}
                hideBrackets
                className={`narrow2 change-status`}
                wrapperClass={styles['change-status-main']}
              >
                <>
                  <form
                    className={styles['change-status-form']}
                    onSubmit={(e) => {
                      e.preventDefault()
                      updateOrder(
                        orders?.find((o) => o.orderID === order.orderID) as ICart
                      )
                    }}
                  >
                    <Select
                      language={language}
                      id={`status-${order.orderID}`}
                      className='status'
                      instructions='Status'
                      options={statusOptions}
                      value={statusOptions.find((o) => o.value === order.status)}
                      onChange={(c) => {
                        //order.status = o?.value as status
                        setOrders(
                          orders?.map((o) =>
                            o.orderID === order.orderID
                              ? { ...o, status: c?.value as status }
                              : o
                          )
                        )
                      }}
                    />
                    <button type='submit'>{ESubmit[language]}</button>
                  </form>
                </>
              </Accordion>

              {order.items?.map((item) => (
                <div className={styles['item-wrap']} key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>
                    <strong>{EPrice[language]}: </strong>
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
                    <strong>{ERequestsAndNeeds[language]}: </strong> <br />
                    {splitToLines(item.details)}
                  </p>
                  <p>
                    <strong>{EStatus[language]}: </strong>
                    {itemStatus(item.status)}{' '}
                  </p>
                  {item.id === 'misc-quote' ? null : (
                    <p key={item.id}>
                      <strong>{EPaymentState[language]}: </strong>
                      {paidStatus[item.paid]}
                    </p>
                  )}

                  <Accordion
                    language={language}
                    text={`${EEdit[language]}`}
                    hideBrackets
                    className={`narrow2 change-status`}
                    wrapperClass={styles['change-status']}
                  >
                    <>
                      <form
                        className={styles['change-status-form']}
                        onSubmit={(e) => {
                          e.preventDefault()
                          updateOrder(
                            orders?.find((o) => o.orderID === order.orderID) as ICart
                          )
                        }}
                      >
                        <label>
                          <span>{EPrice[language]}</span>
                          <input
                            type='number'
                            className='bg'
                            name={`price-${item.id}`}
                            defaultValue={item.price}
                            onChange={(e) => {
                              setOrders(
                                orders?.map((o) =>
                                  o.orderID === order.orderID
                                    ? {
                                        ...o,
                                        items: o.items.map((i) =>
                                          i.id === item.id
                                            ? { ...i, price: Number(e.target.value) }
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
                          <span>{EQuantity[language]}</span>
                          <input
                            type='number'
                            className='bg'
                            name={`quantity-${item.id}`}
                            defaultValue={item.quantity}
                            onChange={(e) => {
                              //item.quantity = Number(e.target.value)
                              setOrders(
                                orders?.map((o) =>
                                  o.orderID === order.orderID
                                    ? {
                                        ...o,
                                        items: o.items.map((i) =>
                                          i.id === item.id
                                            ? { ...i, quantity: Number(e.target.value) }
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
                          <span>{EInfo[language]}</span>
                          <textarea
                            name={`details-${item.id}`}
                            rows={6}
                            defaultValue={item.details}
                            onChange={(e) => {
                              // item.details = e.target.value
                              setOrders(
                                orders?.map((o) =>
                                  o.orderID === order.orderID
                                    ? {
                                        ...o,
                                        items: o.items.map((i) =>
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
                          instructions={EStatus[language]}
                          options={statusOptions}
                          value={statusOptions.find((o) => o.value === item.status)}
                          onChange={(c) => {
                            // item.status = c?.value as status
                            setOrders(
                              orders?.map((o) =>
                                o.orderID === order.orderID
                                  ? {
                                      ...o,
                                      items: o.items.map((i) =>
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
                          instructions={EPaymentState[language]}
                          options={paidOptions}
                          value={paidOptions.find((o) => o.value === item.paid)}
                          onChange={(c) => {
                            // item.paid = c?.value as paid
                            setOrders(
                              orders?.map((o) =>
                                o.orderID === order.orderID
                                  ? {
                                      ...o,
                                      items: o.items.map((i) =>
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

                        <button type='submit'>{ESubmit[language]}</button>
                      </form>
                    </>
                  </Accordion>
                </div>
              ))}
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
                {order.extra && order.extra.trim() !== '' && (
                  <p>
                    <strong>{EAdditionalInformation[language]}: </strong> <br />
                    {splitToLines(order.extra)}
                  </p>
                )}

                <Accordion
                  language={language}
                  text={`${EEdit[language]} (${EInfo[language]})`}
                  hideBrackets
                  className={`narrow2 change-status`}
                  wrapperClass={styles['change-status-info']}
                >
                  <>
                    <form
                      className={styles['change-status-form']}
                      onSubmit={(e) => {
                        e.preventDefault()
                        updateOrder(
                          orders?.find((o) => o.orderID === order.orderID) as ICart
                        )
                      }}
                    >
                      {Object.keys(order.info).map((item, index) => {
                        if (item === '_id') return null
                        return (
                          <label key={`${item}-${index}`}>
                            <span>{info(item as keyof IInfo)}</span>
                            <input
                              type='text'
                              className='bg'
                              name={`info-${item}-${index}`}
                              defaultValue={order.info[item as keyof typeof order.info]}
                              onChange={(e) => {
                                setOrders(
                                  orders?.map((o) =>
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
                        <span>{EAdditionalInformation[language]}</span>
                        <textarea
                          rows={6}
                          name={`additional-${order.orderID}`}
                          defaultValue={order.extra}
                          onChange={(e) => {
                            // order.extra = e.target.value
                            setOrders(
                              orders?.map((o) =>
                                o.orderID === order.orderID
                                  ? { ...o, extra: e.target.value }
                                  : o
                              )
                            )
                          }}
                        />
                      </label>

                      {order.items?.every((item) => item.paid === 'full') ? (
                        <button
                          key={order.updatedAt.toString()}
                          onClick={() => {
                            // order.status = 'completed'
                            setOrders(
                              orders?.map((o) =>
                                o.orderID === order.orderID
                                  ? { ...o, status: 'completed' }
                                  : o
                              )
                            )
                            updateOrder(
                              orders?.find((o) => o.orderID === order.orderID) as ICart
                            )
                          }}
                        >
                          {EOrderCompleted[language]}
                        </button>
                      ) : (
                        <div key={order.updatedAt.toString()}>
                          {EOrderNotCompleted[language]} <br />
                          {order.items?.some((item) => item.paid !== 'full') &&
                            EMissingPayment[language]}
                          :{' '}
                          <ul className='ul'>
                            {order.items
                              ?.filter((item) => item.paid !== 'full')
                              .map((item, index) => (
                                <li key={`${item.paid}-${index}`}>
                                  {item.name} ({paidStatus[item.paid]})
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                      <button type='submit'>{ESubmit[language]}</button>
                    </form>
                  </>
                </Accordion>
                {user && user.role && user.role > 2 && (
                  <div className={`${styles['delete-order']}`}>
                    <button
                      key={order.createdAt.toString()}
                      className={`danger delete`}
                      onClick={() => {
                        if (
                          window.confirm(
                            `${EAreYouSureYouWantToDelete[language]} ${order.orderID}?`
                          )
                        )
                          deleteOrder(order.orderID)
                      }}
                    >
                      {EDelete[language]}: {order.orderID}
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
