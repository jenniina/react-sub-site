import { useState } from 'react'
import Accordion from '../../components/Accordion/Accordion'
import { useLanguageContext } from '../../contexts/LanguageContext'
import SEO from '../../components/SEO/SEO'
import styles from '../css//portfolio.module.css'
import { useTheme } from '../../hooks/useTheme'

export default function ComposerPage({ type }: { type: string }) {
  const { t } = useLanguageContext()
  const lightTheme = useTheme()

  const [isFormOpen, setIsFormOpen] = useState(false)
  return (
    <>
      <SEO
        title={`${t('WCAGTool')} | ${t('ColorAccessibility')}`}
        description={`${t('WCAGTool')} - ${t('TestColorCombinations')}`}
        canonicalUrl="https://react.jenniina.fi/portfolio/colors"
      />
      <div className={`${styles['color-page']} ${type}`}>
        <div className="inner-wrap">
          <section className="card">
            <div>
              <div className="medium flex column left gap">
                <p className="center max-content margin0auto">
                  <i>Contrast at a Glance:</i> {t('WCAGTool')}.{' '}
                  {t('TestColorCombinations')}
                  <br />
                  <br />
                </p>
                <p>
                  <big>
                    <a
                      href={`https://colors.jenniina.fi?light=${lightTheme ? 'true' : 'false'}`}
                    >
                      Contrast at a Glance &raquo;
                    </a>
                  </big>
                </p>
                <p>
                  <a href="https://github.com/jenniina/color-accessibility-checker">
                    Github &raquo;
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
