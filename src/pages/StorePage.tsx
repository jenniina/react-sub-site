import { lazy, Suspense, useContext } from 'react'
//import Store from '../components/Store/Store'
import { ELanguages } from '../types'
import Hero from '../components/Hero/Hero'
import { ICartItem } from '../types/store'
import styles from '../components/Store/store.module.css'
import { LanguageContext } from '../contexts/LanguageContext'

interface StoreProps {
  language: ELanguages
  heading: string
  text: string
  type: string
  cart: ICartItem[]
  addToCart: (item: ICartItem) => void
  removeFromCart: (itemId: string) => void
}

const Store = lazy(() => import('../components/Store/Store'))

const StorePage: React.FC<StoreProps> = ({
  language,
  heading,
  text,
  type,
  cart,
  addToCart,
  removeFromCart,
}) => {
  const { t } = useContext(LanguageContext)!

  return (
    <div className={`store ${type} ${styles.store}`}>
      <div className={`inner-wrap ${styles['inner-wrap']}`}>
        <Suspense
          fallback={
            <div className='flex center margin0auto textcenter'>{t('Loading')}...</div>
          }
        >
          <Store
            language={language}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StorePage
