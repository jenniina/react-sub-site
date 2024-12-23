import { lazy, Suspense } from 'react'
import { Dispatch, SetStateAction } from 'react'
//import Cart from '../components/Cart/Cart'
import Hero from '../components/Hero/Hero'
import { ELanguages, ELoading } from '../interfaces'
import { ICartItem } from '../interfaces/store'

interface CartProps {
  heading: string
  text: string
  type: string
  language: ELanguages
  cart: ICartItem[]
  setCart: Dispatch<SetStateAction<ICartItem[]>>
  removeCart: () => void
}

const Cart = lazy(() => import('../components/Cart/Cart'))

const CartPage: React.FC<CartProps> = ({
  heading,
  text,
  type,
  language,
  cart,
  setCart,
  removeCart,
}) => {
  return (
    <div className={`cart ${type}`}>
      <Hero language={language} address='cart' heading={heading} text={text} />
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
                setCart={setCart}
                removeCart={removeCart}
              />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CartPage
