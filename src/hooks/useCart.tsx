import useLocalStorage from './useStorage'
import { ICartItem } from '../types/store'

const localStorageCartKey = 'JCart'

const useCart = () => {
  const [cart, setCart, removeCart] = useLocalStorage<ICartItem[]>(
    localStorageCartKey,
    []
  )

  const addToCart = (item: ICartItem | undefined) => {
    if (!item || cart.some((cartItem) => cartItem.id === item.id)) {
      return
    } else setCart([...cart, item])
  }

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  const editDetails = (itemId: string, details: string) => {
    setCart(cart.map((i) => (i.id === itemId ? { ...i, details } : i)))
  }

  const clearCart = () => {
    removeCart()
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    editDetails,
    clearCart,
  }
}

export default useCart
