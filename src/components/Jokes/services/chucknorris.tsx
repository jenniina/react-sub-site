//https://api.chucknorris.io/jokes/categories
//https://api.chucknorris.io/jokes/random
//https://api.chucknorris.io/jokes/random?category={category}

//     {
//     "icon_url" : "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
//     "id" : "qMx2S76sRpeZQjyni-QVTA",
//     "url" : "",
//     "value" : "Chuck Norris' saliva is used to euthanize Komodo dragons."
//     }

import axios from 'axios'

const NORRIS_URI = 'https://api.chucknorris.io/jokes'

const getNorrisCategories = async () => {
  const response = await axios.get(`${NORRIS_URI}/categories`)
  return response.data
}

// const getRandomNorrisJoke = async () => {
//   const response = await axios.get(`${NORRIS_URI}/random`)
//   return response.data
// }

const getRandomJokeFromNorrisCategory = async (category: string) => {
  const response = await axios.get(`${NORRIS_URI}/random?category=${category}`)
  return response.data
}

//free text search https://api.chucknorris.io/jokes/search?query={query}
//result: []
//total: 0

const searchNorrisJoke = async (query: string) => {
  const response = await axios.get(`${NORRIS_URI}/search?query=${query}`)
  console.log('response.data from Norris query', response.data)
  if (!response.data.result || response.data.result.length === 0) {
    return
  }
  const randomIndex = Math.floor(Math.random() * response.data.result.length)
  console.log('randomIndex', randomIndex, response.data.result[randomIndex])
  return response.data.result[randomIndex]
}

export default {
  getNorrisCategories,
  //getRandomNorrisJoke,
  getRandomJokeFromNorrisCategory,
  searchNorrisJoke,
}
