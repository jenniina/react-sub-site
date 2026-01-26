import React from 'react'
import { ICartItem } from '../types/store'
import Cart from '../components/Cart/Cart'
import { useLanguageContext } from '../contexts/LanguageContext'
import SEO from '../components/SEO/SEO'

interface CartProps {
  type: string
  cart: ICartItem[]
  addToCart: (item: ICartItem | undefined) => void
  editDetails: (itemId: string, details: string) => void
  removeFromCart: (itemId: string) => void
  removeCart: () => void
}

const CartPage: React.FC<CartProps> = ({
  type,
  cart,
  addToCart,
  removeFromCart,
  editDetails,
  removeCart,
}) => {
  const { t } = useLanguageContext()

  return (
    <>
      <SEO
        title={`${t('Cart')} | react.jenniina.fi`}
        description={t('Cart')}
        canonicalUrl={'https://react.jenniina.fi/cart'}
      />
      <div className={`cart ${type}`}>
        <div className="inner-wrap">
          <section className="card" style={{ position: 'relative', zIndex: 2 }}>
            <div>
              <Cart
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                removeCart={removeCart}
                editDetails={editDetails}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default CartPage
