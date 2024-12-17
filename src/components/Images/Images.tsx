import {
  FC,
  useState,
  useEffect,
  FormEvent,
  lazy,
  Suspense,
  Fragment,
  useRef,
  MouseEvent as ReactMouseEvent,
} from 'react'
import styles from './images.module.css'
import imagesAPI, { Hit, SearchOptions } from './services/images'
import {
  Category,
  Orientation,
  TImageTypes,
  TVideoTypes,
  Color,
  EOrientation,
  EEditorsChoice,
  OrderBy,
  EMediaPerPage,
  EVectorImagesCanBeDownloaded,
  EAll,
  EBatchesOf,
  EOfMedia,
  EVideoTypes,
  ESearchforVideos,
  ETextType,
} from '../../interfaces/images'
import { EQuote, EQuoteCategories } from '../../interfaces/quotes'
import {
  EClickToChooseSearchTerm,
  ECurrent,
  EFirstPage,
  ELanguages,
  ELastPage,
  ELoading,
  ENext,
  ENoMoreResults,
  ENote,
  EPage,
  EPrevious,
  ESearchParameters,
  EUpdated,
} from '../../interfaces'
import { EPleaseEnterASearchTerm, ESearchForMedia, EType } from '../../interfaces/images'
import { Select, SelectOption } from '../Select/Select'
import {
  ECategoryTitle,
  EOrderBy,
  ESafemodeTitle,
  ESearchByKeyword,
} from '../Jokes/interfaces'
import { generateOptions } from '../../interfaces/images'
import { EColors } from '../../interfaces/colors'
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
import { scrollIntoView } from '../../utils'
import WordCloud from '../AccessibleColors/components/WordCloud/WordCloud'
import useWindowSize from '../../hooks/useWindowSize'
import useTooltip from '../../hooks/useTooltip'
import { EPoem } from '../../interfaces/poems'

export type TTextType = 'quote' | 'poem'

const categoriesWithWeights = VALID_CATEGORIES.map((category) => ({
  text: category,
  weight:
    category === 'design'
      ? 50
      : WEIGHTED.includes(category)
      ? Math.floor(Math.random() * 10) + 30
      : SMALLER_CATEGORIES.includes(category)
      ? Math.floor(Math.random() * 5) + 15
      : Math.floor(Math.random() * 10) + 15,
}))

const categoriesWithWeightsSmaller = VALID_CATEGORIES.map((category) => ({
  text: category,
  weight:
    category === 'design'
      ? 33
      : WEIGHTED.includes(category)
      ? Math.floor(Math.random() * 10) + 16
      : SMALLER_CATEGORIES.includes(category)
      ? Math.floor(Math.random() * 5) + 14
      : Math.floor(Math.random() * 6) + 15,
}))

const categoriesWithWeightsSmallest = VALID_CATEGORIES.map((category) => ({
  text: category,
  weight:
    category === 'design'
      ? 28
      : WEIGHTED.includes(category)
      ? Math.floor(Math.random() * 10) + 13
      : SMALLER_CATEGORIES.includes(category)
      ? Math.floor(Math.random() * 5) + 14
      : Math.floor(Math.random() * 5) + 15,
}))

const Image = lazy(() => import('./components/Image'))
const Video = lazy(() => import('./components/Video'))

interface Props {
  language: ELanguages
}

const Images: FC<Props> = ({ language }) => {
  const dispatch = useAppDispatch()
  const { show } = useModal()
  const [media, setMedia] = useState<Hit[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('imagination')

  const [type, setType] = useState<TImageTypes>('photo')
  const [videoType, setVideoType] = useState<TVideoTypes>('all')
  const [orientation, setOrientation] = useState<Orientation>(Orientation.All)

  const [textType, setTextType] = useState<TTextType>('poem')

  const imageTypes: TImageTypes[] = ['all', 'photo', 'illustration', 'vector', 'video']
  const videoTypes: TVideoTypes[] = ['all', 'film', 'animation']
  const textTypes: TTextType[] = ['poem', 'quote']

  const orientationTypes: Orientation[] = [
    Orientation.All,
    Orientation.Horizontal,
    Orientation.Vertical,
  ]
  const optionsTextTypes: SelectOption[] = generateOptions(textTypes, language)
  const categoryTypes: Category[] = Object.values(Category)
  const colorTypes: Color[] = Object.values(Color)
  const orderByTypes: OrderBy[] = Object.values(OrderBy)

  const optionsVideoTypes: SelectOption[] = generateOptions(videoTypes, language)
  const optionsOrderBy: SelectOption[] = generateOptions(orderByTypes, language)
  const optionsImageTypes: SelectOption[] = generateOptions(imageTypes, language)
  const optionsOrientations: SelectOption[] = generateOptions(
    orientationTypes.map((o) => o),
    language
  )

  const optionsCategories: SelectOption[] = generateOptions(categoryTypes, language)
  // add 'all' to the categories
  optionsCategories.unshift({ label: EAll[language], value: '' }) // does not accept 'all' as a value
  const optionsColors: SelectOption[] = generateOptions(colorTypes, language)

  const [category, setCategory] = useState<Category | undefined>(undefined)
  const [colors, setColors] = useState<SelectOption[]>([])
  const [colorList, setColorList] = useState<Color[]>([])
  const [editorsChoice, setEditorsChoice] = useState<boolean>(false)
  const [safeSearch, setSafeSearch] = useState<boolean>(true)
  const [order, setOrder] = useState<'popular' | 'latest'>('popular')
  const [perFetch, setPerFetch] = useState<number>(100)
  const [subPage, setSubPage] = useState<number>(1)
  const [perSubPage, setPerSubPage] = useState<number>(20)
  const [totalSubPages, setTotalSubPages] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalHits, setTotalHits] = useState<number>(0)
  const [hasSearched, setHasSearched] = useState(false)
  const isFirstRun = useRef(true)
  const [fetchPage, setFetchPage] = useState<number>(1)
  const subPageOptions = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ]
  const { windowWidth } = useWindowSize()
  const { tooltip, handleMouseMove, handleMouseLeave } = useTooltip()

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
      setTotalHits(result.totalHits)
      setTotalSubPages(
        Math.ceil(result.hits.length < perSubPage ? 1 : result.hits.length / perSubPage)
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
    const array = colors?.map((color) => color.value)
    setColorList(array as Color[])
  }, [colors])

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchTerm.trim() === '') {
      dispatch(notify(EPleaseEnterASearchTerm[language], true, 6))
      setError(EPleaseEnterASearchTerm[language])
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
      dispatch(notify(EPleaseEnterASearchTerm[language], true, 6))
      setError(EPleaseEnterASearchTerm[language])
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
    setTotalSubPages(Math.ceil(media.length < perSubPage ? 1 : media.length / perSubPage))
  }, [media, perSubPage])

  const currentMedia = media.slice((subPage - 1) * perSubPage, subPage * perSubPage)

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
          <span className='scr'>{EFirstPage[language]}</span>
          <span aria-hidden='true' className='tooltip above narrow2'>
            {EFirstPage[language]}
          </span>
        </button>
        <button
          className={`tooltip-wrap`}
          onClick={() => setSubPage((prev) => Math.max(prev - 1, 1))}
          disabled={subPage === 1}
        >
          <BiChevronLeft />
          <span className='scr'>{EPrevious[language]}</span>
          <span aria-hidden='true' className='tooltip above narrow2'>
            {EPrevious[language]}
          </span>
        </button>
        <span>
          {EPage[language]} {subPage} / {totalSubPages}
        </span>
        <button
          className={`tooltip-wrap`}
          onClick={() => setSubPage((prev) => Math.min(prev + 1, totalSubPages))}
          disabled={subPage === totalSubPages}
        >
          <BiChevronRight />
          <span className='scr'>{ENext[language]}</span>
          <span aria-hidden='true' className='tooltip above narrow2'>
            {ENext[language]}
          </span>
        </button>
        <button
          className={`tooltip-wrap`}
          disabled={subPage === totalSubPages}
          onClick={() => setSubPage(totalSubPages)}
        >
          <BiChevronsRight />
          <span className='scr'>
            {ELastPage[language]} ({totalSubPages})
          </span>
          <span aria-hidden='true' className='tooltip above narrow2'>
            {ELastPage[language]} ({totalSubPages})
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
        data-current={i === fetchPage ? ECurrent[language] : ''}
        disabled={index === fetchPage - 1 || i > totalPages}
      >
        {i}
        <span className='tooltip above narrow2'>
          {EPage[language]} {i}
        </span>
      </button>
    </Fragment>
  ))

  const batchesOfMedia = (
    <>
      <p className={styles['batch-paragraph']}>
        {EBatchesOf[language]} {perFetch} {EOfMedia[language]}:
      </p>
      <div
        id={`${styles['fetch-btn-wrap']}`}
        className={styles['fetch-page-buttons-wrap']}
      >
        {fetchPage !== 1 && (
          <button
            className={`reset ${styles['fetch-more-btn']}`}
            onClick={() => setFetchPage((prev) => prev - 1)}
          >
            &laquo;&nbsp;{EPrevious[language]}
          </button>
        )}
        {fetchPageButtons}
        {fetchPage !== totalPages && (
          <button
            className={`reset ${styles['fetch-more-btn']}`}
            onClick={() => setFetchPage((prev) => prev + 1)}
          >
            {ENext[language]}&nbsp;&raquo;
          </button>
        )}
        {subPage === totalSubPages && fetchPage >= totalPages && (
          <p className={`${styles['end-message']}`}>{ENoMoreResults[language]}</p>
        )}
      </div>
    </>
  )

  const handleSetSearchTerm = (term: string) => {
    setSearchTerm(term)
    scrollIntoView('search-container', 'start')
    dispatch(
      notify(`${EUpdated[language]}: ${ESearchParameters[language]}: ${term}`, false, 4)
    )
  }

  return (
    <div id='search-container' className={styles['search-container']}>
      <section className={`card ${styles['settings-section']}`}>
        <div>
          <div
            className={`tooltip-wrap ${styles['wordcloud-wrap']}`}
            onMouseMove={onMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <WordCloud
              language={language}
              title={EQuoteCategories[language]}
              onClick={handleSetSearchTerm}
              words={
                windowWidth > 700
                  ? categoriesWithWeights
                  : windowWidth > 500
                  ? categoriesWithWeightsSmaller
                  : categoriesWithWeightsSmallest
              }
              width={
                windowWidth < 300
                  ? windowWidth - 20
                  : windowWidth < 600
                  ? windowWidth - 80
                  : windowWidth - (windowWidth / 100) * 30
              }
              height={windowWidth < 300 ? 900 : windowWidth < 500 ? 800 : 500}
            />
            {tooltip.visible && (
              <span
                className={`tooltip narrow`}
                style={{ top: tooltip.y, left: tooltip.x, right: 'unset' }}
              >
                {EClickToChooseSearchTerm[language]}
              </span>
            )}
          </div>
          <form onSubmit={handleSearch}>
            <div className={styles['search-wrap']}>
              <h2>{ESearchForMedia[language]}</h2>
              <div className={styles['column']}>
                <div className={`input-wrap ${styles['input-wrap']}`}>
                  <label>
                    <input
                      name='search'
                      type='text'
                      maxLength={100}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder={ESearchByKeyword[language]}
                    />
                    <span>{ESearchForMedia[language]}</span>
                  </label>
                </div>

                {type !== 'video' && (
                  <Select
                    z={8}
                    id='colors'
                    className={`${styles.select} ${styles['colors']}`}
                    multiple
                    instructions={EColors[language]}
                    value={colors}
                    onChange={(o) => setColors(o)}
                    options={optionsColors}
                    language={language}
                  />
                )}
              </div>
              <div className={styles['controls-wrap']}>
                <Select
                  z={7}
                  id='result-type'
                  className={`${styles.select} ${styles['result-type']}`}
                  hideDelete
                  instructions={EType[language]}
                  value={
                    optionsImageTypes.find((o) => o.value === type) || {
                      label: EAll[language],
                      value: 'all',
                    }
                  }
                  onChange={(o) => setType(o?.value as TImageTypes)}
                  options={optionsImageTypes}
                  language={language}
                />
                {type === 'video' ? (
                  <Select
                    z={6}
                    id='result-type'
                    className={`${styles.select} ${styles['result-type']}`}
                    hideDelete
                    instructions={EVideoTypes[language]}
                    value={
                      optionsVideoTypes.find((o) => o.value === videoType) || {
                        label: EAll[language],
                        value: 'all',
                      }
                    }
                    onChange={(o) => setVideoType(o?.value as TVideoTypes)}
                    options={optionsVideoTypes}
                    language={language}
                  />
                ) : (
                  <Select
                    z={5}
                    id='orientation'
                    className={`${styles.select} ${styles['orientation']}`}
                    instructions={EOrientation[language]}
                    hideDelete
                    value={
                      optionsOrientations.find((o) => o.value === orientation) || {
                        label: EAll[language],
                        value: 'all',
                      }
                    }
                    onChange={(o) => setOrientation(o?.value as Orientation)}
                    options={optionsOrientations}
                    language={language}
                  />
                )}

                <Select
                  z={4}
                  id='category'
                  className={`${styles.select} ${styles['category']}`}
                  hideDelete
                  instructions={ECategoryTitle[language]}
                  value={
                    optionsCategories.find((o) => o.value === category) || {
                      label: EAll[language],
                      value: '', // does not accept 'all' as a value
                    }
                  }
                  onChange={(o) => setCategory(o?.value as Category)}
                  options={optionsCategories}
                  language={language}
                />

                <Select
                  z={3}
                  id='order-by'
                  className={`${styles.select} ${styles['order-by']}`}
                  hideDelete
                  instructions={EOrderBy[language]}
                  value={
                    optionsOrderBy.find((o) => o.value === order) || {
                      label: 'Popular',
                      value: 'popular',
                    }
                  }
                  onChange={(o) => setOrder(o?.value as 'popular' | 'latest')}
                  options={optionsOrderBy}
                  language={language}
                />
              </div>
            </div>

            <div className={`${styles['checkbox-wrap']}`}>
              <label>
                <input
                  type='checkbox'
                  checked={editorsChoice}
                  onChange={(e) => setEditorsChoice(e.target.checked)}
                />
                {EEditorsChoice[language]} (Pixabay)
              </label>

              <label>
                <input
                  type='checkbox'
                  checked={safeSearch}
                  onChange={(e) => setSafeSearch(e.target.checked)}
                />
                {ESafemodeTitle[language]}
              </label>
            </div>

            <div className={styles['submit-wrap']}>
              <Select
                z={2}
                id='text-type'
                className={`${styles.select} ${styles['text-type']}`}
                hideDelete
                instructions={ETextType[language]}
                value={
                  optionsTextTypes.find((o) => o.value === textType) || {
                    label: EAll[language],
                    value: '',
                  }
                }
                onChange={(o) => setTextType(o?.value as TTextType)}
                options={optionsTextTypes}
                language={language}
              />
              <Select
                z={1}
                id='images-per-page'
                className={`${styles.select} ${styles['images-per-page']}`}
                hideDelete
                instructions={EMediaPerPage[language]}
                value={
                  subPageOptions.find((o) => o.value === perSubPage) || {
                    label: '20',
                    value: 20,
                  }
                }
                onChange={(o) => {
                  setPerSubPage(Number(o?.value))
                }}
                options={subPageOptions}
                language={language}
              />

              <button type='submit' disabled={loading}>
                {type === 'video'
                  ? ESearchforVideos[language]
                  : ESearchForMedia[language]}
              </button>
            </div>
            {type === 'vector' && (
              <p className={`textcenter flex center   ${styles.note}`}>
                {ENote[language]} {EVectorImagesCanBeDownloaded[language]}
              </p>
            )}
          </form>
        </div>
      </section>

      {media.length > 0 && (
        <section className={`card ${styles['image-section']}`}>
          <div>
            {loading && (
              <p className='textcenter flex center margin0auto textcenter'>
                {ELoading[language]}...
              </p>
            )}

            {error && <p className={styles.error}>{error}</p>}

            {pagination()}
            <div id='image-container' className={styles['image-container']}>
              {currentMedia.map((item) => (
                <Fragment key={item.id}>
                  {'videos' in item ? (
                    <Suspense
                      fallback={
                        <div
                          key={`key-${item.id}`}
                          className='flex center margin0auto textcenter'
                          style={{
                            width: '100%',
                            height: 'auto',
                            aspectRatio:
                              item.videos.small.width / item.videos.small.height,
                          }}
                        >
                          {ELoading[language]}...
                        </div>
                      }
                    >
                      <Video
                        key={item.id}
                        video={item as any}
                        language={language}
                        show={show}
                        searchTerm={searchTerm}
                        textType={textType}
                      />
                    </Suspense>
                  ) : (
                    <Suspense
                      fallback={
                        <div
                          key={`key-${item.id}`}
                          className='flex center margin0auto textcenter'
                          style={{
                            width: '100%',
                            height: `${item.previewHeight}px`,
                            aspectRatio: item.previewWidth / item.previewHeight,
                          }}
                        >
                          {ELoading[language]}...
                        </div>
                      }
                    >
                      <Image
                        key={item.id}
                        image={item as any}
                        language={language}
                        show={show}
                        searchTerm={searchTerm}
                        textType={textType}
                      />
                    </Suspense>
                  )}
                </Fragment>
              ))}
            </div>
            {pagination()}

            {subPage === 1 && fetchPage > 1 && batchesOfMedia}
            {subPage === totalSubPages && fetchPage <= totalPages && batchesOfMedia}
          </div>
        </section>
      )}
    </div>
  )
}

export default Images
