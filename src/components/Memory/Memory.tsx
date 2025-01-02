import styles from './memory.module.css'
import {
  FC,
  ReactElement,
  useState,
  useEffect,
  ChangeEvent,
  Fragment,
  lazy,
  Suspense,
} from 'react'
import {
  FaAppleAlt,
  FaAnchor,
  FaBicycle,
  FaBolt,
  FaCat,
  FaDog,
  FaFish,
  FaHeart,
  FaBell,
  FaDice,
  FaDove,
  FaEdit,
  FaEnvelope,
  FaFan,
  FaFeather,
  FaHammer,
  FaHandshake,
  FaHatWizard,
  FaHatCowboy,
  FaHeadphones,
  FaHorse,
  FaIceCream,
  FaKey,
  FaKeyboard,
  FaLandmark,
  FaLeaf,
  FaMountain,
  FaMoon,
  FaMusic,
  FaPalette,
  FaPaperPlane,
  FaPaperclip,
  FaPizzaSlice,
  FaPlane,
  FaPlusCircle,
  FaRegHourglass,
  FaRocket,
  FaRobot,
  FaSnowman,
  FaSun,
  FaSeedling,
  FaStar,
  FaUmbrellaBeach,
  FaUser,
  FaTimes,
} from 'react-icons/fa'
import {
  EDelete,
  EEdit,
  ELanguages,
  ELoading,
  EName,
  ENewName,
  EPleaseUseGoodTasteWhenChoosingYourNickname,
  EProfanityWillBeRemovedByTheAdmin,
  ESettings,
  ESpecialCharactersNotAllowed,
  ETryWithADifferentBrowser,
  IUser,
  ReducerProps,
} from '../../types'
import {
  EAdvanced,
  EBeginner,
  ECardType,
  EDone,
  EExpert,
  EGridSize,
  EIcons,
  ELetters,
  ENumbers,
  EPlayer,
  EPlayers,
  EScores,
  ESeconds,
  EStartGame,
  ETime,
  ETimeTaken,
  EUsual,
  CardTypeOptions,
  EPlayAgain,
  EYouMadeItToTheHighScores,
  EDeleteHighScore,
  EDeletePlayersHighScores,
  GameMode,
  EGameMode,
  ESolo,
  EDuet,
  EHighScores,
  EFastestTime,
} from '../../types/memory'
import { EGoodJob, EScore } from '../../types/quiz'
import { Md123, MdAbc, MdInsertEmoticon } from 'react-icons/md'
import { HiMiniSparkles } from 'react-icons/hi2'
import {
  FaCar,
  FaGears,
  FaHouse,
  FaLightbulb,
  FaMagnifyingGlass,
  FaPencil,
} from 'react-icons/fa6'
import { CardType } from '../../types/memory'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import useLocalStorage from '../../hooks/useStorage'
import { useTheme } from '../../hooks/useTheme'
//import CardTypeButton from './components/CardTypeButton'
//import GridSizeButton from './components/GridSizeButton'
//import PlayerAmountButton from './components/PlayerAmountButton'
//import GameGrid from './components/GameGrid'
import useTimer from '../../hooks/useTimer'
import useHighScores from './hooks/useHighScores'
import { IHighScore } from '../../types/memory'
import { useModal } from '../../hooks/useModal'
// import highScoresService from './services/highScores'
import TimerDisplay from './components/TimerDisplay'
import { useSelector } from 'react-redux'
import { initializeUser } from '../../reducers/authReducer'
import { scrollIntoView } from '../../utils'
import Accordion from '../Accordion/Accordion'
import { AiFillEdit } from 'react-icons/ai'
import useWindowSize from '../../hooks/useWindowSize'

const CardTypeButton = lazy(() => import('./components/CardTypeButton'))
const GridSizeButton = lazy(() => import('./components/GridSizeButton'))
const PlayerAmountButton = lazy(() => import('./components/PlayerAmountButton'))
const GameGrid = lazy(() => import('./components/GameGrid'))

type Player = {
  id: number
  name: string
  score: number
}

const iconSet: JSX.Element[] = [
  <FaAnchor />,
  <FaAppleAlt />,
  <FaBicycle />,
  <FaBolt />,
  <FaCat />,
  <FaDog />,
  <FaFish />,
  <FaBell />,
  <FaCar />,
  <FaDice />,
  <FaDove />,
  <FaEdit />,
  <FaEnvelope />,
  <FaFan />,
  <FaFeather />,
  <FaGears />,
  <FaHammer />,
  <FaHandshake />,
  <FaHatWizard />,
  <FaHatCowboy />,
  <FaHeadphones />,
  <FaHeart />,
  <FaHouse />,
  <FaHorse />,
  <FaIceCream />,
  <MdInsertEmoticon />,
  <FaKey />,
  <FaKeyboard />,
  <FaLandmark />,
  <FaLightbulb />,
  <FaLeaf />,
  <FaMountain />,
  <FaMagnifyingGlass />,
  <FaMoon />,
  <FaMusic />,
  <FaPalette />,
  <FaPaperPlane />,
  <FaPaperclip />,
  <FaPencil />,
  <FaPizzaSlice />,
  <FaPlane />,
  <FaPlusCircle />,
  <FaRegHourglass />,
  <FaRocket />,
  <FaRobot />,
  <FaSnowman />,
  <FaSun />,
  <FaSeedling />,
  <FaStar />,
  <FaUmbrellaBeach />,
  <FaUser />,
]
type Card = {
  id: number
  value: string | ReactElement
}
interface Props {
  language: ELanguages
}
const modesOrder: Array<'solo' | 'duet'> = ['solo', 'duet']

const Memory: FC<Props> = ({ language }) => {
  const dispatch = useAppDispatch()
  const user = useSelector((state: ReducerProps) => state.auth?.user) as IUser
  const { show } = useModal()
  const lightTheme = useTheme()

  useEffect(() => {
    initializeUser()
  }, [])

  const optionsType: CardTypeOptions[] = [
    { value: CardType.icons, label: EIcons[language] },
    { value: CardType.numbers, label: ENumbers[language] },
    { value: CardType.letters, label: ELetters[language] },
  ]
  const [cardType, setCardType] = useLocalStorage<CardTypeOptions>(
    'memoryCardType',
    optionsType[0]
  )
  const optionsSize = [
    { value: 4, icon: '4\u200A\u00D7\u200A4', label: `${EBeginner[language]}` },
    { value: 6, icon: '6\u200A\u00D7\u200A6', label: `${EUsual[language]}` },
    { value: 8, icon: '8\u200A\u00D7\u200A8', label: `${EAdvanced[language]}` },
    { value: 10, icon: '10\u200A\u00D7\u200A10', label: `${EExpert[language]}` },
  ]

  const [gridSize, setGridSize] = useLocalStorage('memoryGrid', optionsSize[1])
  const playerOptions = [1, 2]
  const [players, setPlayers] = useLocalStorage<Player[]>('memoryPlayers', [
    { id: 1, name: `${EPlayer[language]} 1`, score: 0 },
  ])
  const [name, setName] = useState('')
  const [currentPlayer, setCurrentPlayer] = useState<number>(0)
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [flippedOverCards, setFlippedOverCards] = useState<number[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([])
  const [isChecking, setIsChecking] = useState<boolean>(false)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [timerOn, setTimerOn] = useState<boolean>(false)
  const { timer, resetTimer } = useTimer(timerOn, '1ms')
  const {
    highScores,
    addHighScore,
    deleteHighScore,
    updateHighScore,
    deleteHighScoresByPlayerName,
    changePlayerName,
    loading,
    error,
  } = useHighScores()
  const [hasRecordedHighScore, setHasRecordedHighScore] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [latestHighScoreId, setLatestHighScoreId] = useState<string | null>(null)
  const { windowWidth } = useWindowSize()

  const initializeCards = () => {
    let content: string[] | ReactElement[] = []
    const totalPairs = gridSize
      ? (Number(gridSize.value) * Number(gridSize.value)) / 2
      : 0

    if (cardType?.value === CardType.letters) {
      const letters = Array.from({ length: totalPairs }, (_, i) => {
        const baseCharCode = 65 + (i % 26) // ASCII code for 'A' to 'Z'
        const isUpperCase = Math.floor(i / 26) % 2 === 0
        return isUpperCase
          ? String.fromCharCode(baseCharCode) // Uppercase letter
          : String.fromCharCode(baseCharCode + 32) // Lowercase letter
      })
      content = [...letters, ...letters]
    } else if (cardType?.value === CardType.numbers) {
      const numbers = Array.from({ length: totalPairs }, (_, i) => i.toString())
      content = [...numbers, ...numbers]
    } else if (cardType?.value === CardType.icons) {
      const shuffledIcons = [...iconSet].sort(() => Math.random() - 0.5)
      const selectedIcons = shuffledIcons.slice(0, totalPairs)
      content = [...selectedIcons, ...selectedIcons]

      // const icons = Array.from(
      //   { length: totalPairs },
      //   (_, i) => iconSet[i % iconSet.length]
      // )
      // content = [...icons, ...icons]
    }

    const shuffledCards = content
      .map((value, index) => ({ value, id: index }))
      .sort(() => Math.random() - 0.5)
      .slice(0, gridSize ? Number(gridSize.value) * Number(gridSize.value) : 0)

    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedCards([])
    setGameStarted(true)
    setTimerOn(true)
    resetTimer()
    setPlayers((prev) => prev.map((player) => ({ ...player, score: 0 })))
    setCurrentPlayer(0)
    setHasRecordedHighScore(false)
  }

  const getLevelKey = (gridSize: number, cardType: string, mode: GameMode): string => {
    return `${mode}_${gridSize}x${gridSize}_${cardType}`
  }

  const handleGameEnd = async () => {
    setHasRecordedHighScore(true)
    setGameStarted(false)
    const mode: 'solo' | 'duet' = players.length === 1 ? 'solo' : 'duet'
    const levelKey = getLevelKey(Number(gridSize.value), cardType.value, mode)

    const newEntry: IHighScore = {
      levelKey,
      time: timer,
      players,
      size: Number(gridSize.value),
      type: cardType.value,
    }

    const addedHighScore = await addHighScore(newEntry)

    if (addedHighScore) {
      setLatestHighScoreId(addedHighScore._id || null)
      setShowModal(true)
    }
    setFlippedOverCards([])
  }

  useEffect(() => {
    if (showModal) {
      const mode: 'solo' | 'duet' = players.length === 1 ? 'solo' : 'duet'
      const latestLevelKey = getLevelKey(Number(gridSize.value), cardType.value, mode)
      setTimeout(() => {
        const [mode, ...rest] = latestLevelKey.split('_')
        const levelKey = rest.join('_')

        show({
          title: EYouMadeItToTheHighScores[language],
          className: '',
          children: (
            <div
              id='high-scores'
              className={`${styles.modal} ${lightTheme ? styles.light : ''}`}
            >
              <h3>{EYouMadeItToTheHighScores[language]}</h3>
              <div className={`${styles['high-scores']}`}>
                {(() => {
                  const mode = players.length === 1 ? EGameMode.solo : EGameMode.duet
                  let modePart = ''
                  if (mode === EGameMode.solo) {
                    modePart = ESolo[language]
                  } else if (mode === EGameMode.duet) {
                    modePart = EDuet[language]
                  }
                  return (
                    <>
                      <h4 key={mode}>{modePart}</h4>
                      {loading && (
                        <p className='flex center margin0auto textcenter'>
                          {ELoading[language]}...
                        </p>
                      )}
                      {error && (
                        <p>
                          {error} &mdash; {ETryWithADifferentBrowser[language]}
                        </p>
                      )}
                      {Object.keys(highScores[mode] || {})
                        .sort()
                        .map((levelKey) => (
                          <div key={`${mode}-${levelKey}`}>
                            <div>
                              <h5>{extractParts(`${levelKey}`)}</h5>
                              <ol>
                                {highScores[mode]?.[levelKey]?.map((entry, idx) => (
                                  <li
                                    key={entry._id || `${idx}-${entry.time.toFixed(1)}`}
                                    className={
                                      entry._id === latestHighScoreId
                                        ? styles['new-score']
                                        : ''
                                    }
                                  >
                                    <div>
                                      <span>
                                        {entry.players.map((player) => (
                                          <span key={player.id}>
                                            {player.name}: {player.score}{' '}
                                          </span>
                                        ))}
                                      </span>
                                      <i className={styles.time}>
                                        {entry.time.toFixed(1)}s
                                      </i>
                                    </div>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        ))}
                    </>
                  )
                })()}
              </div>
            </div>
          ),
        })
      }, 0)
    } else if (!showModal) {
      notify(EGoodJob[language], false, 5)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highScores, showModal, latestHighScoreId, loading, error])

  const handleCardClick = (index: number) => {
    if (isChecking || flippedCards.includes(index) || matchedCards.includes(index)) return

    setFlippedCards((prev) => [...prev, index])

    if (flippedCards.length === 1) {
      setIsChecking(true)
      const firstCardIndex = flippedCards[0]
      const secondCardIndex = index

      const firstCard = cards[firstCardIndex]
      const secondCard = cards[secondCardIndex]

      if (firstCard.value === secondCard.value) {
        // It's a match!
        setMatchedCards((prev) => [...prev, firstCardIndex, secondCardIndex])
        setPlayers((prev) =>
          prev.map((player, idx) =>
            idx === currentPlayer ? { ...player, score: player.score + 1 } : player
          )
        )
        setFlippedCards([])
        setIsChecking(false)

        // if (matchedCards.length + 2 === cards.length && !hasRecordedHighScore) {
        //   handleGameEnd()
        // }
      } else {
        // Not a match - flip back after a delay
        setTimeout(() => {
          setFlippedCards([])
          setFlippedOverCards((prev) => [...prev, firstCardIndex, secondCardIndex])
          setIsChecking(false)
          setCurrentPlayer((prev) => (prev + 1) % players.length)
        }, 800)
      }
    }
  }

  useEffect(() => {
    if (
      gameStarted &&
      matchedCards.length === cards.length &&
      cards.length > 0 &&
      !hasRecordedHighScore
    ) {
      setTimerOn(false)
      setTimeout(() => {
        handleGameEnd()
      }, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarted, matchedCards, cards])

  const renderCardContent = (card: any) => {
    if (cardType?.value === CardType.icons) {
      return card.value
    }
    return <span>{card.value}</span>
  }

  const handlePlayerNameChange = (index: number, name: string) => {
    const allowedCharsRegex = /[^\p{L}0-9 ]/gu

    const hasInvalidChars = allowedCharsRegex.test(name)

    if (hasInvalidChars) {
      dispatch(notify(ESpecialCharactersNotAllowed[language], true, 5))
      return
    }

    const sanitizedName = name.replace(/[^\p{L}0-9 ]/gu, '').trim()

    setPlayers((prev) =>
      prev.map((player, idx) =>
        idx === index
          ? { ...player, name: sanitizedName || `${EPlayer[language]} ${idx + 1}` }
          : player
      )
    )
  }

  const handlePlayerAmountChange = (count: number) => {
    setPlayers((prev) => {
      const newPlayers: Player[] = Array.from({ length: count }, (_, i) => {
        const existingPlayer = prev[i]
        return existingPlayer
          ? { ...existingPlayer, id: i + 1 }
          : { id: i + 1, name: `${EPlayer[language]} ${i + 1}`, score: 0 }
      })
      return newPlayers
    })
    setCurrentPlayer(0)
  }

  // Check for duplicate icons for debugging
  useEffect(() => {
    const iconNames = iconSet.map((Icon) => Icon.type.displayName || Icon.type.name)
    const duplicates = iconNames.filter(
      (name, index) => iconNames.indexOf(name) !== index
    )
    if (duplicates.length > 0) {
      console.log('Duplicate Icons Found:', duplicates)
    }
  }, [])

  const extractParts = (levelKey: string): ReactElement => {
    const parts = levelKey.split('_')
    let partName = ''
    let partIcon = <></>

    if (parts[1] === CardType.numbers) {
      partIcon = (
        <span className={styles['title-svg']}>
          <Md123 aria-hidden='true' />
        </span>
      )
      partName = ENumbers[language]
    } else if (parts[1] === CardType.letters) {
      partIcon = (
        <span className={styles['title-svg']}>
          <MdAbc aria-hidden='true' />
        </span>
      )
      partName = ELetters[language]
    } else if (parts[1] === CardType.icons) {
      partIcon = (
        <span className={styles['title-icon']}>
          <MdInsertEmoticon aria-hidden='true' />
        </span>
      )
      partName = EIcons[language]
    }

    return (
      <>
        {parts[0]} {partIcon} <br />
        {partName}
      </>
    )
  }

  useEffect(() => {
    if (gameStarted) {
      scrollIntoView('game')
    }
  }, [gameStarted])

  const maxLength = 15

  return (
    <div
      id={styles['game-container']}
      className={`${styles.container} ${lightTheme ? styles.light : ''}`}
    >
      {!gameStarted && matchedCards.length === cards.length && cards.length > 0 && (
        <section className={`card ${styles.sectioncard}`}>
          <div>
            <div className={styles['game-over']}>
              <h2>{EDone[language]}</h2>
              <p>
                {ETimeTaken[language]}: <TimerDisplay timer={timer} />
              </p>
              <div>
                <h3>{EScores[language]}:</h3>
                {players.map((player) => (
                  <p key={player.id}>
                    {player.name}: {player.score}
                  </p>
                ))}
              </div>
              <button onClick={initializeCards}>{EPlayAgain[language]}</button>
            </div>
          </div>
        </section>
      )}

      {!gameStarted && (
        <section className={`card ${styles.sectioncard}`}>
          <div>
            <div id='settings' className={styles.settings}>
              <h2 className='scr'>{ESettings[language]}</h2>
              <div>
                <div>
                  <h3>{ECardType[language]}</h3>
                  <div className={styles['set-card-type']}>
                    {optionsType.map((option, index) => (
                      <Suspense
                        key={index}
                        fallback={
                          <div className='flex center margin0auto textcenter'>
                            {ELoading[language]}...
                          </div>
                        }
                      >
                        <CardTypeButton
                          key={option.value}
                          option={option}
                          isActive={cardType?.value === option.value}
                          onClick={() => setCardType(option)}
                        />
                      </Suspense>
                    ))}
                  </div>
                </div>
                <div>
                  <h3>{EGridSize[language]}</h3>
                  <div className={styles['set-grid']}>
                    {optionsSize.map((option, index) => (
                      <Suspense
                        key={index}
                        fallback={
                          <div className='flex center margin0auto textcenter'>
                            {ELoading[language]}...
                          </div>
                        }
                      >
                        <GridSizeButton
                          key={option.value}
                          option={option}
                          isActive={gridSize?.value === option.value}
                          onClick={() => setGridSize(option)}
                        />
                      </Suspense>
                    ))}
                  </div>
                </div>
                <div className={styles['player-names-wrap']}>
                  <h3>{EPlayers[language]}</h3>
                  <div className={styles['set-players']}>
                    {
                      <>
                        {playerOptions.map((count, index) => (
                          <Suspense
                            key={index}
                            fallback={
                              <div className='flex center margin0auto textcenter'>
                                {ELoading[language]}...
                              </div>
                            }
                          >
                            <PlayerAmountButton
                              language={language}
                              key={count}
                              value={count}
                              isActive={players.length === count}
                              onClick={() => handlePlayerAmountChange(count)}
                            />
                          </Suspense>
                        ))}
                      </>
                    }
                  </div>
                  <div className={styles['player-names']}>
                    <small>
                      {EPleaseUseGoodTasteWhenChoosingYourNickname[language]}.{' '}
                      {EProfanityWillBeRemovedByTheAdmin[language]}
                    </small>
                    {players.map((player, index) => (
                      <div key={player.id} className='input-wrap'>
                        <label>
                          <input
                            type='text'
                            name={`player-${index}`}
                            value={player.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handlePlayerNameChange(index, e.target.value)
                            }
                            maxLength={maxLength}
                            placeholder={`${EPlayer[language]} ${index + 1}`}
                          />
                          <span>{`${EPlayer[language]} ${index + 1} ${EName[
                            language
                          ].toLowerCase()}:`}</span>
                        </label>
                        <small>
                          {player.name.length}/{maxLength}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button className={styles['big']} onClick={initializeCards}>
                {EStartGame[language]}
              </button>
            </div>
          </div>
        </section>
      )}

      {!gameStarted && (
        <section className={`card ${styles.sectioncard} ${styles['scores-wrap']}`}>
          <div>
            <div id='high-scores'>
              <h2>
                {windowWidth > 400 && (
                  <HiMiniSparkles
                    aria-hidden='true'
                    style={{ transform: 'scale(0.8, 0.8)' }}
                  />
                )}
                {EHighScores[language]}{' '}
                {windowWidth > 400 && (
                  <HiMiniSparkles
                    aria-hidden='true'
                    style={{ transform: 'scale(-0.8, 0.8)' }}
                  />
                )}
              </h2>
              <p className='textcenter margin0auto'>
                {windowWidth > 200 && <span aria-hidden='true'>&mdash; </span>}
                {EFastestTime[language]}
                {windowWidth > 200 && <span aria-hidden='true'> &mdash;</span>}
              </p>
              <div className={styles['high-scores']}>
                {modesOrder.map((mode) => {
                  let modePart = ''
                  if (mode === EGameMode.solo) {
                    modePart = ESolo[language]
                  } else if (mode === EGameMode.duet) {
                    modePart = EDuet[language]
                  }
                  return (
                    <Fragment key={mode}>
                      <h3>
                        {windowWidth > 200 && (
                          <HiMiniSparkles
                            aria-hidden='true'
                            style={{ transform: 'scale(0.8)' }}
                          />
                        )}
                        {modePart}
                        {windowWidth > 200 && (
                          <HiMiniSparkles
                            aria-hidden='true'
                            style={{ transform: 'scale(-0.8)' }}
                          />
                        )}
                      </h3>
                      {loading && (
                        <p className='flex center margin0auto textcenter'>
                          {ELoading[language]}...
                        </p>
                      )}
                      {error && (
                        <p>
                          {error} &mdash; {ETryWithADifferentBrowser[language]}
                        </p>
                      )}
                      {Object.keys(highScores[mode] || {})
                        .sort()
                        .map((levelKey) => (
                          <div key={`${mode}-${levelKey}`}>
                            <div>
                              <h4>{extractParts(`${levelKey}`)}</h4>
                              <ol>
                                {highScores[mode]?.[levelKey]?.map((entry, idx) => (
                                  <li
                                    key={`${mode}-${levelKey}-${idx}-${entry.time.toFixed(
                                      1
                                    )}`}
                                  >
                                    <div>
                                      <span>
                                        {entry.players.map((player) => (
                                          <Fragment key={player.id}>
                                            <span>
                                              {player.name}{' '}
                                              {entry.players.length > 1
                                                ? `: ${player.score}`
                                                : ''}{' '}
                                            </span>
                                            {user && user.role && user.role > 1 && (
                                              <Accordion
                                                hideBrackets
                                                language={language}
                                                id={`edit-${entry._id}`}
                                                className='edit'
                                                wrapperClass={`${styles['edit-wrap']}`}
                                                text={
                                                  <>
                                                    <AiFillEdit aria-hidden='true' />
                                                  </>
                                                }
                                                isOpen={false}
                                                closeClass={styles['close']}
                                                setIsFormOpen={() => {}}
                                                tooltip={EEdit[language]}
                                                y='above'
                                              >
                                                <form
                                                  onSubmit={(event) => {
                                                    event.preventDefault()

                                                    const oldName = player.name
                                                    const newName = (
                                                      event.target as HTMLFormElement
                                                    ).name
                                                    changePlayerName(
                                                      oldName,
                                                      newName,
                                                      user?._id
                                                    )
                                                  }}
                                                >
                                                  <div className='input-wrap'>
                                                    <label>
                                                      <input
                                                        type='text'
                                                        name='name'
                                                        required
                                                      />
                                                      <span>
                                                        {ENewName[language]} (
                                                        {player.name}):
                                                      </span>
                                                    </label>
                                                  </div>
                                                </form>
                                              </Accordion>
                                            )}
                                          </Fragment>
                                        ))}
                                      </span>
                                      <span className={`flex ${styles['time-wrap']}`}>
                                        <i className={styles.time}>
                                          {entry.time.toFixed(1)}s
                                        </i>
                                        {user && user.role && user.role > 1 && (
                                          <>
                                            <button
                                              type='button'
                                              className={`danger small tooltip-wrap ${styles['delete-btn']}`}
                                              onClick={() => {
                                                if (
                                                  entry._id &&
                                                  window.confirm(
                                                    EDeleteHighScore[language]
                                                  )
                                                ) {
                                                  deleteHighScore(entry._id).catch(
                                                    (error) => {
                                                      console.error(error)
                                                      if (error.response?.data?.message)
                                                        dispatch(
                                                          notify(
                                                            error.response.data.message,
                                                            true,
                                                            8
                                                          )
                                                        )
                                                      else
                                                        dispatch(
                                                          notify(error.message, true, 5)
                                                        )
                                                    }
                                                  )
                                                }
                                              }}
                                            >
                                              <span aria-hidden='true'>
                                                <FaTimes aria-hidden='true' />
                                              </span>
                                              <span className='tooltip above narrow2'>
                                                {EDelete[language]}
                                              </span>
                                            </button>
                                          </>
                                        )}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        ))}
                    </Fragment>
                  )
                })}
              </div>
              {user && user.role && user.role > 1 && (
                <form
                  className={`${styles['delete-name-form']}`}
                  onSubmit={(event) => {
                    event.preventDefault()
                    if (window.confirm(EDeletePlayersHighScores[language]))
                      deleteHighScoresByPlayerName(name, user?._id)
                        .then(() => {
                          setName('')
                        })
                        .catch((error) => {
                          console.error(error)
                          if (error.response?.data?.message)
                            dispatch(notify(error.response.data.message, true, 8))
                          else dispatch(notify(error.message, true, 5))
                        })
                  }}
                >
                  <div className={`input-wrap`}>
                    <label>
                      <input
                        type='text'
                        name='name'
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                      <span>
                        {EName[language]} ({EPlayer[language]}):
                      </span>
                    </label>
                  </div>
                  <button type='submit' className='danger'>
                    {EDelete[language]}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {gameStarted && (
        <section className={`card ${styles.sectioncard} ${styles.game}`}>
          <div>
            <div id='game'>
              <div className={styles.header}>
                <div>
                  {ETime[language]}: <TimerDisplay timer={timer} />
                </div>
                <div>
                  {EPlayer[language]}: {players[currentPlayer].name} | {EScore[language]}:{' '}
                  {players[currentPlayer].score}
                </div>
              </div>
              <Suspense
                fallback={
                  <div className='flex center margin0auto textcenter'>
                    {ELoading[language]}...
                  </div>
                }
              >
                <GameGrid
                  language={language}
                  setGameStarted={setGameStarted}
                  gridSize={gridSize.value}
                  cards={cards}
                  cardType={cardType}
                  flippedCards={flippedCards}
                  flippedOverCards={flippedOverCards}
                  matchedCards={matchedCards}
                  handleCardClick={handleCardClick}
                  renderCardContent={renderCardContent}
                />
              </Suspense>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Memory
