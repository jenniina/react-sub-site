import {
  FC,
  useState,
  useEffect,
  FormEvent,
  Fragment,
  useRef,
  MouseEvent as ReactMouseEvent,
} from 'react'
import useDebounce from '../../hooks/useDebounce'
import styles from './images.module.css'
import imagesAPI, { Hit, SearchOptions } from './services/images'
import {
  Category,
  Orientation,
  TImageTypes,
  TVideoTypes,
  Color,
  OrderBy,
} from '../../types/images'
import {
  ELanguages,
  generateOptionsFromT,
  TranslationKey,
  TranslationLang,
  translations,
} from '../../types'
import { Select, SelectOption } from '../Select/Select'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { useModal } from '../../hooks/useModal'
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from 'react-icons/bi'
import { SMALLER_CATEGORIES, WEIGHTED } from '../Quotes/services/quotes'
import { VALID_CATEGORIES } from '../Quotes/services/quotes'
import { firstToUpperCase, scrollIntoView } from '../../utils'
import useWindowSize from '../../hooks/useWindowSize'
import useTooltip from '../../hooks/useTooltip'
import { useLanguageContext } from '../../contexts/LanguageContext'
import WordCloud from '../WordCloud/WordCloud'
import Image from './components/Image'
import Video from './components/Video'

interface Props {
  language: ELanguages
}

const imageTypes: TImageTypes[] = [
  'all',
  'photo',
  'illustration',
  'vector',
  'video',
]

export type TTextType = 'poem' | 'quote'

const videoTypes: TVideoTypes[] = ['all', 'film', 'animation']
const textTypes: TTextType[] = ['poem', 'quote']
const colorTypes: Color[] = Object.values(Color)
const orderByTypes: OrderBy[] = Object.values(OrderBy)
const orientationTypes: Orientation[] = Object.values(Orientation)
const categoryTypes: Category[] = Object.values(Category)

let categoriesWithWeights: { text: string; weight: number }[] = []
let categoriesWithWeightsSmaller: { text: string; weight: number }[] = []
let categoriesWithWeightsSmallest: { text: string; weight: number }[] = []

const toLanguages = (language: ELanguages) => {
  categoriesWithWeights = VALID_CATEGORIES.map(category => ({
    text: translations[firstToUpperCase(category) as TranslationKey][
      language as TranslationLang
    ],
    weight:
      category === 'design'
        ? 50
        : WEIGHTED.includes(category)
          ? Math.floor(Math.random() * 10) + 30
          : SMALLER_CATEGORIES.includes(category)
            ? Math.floor(Math.random() * 5) + 15
            : Math.floor(Math.random() * 10) + 15,
  }))

  categoriesWithWeightsSmaller = VALID_CATEGORIES.map(category => ({
    text: translations[firstToUpperCase(category) as TranslationKey][
      language as TranslationLang
    ],
    weight:
      category === 'design'
        ? 33
        : WEIGHTED.includes(category)
          ? Math.floor(Math.random() * 10) + 16
          : SMALLER_CATEGORIES.includes(category)
            ? Math.floor(Math.random() * 5) + 14
            : Math.floor(Math.random() * 6) + 15,
  }))

  categoriesWithWeightsSmallest = VALID_CATEGORIES.map(category => ({
    text: translations[firstToUpperCase(category) as TranslationKey][
      language as TranslationLang
    ],
    weight:
      category === 'design'
        ? 28
        : WEIGHTED.includes(category)
          ? Math.floor(Math.random() * 10) + 13
          : SMALLER_CATEGORIES.includes(category)
            ? Math.floor(Math.random() * 5) + 14
            : Math.floor(Math.random() * 5) + 15,
  }))
}

const Images: FC<Props> = ({ language }) => {
  const { t } = useLanguageContext()

  const dispatch = useAppDispatch()
  const { show } = useModal()
  const [media, setMedia] = useState<Hit[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('imagination')

  const [type, setType] = useState<TImageTypes>('photo')
  const [videoType, setVideoType] = useState<TVideoTypes>('all')
  const [orientation, setOrientation] = useState<Orientation>(Orientation.all)
  const [textType, setTextType] = useState<TTextType>('poem')

  const optionsImageTypes: SelectOption[] = generateOptionsFromT(
    imageTypes,
    language
  )
  const optionsVideoTypes: SelectOption[] = generateOptionsFromT(
    videoTypes,
    language
  )
  const optionsTextTypes: SelectOption[] = generateOptionsFromT(
    textTypes,
    language
  )
  const optionsColors: SelectOption[] = generateOptionsFromT(
    colorTypes,
    language
  )
  const optionsOrderBy: SelectOption[] = generateOptionsFromT(
    orderByTypes,
    language
  )
  const optionsOrientations: SelectOption[] = generateOptionsFromT(
    orientationTypes,
    language
  )
  const optionsCategories: SelectOption[] = generateOptionsFromT(
    categoryTypes,
    language
  )
  // add 'all' to the categories
  optionsCategories.unshift({ label: t('All'), value: '' }) // does not accept 'all' as a value

  const perFetch = 100
  const isFirstRun = useRef(true)
  const [category, setCategory] = useState<Category | undefined>(undefined)
  const [colors, setColors] = useState<SelectOption[]>([])
  const [colorList, setColorList] = useState<Color[]>([])
  const [editorsChoice, setEditorsChoice] = useState<boolean>(false)
  const [safeSearch, setSafeSearch] = useState<boolean>(true)
  const [order, setOrder] = useState<'popular' | 'latest'>('popular')
  const [subPage, setSubPage] = useState<number>(1)
  const [perSubPage, setPerSubPage] = useState<number>(20)
  const [totalSubPages, setTotalSubPages] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [hasSearched, setHasSearched] = useState(false)
  const [fetchPage, setFetchPage] = useState<number>(1)
  const subPageOptions = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ]
  const { tooltip, handleMouseMove, handleMouseLeave } = useTooltip()
  const { windowWidth } = useWindowSize()
  const debouncedWindowWidth = useDebounce(windowWidth, 200)

  const [breakpoint, setBreakpoint] = useState<'large' | 'medium' | 'small'>(
    () => {
      if (windowWidth > 700) return 'large'
      if (windowWidth > 500) return 'medium'
      return 'small'
    }
  )

  const [words, setWords] = useState<{ text: string; weight: number }[]>([])

  useEffect(() => {
    let newBreakpoint: 'large' | 'medium' | 'small'
    if (debouncedWindowWidth > 700) newBreakpoint = 'large'
    else if (debouncedWindowWidth > 500) newBreakpoint = 'medium'
    else newBreakpoint = 'small'

    setBreakpoint(prev => (prev !== newBreakpoint ? newBreakpoint : prev))
  }, [debouncedWindowWidth])

  useEffect(() => {
    if (breakpoint === 'large') {
      setWords(categoriesWithWeights)
    } else if (breakpoint === 'medium') {
      setWords(categoriesWithWeightsSmaller)
    } else {
      setWords(categoriesWithWeightsSmallest)
    }
  }, [language, breakpoint])

  useEffect(() => {
    toLanguages(language)
  }, [language])

  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - 50
    const y = e.clientY - rect.top + 30
    handleMouseMove(x, y)
  }

  const fetchMedia = async (options: SearchOptions) => {
    setLoading(true)
    setError('')

    const result = await imagesAPI.searchMedia(language, options)

    if (result.success) {
      setMedia(result.hits)
      setTotalSubPages(
        Math.ceil(
          result.hits.length < perSubPage ? 1 : result.hits.length / perSubPage
        )
      )
      setTotalPages(
        Math.ceil(result.totalHits < perFetch ? 1 : result.totalHits / perFetch)
      )
      scrollIntoView('image-container')
    } else {
      dispatch(notify(result.message || 'Error fetching images.', true, 6))
      setError(result.message || 'Error fetching images.')
    }
    setLoading(false)
  }

  useEffect(() => {
    const array = colors?.map(color => color.value)
    setColorList(array as Color[])
  }, [colors])

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchTerm.trim() === '') {
      dispatch(notify(t('PleaseEnterASearchTerm'), true, 6))
      setError(t('PleaseEnterASearchTerm'))
      return
    }
    setSubPage(1)
    setHasSearched(true)
    const options: SearchOptions = {
      q: searchTerm,
      type,
      video_type: videoType !== 'all' ? videoType : undefined,
      orientation,
      category,
      colors: colorList && colorList.length > 0 ? colorList : undefined,
      editors_choice: editorsChoice,
      safesearch: safeSearch,
      order,
      per_page: perFetch,
      page: fetchPage,
    }

    fetchMedia(options)
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }

    if (!hasSearched) return

    if (searchTerm.trim() === '') {
      dispatch(notify(t('PleaseEnterASearchTerm'), true, 6))
      setError(t('PleaseEnterASearchTerm'))
      return
    }

    setSubPage(1)
    scrollIntoView('image-container')

    const defaultOptions: SearchOptions = {
      q: searchTerm,
      type,
      video_type: videoType !== 'all' ? videoType : undefined,
      orientation,
      category,
      colors: colorList && colorList.length > 0 ? colorList : undefined,
      editors_choice: editorsChoice,
      safesearch: safeSearch,
      order,
      per_page: perFetch,
      page: fetchPage,
    }
    fetchMedia(defaultOptions)
  }, [fetchPage])

  useEffect(() => {
    setTotalSubPages(
      Math.ceil(media.length < perSubPage ? 1 : media.length / perSubPage)
    )
  }, [media, perSubPage])

  const currentMedia = media.slice(
    (subPage - 1) * perSubPage,
    subPage * perSubPage
  )

  const pagination = () => {
    if (media.length === 0) return <></>
    if (totalSubPages === 1) return <></>
    return (
      <div className={styles['pagination-wrap']}>
        <button
          className={`tooltip-wrap`}
          disabled={subPage === 1}
          onClick={() => setSubPage(1)}
        >
          <BiChevronsLeft />
          <span className="scr">{t('FirstPage')}</span>
          <span aria-hidden="true" className="tooltip above narrow2">
            {t('FirstPage')}
          </span>
        </button>
        <button
          className={`tooltip-wrap`}
          onClick={() => setSubPage(prev => Math.max(prev - 1, 1))}
          disabled={subPage === 1}
        >
          <BiChevronLeft />
          <span className="scr">{t('Previous')}</span>
          <span aria-hidden="true" className="tooltip above narrow2">
            {t('Previous')}
          </span>
        </button>
        <span>
          {t('Page')} {subPage} / {totalSubPages}
        </span>
        <button
          className={`tooltip-wrap`}
          onClick={() => setSubPage(prev => Math.min(prev + 1, totalSubPages))}
          disabled={subPage === totalSubPages}
        >
          <BiChevronRight />
          <span className="scr">{t('Next')}</span>
          <span aria-hidden="true" className="tooltip above narrow2">
            {t('Next')}
          </span>
        </button>
        <button
          className={`tooltip-wrap`}
          disabled={subPage === totalSubPages}
          onClick={() => setSubPage(totalSubPages)}
        >
          <BiChevronsRight />
          <span className="scr">
            {t('LastPage')} ({totalSubPages})
          </span>
          <span aria-hidden="true" className="tooltip above narrow2">
            {t('LastPage')} ({totalSubPages})
          </span>
        </button>
      </div>
    )
  }

  const fetchPageArray = Array.from({ length: totalPages }, (_, i) => i + 1)

  const fetchPageButtons = fetchPageArray.map((i, index) => (
    <Fragment key={i}>
      <button
        onClick={() => {
          setSubPage(1)
          setFetchPage(i)
        }}
        className={`tooltip-wrap ${styles['fetch-page-button']} ${
          i === fetchPage ? styles.active : ''
        }`}
        data-current={i === fetchPage ? t('Current') : ''}
        disabled={index === fetchPage - 1 || i > totalPages}
      >
        {i}
        <span className="tooltip above narrow2">
          {t('Page')} {i}
        </span>
      </button>
    </Fragment>
  ))

  const batchesOfMedia = (
    <>
      <p className={styles['batch-paragraph']}>
        {t('BatchesOf')} {perFetch} {t('OfMedia')}:
      </p>
      <div
        id={`${styles['fetch-btn-wrap']}`}
        className={styles['fetch-page-buttons-wrap']}
      >
        {fetchPage !== 1 && (
          <button
            className={`reset ${styles['fetch-more-btn']}`}
            onClick={() => setFetchPage(prev => prev - 1)}
          >
            &laquo;&nbsp;{t('Previous')}
          </button>
        )}
        {fetchPageButtons}
        {fetchPage !== totalPages && (
          <button
            className={`reset ${styles['fetch-more-btn']}`}
            onClick={() => setFetchPage(prev => prev + 1)}
          >
            {t('Next')}&nbsp;&raquo;
          </button>
        )}
        {subPage === totalSubPages && fetchPage >= totalPages && (
          <p className={`${styles['end-message']}`}>{t('NoMoreResults')}</p>
        )}
      </div>
    </>
  )

  const handleSetSearchTerm = (term: string) => {
    setSearchTerm(term)
    scrollIntoView('search-wrap', 'start')
    dispatch(
      notify(`${t('Updated')}: ${t('SearchParameters')}: ${term}`, false, 4)
    )
  }

  return (
    <div id="search-container" className={styles['search-container']}>
      <section className={`card ${styles['settings-section']}`}>
        <div>
          <div
            className={`tooltip-wrap ${styles['wordcloud-wrap']}`}
            onMouseMove={onMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <WordCloud
              language={language}
              title={t('QuoteCategories')}
              onClick={handleSetSearchTerm}
              words={words}
              width={
                debouncedWindowWidth < 300
                  ? debouncedWindowWidth - 20
                  : debouncedWindowWidth < 600
                    ? debouncedWindowWidth - 80
                    : debouncedWindowWidth - (debouncedWindowWidth / 100) * 30
              }
              height={
                debouncedWindowWidth < 300
                  ? 900
                  : debouncedWindowWidth < 500
                    ? 800
                    : 500
              }
            />
            {tooltip.visible && (
              <span
                className={`tooltip narrow`}
                style={{ top: tooltip.y, left: tooltip.x, right: 'unset' }}
              >
                {t('ClickToChooseSearchTerm')}
              </span>
            )}
          </div>
          <form onSubmit={handleSearch}>
            <div id="search-wrap" className={styles['search-wrap']}>
              <h2>{t('SearchForMedia')}</h2>
              <div className={styles['column']}>
                <div className={`input-wrap ${styles['input-wrap']}`}>
                  <label>
                    <input
                      name="search"
                      type="text"
                      maxLength={100}
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      placeholder={t('SearchByKeyword')}
                    />
                    <span>{t('SearchForMedia')}</span>
                  </label>
                </div>

                {type !== 'video' && (
                  <Select
                    z={8}
                    id="colors"
                    className={`${styles.select} ${styles['colors']}`}
                    multiple
                    instructions={t('Colors')}
                    value={colors}
                    onChange={o => setColors(o)}
                    options={optionsColors}
                    language={language}
                  />
                )}
              </div>
              <div className={styles['controls-wrap']}>
                <Select
                  z={7}
                  id="result-type"
                  className={`${styles.select} ${styles['result-type']}`}
                  hideDelete
                  instructions={t('Type')}
                  value={
                    optionsImageTypes.find(o => o.value === type) || {
                      label: t('All'),
                      value: 'all',
                    }
                  }
                  onChange={o => setType(o?.value as TImageTypes)}
                  options={optionsImageTypes}
                  language={language}
                />
                {type === 'video' ? (
                  <Select
                    z={6}
                    id="result-type"
                    className={`${styles.select} ${styles['result-type']}`}
                    hideDelete
                    instructions={t('VideoTypes')}
                    value={
                      optionsVideoTypes.find(o => o.value === videoType) || {
                        label: t('All'),
                        value: 'all',
                      }
                    }
                    onChange={o => setVideoType(o?.value as TVideoTypes)}
                    options={optionsVideoTypes}
                    language={language}
                  />
                ) : (
                  <Select
                    z={5}
                    id="orientation"
                    className={`${styles.select} ${styles['orientation']}`}
                    instructions={t('Orientation')}
                    hideDelete
                    value={
                      optionsOrientations.find(
                        o => o.value === orientation
                      ) || {
                        label: t('All'),
                        value: 'all',
                      }
                    }
                    onChange={o => setOrientation(o?.value as Orientation)}
                    options={optionsOrientations}
                    language={language}
                  />
                )}

                <Select
                  z={4}
                  id="category"
                  className={`${styles.select} ${styles['category']}`}
                  hideDelete
                  instructions={t('CategoryTitle')}
                  value={
                    optionsCategories.find(o => o.value === category) || {
                      label: t('All'),
                      value: '', // does not accept 'all' as a value
                    }
                  }
                  onChange={o => setCategory(o?.value as Category)}
                  options={optionsCategories}
                  language={language}
                />

                <Select
                  z={3}
                  id="order-by"
                  className={`${styles.select} ${styles['order-by']}`}
                  hideDelete
                  instructions={t('OrderBy')}
                  value={
                    optionsOrderBy.find(o => o.value === order) || {
                      label: 'Popular',
                      value: 'popular',
                    }
                  }
                  onChange={o => setOrder(o?.value as 'popular' | 'latest')}
                  options={optionsOrderBy}
                  language={language}
                />
              </div>
            </div>

            <div className={`${styles['checkbox-wrap']}`}>
              <label>
                <input
                  type="checkbox"
                  checked={editorsChoice}
                  onChange={e => setEditorsChoice(e.target.checked)}
                />
                {t('EditorsChoice')} (Pixabay)
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={safeSearch}
                  onChange={e => setSafeSearch(e.target.checked)}
                />
                {t('SafemodeTitle')}
              </label>
            </div>

            <div className={styles['submit-wrap']}>
              <Select
                z={2}
                id="text-type"
                className={`${styles.select} ${styles['text-type']}`}
                hideDelete
                instructions={t('TextType')}
                value={
                  optionsTextTypes.find(o => o.value === textType) || {
                    label: t('All'),
                    value: '',
                  }
                }
                onChange={o => setTextType(o?.value as TTextType)}
                options={optionsTextTypes}
                language={language}
              />
              <Select
                z={1}
                id="images-per-page"
                className={`${styles.select} ${styles['images-per-page']}`}
                hideDelete
                instructions={t('MediaPerPage')}
                value={
                  subPageOptions.find(o => o.value === perSubPage) || {
                    label: '20',
                    value: 20,
                  }
                }
                onChange={o => {
                  setPerSubPage(Number(o?.value))
                }}
                options={subPageOptions}
                language={language}
              />

              <button type="submit" disabled={loading}>
                {type === 'video' ? t('SearchforVideos') : t('SearchForMedia')}
              </button>
            </div>
            {type === 'vector' && (
              <p className={`textcenter flex center   ${styles.note}`}>
                {t('Note')} {t('VectorImagesCanBeDownloaded')}
              </p>
            )}
          </form>
        </div>
      </section>

      {media.length > 0 && (
        <section className={`card ${styles['image-section']}`}>
          <div>
            {loading && (
              <p className="textcenter flex center margin0auto textcenter">
                {t('Loading')}...
              </p>
            )}

            {error && <p className={styles.error}>{error}</p>}

            {pagination()}
            <div id="image-container" className={styles['image-container']}>
              {currentMedia.map(item => (
                <Fragment key={item.id}>
                  {'videos' in item ? (
                    <Video
                      key={item.id}
                      video={item as any}
                      language={language}
                      show={show}
                      searchTerm={searchTerm}
                      textType={textType}
                    />
                  ) : (
                    <Image
                      key={item.id}
                      image={item as any}
                      language={language}
                      show={show}
                      searchTerm={searchTerm}
                      textType={textType}
                    />
                  )}
                </Fragment>
              ))}
            </div>
            {pagination()}

            {subPage === 1 && fetchPage > 1 && batchesOfMedia}
            {subPage === totalSubPages &&
              fetchPage <= totalPages &&
              batchesOfMedia}
          </div>
        </section>
      )}
    </div>
  )
}

export default Images
