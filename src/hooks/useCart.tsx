import useLocalStorage from './useStorage'
import { ICartItem } from '../types/store'

const localStorageCartKey = 'JCart'

const useCart = () => {
  const [cart, setCart, removeCart] = useLocalStorage<ICartItem[]>(
    localStorageCartKey,
    []
  )

  const addToCart = (item: ICartItem | undefined) => {
    if (item) {
      const existingItem = cart.find(i => i.id === item.id)
      if (existingItem) {
        existingItem.quantity += 1
        setCart([...cart])
        return
      } else {
        setCart([...cart, item])
      }
    }
  }

  const removeFromCart = (itemId: string) => {
    const existingItem = cart.find(i => i.id === itemId)
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1
      setCart([...cart])
      return
    } else {
      setCart(cart.filter(i => i.id !== itemId))
    }
  }

  const editDetails = (itemId: string, details: string) => {
    setCart(cart.map(i => (i.id === itemId ? { ...i, details } : i)))
  }

  const clearCart = () => {
    removeCart()
    setCart([])
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
