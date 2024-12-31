import { splitToLines } from '../utils'
import styles from '../components/Store/store.module.css'
//import Order from '../components/Store/components/Order'
import {
  EEmail,
  EHide,
  ELanguages,
  ELoading,
  EName,
  EShow,
  ReducerProps,
} from '../interfaces'
import Hero from '../components/Hero/Hero'
import { useSelector } from 'react-redux'
//import Orders from '../components/Store/components/Orders'
import {
  EBillingAddress,
  EBusinessID,
  ECancelled,
  ECity,
  ECompanyName,
  ECountry,
  EFull,
  EInProgress,
  ENoPayment,
  EOrderCompleted,
  EOrders,
  EPartial,
  EPending,
  EPhone,
  EPostalCode,
  ICart,
  IInfo,
} from '../interfaces/store'
import { lazy, Suspense } from 'react'
import { SelectOption } from '../components/Select/Select'
import { status, paid } from '../interfaces/store'

const Order = lazy(() => import('../components/Store/components/Order'))
const Orders = lazy(() => import('../components/Store/components/Orders'))

interface OrderPageProps {
  language: ELanguages
  heading: string
  text: string
  type: string
}

const OrderPage: React.FC<OrderPageProps> = ({ language, heading, text, type }) => {
  const user = useSelector((state: ReducerProps) => state.auth?.user)
  const urlParams = new URLSearchParams(window.location.search)
  const orderID = urlParams.get('orderID')

  const statusesList: status[] = ['pending', 'in progress', 'completed', 'cancelled']
  const paidList: paid[] = ['none', 'partial', 'full']

  const itemStatus = (status: status) => {
    switch (status) {
      case 'pending':
        return EPending[language]
      case 'in progress':
        return EInProgress[language]
      case 'completed':
        return EOrderCompleted[language]
      case 'cancelled':
        return ECancelled[language]
      default:
        return EPending[language]
    }
  }

  const paidStatus = {
    none: ENoPayment[language],
    partial: EPartial[language],
    full: EFull[language],
  }

  const statusOptions: SelectOption[] = statusesList.map((status) => ({
    value: status,
    label: itemStatus(status),
  }))
  const paidOptions: SelectOption[] = paidList.map((paid) => ({
    value: paid,
    label: paidStatus[paid],
  }))

  const info = (key: keyof IInfo): string => {
    switch (key) {
      case 'name':
        return EName[language]
      case 'email':
        return EEmail[language]
      case 'phone':
        return EPhone[language]
      case 'address':
        return EBillingAddress[language]
      case 'city':
        return ECity[language]
      case 'zip':
        return EPostalCode[language]
      case 'country':
        return ECountry[language]
      case 'companyName':
        return ECompanyName[language]
      case 'businessID':
        return EBusinessID[language]
      default:
        return key
    }
  }

  return (
    <div className={`order ${type} ${styles['orders-page']}`}>
      <div className='inner-wrap'>
        <section className='card' style={{ position: 'relative', zIndex: 2 }}>
          <div>
            {!orderID && user && user?.role && user?.role > 1 ? (
              <Suspense
                fallback={
                  <div className='flex center margin0auto textcenter'>
                    {ELoading[language]}...
                  </div>
                }
              >
                <Orders
                  language={language}
                  user={user}
                  statusOptions={statusOptions}
                  paidOptions={paidOptions}
                  splitToLines={splitToLines}
                  paidStatus={paidStatus}
                  itemStatus={itemStatus}
                  info={info}
                />
              </Suspense>
            ) : (
              <Suspense
                fallback={
                  <div className='flex center margin0auto textcenter'>
                    {ELoading[language]}...
                  </div>
                }
              >
                <Order
                  language={language}
                  paidStatus={paidStatus}
                  itemStatus={itemStatus}
                  splitToLines={splitToLines}
                  info={info}
                />
              </Suspense>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
export default OrderPage
