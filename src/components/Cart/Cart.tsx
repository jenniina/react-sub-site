import { useEffect, FC, useState } from 'react'
import styles from './cart.module.css'
import AdditionalInfo from '../Store/components/AdditionalInfo'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { ELanguages } from '../../types'
import { ICart, ICartItem } from '../../types/store'
import useLocalStorage from '../../hooks/useStorage'
import Accordion from '../Accordion/Accordion'
import { useTheme } from '../../hooks/useTheme'
import cartService from '../../services/cart'
import { notify } from '../../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { getRandomLetters, getRandomMinMax, splitToLines, getErrorMessage } from '../../utils'
import ButtonToggle from '../ButtonToggle/ButtonToggle'
import { FaHourglassStart, FaStoreAlt } from 'react-icons/fa'
import { RiMailSendLine } from 'react-icons/ri'
import { TermsProducts } from '../../pages/TermsOfService'
import { useLanguageContext } from '../../contexts/LanguageContext'
import { useConfirm } from '../../contexts/ConfirmContext'

interface Props {
  cart: ICartItem[]
  addToCart: (item: ICartItem | undefined) => void
  removeFromCart: (itemId: string) => void
  editDetails: (itemId: string, details: string) => void
  removeCart: () => void
}

const Cart: FC<Props> = ({
  cart,
  addToCart,
  removeFromCart,
  editDetails,
  removeCart,
}) => {
  const { t, language } = useLanguageContext()
  const confirm = useConfirm()

  const lightTheme = useTheme()
  const dispatch = useAppDispatch()

  const [total, setTotal] = useLocalStorage<ICart['total']>(
    'localStorageTotal',
    0
  )
  const [email, setEmail] = useLocalStorage<ICart['info']['email']>(
    'localStorageEmail',
    ''
  )
  const [name, setName] = useLocalStorage<ICart['info']['name']>(
    'JCartName',
    ''
  )
  const [business, setBusiness] = useLocalStorage<boolean>(
    'JCartBusiness',
    false
  )
  const [companyName, setCompanyName] = useLocalStorage<
    ICart['info']['companyName']
  >('JCartCompanyName', '')
  const [country, setCountry] = useLocalStorage<ICart['info']['country']>(
    'JCartCountry',
    ''
  )
  const [address, setAddress] = useLocalStorage<ICart['info']['address']>(
    'JCartAddress',
    ''
  )
  const [city, setCity] = useLocalStorage<ICart['info']['city']>(
    'JCartCity',
    ''
  )
  const [zip, setZip] = useLocalStorage<ICart['info']['zip']>('JCartZip', '')
  const [phone, setPhone] = useLocalStorage<ICart['info']['phone']>(
    'JCartPhone',
    ''
  )
  const [businessID, setBusinessID] = useLocalStorage<
    ICart['info']['businessID']
  >('JCartBusinessID', '')
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
  }, [
    name,
    companyName,
    email,
    businessID,
    zip,
    city,
    address,
    country,
    phone,
    setInfo,
  ])

  const handleQuantityChange = (
    item: ICartItem | undefined,
    change: number
  ) => {
    if (change < 0 && item) {
      removeFromCart(item?.id)
    }
    if (change > 0) {
      addToCart(item)
    } else {
      return
    }
  }

  //set total
  useEffect(() => {
    setTotal(
      cart.reduce((acc, item) => {
        return acc + item.price * item.quantity
      }, 0)
    )
  }, [cart, setTotal])

  return (
    <div className={`${styles['cart-wrap']} ${lightTheme ? styles.light : ''}`}>
      <Link to="/store" className={styles['back-to-store']}>
        <span aria-hidden={true}>&laquo;</span> <FaStoreAlt />{' '}
        <strong>{t('BackToStore')}</strong>
      </Link>
      {language !== ELanguages.fi && language !== ELanguages.en && (
        <p>
          {t(
            'PleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo'
          )}
        </p>
      )}
      <form
        onSubmit={e => {
          e.preventDefault()
          setSending(true)
          if (cart.length < 1) {
            void dispatch(notify(t('PleaseChooseAProduct'), true, 8))
            setSending(false)
          }
          if (!GDPR) {
            void dispatch(
              notify(`${t('Remember')}: ${t('GDPRConsent')}`, true, 8)
            )
            setSending(false)
          } else if (!terms) {
            void dispatch(
              notify(`${t('Remember')}: ${t('TermsOfService')}`, true, 8)
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
              .then(res => {
                if (res.success) {
                  void dispatch(notify(res.message, false, 10))
                  removeCart()
                  setTotal(0)
                  setSending(false)
                } else {
                  void dispatch(notify(res.message, false, 10))
                  setSending(false)
                }
              })
              .catch((err: unknown) => {
                const message = getErrorMessage(err, t('Error'))
                void dispatch(notify(message, true, 8))
                setSending(false)
              })
          } else {
            void dispatch(notify(t('PleaseFillInTheFields'), true, 8))
            setSending(false)
          }
        }}
        className={styles['cart-form']}
      >
        {cart.map((item, index) => {
          return (
            <div key={`${item.id}-${index}`} className={styles.wrap}>
              <h2>
                <span>{index + 1}. </span>
                <span>{item.name}</span>
              </h2>
              <p>{splitToLines(item.description)}</p>
              <AdditionalInfo type={item.id} styles={styles} />
              <div className={`${styles.quantity}`}>
                {item.id !== 'misc-quote' ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        void (async () => {
                          if (item.quantity - 1 < 1) {
                            if (
                              await confirm({
                                message: `${t('Remove')}: ${item.name}?`,
                              })
                            ) {
                              //remove item from cart
                              removeFromCart(item.id)
                              return
                            } else return
                          }
                          handleQuantityChange(item, -1)
                        })()
                      }
                      className={`tooltip-wrap ${styles['quantity-btn']}`}
                    >
                      <span className="tooltip above space right narrow2">
                        {t('SubtractFromCart')}
                      </span>
                      <span>-1</span>
                    </button>

                    <span>
                      {t('Quantity')}: {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        handleQuantityChange(item, 1)
                      }}
                      className={`tooltip-wrap ${styles['quantity-btn']}`}
                    >
                      <span className="tooltip above space right narrow2">
                        {t('AddToCart')}
                      </span>
                      <span>+1</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      void (async () => {
                        if (item.quantity - 1 < 1) {
                          if (
                            await confirm({
                              message: `${t('Remove')}: ${item.name}?`,
                            })
                          ) {
                            removeFromCart(item.id)
                            return
                          } else return
                        }
                        handleQuantityChange(item, -1)
                      })()
                    }
                  >
                    <span>{t('Remove')}</span>
                  </button>
                )}
                {item.quantity >= freeHoursBreakpoint2 ? (
                  <span>
                    {t('Total')}: {item.quantity + freeAmount2} {t('Hours')}
                  </span>
                ) : item.quantity >= freeHoursBreakpoint1 ? (
                  <span>
                    {t('Total')}: {item.quantity + freeAmount1} {t('Hours')}
                  </span>
                ) : (
                  ''
                )}
              </div>
              {item.id !== 'misc-quote' ? (
                <>
                  <p>
                    {t('Price')}: {item.price} € &times; {item.quantity} ={' '}
                    <b>{item.price * item.quantity} €</b>
                  </p>
                </>
              ) : (
                <p>
                  {t('Price')}: {item.price} €{' '}
                </p>
              )}

              {item.id.startsWith('misc') &&
                item.quantity >= freeHoursBreakpoint1 && (
                  <p>
                    <big>
                      <FaHourglassStart /> <span>{t('FreeHourUnlocked')}</span>{' '}
                      {item.quantity >= freeHoursBreakpoint2 ? (
                        <>
                          <strong> &times; {freeAmount2} </strong>
                          <span>&mdash;</span>{' '}
                          <span>{t('SaveTheFollowingAmountOfMoney')}</span>
                          <strong> {item.price * freeAmount2} € </strong>
                        </>
                      ) : item.quantity >= freeHoursBreakpoint1 ? (
                        <>
                          <span> &mdash;</span>{' '}
                          <span>{t('SaveTheFollowingAmountOfMoney')}</span>
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
                    <span>{t('RequestsAndNeeds')}:</span>
                    <textarea
                      rows={5}
                      required
                      id={`details-${item.id}`}
                      name={`details-${item.id}`}
                      placeholder={
                        item.id.startsWith('misc') && item.id !== 'misc-quote'
                          ? t('AdditionalInformation')
                          : t('RequestsIdeasAndLinksForInspiration')
                      }
                      onChange={e => {
                        editDetails(item.id, e.target.value)
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
                  {t('Total')}: {total} €{' '}
                </span>
              </big>
            </p>

            <div className={`${styles['please-fill']}`}>
              <div className={`${styles['toggle-wrap']}`}>
                <ButtonToggle
                  id="business-toggle"
                  className={`${styles.toggle}`}
                  name="company"
                  on={t('Yes')}
                  off={t('No')}
                  equal
                  isChecked={business}
                  onChange={() => setBusiness(!business)}
                  label={`${t('CompanyOrAssociation')}: `}
                />
              </div>
              {business ? (
                <>
                  <div
                    className={`${styles['input-wrap']} input-wrap placeholder`}
                  >
                    <label htmlFor="business-id">
                      <input
                        type="text"
                        name="business-id"
                        id="business-id"
                        required
                        value={businessID}
                        placeholder={t('BusinessID')}
                        onChange={e => setBusinessID(e.target.value)}
                      />
                      <span>{t('BusinessID')}:</span>
                    </label>
                  </div>

                  <div
                    className={`${styles['input-wrap']} input-wrap placeholder`}
                  >
                    <label htmlFor="company-name">
                      <input
                        type="text"
                        id="company-name"
                        name="company"
                        required
                        value={companyName}
                        placeholder={`${t('CompanyName')}/${t(
                          'AssociationName'
                        )}`}
                        onChange={e => setCompanyName(e.target.value)}
                      />
                      <span>
                        {t('Company')}/{t('Association')}:
                      </span>
                    </label>
                  </div>

                  <div
                    className={`${styles['input-wrap']} input-wrap placeholder`}
                  >
                    <label htmlFor="name-cart">
                      <input
                        type="text"
                        id="name-cart"
                        name="name"
                        required
                        value={name}
                        placeholder={t('ContactPerson')}
                        onChange={e => setName(e.target.value)}
                      />
                      <span>{t('ContactPerson')}:</span>
                    </label>
                  </div>

                  <div
                    className={`${styles['input-wrap']} input-wrap placeholder`}
                  >
                    <label htmlFor="email-cart">
                      <input
                        type="email"
                        name="email"
                        id="email-cart"
                        required
                        value={email}
                        placeholder={t('EmailAddress')}
                        onChange={e => setEmail(e.target.value)}
                      />
                      <span>{t('Email')}:</span>
                    </label>
                  </div>
                  <div
                    className={`${styles['input-wrap']} input-wrap placeholder`}
                  >
                    <label htmlFor="address-cart">
                      <input
                        type="text"
                        id="address-cart"
                        name="address"
                        required
                        value={address}
                        placeholder={t('BillingAddress')}
                        onChange={e => setAddress(e.target.value)}
                      />
                      <span>{t('BillingAddress')}:</span>
                    </label>
                  </div>
                  <div
                    className={`${styles['input-wrap']} input-wrap placeholder`}
                  >
                    <label htmlFor="zip-cart">
                      <input
                        type="text"
                        id="zip-cart"
                        name="postal-code"
                        required
                        value={zip}
                        placeholder={t('PostalCode')}
                        onChange={e => setZip(e.target.value)}
                        onKeyDown={e => {
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
                      <span>{t('PostalCode')}:</span>
                    </label>
                  </div>
                  <div
                    className={`${styles['input-wrap']} input-wrap placeholder`}
                  >
                    <label htmlFor="city-cart">
                      <input
                        id="city-cart"
                        type="text"
                        name="city"
                        required
                        value={city}
                        placeholder={t('City')}
                        onChange={e => setCity(e.target.value)}
                      />
                      <span>{t('City')}:</span>
                    </label>
                  </div>
                  <div
                    className={`${styles['input-wrap']} input-wrap placeholder`}
                  >
                    <label htmlFor="country-cart">
                      <input
                        type="text"
                        id="country-cart"
                        name="country"
                        required
                        value={country}
                        placeholder={t('Country')}
                        onChange={e => setCountry(e.target.value)}
                      />
                      <span>{t('Country')}:</span>
                    </label>
                  </div>
                  <div
                    className={`${
                      styles['input-wrap']
                    } input-wrap placeholder not-required ${
                      phone && phone.trim() !== '' ? 'filled' : 'not-filled'
                    }`}
                  >
                    <label htmlFor="phone-cart">
                      <input
                        type="text"
                        id="phone-cart"
                        name="phone"
                        value={phone}
                        placeholder={t('Phone')}
                        onChange={e => setPhone(e.target.value)}
                        onKeyDown={e => {
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
                        {t('Phone')} ({t('Optional').toLowerCase()}
                        ):
                      </span>
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`${styles['input-wrap']} input-wrap placeholder`}
                  >
                    <label htmlFor="name-cart">
                      <input
                        type="text"
                        id="name-cart"
                        name="name"
                        required
                        value={name}
                        placeholder={t('PrivatePerson')}
                        onChange={e => setName(e.target.value)}
                      />
                      <span>{t('Name')}:</span>
                    </label>
                  </div>
                  <div
                    className={`${styles['input-wrap']} input-wrap placeholder`}
                  >
                    <label htmlFor="email-cart">
                      <input
                        type="email"
                        name="email"
                        id="email-cart"
                        required
                        value={email}
                        placeholder={t('EmailAddress')}
                        onChange={e => setEmail(e.target.value)}
                      />
                      <span>{t('Email')}:</span>
                    </label>
                  </div>
                  <div
                    className={`${styles['input-wrap']} input-wrap placeholder`}
                  >
                    <label htmlFor="address-cart">
                      <input
                        type="text"
                        id="address-cart"
                        name="address"
                        required
                        value={address}
                        placeholder={t('BillingAddress')}
                        onChange={e => setAddress(e.target.value)}
                      />
                      <span>{t('BillingAddress')}:</span>
                    </label>
                  </div>
                  <div
                    className={`${styles['input-wrap']} input-wrap placeholder`}
                  >
                    <label htmlFor="zip-cart">
                      <input
                        type="text"
                        name="postal-code"
                        id="zip-cart"
                        required
                        value={zip}
                        placeholder={t('PostalCode')}
                        onChange={e => setZip(e.target.value)}
                        onKeyDown={e => {
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
                      <span>{t('PostalCode')}:</span>
                    </label>
                  </div>
                  <div
                    className={`${styles['input-wrap']} input-wrap placeholder`}
                  >
                    <label htmlFor="city-cart">
                      <input
                        type="text"
                        id="city-cart"
                        name="city"
                        required
                        value={city}
                        placeholder={t('City')}
                        onChange={e => setCity(e.target.value)}
                      />
                      <span>{t('City')}:</span>
                    </label>
                  </div>
                  <div
                    className={`${styles['input-wrap']} input-wrap placeholder`}
                  >
                    <label htmlFor="country-cart">
                      <input
                        type="text"
                        id="country-cart"
                        name="country"
                        required
                        value={country}
                        placeholder={t('Country')}
                        onChange={e => setCountry(e.target.value)}
                      />
                      <span>{t('Country')}:</span>
                    </label>
                  </div>
                </>
              )}
              <div className={`${styles['textarea-wrap']} textarea-wrap`}>
                <label htmlFor="extra">
                  <span>{t('AdditionalInformation')}:</span>
                  <textarea
                    rows={5}
                    id="extra"
                    value={extra}
                    placeholder={`${t('Clarifications')}${
                      business ? `, ${t('EG')} ${t('DesiredReference')}` : ''
                    }`}
                    onChange={e => setExtra(e.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className={`${styles['send-order-wrap']} flex center`}>
              <div className={styles.terms}>
                <label>
                  <input
                    id="terms-cart"
                    required
                    type="checkbox"
                    name="terms"
                    onChange={e => {
                      setTerms(e.target.checked)
                    }}
                  />
                  <span>
                    {t('IAcceptThe')}{' '}
                    <Link to="/terms">{t('TermsOfServiceLink')}</Link>
                  </span>
                </label>
              </div>
              <div className={styles.gdpr}>
                <label className="radio-checkbox">
                  <input
                    id="gdpr-cart"
                    required
                    type="checkbox"
                    name="gdpr"
                    onChange={e => {
                      setGDPR(e.target.checked)
                    }}
                  />
                  <span>
                    {t('ItIsAlrightToSendTheEnteredInformationToJenniina')}
                  </span>
                </label>
              </div>
              <button
                className={styles.submit}
                type="submit"
                disabled={sending}
              >
                <span>{t('SubmitOrder')}</span> <RiMailSendLine />
              </button>
              <Accordion
                className="cart-accordion grayer"
                text={t('TermsRelatedToProducts')}
                wrapperClass={styles['more-info-wrap']}
              >
                <TermsProducts language={language} />
              </Accordion>
            </div>
            <div className={`${styles['clear-btn-wrap']} flex center`}>
              <button
                type="button"
                onClick={() =>
                  void (async () => {
                    if (
                      await confirm({
                        message: `${t('Remove')}: ${t('Cart')}?`,
                      })
                    ) {
                      removeCart()
                      setTotal(0)
                    }
                  })()
                }
                className="danger delete"
              >
                {t('ClearCart')}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="flex center">[ {t('EmptyCart')} ]</p>
          </>
        )}{' '}
      </form>
    </div>
  )
}

export default Cart
