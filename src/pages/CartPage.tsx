import React from 'react'
import Cart from '../components/Cart/Cart'
import Hero from '../components/Hero/Hero'
import { ELanguages } from '../interfaces'

interface CartProps {
  heading: string
  text: string
  type: string
  language: ELanguages
}

const CartPage: React.FC<CartProps> = ({ heading, text, type, language }) => {
  return (
    <div className={`cart ${type}`}>
      <Hero language={language} address='cart' heading={heading} text={text} />
      <div className='inner-wrap'>
        <section className='card' style={{ position: 'relative', zIndex: 2 }}>
          <div>
            <Cart language={language} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default CartPage
