import { FC, FormEvent } from 'react'
import Accordion from '../Accordion/Accordion'
import styles from './poems.module.css'
import useLocalStorage from '../../hooks/useStorage'
import { getPoem, PoemItem } from './services/poems'
import Poem from './Poem'
import { useLanguageContext } from '../../contexts/LanguageContext'

const Poems: FC = () => {
  const { t, language } = useLanguageContext()

  const [poem, setPoem] = useLocalStorage<PoemItem>('Stored-Poem', {
    title: '',
    author: '',
    lines: [],
    linecount: '0',
  })

  const fetchPoem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const linecount = Math.floor(Math.random() * 5) + 2
    const poem = await getPoem(language, linecount)
    setPoem(poem[0])
  }

  return (
    <section className={`card ${styles['poem-section']}`}>
      <div>
        <Accordion
          id="search-poem"
          className="poem-accordion"
          wrapperClass={styles.accordion}
          text={t('SearchForPoem')}
          closeClass={styles['closed-accordion']}
        >
          <>
            <h2>{t('SearchForPoem')}</h2>
            <p className="textcenter">
              ({t('Note')} {t('InEnglish')})
            </p>
            <form onSubmit={e => void fetchPoem(e)}>
              <button className={styles['accordion-submit']} type="submit">
                {t('Search')}
              </button>
            </form>
            {!poem?.lines ||
              (poem.lines.length < 1 && (
                <div
                  className={styles['accordion-paragraph-wrap']}
                  style={{
                    width: '100%',
                    maxWidth:
                      'clamp(100px, max-content, calc(100vw - var(--scrollbar_width)))',
                    margin: '2em auto 0',
                  }}
                >
                  <Poem poem={poem} />
                </div>
              ))}
          </>
        </Accordion>
      </div>
    </section>
  )
}

export default Poems
