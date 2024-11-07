import { FC, ReactNode, Dispatch, SetStateAction } from 'react'
import styles from '../store.module.css'
import { FaWordpress, FaReact, FaNodeJs } from 'react-icons/fa'
import { ImImages } from 'react-icons/im'
import { ELanguages, ERemove, ESavingSuccessful } from '../../../interfaces'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import {
  EAddedToCart,
  EAddToCart,
  ECart,
  EContainsVAT,
  EGoToCart,
  EPrice,
  ICartItem,
} from '../../../interfaces/store'
import { notify } from '../../../reducers/notificationReducer'
import { useTheme } from '../../../hooks/useTheme'
import AdditionalInfo from './AdditionalInfo'
import { Link } from 'react-router-dom'
import { BsCart2 } from 'react-icons/bs'
import { splitToLines } from '../../../utils'

interface Props {
  language: ELanguages
  items: ICartItem[]
  name: string
  id: string
  cart: ICartItem[]
  setCart: Dispatch<SetStateAction<ICartItem[]>>
  intro: string
  link: ReactNode | null
}

const StoreItems: FC<Props> = ({
  language,
  items,
  name,
  id,
  cart,
  setCart,
  intro,
  link,
}) => {
  const dispatch = useAppDispatch()
  const lightTheme = useTheme()

  return (
    <>
      <section
        className={`card ${styles.card} ${styles['store-items']} ${
          lightTheme ? styles.light : ''
        }`}
        style={{ width: '100%', position: 'relative', zIndex: 2 }}
      >
        <div>
          <div className={`${styles['store-wrap']} ${styles[id]}`}>
            {id !== 'misc' && (
              <h2 id={id}>
                {id === 'wordpress' ? (
                  <>
                    <FaWordpress />
                  </>
                ) : id === 'react' ? (
                  <>
                    <FaReact />
                  </>
                ) : id === 'graphic' ? (
                  <>
                    <ImImages />
                  </>
                ) : (
                  ''
                )}
                <span>{name}</span>
                {id === 'react' ? (
                  <>
                    <FaNodeJs />
                  </>
                ) : (
                  ''
                )}
              </h2>
            )}
            {intro && intro.trim() !== '' && (
              <p style={{ margin: 0, minWidth: '100%' }}>{intro}</p>
            )}
            {link && (
              <div className={styles['links']} style={{ marginTop: 0, minWidth: '100%' }}>
                {link}
              </div>
            )}

            <AdditionalInfo
              type={id}
              language={language}
              styles={styles}
              classNameWrap={styles['additional-information']}
              isOpen={true}
              setIsFormOpen={() => {}}
            />

            {items.map((item) => (
              <div
                key={item.id}
                id={item.id}
                className={`${styles['store-item']} ${
                  language !== ELanguages.English && language !== ELanguages.Suomi
                    ? styles.foreign
                    : ''
                }`}
              >
                <h3>{item.name}</h3>
                <p className={styles.grow}>{splitToLines(item.description)}</p>

                <p>
                  {EPrice[language]}: {item.price} €{' '}
                  {item.id === 'misc-quote' ? null : (
                    <small>({EContainsVAT[language]})</small>
                  )}
                </p>

                {(() => {
                  const cartItem = cart.find((cartItem) => cartItem.id === item.id)
                  return cartItem && cartItem.quantity > 0 ? (
                    <>
                      <p className={styles.added}>
                        <span>{EAddedToCart[language]}</span>{' '}
                        <button
                          className={`${styles['remove-from-cart']} danger delete`}
                          onClick={() => {
                            if (
                              window.confirm(
                                `${ERemove[language]} ${item.name} ${ECart[language]}?`
                              )
                            )
                              setCart(cart.filter((cartItem) => cartItem.id !== item.id))
                          }}
                        >
                          {ERemove[language]}
                        </button>
                      </p>
                    </>
                  ) : (
                    <button
                      id='add-to-cart'
                      className={styles['add-to-cart']}
                      onClick={() => {
                        const existingItemInCart = cart.find(
                          (cartItem) => cartItem.id === item.id
                        )
                        if (existingItemInCart) {
                          setCart(
                            cart.map((cartItem) =>
                              cartItem.id === item.id
                                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                : cartItem
                            )
                          )
                        } else {
                          setCart([...cart, { ...item, quantity: 1 }])
                          dispatch(notify(`${ESavingSuccessful[language]}`, false, 3))
                        }
                      }}
                    >
                      <BsCart2 style={{ fontSize: '1.3em' }} />{' '}
                      <span>{EAddToCart[language]}</span>
                    </button>
                  )
                })()}

                {cart.map(
                  (cartItem) =>
                    cartItem.id === item.id &&
                    cartItem.quantity > 0 && (
                      <Link key={cartItem.id} to='/cart' className={styles['cart-link']}>
                        <BsCart2 style={{ fontSize: '1.3em' }} />{' '}
                        <big>{EGoToCart[language]} &raquo;</big>
                      </Link>
                    )
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default StoreItems
