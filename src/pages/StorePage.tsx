import React from 'react'
import { ICartItem } from '../types/store'
import styles from '../components/Store/store.module.css'
import Store from '../components/Store/Store'
import { useLanguageContext } from '../contexts/LanguageContext'
import SEO from '../components/SEO/SEO'

interface StoreProps {
  type: string
  cart: ICartItem[]
  addToCart: (item: ICartItem) => void
  removeFromCart: (itemId: string) => void
}

const StorePage: React.FC<StoreProps> = ({
  type,
  cart,
  addToCart,
  removeFromCart,
}) => {
  const { t } = useLanguageContext()

  return (
    <>
      <SEO
        title={`${t('Store')} | react.jenniina.fi`}
        description={`${t('Store')} | ${t('WebpagesAndGraphicDesign')}`}
        canonicalUrl={'https://react.jenniina.fi/store'}
      />
      <div className={`store ${type} ${styles.store}`}>
        <div className={`inner-wrap ${styles['inner-wrap']}`}>
          <Store
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </div>
      </div>
    </>
  )
}

export default StorePage
