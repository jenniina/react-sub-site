import { useContext, useEffect, useState } from 'react'
import useLocalStorage from '../../../hooks/useStorage'
import { ELanguages, IUser } from '../../../types'
import highScoresService from '../services/highScores'
import {
  HighScores,
  IHighScore,
  IPlayer,
  IHighScoreResponse,
  GameMode,
} from '../../../types/memory'
import { LanguageContext } from '../../../contexts/LanguageContext'

const storedLanguage = localStorage.getItem('AppLanguage')
const language = storedLanguage
  ? (storedLanguage.replace(/"/g, '') as ELanguages)
  : ('en' as ELanguages)

const useHighScores = () => {
  const { t } = useContext(LanguageContext)!

  const [highScores, setHighScores] = useState<HighScores>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const fetchedHighScores = await highScoresService.getAllHighScores(language)
        // Transform the fetched data into HighScores format
        const formattedHighScores: HighScores = {}
        fetchedHighScores.forEach((score: IHighScore) => {
          const [mode, ...rest] = score.levelKey.split('_')
          const levelKey = rest.join('_')

          if (!formattedHighScores[mode]) {
            formattedHighScores[mode] = {}
          }
          if (!formattedHighScores[mode][levelKey]) {
            formattedHighScores[mode][levelKey] = []
          }
          formattedHighScores[mode][levelKey].push(score)
        })
        Object.keys(formattedHighScores).forEach((mode) => {
          Object.keys(formattedHighScores[mode]).forEach((levelKey) => {
            formattedHighScores[mode][levelKey] = formattedHighScores[mode][levelKey]
              .sort((a, b) => a.time - b.time)
              .slice(0, 5) // Keep top 5
          })
        })

        setHighScores(formattedHighScores)
      } catch (err) {
        console.error(t('EErrorRetrievingHighScores'), err)
        setError(t('EErrorRetrievingHighScores'))
      } finally {
        setLoading(false)
      }
    }

    fetchHighScores()
  }, [language])

  const addHighScore = async (entry: {
    levelKey: string
    time: number
    size: number
    type: string
    players: IPlayer[]
  }): Promise<IHighScore | undefined> => {
    try {
      const response = await highScoresService.addHighScore(language, entry)
      if (response.highScore) {
        const [mode, ...rest] = response.highScore.levelKey.split('_')
        const levelKey = rest.join('_')

        setHighScores((prev) => {
          const newHighScores = { ...prev }
          if (!newHighScores[mode]) {
            newHighScores[mode] = {}
          }
          if (!newHighScores[mode][levelKey]) {
            newHighScores[mode][levelKey] = []
          }
          const levelScores = newHighScores[mode][levelKey] || []

          const existingIndex = levelScores.findIndex(
            (score) => score._id === response.highScore?._id
          )

          let updated: IHighScore[]
          if (existingIndex !== -1) {
            // Replace the existing high score
            updated = [...levelScores]
            if (response.highScore) {
              updated[existingIndex] = response.highScore
            }
          } else {
            // Add the new high score
            if (response.highScore) {
              updated = [...levelScores, response.highScore]
            } else {
              updated = [...levelScores]
            }
          }

          // Sort and keep top 5
          updated = updated.sort((a, b) => a.time - b.time).slice(0, 5)

          newHighScores[mode][levelKey] = updated
          return newHighScores
        })
        await removeDuplicates()

        return response.highScore
      } else return undefined
    } catch (err) {
      setError('Failed to add high score.')
      return undefined
    }
  }

  const getHighScoresByLevel = async (levelKey: string): Promise<IHighScore[]> => {
    try {
      const fetchedScores = await highScoresService.getHighScoresByLevel(
        language,
        levelKey
      )

      fetchedScores.sort((a, b) => a.time - b.time)

      return fetchedScores.slice(0, 5)
    } catch (err) {
      console.error(t('EErrorRetrievingHighScores'), err)
      setError(t('EErrorRetrievingHighScores'))
      return []
    }
  }

  const deleteHighScore = async (highScoreId: string): Promise<void> => {
    try {
      const response: IHighScoreResponse = await highScoresService.deleteHighScore(
        language,
        highScoreId
      )
      if (response.success) {
        setHighScores((prevHighScores) => {
          const updatedHighScores: HighScores = {}
          Object.keys(prevHighScores).forEach((mode) => {
            updatedHighScores[mode] = { ...prevHighScores[mode] }
            Object.keys(updatedHighScores[mode]).forEach((levelKey) => {
              updatedHighScores[mode][levelKey] = updatedHighScores[mode][
                levelKey
              ].filter((score) => score._id !== highScoreId)
            })
          })
          return updatedHighScores
        })
        // console.log(t('EHighScoreDeletedSuccessfully'))
      } else {
        console.error(t('EErrorDeletingHighScore'), response.message)
      }
    } catch (err) {
      console.error(t('EErrorDeletingHighScore'), err)
      setError(t('EErrorDeletingHighScore'))
    }
  }

  const updateHighScore = async (
    highScore: IHighScore,
    userID: IUser['_id']
  ): Promise<void> => {
    try {
      const response: IHighScoreResponse = await highScoresService.updateHighScore(
        language,
        highScore,
        userID
      )
      if (response.success && response.highScore) {
        const updatedEntry = response.highScore
        const [mode, ...rest] = updatedEntry.levelKey.split('_')
        const levelKey = rest.join('_')

        setHighScores((prevHighScores) => {
          if (!prevHighScores[mode]) {
            prevHighScores[mode] = {}
          }
          if (!prevHighScores[mode][levelKey]) {
            prevHighScores[mode][levelKey] = []
          }
          const levelScores = prevHighScores[mode][levelKey] || []
          const index = levelScores.findIndex((score) => score._id === updatedEntry._id)
          if (index !== -1) {
            const updatedLevelScores = [...levelScores]
            updatedLevelScores[index] = updatedEntry

            const sorted = updatedLevelScores.sort((a, b) => a.time - b.time).slice(0, 5)

            return {
              ...prevHighScores,
              [mode]: {
                ...prevHighScores[mode],
                [levelKey]: sorted,
              },
            }
          }
          return prevHighScores
        })
        console.log(t('EHighScoreUpdatedSuccessfully'))
      } else {
        console.error(t('EErrorUpdatingHighScore'), response.message)
      }
    } catch (err) {
      console.error(t('EErrorUpdatingHighScore'), err)
      setError(t('EErrorUpdatingHighScore'))
    }
  }

  const deleteHighScoresByPlayerName = async (
    playerName: string,
    userID: IUser['_id']
  ): Promise<void> => {
    try {
      const response: IHighScoreResponse =
        await highScoresService.deleteHighScoresByPlayerName(language, playerName, userID)
      if (response.success) {
        setHighScores((prevHighScores) => {
          const updatedHighScores: HighScores = {}
          Object.keys(prevHighScores).forEach((mode) => {
            updatedHighScores[mode] = {}
            Object.keys(prevHighScores[mode]).forEach((levelKey) => {
              updatedHighScores[mode][levelKey] = prevHighScores[mode][levelKey].filter(
                (score) => !score.players.some((player) => player.name === playerName)
              )
            })
          })
          return updatedHighScores
        })
        // console.log(t('EHighScoreDeletedSuccessfully'), playerName)
      } else {
        console.error(t('EErrorDeletingHighScore'), response.message)
      }
    } catch (err) {
      console.error(t('EErrorDeletingHighScore'), err)
      setError(t('EErrorDeletingHighScore'))
    }
  }

  const generateUniqueKey = (score: IHighScore): string => {
    const sortedPlayers = [...score.players].sort((a, b) => a.name.localeCompare(b.name))
    const playersKey = sortedPlayers
      .map((player) => `${player.name}:${player.score}`)
      .join('-')
    return `${score.levelKey}_${score.time}-${playersKey}`
  }

  const removeDuplicates = async () => {
    const allHighScores: IHighScore[] = Object.values(highScores)
      .flatMap((modeScores) => Object.values(modeScores))
      .flat()
    const uniqueMap: { [key: string]: IHighScore[] } = {}

    // Group high scores by the unique key
    allHighScores.forEach((score) => {
      const key = generateUniqueKey(score)
      if (!uniqueMap[key]) {
        uniqueMap[key] = []
      }
      uniqueMap[key].push(score)
    })

    for (const key in uniqueMap) {
      const duplicates = uniqueMap[key]
      if (duplicates.length > 1) {
        duplicates.sort(
          (a, b) =>
            new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime()
        )
        const [keep, ...remove] = duplicates
        for (const scoreToRemove of remove) {
          if (scoreToRemove._id) {
            await deleteHighScore(scoreToRemove._id)
          }
        }
      }
    }
  }

  const changePlayerName = async (
    oldName: string,
    newName: string,
    userID: IUser['_id']
  ) => {
    try {
      await highScoresService.changePlayerName(language, oldName, newName, userID)
      setHighScores((prevHighScores) => {
        const updatedHighScores: HighScores = {}
        Object.keys(prevHighScores).forEach((mode) => {
          updatedHighScores[mode] = {}
          Object.keys(prevHighScores[mode]).forEach((levelKey) => {
            updatedHighScores[mode][levelKey] = prevHighScores[mode][levelKey].map(
              (score) => {
                const updatedPlayers = score.players.map((player) => {
                  if (player.name === oldName) {
                    return { ...player, name: newName }
                  }
                  return player
                })
                return { ...score, players: updatedPlayers }
              }
            )
          })
        })
        return updatedHighScores
      })
    } catch (err) {
      console.error('Failed to change player name.', err)
    }
  }

  return {
    highScores,
    addHighScore,
    getHighScoresByLevel,
    deleteHighScore,
    updateHighScore,
    deleteHighScoresByPlayerName,
    changePlayerName,
    loading,
    error,
  }
}

export default useHighScores
