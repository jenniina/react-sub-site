import React from 'react'
import { ELanguages } from '../types'
import { ICartItem } from '../types/store'
import { useLanguageContext } from '../contexts/LanguageContext'
import Cart from '../components/Cart/Cart'

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
  const { t } = useLanguageContext()

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
                language={language}
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
