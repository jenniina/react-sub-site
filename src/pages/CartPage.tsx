import { lazy, Suspense, useContext } from 'react'
import { ELanguages } from '../types'
import { ICartItem } from '../types/store'
import { LanguageContext } from '../contexts/LanguageContext'

interface CartProps {
  heading: string
  text: string
  type: string
  language: ELanguages
  cart: ICartItem[]
  addToCart: (item: ICartItem | undefined) => void
  editDetails: (itemId: string, details: string) => void
  removeFromCart: (itemId: string) => void
  removeCart: () => void
}

const Cart = lazy(() => import('../components/Cart/Cart'))

const CartPage: React.FC<CartProps> = ({
  heading,
  text,
  type,
  language,
  cart,
  addToCart,
  removeFromCart,
  editDetails,
  removeCart,
}) => {
  const { t } = useContext(LanguageContext)!

  return (
    <div className={`cart ${type}`}>
      <div className='inner-wrap'>
        <section className='card' style={{ position: 'relative', zIndex: 2 }}>
          <div>
            <Suspense
              fallback={
                <div className='flex center margin0auto textcenter'>
                  {t('ELoading')}...
                </div>
              }
            >
              <Cart
                language={language}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                removeCart={removeCart}
                editDetails={editDetails}
              />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CartPage
