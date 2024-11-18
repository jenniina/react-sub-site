import { useEffect, FC, useState } from 'react'
import styles from './cart.module.css'
import AdditionalInfo from '../Store/components/AdditionalInfo'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import {
  EClarifications,
  EEdit,
  EEmail,
  EEmailAddress,
  EIAcceptThe,
  EInfo,
  EItIsAlrightToSendTheEnteredInformationToJenniina,
  ELanguages,
  EMoreInformation,
  EName,
  ENo,
  EOptional,
  ERemember,
  ERememberToSave,
  ERemove,
  ERequestsIdeasAndLinksForInspiration,
  ESave,
  EStore,
  ETermsOfService,
  ETermsOfServiceLink,
  EYes,
  ReducerProps,
} from '../../interfaces'
import {
  ICart,
  EAddToCart,
  ECart,
  ESubtractFromCart,
  ICartItem,
  ETotal,
  EClearCart,
  ESubmitOrder,
  EPleaseChooseAProduct,
  EEmptyCart,
  EQuantity,
  EPrice,
  EBackToStore,
  ERequestsAndNeeds,
  ECompany,
  EAssociation,
  ECompanyOrAssociation,
  EPrivatePerson,
  EBusinessID,
  EContactPerson,
  ECountry,
  EBillingAddress,
  ECity,
  EPostalCode,
  EPhone,
  ECompanyName,
  EAssociationName,
  EPrintingCostsNotIncluded,
  EFreeHourUnlocked,
  EPayFor5HoursGet6,
  EHourlyWorkCanBeUsed,
  EPayFor10HoursGet13,
  EHour,
  EHours,
  ESaveTheFollowingAmountOfMoney,
  paid,
  status,
  EIncludes,
  EEG,
  EDesiredReference,
  ETermsRelatedToProducts,
} from '../../interfaces/store'
import useLocalStorage from '../../hooks/useStorage'
import Accordion from '../Accordion/Accordion'
import { useTheme } from '../../hooks/useTheme'
import cartService from '../../services/cart'
import {
  EAdditionalInformation,
  EClarification,
  EGDPRConsent,
  EPleaseFillInTheFields,
} from '../../interfaces/form'
import { notify } from '../../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { getRandomLetters, getRandomMinMax, splitToLines } from '../../utils'
import ButtonToggle from '../ButtonToggle/ButtonToggle'
import { FaHourglassStart, FaStoreAlt } from 'react-icons/fa'
import { RiMailSendLine } from 'react-icons/ri'
import { EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo } from '../../interfaces/about'
import { TermsProducts } from '../../pages/TermsOfService'

interface Props {
  language: ELanguages
  cart: ICartItem[]
  setCart: React.Dispatch<React.SetStateAction<ICartItem[]>>
  removeCart: () => void
}

const Cart: FC<Props> = ({ language, cart, setCart, removeCart }) => {
  const lightTheme = useTheme()
  const dispatch = useAppDispatch()

  const [total, setTotal] = useLocalStorage<ICart['total']>('localStorageTotal', 0)
  const [email, setEmail] = useLocalStorage<ICart['info']['email']>(
    'localStorageEmail',
    ''
  )
  const [name, setName] = useLocalStorage<ICart['info']['name']>('JCartName', '')
  const [business, setBusiness] = useLocalStorage<boolean>('JCartBusiness', false)
  const [companyName, setCompanyName] = useLocalStorage<ICart['info']['companyName']>(
    'JCartCompanyName',
    ''
  )
  const [country, setCountry] = useLocalStorage<ICart['info']['country']>(
    'JCartCountry',
    ''
  )
  const [address, setAddress] = useLocalStorage<ICart['info']['address']>(
    'JCartAddress',
    ''
  )
  const [city, setCity] = useLocalStorage<ICart['info']['city']>('JCartCity', '')
  const [zip, setZip] = useLocalStorage<ICart['info']['zip']>('JCartZip', '')
  const [phone, setPhone] = useLocalStorage<ICart['info']['phone']>('JCartPhone', '')
  const [businessID, setBusinessID] = useLocalStorage<ICart['info']['businessID']>(
    'JCartBusinessID',
    ''
  )
  const [info, setInfo] = useLocalStorage<ICart['info']>('JCartDetails', {
    email,
    name,
    businessID,
    zip,
    city,
    address,
    country,
    phone,
  })
  const [extra, setExtra] = useLocalStorage<ICart['extra']>('JCartExtra', '')
  const [GDPR, setGDPR] = useState<boolean>(false)
  const [terms, setTerms] = useState<boolean>(false)
  const [sending, setSending] = useState<boolean>(false)

  const freeHoursBreakpoint1 = 5
  const freeHoursBreakpoint2 = 10
  const freeAmount1 = 1
  const freeAmount2 = 3

  //set info
  useEffect(() => {
    setInfo({
      name,
      companyName,
      email,
      businessID,
      zip,
      city,
      address,
      country,
      phone,
    })
  }, [name, companyName, email, businessID, zip, city, address, country, phone])

  const handleQuantityChange = (itemId: string, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + change } : item
      )
    )
  }

  //set total
  useEffect(() => {
    setTotal(
      cart.reduce((acc, item) => {
        return acc + item.price * item.quantity
      }, 0)
    )
  }, [cart])

  return (
    <div className={`${styles['cart-wrap']} ${lightTheme ? styles.light : ''}`}>
      <Link to='/store' className={styles['back-to-store']}>
        <span aria-hidden={true}>&laquo;</span> <FaStoreAlt />{' '}
        <strong>{EBackToStore[language]}</strong>
      </Link>
      {language !== ELanguages.Suomi && language !== ELanguages.English && (
        <p>
          {EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo[language]}
        </p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSending(true)
          if (cart.length < 1) {
            dispatch(notify(EPleaseChooseAProduct[language], true, 8))
            setSending(false)
          }
          if (!GDPR) {
            dispatch(notify(`${ERemember[language]}: ${EGDPRConsent[language]}`, true, 8))
            setSending(false)
          } else if (!terms) {
            dispatch(
              notify(`${ERemember[language]}: ${ETermsOfService[language]}`, true, 8)
            )
            setSending(false)
          } else if (
            (business &&
              name &&
              name.trim() !== '' &&
              companyName &&
              companyName.trim() !== '' &&
              businessID &&
              businessID.trim() !== '' &&
              email &&
              email.trim() !== '' &&
              address &&
              address.trim() !== '' &&
              zip &&
              zip.trim() !== '' &&
              city &&
              city.trim() !== '' &&
              country &&
              country.trim() !== '') ||
            (!business &&
              name &&
              name.trim() !== '' &&
              email &&
              email.trim() !== '' &&
              address &&
              address.trim() !== '' &&
              zip &&
              zip.trim() !== '' &&
              city &&
              city.trim() !== '' &&
              country &&
              country.trim() !== '')
          ) {
            cartService
              .newOrder(language, {
                orderID: `${Math.ceil(
                  getRandomMinMax(100000, 999999)
                )}-${getRandomLetters(2, true)}`,
                info,
                total,
                extra,
                items: cart,
              })
              .then((res) => {
                if (res.success) {
                  dispatch(notify(res.message, false, 10))
                  setCart([])
                  removeCart()
                  setTotal(0)
                  setSending(false)
                } else {
                  dispatch(notify(res.message, false, 10))
                  setSending(false)
                }
              })
              .catch((err) => {
                if (err.response && err.response.data && err.response.data.message)
                  dispatch(notify(err.response.data.message, true, 8))
                else dispatch(notify(err.message, true, 8))
                setSending(false)
              })
          } else {
            dispatch(notify(EPleaseFillInTheFields[language], true, 8))
            setSending(false)
          }
        }}
        className={styles['cart-form']}
      >
        {cart.map((item, index) => {
          if (item.quantity < 1 || isNaN(item.quantity))
            setCart(cart.filter((i) => i.id !== item.id))
          else
            return (
              <div key={`${item.id}-${index}`} className={styles.wrap}>
                <h2>
                  <span>{index + 1}. </span>
                  <span>{item.name}</span>
                </h2>
                <p>{splitToLines(item.description)}</p>
                <AdditionalInfo
                  type={item.id}
                  language={language}
                  styles={styles}
                  isOpen={true}
                  setIsFormOpen={() => {}}
                  classNameWrap={styles['additional-info-wrap']}
                  text={EIncludes[language]}
                />
                <div className={`${styles['quantity']}`}>
                  {item.id !== 'misc-quote' ? (
                    <>
                      <button
                        type='button'
                        onClick={() => {
                          if (item.quantity - 1 < 1) {
                            if (window.confirm(`${ERemove[language]}: ${item.name}?`)) {
                              //remove item from cart
                              setCart(cart.filter((i) => i.id !== item.id))
                              return
                            } else return
                          }
                          handleQuantityChange(item.id, -1)
                        }}
                        className={`tooltip-wrap ${styles['quantity-btn']}`}
                      >
                        <span className='tooltip above space right narrow2'>
                          {ESubtractFromCart[language]}
                        </span>
                        <span>-1</span>
                      </button>

                      <span>
                        {EQuantity[language]}: {item.quantity}
                      </span>

                      <button
                        type='button'
                        onClick={() => {
                          handleQuantityChange(item.id, 1)
                        }}
                        className={`tooltip-wrap ${styles['quantity-btn']}`}
                      >
                        <span className='tooltip above space right narrow2'>
                          {EAddToCart[language]}
                        </span>
                        <span>+1</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type='button'
                      onClick={() => {
                        if (item.quantity - 1 < 1) {
                          if (window.confirm(`${ERemove[language]}: ${item.name}?`)) {
                            //remove item from cart
                            setCart(cart.filter((i) => i.id !== item.id))
                            return
                          } else return
                        }
                        handleQuantityChange(item.id, -1)
                      }}
                    >
                      <span>{ERemove[language]}</span>
                    </button>
                  )}
                  {item.quantity >= freeHoursBreakpoint2 ? (
                    <span>
                      {ETotal[language]}: {item.quantity + freeAmount2} {EHours[language]}
                    </span>
                  ) : item.quantity >= freeHoursBreakpoint1 ? (
                    <span>
                      {ETotal[language]}: {item.quantity + freeAmount1} {EHours[language]}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                {item.id !== 'misc-quote' ? (
                  <>
                    <p>
                      {EPrice[language]}: {item.price} € &times; {item.quantity} ={' '}
                      <b>{item.price * item.quantity} €</b>
                    </p>
                  </>
                ) : (
                  <p>
                    {EPrice[language]}: {item.price} €{' '}
                  </p>
                )}

                {item.id.startsWith('misc') && item.quantity >= freeHoursBreakpoint1 && (
                  <p>
                    <big>
                      <FaHourglassStart /> <span>{EFreeHourUnlocked[language]}</span>{' '}
                      {item.quantity >= freeHoursBreakpoint2 ? (
                        <>
                          <strong> &times; {freeAmount2} </strong>
                          <span>&mdash;</span>{' '}
                          <span>{ESaveTheFollowingAmountOfMoney[language]}</span>
                          <strong> {item.price * freeAmount2} € </strong>
                        </>
                      ) : item.quantity >= freeHoursBreakpoint1 ? (
                        <>
                          <span> &mdash;</span>{' '}
                          <span>{ESaveTheFollowingAmountOfMoney[language]}</span>
                          <strong> {item.price} € </strong>
                        </>
                      ) : (
                        ''
                      )}
                    </big>
                  </p>
                )}

                <div className={styles['item-details']}>
                  <div className={`${styles['textarea-wrap']} textarea-wrap`}>
                    <label htmlFor={`${item.id}-details`}>
                      <span>{ERequestsAndNeeds[language]}:</span>
                      <textarea
                        rows={5}
                        required
                        id={`details-${item.id}`}
                        name={`details-${item.id}`}
                        placeholder={
                          item.id.startsWith('misc') && item.id !== 'misc-quote'
                            ? EAdditionalInformation[language]
                            : ERequestsIdeasAndLinksForInspiration[language]
                        }
                        onChange={(e) => {
                          setCart(
                            cart.map((i) =>
                              i.id === item.id ? { ...i, details: e.target.value } : i
                            )
                          )
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )
        })}
        {cart.length > 0 ? (
          <>
            <p className={styles.total}>
              <big>
                <span>
                  {ETotal[language]}: {total} €{' '}
                </span>
              </big>
            </p>

            <div className={`${styles['please-fill']}`}>
              <div className={`${styles['toggle-wrap']}`}>
                <ButtonToggle
                  id='business-toggle'
                  className={`${styles.toggle}`}
                  name='company'
                  on={EYes[language]}
                  off={ENo[language]}
                  equal
                  isChecked={business}
                  handleToggleChange={() => setBusiness(!business)}
                  label={`${ECompanyOrAssociation[language]}: `}
                />
              </div>
              {business ? (
                <>
                  <div className={`${styles['input-wrap']} input-wrap placeholder`}>
                    <label htmlFor='business-id'>
                      <input
                        type='text'
                        name='business-id'
                        id='business-id'
                        required
                        value={businessID}
                        placeholder={EBusinessID[language]}
                        onChange={(e) => setBusinessID(e.target.value)}
                      />
                      <span>{EBusinessID[language]}:</span>
                    </label>
                  </div>

                  <div className={`${styles['input-wrap']} input-wrap placeholder`}>
                    <label htmlFor='company-name'>
                      <input
                        type='text'
                        id='company-name'
                        name='company'
                        required
                        value={companyName}
                        placeholder={`${ECompanyName[language]}/${EAssociationName[language]}`}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                      <span>
                        {ECompany[language]}/{EAssociation[language]}:
                      </span>
                    </label>
                  </div>

                  <div className={`${styles['input-wrap']} input-wrap placeholder`}>
                    <label htmlFor='name-cart'>
                      <input
                        type='text'
                        id='name-cart'
                        name='name'
                        required
                        value={name}
                        placeholder={EContactPerson[language]}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <span>{EContactPerson[language]}:</span>
                    </label>
                  </div>

                  <div className={`${styles['input-wrap']} input-wrap placeholder`}>
                    <label htmlFor='email-cart'>
                      <input
                        type='email'
                        name='email'
                        id='email-cart'
                        required
                        value={email}
                        placeholder={EEmailAddress[language]}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span>{EEmail[language]}:</span>
                    </label>
                  </div>
                  <div className={`${styles['input-wrap']} input-wrap placeholder`}>
                    <label htmlFor='address-cart'>
                      <input
                        type='text'
                        id='address-cart'
                        name='address'
                        required
                        value={address}
                        placeholder={EBillingAddress[language]}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <span>{EBillingAddress[language]}:</span>
                    </label>
                  </div>
                  <div className={`${styles['input-wrap']} input-wrap placeholder`}>
                    <label htmlFor='zip-cart'>
                      <input
                        type='text'
                        id='zip-cart'
                        name='postal-code'
                        required
                        value={zip}
                        placeholder={EPostalCode[language]}
                        onChange={(e) => setZip(e.target.value)}
                        onKeyDown={(e) => {
                          if (
                            !/[0-9]/.test(e.key) &&
                            e.key !== 'Backspace' &&
                            e.key !== 'Delete' &&
                            e.key !== 'ArrowLeft' &&
                            e.key !== 'ArrowRight' &&
                            e.key !== 'Tab'
                          ) {
                            e.preventDefault()
                          }
                        }}
                      />
                      <span>{EPostalCode[language]}:</span>
                    </label>
                  </div>
                  <div className={`${styles['input-wrap']} input-wrap placeholder`}>
                    <label htmlFor='city-cart'>
                      <input
                        id='city-cart'
                        type='text'
                        name='city'
                        required
                        value={city}
                        placeholder={ECity[language]}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <span>{ECity[language]}:</span>
                    </label>
                  </div>
                  <div className={`${styles['input-wrap']} input-wrap placeholder`}>
                    <label htmlFor='country-cart'>
                      <input
                        type='text'
                        id='country-cart'
                        name='country'
                        required
                        value={country}
                        placeholder={ECountry[language]}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                      <span>{ECountry[language]}:</span>
                    </label>
                  </div>
                  <div
                    className={`${
                      styles['input-wrap']
                    } input-wrap placeholder not-required ${
                      phone && phone.trim() !== '' ? 'filled' : 'not-filled'
                    }`}
                  >
                    <label htmlFor='phone-cart'>
                      <input
                        type='text'
                        id='phone-cart'
                        name='phone'
                        value={phone}
                        placeholder={EPhone[language]}
                        onChange={(e) => setPhone(e.target.value)}
                        onKeyDown={(e) => {
                          if (
                            !/[0-9]/.test(e.key) &&
                            e.key !== 'Backspace' &&
                            e.key !== 'Delete' &&
                            e.key !== 'ArrowLeft' &&
                            e.key !== 'ArrowRight' &&
                            e.key !== 'Tab' &&
                            e.key !== ' '
                          ) {
                            e.preventDefault()
                          }
                        }}
                      />
                      <span>
                        {EPhone[language]} ({EOptional[language].toLowerCase()}):
                      </span>
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <div className={`${styles['input-wrap']} input-wrap placeholder`}>
                    <label htmlFor='name-cart'>
                      <input
                        type='text'
                        id='name-cart'
                        name='name'
                        required
                        value={name}
                        placeholder={EPrivatePerson[language]}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <span>{EName[language]}:</span>
                    </label>
                  </div>
                  <div className={`${styles['input-wrap']} input-wrap placeholder`}>
                    <label htmlFor='email-cart'>
                      <input
                        type='email'
                        name='email'
                        id='email-cart'
                        required
                        value={email}
                        placeholder={EEmailAddress[language]}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span>{EEmail[language]}:</span>
                    </label>
                  </div>
                  <div className={`${styles['input-wrap']} input-wrap placeholder`}>
                    <label htmlFor='address-cart'>
                      <input
                        type='text'
                        id='address-cart'
                        name='address'
                        required
                        value={address}
                        placeholder={EBillingAddress[language]}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <span>{EBillingAddress[language]}:</span>
                    </label>
                  </div>
                  <div className={`${styles['input-wrap']} input-wrap placeholder`}>
                    <label htmlFor='zip-cart'>
                      <input
                        type='text'
                        name='postal-code'
                        id='zip-cart'
                        required
                        value={zip}
                        placeholder={EPostalCode[language]}
                        onChange={(e) => setZip(e.target.value)}
                        onKeyDown={(e) => {
                          if (
                            !/[0-9]/.test(e.key) &&
                            e.key !== 'Backspace' &&
                            e.key !== 'Delete' &&
                            e.key !== 'ArrowLeft' &&
                            e.key !== 'ArrowRight' &&
                            e.key !== 'Tab'
                          ) {
                            e.preventDefault()
                          }
                        }}
                      />
                      <span>{EPostalCode[language]}:</span>
                    </label>
                  </div>
                  <div className={`${styles['input-wrap']} input-wrap placeholder`}>
                    <label htmlFor='city-cart'>
                      <input
                        type='text'
                        id='city-cart'
                        name='city'
                        required
                        value={city}
                        placeholder={ECity[language]}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <span>{ECity[language]}:</span>
                    </label>
                  </div>
                  <div className={`${styles['input-wrap']} input-wrap placeholder`}>
                    <label htmlFor='country-cart'>
                      <input
                        type='text'
                        id='country-cart'
                        name='country'
                        required
                        value={country}
                        placeholder={ECountry[language]}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                      <span>{ECountry[language]}:</span>
                    </label>
                  </div>
                </>
              )}
              <div className={`${styles['textarea-wrap']} textarea-wrap`}>
                <label htmlFor='extra'>
                  <span>{EAdditionalInformation[language]}:</span>
                  <textarea
                    rows={5}
                    id='extra'
                    value={extra}
                    placeholder={`${EClarifications[language]}${
                      business ? `, ${EEG[language]} ${EDesiredReference[language]}` : ''
                    }`}
                    onChange={(e) => setExtra(e.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className={`${styles['send-order-wrap']} flex center`}>
              <div className={styles.terms}>
                <label>
                  <input
                    id='terms-cart'
                    required
                    type='checkbox'
                    name='terms'
                    onChange={(e) => {
                      setTerms(e.target.checked)
                    }}
                  />
                  <span>
                    {EIAcceptThe[language]}{' '}
                    <Link to='/terms'>{ETermsOfServiceLink[language]}</Link>
                  </span>
                </label>
              </div>
              <div className={styles.gdpr}>
                <label className='radio-checkbox'>
                  <input
                    id='gdpr-cart'
                    required
                    type='checkbox'
                    name='gdpr'
                    onChange={(e) => {
                      setGDPR(e.target.checked)
                    }}
                  />
                  <span>
                    {EItIsAlrightToSendTheEnteredInformationToJenniina[language]}
                  </span>
                </label>
              </div>
              <button className={styles.submit} type='submit' disabled={sending}>
                <span>{ESubmitOrder[language]}</span> <RiMailSendLine />
              </button>
              <Accordion
                className='cart-accordion grayer'
                text={ETermsRelatedToProducts[language]}
                language={language}
                wrapperClass={styles['more-info-wrap']}
              >
                <TermsProducts language={language} />
              </Accordion>
            </div>
            <div className={`${styles['clear-btn-wrap']} flex center`}>
              <button
                type='button'
                onClick={() => {
                  if (window.confirm(`${ERemove[language]}: ${ECart[language]}?`)) {
                    setCart([])
                    removeCart()
                    setTotal(0)
                  }
                }}
                className='danger delete'
              >
                {EClearCart[language]}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className='flex center'>[ {EEmptyCart[language]} ]</p>
          </>
        )}{' '}
      </form>
    </div>
  )
}

export default Cart
