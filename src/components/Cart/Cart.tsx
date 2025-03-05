import { useEffect, FC, useState, useContext } from 'react'
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
import { getRandomLetters, getRandomMinMax, splitToLines } from '../../utils'
import ButtonToggle from '../ButtonToggle/ButtonToggle'
import { FaHourglassStart, FaStoreAlt } from 'react-icons/fa'
import { RiMailSendLine } from 'react-icons/ri'
import { TermsProducts } from '../../pages/TermsOfService'
import { LanguageContext } from '../../contexts/LanguageContext'

interface Props {
  language: ELanguages
  cart: ICartItem[]
  addToCart: (item: ICartItem | undefined) => void
  removeFromCart: (itemId: string) => void
  editDetails: (itemId: string, details: string) => void
  removeCart: () => void
}

const Cart: FC<Props> = ({
  language,
  cart,
  addToCart,
  removeFromCart,
  editDetails,
  removeCart,
}) => {
  const { t } = useContext(LanguageContext)!

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

  const handleQuantityChange = (item: ICartItem | undefined, change: number) => {
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
  }, [cart])

  return (
    <div className={`${styles['cart-wrap']} ${lightTheme ? styles.light : ''}`}>
      <Link to='/store' className={styles['back-to-store']}>
        <span aria-hidden={true}>&laquo;</span> <FaStoreAlt />{' '}
        <strong>{t('EBackToStore')}</strong>
      </Link>
      {language !== ELanguages.fi && language !== ELanguages.en && (
        <p>{t('EPleaseNoteThatTheAuthorJenniinaLaineSpeaksOnlyEnglishAndFinnishSo')}</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSending(true)
          if (cart.length < 1) {
            dispatch(notify(t('EPleaseChooseAProduct'), true, 8))
            setSending(false)
          }
          if (!GDPR) {
            dispatch(notify(`${t('ERemember')}: ${t('EGDPRConsent')}`, true, 8))
            setSending(false)
          } else if (!terms) {
            dispatch(notify(`${t('ERemember')}: ${t('ETermsOfService')}`, true, 8))
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
            dispatch(notify(t('EPleaseFillInTheFields'), true, 8))
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
              <AdditionalInfo
                type={item.id}
                language={language}
                styles={styles}
                isOpen={true}
                setIsFormOpen={() => {}}
                classNameWrap={styles['additional-info-wrap']}
                text={t('EIncludes')}
              />
              <div className={`${styles['quantity']}`}>
                {item.id !== 'misc-quote' ? (
                  <>
                    <button
                      type='button'
                      onClick={() => {
                        if (item.quantity - 1 < 1) {
                          if (window.confirm(`${t('ERemove')}: ${item.name}?`)) {
                            //remove item from cart
                            removeFromCart(item.id)
                            return
                          } else return
                        }
                        handleQuantityChange(item, -1)
                      }}
                      className={`tooltip-wrap ${styles['quantity-btn']}`}
                    >
                      <span className='tooltip above space right narrow2'>
                        {t('ESubtractFromCart')}
                      </span>
                      <span>-1</span>
                    </button>

                    <span>
                      {t('EQuantity')}: {item.quantity}
                    </span>

                    <button
                      type='button'
                      onClick={() => {
                        handleQuantityChange(item, 1)
                      }}
                      className={`tooltip-wrap ${styles['quantity-btn']}`}
                    >
                      <span className='tooltip above space right narrow2'>
                        {t('EAddToCart')}
                      </span>
                      <span>+1</span>
                    </button>
                  </>
                ) : (
                  <button
                    type='button'
                    onClick={() => {
                      if (item.quantity - 1 < 1) {
                        if (window.confirm(`${t('ERemove')}: ${item.name}?`)) {
                          removeFromCart(item.id)
                          return
                        } else return
                      }
                      handleQuantityChange(item, -1)
                    }}
                  >
                    <span>{t('ERemove')}</span>
                  </button>
                )}
                {item.quantity >= freeHoursBreakpoint2 ? (
                  <span>
                    {t('ETotal')}: {item.quantity + freeAmount2} {t('EHours')}
                  </span>
                ) : item.quantity >= freeHoursBreakpoint1 ? (
                  <span>
                    {t('ETotal')}: {item.quantity + freeAmount1} {t('EHours')}
                  </span>
                ) : (
                  ''
                )}
              </div>
              {item.id !== 'misc-quote' ? (
                <>
                  <p>
                    {t('EPrice')}: {item.price} € &times; {item.quantity} ={' '}
                    <b>{item.price * item.quantity} €</b>
                  </p>
                </>
              ) : (
                <p>
                  {t('EPrice')}: {item.price} €{' '}
                </p>
              )}

              {item.id.startsWith('misc') && item.quantity >= freeHoursBreakpoint1 && (
                <p>
                  <big>
                    <FaHourglassStart /> <span>{t('EFreeHourUnlocked')}</span>{' '}
                    {item.quantity >= freeHoursBreakpoint2 ? (
                      <>
                        <strong> &times; {freeAmount2} </strong>
                        <span>&mdash;</span>{' '}
                        <span>{t('ESaveTheFollowingAmountOfMoney')}</span>
                        <strong> {item.price * freeAmount2} € </strong>
                      </>
                    ) : item.quantity >= freeHoursBreakpoint1 ? (
                      <>
                        <span> &mdash;</span>{' '}
                        <span>{t('ESaveTheFollowingAmountOfMoney')}</span>
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
                    <span>{t('ERequestsAndNeeds')}:</span>
                    <textarea
                      rows={5}
                      required
                      id={`details-${item.id}`}
                      name={`details-${item.id}`}
                      placeholder={
                        item.id.startsWith('misc') && item.id !== 'misc-quote'
                          ? t('EAdditionalInformation')
                          : t('ERequestsIdeasAndLinksForInspiration')
                      }
                      onChange={(e) => {
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
                  {t('ETotal')}: {total} €{' '}
                </span>
              </big>
            </p>

            <div className={`${styles['please-fill']}`}>
              <div className={`${styles['toggle-wrap']}`}>
                <ButtonToggle
                  id='business-toggle'
                  className={`${styles.toggle}`}
                  name='company'
                  on={t('EYes')}
                  off={t('ENo')}
                  equal
                  isChecked={business}
                  handleToggleChange={() => setBusiness(!business)}
                  label={`${t('ECompanyOrAssociation')}: `}
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
                        placeholder={t('EBusinessID')}
                        onChange={(e) => setBusinessID(e.target.value)}
                      />
                      <span>{t('EBusinessID')}:</span>
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
                        placeholder={`${t('ECompanyName')}/${t('EAssociationName')}`}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                      <span>
                        {t('ECompany')}/{t('EAssociation')}:
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
                        placeholder={t('EContactPerson')}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <span>{t('EContactPerson')}:</span>
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
                        placeholder={t('EEmailAddress')}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span>{t('EEmail')}:</span>
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
                        placeholder={t('EBillingAddress')}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <span>{t('EBillingAddress')}:</span>
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
                        placeholder={t('EPostalCode')}
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
                      <span>{t('EPostalCode')}:</span>
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
                        placeholder={t('ECity')}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <span>{t('ECity')}:</span>
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
                        placeholder={t('ECountry')}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                      <span>{t('ECountry')}:</span>
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
                        placeholder={t('EPhone')}
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
                        {t('EPhone')} ({t('EOptional').toLowerCase()}
                        ):
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
                        placeholder={t('EPrivatePerson')}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <span>{t('EName')}:</span>
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
                        placeholder={t('EEmailAddress')}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span>{t('EEmail')}:</span>
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
                        placeholder={t('EBillingAddress')}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <span>{t('EBillingAddress')}:</span>
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
                        placeholder={t('EPostalCode')}
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
                      <span>{t('EPostalCode')}:</span>
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
                        placeholder={t('ECity')}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <span>{t('ECity')}:</span>
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
                        placeholder={t('ECountry')}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                      <span>{t('ECountry')}:</span>
                    </label>
                  </div>
                </>
              )}
              <div className={`${styles['textarea-wrap']} textarea-wrap`}>
                <label htmlFor='extra'>
                  <span>{t('EAdditionalInformation')}:</span>
                  <textarea
                    rows={5}
                    id='extra'
                    value={extra}
                    placeholder={`${t('EClarifications')}${
                      business ? `, ${t('EEG')} ${t('EDesiredReference')}` : ''
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
                    {t('EIAcceptThe')} <Link to='/terms'>{t('ETermsOfServiceLink')}</Link>
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
                  <span>{t('EItIsAlrightToSendTheEnteredInformationToJenniina')}</span>
                </label>
              </div>
              <button className={styles.submit} type='submit' disabled={sending}>
                <span>{t('ESubmitOrder')}</span> <RiMailSendLine />
              </button>
              <Accordion
                className='cart-accordion grayer'
                text={t('ETermsRelatedToProducts')}
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
                  if (window.confirm(`${t('ERemove')}: ${t('ECart')}?`)) {
                    removeCart()
                    setTotal(0)
                  }
                }}
                className='danger delete'
              >
                {t('EClearCart')}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className='flex center'>[ {t('EEmptyCart')} ]</p>
          </>
        )}{' '}
      </form>
    </div>
  )
}

export default Cart
