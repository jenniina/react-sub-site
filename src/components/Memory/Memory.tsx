import styles from './memory.module.css'
import React, {
  FC,
  ReactElement,
  useState,
  useEffect,
  ChangeEvent,
  Fragment,
  useCallback,
} from 'react'
import { ReducerProps } from '../../types'
import { CardTypeOptions, GameMode, EGameMode } from '../../types/memory'
import { CardType } from '../../types/memory'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import useLocalStorage from '../../hooks/useStorage'
import { useTheme } from '../../hooks/useTheme'
import useTimer from '../../hooks/useTimer'
import useHighScores from './hooks/useHighScores'
import { IHighScore } from '../../types/memory'
import { useModal } from '../../hooks/useModal'
import TimerDisplay from './components/TimerDisplay'
import { useSelector } from 'react-redux'
import { initializeUser } from '../../reducers/authReducer'
import { scrollIntoView } from '../../utils'
import Accordion from '../Accordion/Accordion'
import Icon from '../Icon/Icon'
import useWindowSize from '../../hooks/useWindowSize'
import { useLanguageContext } from '../../contexts/LanguageContext'
import { useConfirm } from '../../contexts/ConfirmContext'

import CardTypeButton from './components/CardTypeButton'
import GridSizeButton from './components/GridSizeButton'
import PlayerAmountButton from './components/PlayerAmountButton'
import GameGrid from './components/GameGrid'
import { getErrorMessage } from '../../utils'

interface Player {
  id: number
  name: string
  score: number
}

// Use string descriptors for icons (lib:name) and render with dynamic Icon to avoid bundling
const iconSet: string[] = [
  'fa:FaAnchor',
  'fa:FaAppleAlt',
  'fa:FaBicycle',
  'fa:FaBolt',
  'fa:FaCat',
  'fa:FaDog',
  'fa:FaFish',
  'fa:FaBell',
  'fa6:FaCar',
  'fa:FaDice',
  'fa:FaDove',
  'fa:FaEdit',
  'fa:FaEnvelope',
  'fa:FaFan',
  'fa:FaFeather',
  'fa6:FaGears',
  'fa:FaHammer',
  'fa:FaHandshake',
  'fa:FaHatWizard',
  'fa:FaHatCowboy',
  'fa:FaHeadphones',
  'fa:FaHeart',
  'fa6:FaHouse',
  'fa:FaHorse',
  'fa:FaIceCream',
  'md:MdInsertEmoticon',
  'fa:FaKey',
  'fa:FaKeyboard',
  'fa:FaLandmark',
  'fa6:FaLightbulb',
  'fa:FaLeaf',
  'fa:FaMountain',
  'fa6:FaMagnifyingGlass',
  'fa:FaMoon',
  'fa:FaMusic',
  'fa:FaPalette',
  'fa:FaPaperPlane',
  'fa:FaPaperclip',
  'fa6:FaPencil',
  'fa:FaPizzaSlice',
  'fa:FaPlane',
  'fa:FaPlusCircle',
  'fa:FaRegHourglass',
  'fa:FaRocket',
  'fa:FaRobot',
  'fa:FaSnowman',
  'fa:FaSun',
  'fa:FaSeedling',
  'fa:FaStar',
  'fa:FaUmbrellaBeach',
  'fa:FaUser',
]
interface Card {
  id: number
  value: string | ReactElement
}
const modesOrder: ('solo' | 'duet')[] = ['solo', 'duet']

const Memory: FC = () => {
  const { t } = useLanguageContext()
  const confirm = useConfirm()

  const dispatch = useAppDispatch()
  const user = useSelector((state: ReducerProps) => state.auth?.user)
  const { show } = useModal()
  const lightTheme = useTheme()

  useEffect(() => {
    initializeUser()
  }, [])

  const optionsType: CardTypeOptions[] = [
    { value: CardType.icons, label: t('Icons') },
    { value: CardType.numbers, label: t('Numbers') },
    { value: CardType.letters, label: t('Letters') },
  ]
  const [cardType, setCardType] = useLocalStorage<CardTypeOptions>(
    'memoryCardType',
    optionsType[0]
  )
  const optionsSize = [
    { value: 4, icon: '4\u200A\u00D7\u200A4', label: `${t('Beginner')}` },
    { value: 6, icon: '6\u200A\u00D7\u200A6', label: `${t('Usual')}` },
    { value: 8, icon: '8\u200A\u00D7\u200A8', label: `${t('Advanced')}` },
    { value: 10, icon: '10\u200A\u00D7\u200A10', label: `${t('Expert')}` },
  ]

  const [gridSize, setGridSize] = useLocalStorage('memoryGrid', optionsSize[1])
  const playerOptions = [1, 2]
  const [players, setPlayers] = useLocalStorage<Player[]>('memoryPlayers', [
    { id: 1, name: `${t('Player')} 1`, score: 0 },
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
    deleteHighScoresByPlayerName,
    changePlayerName,
    loading,
    error,
  } = useHighScores()
  const [hasRecordedHighScore, setHasRecordedHighScore] =
    useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [latestHighScoreId, setLatestHighScoreId] = useState<string | null>(
    null
  )
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
    setPlayers(prev => prev.map(player => ({ ...player, score: 0 })))
    setCurrentPlayer(0)
    setHasRecordedHighScore(false)
  }

  const getLevelKey = (
    gridSize: number,
    cardType: string,
    mode: GameMode
  ): string => {
    return `${mode}_${gridSize}x${gridSize}_${cardType}`
  }

  const handleGameEnd = useCallback(async () => {
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
      setLatestHighScoreId(addedHighScore._id ?? null)
      setShowModal(true)
    }
    setFlippedOverCards([])
  }, [players, gridSize, cardType, timer, addHighScore])

  const extractParts = useCallback(
    (levelKey: string): ReactElement => {
      const parts = levelKey.split('_')
      let partName = ''
      let partIcon = <></>

      if (parts[1] === (CardType.numbers as string)) {
        partIcon = (
          <span className={styles['title-svg']}>
            <Icon lib="md" name="Md123" aria-hidden="true" />
          </span>
        )
        partName = t('Numbers')
      } else if (parts[1] === (CardType.letters as string)) {
        partIcon = (
          <span className={styles['title-svg']}>
            <Icon lib="md" name="MdAbc" aria-hidden="true" />
          </span>
        )
        partName = t('Letters')
      } else if (parts[1] === (CardType.icons as string)) {
        partIcon = (
          <span className={styles['title-icon']}>
            <Icon lib="md" name="MdInsertEmoticon" aria-hidden="true" />
          </span>
        )
        partName = t('Icons')
      }

      return (
        <>
          {parts[0]} {partIcon} <br />
          {partName}
        </>
      )
    },
    [t]
  )

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        show({
          title: t('YouMadeItToTheHighScores'),
          className: '',
          children: (
            <div
              id="high-scores"
              className={`${styles.modal} ${lightTheme ? styles.light : ''}`}
            >
              <h3>{t('YouMadeItToTheHighScores')}</h3>
              <div className={`${styles['high-scores']}`}>
                {(() => {
                  const mode =
                    players.length === 1 ? EGameMode.solo : EGameMode.duet
                  let modePart = ''
                  if (mode === EGameMode.solo) {
                    modePart = t('Solo')
                  } else if (mode === EGameMode.duet) {
                    modePart = t('Duet')
                  }
                  return (
                    <>
                      <h4 key={mode}>{modePart}</h4>
                      {loading && (
                        <p className="flex center margin0auto textcenter">
                          {t('Loading')}...
                        </p>
                      )}
                      {error && (
                        <p>
                          {error} &mdash; {t('TryWithADifferentBrowser')}
                        </p>
                      )}
                      {Object.keys(highScores[mode] || {})
                        .sort()
                        .map(levelKey => (
                          <div key={`${mode}-${levelKey}`}>
                            <div>
                              <h5>{extractParts(`${levelKey}`)}</h5>
                              <ol>
                                {highScores[mode]?.[levelKey]?.map(
                                  (entry, idx) => (
                                    <li
                                      key={
                                        entry._id ??
                                        `${idx}-${entry.time.toFixed(1)}`
                                      }
                                      className={
                                        entry._id === latestHighScoreId
                                          ? styles['new-score']
                                          : ''
                                      }
                                    >
                                      <div>
                                        <span>
                                          {entry.players.map(player => (
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
                                  )
                                )}
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
      notify(t('GoodJob'), false, 5)
    }
  }, [
    highScores,
    showModal,
    latestHighScoreId,
    loading,
    error,
    lightTheme,
    t,
    players.length,
    show,
    extractParts,
  ])

  const handleCardClick = (index: number) => {
    if (
      isChecking ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    )
      return

    setFlippedCards(prev => [...prev, index])

    if (flippedCards.length === 1) {
      setIsChecking(true)
      const firstCardIndex = flippedCards[0]
      const secondCardIndex = index

      const firstCard = cards[firstCardIndex]
      const secondCard = cards[secondCardIndex]

      if (firstCard.value === secondCard.value) {
        // It's a match!
        setMatchedCards(prev => [...prev, firstCardIndex, secondCardIndex])
        setPlayers(prev =>
          prev.map((player, idx) =>
            idx === currentPlayer
              ? { ...player, score: player.score + 1 }
              : player
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
          setFlippedOverCards(prev => [
            ...prev,
            firstCardIndex,
            secondCardIndex,
          ])
          setIsChecking(false)
          setCurrentPlayer(prev => (prev + 1) % players.length)
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimerOn(false)
      setTimeout(() => {
        void handleGameEnd()
      }, 1000)
    }
  }, [
    gameStarted,
    matchedCards,
    cards,
    hasRecordedHighScore,
    showModal,
    handleGameEnd,
  ])

  const renderCardContent = (card: Card) => {
    if (cardType?.value === CardType.icons) {
      if (typeof card.value === 'string' && card.value.includes(':')) {
        const [lib, name] = card.value.split(':')
        return <Icon lib={lib} name={name} />
      }
      return <span>{card.value}</span>
    }
    return <span>{card.value}</span>
  }

  const handlePlayerNameChange = (index: number, name: string) => {
    const allowedCharsRegex = /[^\p{L}0-9 ]/gu

    const hasInvalidChars = allowedCharsRegex.test(name)

    if (hasInvalidChars) {
      void dispatch(notify(t('SpecialCharactersNotAllowed'), true, 5))
      return
    }

    const sanitizedName = name.replace(/[^\p{L}0-9 ]/gu, '').trim()

    setPlayers(prev =>
      prev.map((player, idx) =>
        idx === index
          ? { ...player, name: sanitizedName || `${t('Player')} ${idx + 1}` }
          : player
      )
    )
  }

  const handlePlayerAmountChange = (count: number) => {
    setPlayers(prev => {
      const newPlayers: Player[] = Array.from({ length: count }, (_, i) => {
        const existingPlayer = prev[i]
        return existingPlayer
          ? { ...existingPlayer, id: i + 1 }
          : { id: i + 1, name: `${t('Player')} ${i + 1}`, score: 0 }
      })
      return newPlayers
    })
    setCurrentPlayer(0)
  }

  // Check for duplicate icons for debugging
  useEffect(() => {
    const iconNames = iconSet.map(icon => icon.split(':')[1] ?? '')
    const duplicates = iconNames.filter(
      (name, index) => iconNames.indexOf(name) !== index
    )
    if (duplicates.length > 0) {
      console.log('Duplicate Icons Found:', duplicates)
    }
  }, [])

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
      {!gameStarted &&
        matchedCards.length === cards.length &&
        cards.length > 0 && (
          <section className={`card ${styles.sectioncard}`}>
            <div>
              <div className={styles['game-over']}>
                <h2>{t('Done')}</h2>
                <p>
                  {t('TimeTaken')}: <TimerDisplay timer={timer} />
                </p>
                <div>
                  <h3>{t('Scores')}:</h3>
                  {players.map(player => (
                    <p key={player.id}>
                      {player.name}: {player.score}
                    </p>
                  ))}
                </div>
                <button onClick={initializeCards}>{t('PlayAgain')}</button>
              </div>
            </div>
          </section>
        )}

      {!gameStarted && (
        <section className={`card ${styles.sectioncard}`}>
          <div>
            <div id="settings" className={styles.settings}>
              <h2 className="scr">{t('Settings')}</h2>
              <div>
                <div>
                  <h3>{t('CardType')}</h3>
                  <div className={styles['set-card-type']}>
                    {optionsType.map(option => (
                      <CardTypeButton
                        key={option.value}
                        option={option}
                        isActive={cardType?.value === option.value}
                        onClick={() => setCardType(option)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h3>{t('GridSize')}</h3>
                  <div className={styles['set-grid']}>
                    {optionsSize.map(option => (
                      <GridSizeButton
                        key={option.value}
                        option={option}
                        isActive={gridSize?.value === option.value}
                        onClick={() => setGridSize(option)}
                      />
                    ))}
                  </div>
                </div>
                <div className={styles['player-names-wrap']}>
                  <h3>{t('Players')}</h3>
                  <div className={styles['set-players']}>
                    {
                      <>
                        {playerOptions.map(count => (
                          <PlayerAmountButton
                            key={count}
                            value={count}
                            isActive={players.length === count}
                            onClick={() => handlePlayerAmountChange(count)}
                          />
                        ))}
                      </>
                    }
                  </div>
                  <div className={styles['player-names']}>
                    <small>
                      {t('PleaseUseGoodTasteWhenChoosingYourNickname')}.{' '}
                      {t('ProfanityWillBeRemovedByTheAdmin')}
                    </small>
                    {players.map((player, index) => (
                      <div key={player.id} className="input-wrap">
                        <label>
                          <input
                            type="text"
                            name={`player-${index}`}
                            value={player.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handlePlayerNameChange(index, e.target.value)
                            }
                            maxLength={maxLength}
                            placeholder={`${t('Player')} ${index + 1}`}
                          />
                          <span>{`${t('Player')} ${index + 1} ${t(
                            'Name'
                          ).toLowerCase()}:`}</span>
                        </label>
                        <small>
                          {player.name.length}/{maxLength}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button className={styles.big} onClick={initializeCards}>
                {t('StartGame')}
              </button>
            </div>
          </div>
        </section>
      )}

      {!gameStarted && (
        <section
          className={`card ${styles.sectioncard} ${styles['scores-wrap']}`}
        >
          <div>
            <div id="high-scores">
              <h2>
                {windowWidth > 400 && (
                  <Icon
                    lib="hi2"
                    name="HiMiniSparkles"
                    aria-hidden="true"
                    style={{ transform: 'scale(0.8, 0.8)' }}
                  />
                )}
                {t('HighScores')}{' '}
                {windowWidth > 400 && (
                  <Icon
                    lib="hi2"
                    name="HiMiniSparkles"
                    aria-hidden="true"
                    style={{ transform: 'scale(-0.8, 0.8)' }}
                  />
                )}
              </h2>
              <p className="textcenter margin0auto">
                {windowWidth > 200 && <span aria-hidden="true">&mdash; </span>}
                {t('FastestTime')}
                {windowWidth > 200 && <span aria-hidden="true"> &mdash;</span>}
              </p>
              <div className={styles['high-scores']}>
                {modesOrder.map(mode => {
                  let modePart = ''
                  if (mode === (EGameMode.solo as string)) {
                    modePart = t('Solo')
                  } else if (mode === (EGameMode.duet as string)) {
                    modePart = t('Duet')
                  }
                  return (
                    <Fragment key={mode}>
                      <h3>
                        {windowWidth > 200 && (
                          <Icon
                            lib="hi2"
                            name="HiMiniSparkles"
                            aria-hidden="true"
                            style={{ transform: 'scale(0.8)' }}
                          />
                        )}
                        {modePart}
                        {windowWidth > 200 && (
                          <Icon
                            lib="hi2"
                            name="HiMiniSparkles"
                            aria-hidden="true"
                            style={{ transform: 'scale(-0.8)' }}
                          />
                        )}
                      </h3>
                      {loading && (
                        <p className="flex center margin0auto textcenter">
                          {t('Loading')}...
                        </p>
                      )}
                      {error && (
                        <p>
                          {error} &mdash; {t('TryWithADifferentBrowser')}
                        </p>
                      )}
                      {Object.keys(highScores[mode] || {})
                        .sort()
                        .map(levelKey => (
                          <div key={`${mode}-${levelKey}`}>
                            <div>
                              <h4>{extractParts(`${levelKey}`)}</h4>
                              <ol>
                                {highScores[mode]?.[levelKey]?.map(
                                  (entry, idx) => (
                                    <li
                                      key={`${mode}-${levelKey}-${idx}-${entry.time.toFixed(
                                        1
                                      )}`}
                                    >
                                      <div>
                                        <span>
                                          {entry.players.map(player => (
                                            <Fragment key={player.id}>
                                              {entry.players.length > 1
                                                ? `: ${player.score}`
                                                : ''}{' '}
                                              {user?.role && user.role > 1 && (
                                                <Accordion
                                                  hideBrackets
                                                  id={`edit-${entry._id}`}
                                                  className="edit"
                                                  wrapperClass={`${styles['edit-wrap']}`}
                                                  text={
                                                    <>
                                                      <Icon
                                                        lib="ai"
                                                        name="AiFillEdit"
                                                        aria-hidden="true"
                                                      />
                                                    </>
                                                  }
                                                  isOpen={false}
                                                  closeClass={styles.close}
                                                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                                                  setIsFormOpen={() => {}}
                                                  tooltip={t('Edit')}
                                                  y="above"
                                                >
                                                  <form
                                                    onSubmit={event => {
                                                      event.preventDefault()

                                                      const oldName =
                                                        player.name
                                                      const newName = (
                                                        event.target as HTMLFormElement
                                                      ).name
                                                      void changePlayerName(
                                                        oldName,
                                                        newName,
                                                        user?._id
                                                      )
                                                    }}
                                                  >
                                                    <div className="input-wrap">
                                                      <label>
                                                        <input
                                                          type="text"
                                                          name="name"
                                                          required
                                                        />
                                                        <span>
                                                          {t('NewName')} (
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
                                        <span
                                          className={`flex ${styles['time-wrap']}`}
                                        >
                                          <i className={styles.time}>
                                            {entry.time.toFixed(1)}s
                                          </i>
                                          {user?.role && user.role > 1 && (
                                            <>
                                              <button
                                                type="button"
                                                className={`danger small tooltip-wrap ${styles['delete-btn']}`}
                                                onClick={() => {
                                                  void confirm({
                                                    message:
                                                      t('DeleteHighScore'),
                                                  }).then(confirmed => {
                                                    if (
                                                      entry._id &&
                                                      confirmed
                                                    ) {
                                                      void deleteHighScore(
                                                        entry._id
                                                      ).catch(
                                                        (err: unknown) => {
                                                          const message =
                                                            getErrorMessage(
                                                              err,
                                                              t('Error')
                                                            )
                                                          console.error(err)
                                                          void dispatch(
                                                            notify(
                                                              message,
                                                              true,
                                                              8
                                                            )
                                                          )
                                                        }
                                                      )
                                                    }
                                                  })
                                                }}
                                              >
                                                <span aria-hidden="true">
                                                  <Icon
                                                    lib="fa"
                                                    name="FaTimes"
                                                    aria-hidden="true"
                                                  />
                                                </span>
                                                <span className="tooltip above narrow2">
                                                  {t('Delete')}
                                                </span>
                                              </button>
                                            </>
                                          )}
                                        </span>
                                      </div>
                                    </li>
                                  )
                                )}
                              </ol>
                            </div>
                          </div>
                        ))}
                    </Fragment>
                  )
                })}
              </div>
              {user?.role && user.role > 1 && (
                <form
                  className={`${styles['delete-name-form']}`}
                  onSubmit={e =>
                    void (async () => {
                      e.preventDefault()
                      if (
                        await confirm({ message: t('DeletePlayersHighScores') })
                      )
                        deleteHighScoresByPlayerName(name, user?._id)
                          .then(() => {
                            setName('')
                          })
                          .catch((err: unknown) => {
                            const message = getErrorMessage(err, t('Error'))
                            console.error(err)
                            void dispatch(notify(message, true, 8))
                          })
                    })()
                  }
                >
                  <div className={`input-wrap`}>
                    <label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        required
                        onChange={e => setName(e.target.value)}
                      />
                      <span>
                        {t('Name')} ({t('Player')}):
                      </span>
                    </label>
                  </div>
                  <button type="submit" className="danger">
                    {t('Delete')}
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
            <div id="game">
              <div className={styles.header}>
                <div>
                  {t('Time')}: <TimerDisplay timer={timer} />
                </div>
                <div>
                  {t('Player')}: {players[currentPlayer].name} | {t('Score')}:{' '}
                  {players[currentPlayer].score}
                </div>
              </div>
              <GameGrid
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
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Memory
