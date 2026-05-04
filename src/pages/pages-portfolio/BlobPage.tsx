import '../../css/blob.css'
import { CSSProperties } from 'react'
import { useLanguageContext } from '../../contexts/LanguageContext'
import SEO from '../../components/SEO/SEO'
import useWindowSize from '../../hooks/useWindowSize'

const BLOB_MIGRATION_PREFIX = '__blob_art_migration__:'
const BLOB_STORAGE_KEY_PATTERN =
  /^(BlobCanvasSize|BlobCanvasOffset|BlobLayerAmount|BackgroundColor|Draggables)\d+$/

const buildBlobMigrationWindowName = () => {
  if (typeof window === 'undefined') return ''

  const storage: Record<string, string> = {}

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index)
    if (!key || !BLOB_STORAGE_KEY_PATTERN.test(key)) continue

    const value = window.localStorage.getItem(key)
    if (value != null) {
      storage[key] = value
    }
  }

  return `${BLOB_MIGRATION_PREFIX}${JSON.stringify({
    source: window.location.origin,
    timestamp: Date.now(),
    storage,
  })}`
}

export default function BlobPage({ type }: { type: string }) {
  const { t } = useLanguageContext()

  const { windowWidth } = useWindowSize()

  const breakpoint = 500

  const blobStyle: CSSProperties = {
    width: '100%',
    height: 'auto',
    maxWidth: '100%',
    display: 'block',
    margin: '1em auto',
  }

  const handleStandaloneLinkClick = () => {
    if (typeof window === 'undefined') return

    window.name = buildBlobMigrationWindowName()
  }

  return (
    <>
      <SEO
        title={`${t('Blobs')} | ${t('BlobAppSlogan')}`}
        description={t('BlobAppIntro')}
        canonicalUrl="https://react.jenniina.fi/portfolio/blob"
      />
      <div className={`blob ${type}`}>
        <div className="inner-wrap">
          <section>
            <div className="card">
              <div>
                <div
                  className="flex column gap2"
                  style={{
                    marginTop: '2rem',
                    textAlign: 'center',
                  }}
                >
                  <p className="flex column gap">
                    {t('BlobArtApp')}:
                    <big>
                      <a
                        href="https://blobs.jenniina.fi"
                        onClick={handleStandaloneLinkClick}
                      >
                        blobs.jenniina.fi &raquo;
                      </a>
                    </big>
                  </p>
                  <p>
                    <a href="https://github.com/jenniina/blob-art">
                      GitHub &raquo;
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
