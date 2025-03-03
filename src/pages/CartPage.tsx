import { lazy, Suspense } from 'react'
import { Dispatch, SetStateAction } from 'react'
//import Cart from '../components/Cart/Cart'
import Hero from '../components/Hero/Hero'
import { ELanguages, ELoading } from '../types'
import { ICartItem } from '../types/store'

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
  return (
    <div className={`cart ${type}`}>
      <div className='inner-wrap'>
        <section className='card' style={{ position: 'relative', zIndex: 2 }}>
          <div>
            <Suspense
              fallback={
                <div className='flex center margin0auto textcenter'>
                  {ELoading[language]}...
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
