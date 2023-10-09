import { useTheme } from '../hooks/useTheme'
import { Link } from 'react-router-dom'
import styles from './css/welcome.module.css'
import Hero from '../components/Hero/Hero'
import { BiChat } from 'react-icons/bi'
import { BsPerson } from 'react-icons/bs'
import { IoMdImages } from 'react-icons/io'
import { GiAbstract019 } from 'react-icons/gi'

export default function Home({
  heading,
  text,
  type,
}: {
  heading: string
  text: string
  type: string
}) {
  const lightTheme = useTheme()

  return (
    <div
      className={`${heading
        .replace(/\s+/g, '-')
        .toLowerCase()
        .replace(/[^a-zA-Z]/g, '')} ${type} ${lightTheme ? styles.light : ''}`}
    >
      <Hero heading={heading} text={text} />
      <div className='inner-wrap'>
        <section className={`card`}>
          <div>
            <ul className={styles.list}>
              <li>
                <Link to='/about'>
                  <BsPerson /> <span>About</span>
                </Link>
              </li>
              <li>
                <Link to='/portfolio'>
                  <IoMdImages /> <span>Portfolio</span>
                </Link>
              </li>
              <li>
                <Link to='/contact'>
                  <BiChat /> <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        </section>
        <section className={`card`}>
          <div>
            <h2 className={`${styles.subheading}`}>Newest additions</h2>
            <ul className={`${styles.list}`}>
              <li>
                <Link to='/portfolio/jokes'>
                  <GiAbstract019 />
                  <span>Jokes App</span>
                </Link>
                <p>The Comedian's Companion</p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
