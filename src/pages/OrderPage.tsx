import { splitToLines } from '../utils'
import styles from '../components/Store/store.module.css'
import { ReducerProps } from '../types'
import { useSelector } from 'react-redux'
import { IInfo } from '../types/store'
import React from 'react'
import { SelectOption } from '../components/Select/Select'
import { status, paid } from '../types/store'
import { useLanguageContext } from '../contexts/LanguageContext'
import { useWindow } from '../hooks/useSSR'
import Order from '../components/Store/components/Order'
import Orders from '../components/Store/components/Orders'

interface OrderPageProps {
  type: string
}

const OrderPage: React.FC<OrderPageProps> = ({ type }) => {
  const windowObj = useWindow()

  const { t, language } = useLanguageContext()

  const user = useSelector((state: ReducerProps) => state.auth?.user)
  const urlParams = new URLSearchParams(
    windowObj ? windowObj.location.search : ''
  )
  const orderID = urlParams.get('orderID')

  const statusesList: status[] = [
    'pending',
    'in progress',
    'completed',
    'cancelled',
  ]
  const paidList: paid[] = ['none', 'partial', 'full']

  const itemStatus = (status: status) => {
    switch (status) {
      case 'pending':
        return t('Pending')
      case 'in progress':
        return t('InProgress')
      case 'completed':
        return t('OrderCompleted')
      case 'cancelled':
        return t('Cancelled')
      default:
        return t('Pending')
    }
  }

  const paidStatus = {
    none: t('NoPayment'),
    partial: t('Partial'),
    full: t('Full'),
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
        return t('Name')
      case 'email':
        return t('Email')
      case 'phone':
        return t('Phone')
      case 'address':
        return t('BillingAddress')
      case 'city':
        return t('City')
      case 'zip':
        return t('PostalCode')
      case 'country':
        return t('Country')
      case 'companyName':
        return t('CompanyName')
      case 'businessID':
        return t('BusinessID')
      default:
        return key
    }
  }

  return (
    <>
      <div className={`order ${type} ${styles['orders-page']}`}>
        <div className="inner-wrap">
          <section className="card" style={{ position: 'relative', zIndex: 2 }}>
            <div>
              {!orderID && user?.role && user?.role > 1 ? (
                <Orders
                  user={user}
                  statusOptions={statusOptions}
                  paidOptions={paidOptions}
                  splitToLines={splitToLines}
                  paidStatus={paidStatus}
                  itemStatus={itemStatus}
                  info={info}
                />
              ) : (
                <Order
                  language={language}
                  paidStatus={paidStatus}
                  itemStatus={itemStatus}
                  splitToLines={splitToLines}
                  info={info}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
export default OrderPage
