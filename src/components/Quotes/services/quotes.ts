import axios from 'axios'
import { ELanguages } from '../../../interfaces'
import { translationMapQuotes } from '../../../interfaces/quotes'

export const WEIGHTED = [
  'amazing',
  'art',
  'best',
  'cool',
  'courage',
  'design',
  'dreams',
  'funny',
  'good',
  'great',
  'hope',
  'humor',
  'imagination',
  'learning',
]

export const SMALLER_CATEGORIES = [
  'death',
  'fear',
  'failure',
  'jealousy',
  'god',
  'faith',
  'anger',
  'alone',
  'marriage',
]

export const VALID_CATEGORIES = [
  'age',
  'alone',
  'amazing',
  'anger',
  'architecture',
  'art',
  'attitude',
  'beauty',
  'best',
  'birthday',
  'business',
  'car',
  'change',
  'communication',
  'computers',
  'cool',
  'courage',
  'dad',
  'dating',
  'death',
  'design',
  'dreams',
  'education',
  'environmental',
  'equality',
  'experience',
  'failure',
  'faith',
  'family',
  'famous',
  'fear',
  'fitness',
  'food',
  'forgiveness',
  'freedom',
  'friendship',
  'funny',
  'future',
  'god',
  'good',
  'government',
  'graduation',
  'great',
  'happiness',
  'health',
  'history',
  'home',
  'hope',
  'humor',
  'imagination',
  'inspirational',
  'intelligence',
  'jealousy',
  'knowledge',
  'leadership',
  'learning',
  'legal',
  'life',
  'love',
  'marriage',
  'medical',
  'mom',
  'money',
  'morning',
  'movies',
  'success',
]

const randomCategory = (): string => {
  const result = VALID_CATEGORIES[Math.floor(Math.random() * VALID_CATEGORIES.length)]
  const excluded = [
    'death',
    'fear',
    'failure',
    'jealousy',
    'god',
    'faith',
    'anger',
    'alone',
    'marriage',
  ]
  if (excluded.includes(result)) {
    return randomCategory()
  }
  return result
}

const translationToCategoryMap: Record<string, string[]> = {}

for (const [category, translations] of Object.entries(translationMapQuotes)) {
  for (const [language, translation] of Object.entries(translations)) {
    const lowerCaseTranslation = translation.toLowerCase()
    if (!translationToCategoryMap[lowerCaseTranslation]) {
      translationToCategoryMap[lowerCaseTranslation] = []
    }
    translationToCategoryMap[lowerCaseTranslation].push(category)
  }
}

export interface QuoteItem {
  author: string
  category: string
  quote: string
}

export interface QuotesResponse {
  success: boolean
  quote: QuoteItem[]
  message?: string
}

const url = import.meta.env.VITE_BASE_URI ?? 'https://bg.jenniina.fi'
const baseUrl = `${url}/api/quotes`

const extractCategory = (searchTerms: string): string => {
  const lowerCaseTerms = searchTerms.toLowerCase()
  const matchedCategories = new Set<string>()

  const searchWords = lowerCaseTerms.split(/\s+/)

  searchWords.forEach((word) => {
    Object.entries(translationToCategoryMap).forEach(([translation, categories]) => {
      // Check for partial match using 'includes'
      if (translation.includes(word)) {
        categories.forEach((category) => matchedCategories.add(category))
      }
    })
  })

  if (matchedCategories.size > 0) {
    // Convert Set to Array for random selection
    const categoriesArray = Array.from(matchedCategories)
    const randomIndex = Math.floor(Math.random() * categoriesArray.length)
    return categoriesArray[randomIndex]
  }

  return randomCategory()
}

export const getQuote = async (
  language: ELanguages,
  searchTerms: string
): Promise<QuoteItem> => {
  try {
    const category = extractCategory(searchTerms)

    const response = await axios.get<QuotesResponse>(`${baseUrl}/${language}/${category}`)

    if (response.data.success && response.data.quote) {
      return response.data.quote[0]
    } else {
      throw new Error(response.data.message || 'Failed to fetch quote.')
    }
  } catch (error) {
    console.error('Error fetching quote:', error)
    throw error
  }
}
