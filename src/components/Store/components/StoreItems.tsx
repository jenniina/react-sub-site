import { FC, useState } from 'react'
import styles from '../store.module.css'
import { ELanguages, ERemove, ReducerProps } from '../../../interfaces'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import {
  EAddToCart,
  EContainsVAT,
  EPrice,
  EQuantity,
  ICartItem,
} from '../../../interfaces/store-cart'
import { useSelector } from 'react-redux'
import useLocalStorage from '../../../hooks/useStorage'

interface Props {
  language: ELanguages
  items: ICartItem[]
  type: string
  id: string
}
const StoreItems: FC<Props> = ({ language, items, type, id }) => {
  const dispatch = useAppDispatch()

  const localStorageCart = 'JCart'

  const [cart, setCart] = useLocalStorage<ICartItem[]>(localStorageCart, [])

  return (
    <>
      <h2 id={id}>{type}</h2>
      {items.map((item) => (
        <div
          key={item.id}
          className={`${styles['cart-item']} ${
            language !== ELanguages.English && language !== ELanguages.Suomi
              ? styles.foreign
              : ''
          }`}
        >
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>
            {EPrice[language]}: {item.price}€ <br />
            <small>({EContainsVAT[language]})</small>
          </p>
          <p>
            {EQuantity[language]}: {item.quantity}{' '}
            <button
              id='add-to-cart'
              onClick={() => {
                const existingItem = cart.find((cartItem) => cartItem.id === item.id)
                if (existingItem) {
                  setCart(
                    cart.map((cartItem) =>
                      cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                    )
                  )
                } else {
                  setCart([...cart, { ...item, quantity: 1 }])
                }
              }}
            >
              {EAddToCart[language]}
            </button>
            <button
              id='remove-from-cart'
              onClick={() => {
                const existingItem = cart.find((cartItem) => cartItem.id === item.id)
                if (existingItem) {
                  if (existingItem.quantity > 1) {
                    setCart(
                      cart.map((cartItem) =>
                        cartItem.id === item.id
                          ? { ...cartItem, quantity: cartItem.quantity - 1 }
                          : cartItem
                      )
                    )
                  } else {
                    setCart(cart.filter((cartItem) => cartItem.id !== item.id))
                  }
                }
              }}
            >
              {ERemove[language]}
            </button>
          </p>
          {/* <p>Details: {item.details}</p> */}
        </div>
      ))}
    </>
  )
}

export default StoreItems
