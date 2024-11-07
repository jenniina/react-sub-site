import Store from '../components/Store/Store'
import { ELanguages } from '../interfaces'
import Hero from '../components/Hero/Hero'
import { ICartItem } from '../interfaces/store'
import styles from '../components/Store/store.module.css'

interface StoreProps {
  language: ELanguages
  heading: string
  text: string
  type: string
  cart: ICartItem[]
  setCart: React.Dispatch<React.SetStateAction<ICartItem[]>>
}

const StorePage: React.FC<StoreProps> = ({
  language,
  heading,
  text,
  type,
  cart,
  setCart,
}) => {
  return (
    <div className={`store ${type} ${styles.store}`}>
      <Hero language={language} address='store' heading={heading} text={text} />
      <div className={`inner-wrap ${styles['inner-wrap']}`}>
        <Store language={language} cart={cart} setCart={setCart} />
      </div>
    </div>
  )
}

export default StorePage
