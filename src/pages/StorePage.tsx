import React from 'react'
import { ELanguages } from '../types'
import Hero from '../components/Hero/Hero'
import { ICartItem } from '../types/store'
import styles from '../components/Store/store.module.css'
import { useLanguageContext } from '../contexts/LanguageContext'
import Store from '../components/Store/Store'

interface StoreProps {
  language: ELanguages
  heading: string
  text: string
  type: string
  cart: ICartItem[]
  addToCart: (item: ICartItem) => void
  removeFromCart: (itemId: string) => void
}

const StorePage: React.FC<StoreProps> = ({
  language,
  heading,
  text,
  type,
  cart,
  addToCart,
  removeFromCart,
}) => {
  const { t } = useLanguageContext()

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
            language={language}
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
