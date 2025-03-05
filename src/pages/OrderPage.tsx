import { splitToLines } from '../utils'
import styles from '../components/Store/store.module.css'
//import Order from '../components/Store/components/Order'
import { ELanguages, ReducerProps } from '../types'
import Hero from '../components/Hero/Hero'
import { useSelector } from 'react-redux'
//import Orders from '../components/Store/components/Orders'
import { IInfo } from '../types/store'
import { lazy, Suspense, useContext } from 'react'
import { SelectOption } from '../components/Select/Select'
import { status, paid } from '../types/store'
import { LanguageContext } from '../contexts/LanguageContext'

const Order = lazy(() => import('../components/Store/components/Order'))
const Orders = lazy(() => import('../components/Store/components/Orders'))

interface OrderPageProps {
  language: ELanguages
  heading: string
  text: string
  type: string
}

const OrderPage: React.FC<OrderPageProps> = ({ language, heading, text, type }) => {
  const { t } = useContext(LanguageContext)!

  const user = useSelector((state: ReducerProps) => state.auth?.user)
  const urlParams = new URLSearchParams(window.location.search)
  const orderID = urlParams.get('orderID')

  const statusesList: status[] = ['pending', 'in progress', 'completed', 'cancelled']
  const paidList: paid[] = ['none', 'partial', 'full']

  const itemStatus = (status: status) => {
    switch (status) {
      case 'pending':
        return t('EPending')
      case 'in progress':
        return t('EInProgress')
      case 'completed':
        return t('EOrderCompleted')
      case 'cancelled':
        return t('ECancelled')
      default:
        return t('EPending')
    }
  }

  const paidStatus = {
    none: t('ENoPayment'),
    partial: t('EPartial'),
    full: t('EFull'),
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
        return t('EName')
      case 'email':
        return t('EEmail')
      case 'phone':
        return t('EPhone')
      case 'address':
        return t('EBillingAddress')
      case 'city':
        return t('ECity')
      case 'zip':
        return t('EPostalCode')
      case 'country':
        return t('ECountry')
      case 'companyName':
        return t('ECompanyName')
      case 'businessID':
        return t('EBusinessID')
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
                    {t('ELoading')}...
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
                    {t('ELoading')}...
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
