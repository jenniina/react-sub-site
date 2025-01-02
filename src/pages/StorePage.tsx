import { lazy, Suspense } from 'react'
//import Store from '../components/Store/Store'
import { ELanguages, ELoading } from '../types'
import Hero from '../components/Hero/Hero'
import { ICartItem } from '../types/store'
import styles from '../components/Store/store.module.css'

interface StoreProps {
  language: ELanguages
  heading: string
  text: string
  type: string
  cart: ICartItem[]
  setCart: React.Dispatch<React.SetStateAction<ICartItem[]>>
}

const Store = lazy(() => import('../components/Store/Store'))

const StorePage: React.FC<StoreProps> = ({
  language,
  heading,
  text,
  type,
  cart,
  setCart,
}) => {
  return (
    <div className={`store ${type} ${styles.store}`}>
      <div className={`inner-wrap ${styles['inner-wrap']}`}>
        <Suspense
          fallback={
            <div className='flex center margin0auto textcenter'>
              {ELoading[language]}...
            </div>
          }
        >
          <Store language={language} cart={cart} setCart={setCart} />
        </Suspense>
      </div>
    </div>
  )
}

export default StorePage
