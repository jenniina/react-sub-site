import axios from 'axios'
import { ELanguages, IUser } from '../../../interfaces'
import { IHighScore, IHighScoreResponse, IPlayer } from '../../../interfaces/memory'

const url = import.meta.env.VITE_BASE_URI ?? 'https://bg.jenniina.fi'
const baseUrl = `${url}/api/highscores`

const addHighScore = async (
  language: ELanguages,
  highScore: {
    levelKey: string
    time: number
    size: number
    type: string
    players: IPlayer[]
  }
) => {
  const response = await axios.post(
    `${baseUrl}/${language}/key/${highScore.levelKey}`,
    highScore
  )
  return response.data as IHighScoreResponse
}

const getHighScoresByLevel = async (language: ELanguages, levelKey: string) => {
  const response = await axios.get(`${baseUrl}/${language}/key/${levelKey}`)
  return response.data as IHighScore[]
}

const getAllHighScores = async (language: ELanguages) => {
  const response = await axios.get(`${baseUrl}/${language}`)
  return response.data as IHighScore[]
}

// Delete a high score by ID
const deleteHighScore = async (language: ELanguages, highScoreId: string) => {
  const response = await axios.delete(`${baseUrl}/${language}/id/${highScoreId}`)
  return response.data as IHighScoreResponse
}

// Update a high score by ID
const updateHighScore = async (
  language: ELanguages,
  highScore: IHighScore,
  userID: IUser['_id']
) => {
  const response = await axios.put(
    `${baseUrl}/${language}/id/${highScore._id}?userID=${userID}`,
    highScore
  )
  return response.data as IHighScoreResponse
}

const deleteHighScoresByPlayerName = async (
  language: ELanguages,
  playerName: string,
  userID: IUser['_id']
) => {
  const response = await axios.delete(
    `${baseUrl}/${language}/player/${playerName}?userID=${userID}`
  )
  return response.data as IHighScoreResponse
}

const cleanUpHighScores = async (language: ELanguages, levelKey: string) => {
  const response = await axios.post(`${baseUrl}/${language}/cleanup/${levelKey}`)
  return response.data as IHighScoreResponse
}

const changePlayerName = async (
  language: ELanguages,
  oldName: string,
  newName: string,
  userID: IUser['_id']
) => {
  const response = await axios.put(`${baseUrl}/${language}/player?userID=${userID}`, {
    oldName,
    newName,
  })
  return response.data as IHighScoreResponse
}

export default {
  addHighScore,
  getHighScoresByLevel,
  getAllHighScores,
  deleteHighScore,
  updateHighScore,
  deleteHighScoresByPlayerName,
  changePlayerName,
  cleanUpHighScores,
}
