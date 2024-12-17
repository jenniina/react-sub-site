import { FC, FormEvent } from 'react'
import { ELanguages, ESearch } from '../../interfaces'
import Accordion from '../Accordion/Accordion'
import styles from './poems.module.css'
import { EInEnglish, ENote } from '../Jokes/interfaces'
import useLocalStorage from '../../hooks/useStorage'
import { getPoem, PoemItem } from './services/poems'
import Poem from './Poem'
import { ESearchForPoem } from '../../interfaces/poems'

interface Props {
  language: ELanguages
}

const Poems: FC<Props> = ({ language }) => {
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
          language={language}
          id='search-poem'
          className='poem-accordion'
          wrapperClass={styles.accordion}
          text={ESearchForPoem[language]}
          closeClass={styles['closed-accordion']}
        >
          <>
            <h2>{ESearchForPoem[language]}</h2>
            <p className='textcenter'>
              ({ENote[language]} {EInEnglish[language]})
            </p>
            <form onSubmit={fetchPoem}>
              <button className={styles['accordion-submit']} type='submit'>
                {ESearch[language]}
              </button>
            </form>
            {!poem ||
              !poem.lines ||
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
                  <Poem poem={poem} language={language} />
                </div>
              ))}
          </>
        </Accordion>
      </div>
    </section>
  )
}

export default Poems
