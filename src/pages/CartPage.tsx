import { Dispatch, SetStateAction } from 'react'
import Cart from '../components/Cart/Cart'
import Hero from '../components/Hero/Hero'
import { ELanguages } from '../interfaces'
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
            <Cart
              language={language}
              cart={cart}
              setCart={setCart}
              removeCart={removeCart}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default CartPage
