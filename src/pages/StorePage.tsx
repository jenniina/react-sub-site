import Store from '../components/Store/Store'
import { ELanguages } from '../interfaces'
import Hero from '../components/Hero/Hero'

interface StoreProps {
  language: ELanguages
  heading: string
  text: string
  type: string
}

const StorePage: React.FC<StoreProps> = ({ language, heading, text, type }) => {
  return (
    <div className={`store ${type}`}>
      <Hero language={language} address='store' heading={heading} text={text} />
      <div className='inner-wrap'>
        <section className='card' style={{ position: 'relative', zIndex: 2 }}>
          <div>
            <Store language={language} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default StorePage
