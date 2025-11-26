import React from 'react'
import { ICartItem } from '../types/store'
import styles from '../components/Store/store.module.css'
import Store from '../components/Store/Store'

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
  return (
    <>
      {/*  <Helmet prioritizeSeoTags={true}>
        <meta charSet="utf-8" />
        <meta name="author" content="Jenniina Laine" />
        <meta property="og:type" content="website" />

        <title>{t("Store")} | react.jenniina.fi</title>
        <meta
          name="description"
          content={`${t("Store")} | ${t("WebpagesAndGraphicDesign")}`}
        />
        <link rel="canonical" href={`https://react.jenniina.fi/store`} />
        <meta
          property="og:title"
          content={`${t("Store")} | react.jenniina.fi`}
        />
        <meta
          property="og:description"
          content={`${t("Store")} | ${t("WebpagesAndGraphicDesign")}`}
        />
        <meta property="og:url" content={`https://react.jenniina.fi/store`} />
        <meta property="og:type" content="website" />
      </Helmet> */}
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
