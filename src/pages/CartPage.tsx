import React from 'react'
import { ICartItem } from '../types/store'
import Cart from '../components/Cart/Cart'

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
  return (
    <>
      {/* <Helmet prioritizeSeoTags={true}>
        <meta charSet="utf-8" />
        <meta name="author" content="Jenniina Laine" />
        <meta property="og:type" content="website" />

        <title>{t("Cart")} | react.jenniina.fi</title>
        <meta name="description" content={t("Cart")} />
        <link rel="canonical" href={`https://react.jenniina.fi/cart`} />
        <meta
          property="og:title"
          content={`${t("Cart")} | react.jenniina.fi`}
        />
        <meta property="og:description" content={t("Cart")} />
        <meta property="og:url" content={`https://react.jenniina.fi/cart`} />
        <meta property="og:type" content="website" />
      </Helmet> **/}
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
