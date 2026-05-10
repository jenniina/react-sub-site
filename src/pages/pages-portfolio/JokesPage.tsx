import {
  jokeCategoryByLanguage,
  jokeCategoryAny,
} from '../../components/Jokes/types'
import Accordion from '../../components/Accordion/Accordion'
import Icon from '../../components/Icon/Icon'
import { ELanguages, ELanguagesLong, LanguageOfLanguage } from '../../types'
import { SyntheticEvent } from 'react'
import { Select, SelectOption } from '../../components/Select/Select'
import { options } from '../../utils'
import { useLanguageContext } from '../../contexts/LanguageContext'
import Jokes from '../../components/Jokes/Jokes'
import SEO from '../../components/SEO/SEO'

export default function JokesPage({ type }: { type: string }) {
  const { t, language, setLanguage } = useLanguageContext()

  const titleLanguage = t('LanguageTitle')

  const handleSkipToJokes = (e: SyntheticEvent) => {
    e.preventDefault()
    const anchor = document?.querySelector('#saved')
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSkipToJokeSearch = (e: SyntheticEvent) => {
    e.preventDefault()
    const anchor = document?.querySelector('#jokeform')
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <SEO
        title={`${t('Jokes')} | ${t('TheComediansCompanion')}`}
        description={`${t('YouMaySaveYourFavoriteJokesOrAddYourOwn')}`}
        canonicalUrl="https://react.jenniina.fi/portfolio/jokes"
        ogTitle={`${t('Jokes')} | ${t('TheComediansCompanion')}`}
      />
      <div className={`${type} ${language}`}>
        <div className="inner-wrap">
          <section className="joke-container card introduction">
            <div>
              <div className="flex column medium gap2">
                <div className="flex column left gap-half mb1">
                  <p>
                    {t('JokesAppIntro')} {t('JokesAppIntro2')}
                  </p>
                  <p>{t('YouMaySaveYourFavoriteJokesOrAddYourOwn')}</p>
                </div>
                <div className="flex column gap w100">
                  <p>
                    <big>
                      <a href="https://jokes.jenniina.fi">
                        {t('TheComediansCompanion')} &raquo;
                      </a>
                    </big>
                  </p>
                  <p>
                    <a href="https://github.com/jenniina/jokes">
                      Github &raquo;
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
