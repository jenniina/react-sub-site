import { useEffect, FC, useState } from 'react'
import styles from './cart.module.css'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { EEdit, ELanguages, ReducerProps } from '../../interfaces'
import { ICart, EAddToCart, ECart, ESubtractFromCart } from '../../interfaces/store-cart'
import useLocalStorage from '../../hooks/useStorage'
import Accordion from '../Accordion/Accordion'
import { useTheme } from '../../hooks/useTheme'
import cartService from '../../services/cart'

interface Props {
  language: ELanguages
}

const Cart: FC<Props> = ({ language }) => {
  const dispatch = useAppDispatch()
  const lightTheme = useTheme()
  const user = useSelector((state: ReducerProps) => state.auth?.user)
  // const cart = useSelector((state: ReducerProps) => state.cart)
  const localStorageCart = 'JCart'
  const [items, setItems] = useLocalStorage<ICart['items']>('localStorageItems', [])
  const [itemName, setItemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState(0)
  const [itemPrice, setItemPrice] = useState(0)
  const [itemDetails, setItemDetails] = useState('')
  const [total, setTotal] = useLocalStorage<ICart['total']>('localStorageTotal', 0)
  const [email, setEmail] = useLocalStorage<ICart['email']>('localStorageEmail', '')
  const [name, setName] = useLocalStorage<ICart['name']>('localStorageName', '')
  const [details, setDetails] = useLocalStorage<ICart['details']>(
    'localStorageDetails',
    ''
  )

  function loadCart(): Promise<ICart | null> {
    return new Promise((resolve) => {
      const localCart = localStorage.getItem(localStorageCart)
      if (localCart) {
        const cart = JSON.parse(localCart)
        resolve(cart)
      }
      //   else if (user) {
      //     dispatch(
      //       fetchCartItems({
      //         user: user?._id,
      //         language,
      //       })
      //     ).then((res) => {
      //       const payload: ICartResponse = res.payload as ICartResponse
      //       setItems(payload.cart.items)
      //       setTotal(payload.cart.total)
      //       setEmail(payload.cart.email)
      //       setName(payload.cart.name)
      //       setDetails(payload.cart.details)
      //       resolve(payload.cart)
      //     })
      //   }
      else {
        resolve(null)
      }
    })
  }

  useEffect(() => {
    const load = async () => {
      const cart = await loadCart()
      if (cart) {
        setItems(cart.items)
        setTotal(cart.total)
        setEmail(cart.email)
        setName(cart.name)
        setDetails(cart.details)
      }
    }
    load()
  }, [dispatch, user, language])

  return (
    <div className={`${lightTheme ? styles.light : ''}`}>
      {items.map((item, index) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.description}</p>
          <p className='flex gap-half'>
            <span>{item.quantity}</span>

            <div className='input-wrap'>
              <label htmlFor={`${item.id}-quantity`}>
                <input
                  type='number'
                  required
                  id={`${item.id}-quantity`}
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(parseInt(e.target.value))}
                />
                <span>{EEdit[language]}:</span>
              </label>
            </div>
            <button
              onClick={() => {
                setItems(
                  items.map((item) => {
                    if (item.id === item.id) {
                      item.quantity += 1
                    }
                    return item
                  })
                )
              }}
              className='tooltip-wrap'
            >
              <span className='tooltip narrow2'>{EAddToCart[language]}</span>
              <span>+1</span>
            </button>
            <button
              onClick={() => {
                setItems(
                  items.map((item) => {
                    if (item.id === item.id) {
                      item.quantity -= 1
                    }
                    return item
                  })
                )
              }}
              className='tooltip-wrap'
            >
              <span className='tooltip narrow2'>{ESubtractFromCart[language]}</span>
              <span>-1</span>
            </button>
          </p>
          <p>{item.price}</p>
          <p>
            {item.details}
            <Accordion
              language={language}
              id={item.id}
              text={EEdit[language]}
              tooltip={EEdit[language]}
              x='right'
              y='below'
              className='narrow2'
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setItems(
                    items.map((item) => {
                      if (item.id === item.id) {
                        item.details = itemDetails
                      }
                      return item
                    })
                  )
                }}
              >
                <div className='input-wrap'>
                  <label htmlFor={`${item.id}-details`}>
                    <input
                      type='text'
                      required
                      id={`${item.id}-details`}
                      value={itemDetails}
                      onChange={(e) => setItemDetails(e.target.value)}
                    />
                    <span>{EEdit[language]}:</span>
                  </label>
                </div>
                <button type='submit'>{EEdit[language]}</button>
              </form>
            </Accordion>
          </p>
        </div>
      ))}
      <p>Total: {total}</p>
    </div>
  )
}

export default Cart
