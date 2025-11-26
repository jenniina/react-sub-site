import axios from 'axios'
import { ELanguages } from '../../../types'
import {
  Category,
  Color,
  Orientation,
  TImageTypes,
} from '../../../types/images'

export interface SearchOptions {
  q: string
  type?: TImageTypes
  video_type: string | undefined
  orientation?: Orientation
  category?: Category
  min_width?: number
  min_height?: number
  colors?: Color[]
  editors_choice?: boolean
  safesearch?: boolean
  order?: 'popular' | 'latest'
  per_page?: number
  page?: number
}

export interface VideoSize {
  url: string
  width: number
  height: number
  size: number
  thumbnail: string
}

export interface Videos {
  large: VideoSize
  medium: VideoSize
  small: VideoSize
  tiny: VideoSize
}

export interface VideoHit {
  id: number
  pageURL: string
  type: string
  tags: string
  duration: number
  videos: Videos
  views: number
  downloads: number
  likes: number
  comments: number
  user_id: number
  user: string
  userImageURL: string
}

export type Hit = ImageHit | VideoHit

export interface ImageHit {
  id: number
  pageURL: string
  type: string
  tags: string
  previewURL: string
  previewWidth: number
  previewHeight: number
  webformatURL: string
  webformatWidth: number
  webformatHeight: number
  largeImageURL: string
  imageWidth: number
  imageHeight: number
  imageSize: number
  views: number
  downloads: number
  likes: number
  comments: number
  user_id: number
  user: string
  userImageURL: string
}

export interface ImagesResponse {
  success: boolean
  message: string
  totalHits: number
  hits: Hit[]
}

const url = 'https://react.jenniina.fi'
const baseUrl = `${url}/api/images`

const searchMedia = async (
  language: ELanguages,
  options: SearchOptions
): Promise<ImagesResponse> => {
  try {
    const params = new URLSearchParams()

    // Mandatory Parameter
    params.append('q', options.q)

    // Optional Parameters with Defaults
    if (options.type) {
      params.append('image_type', options.type)
    } else {
      params.append('image_type', 'all')
    }

    if (options.video_type) {
      params.append('video_type', options.video_type)
    }

    if (options.orientation) {
      params.append('orientation', options.orientation)
    } else {
      params.append('orientation', Orientation.all)
    }

    if (options.category) {
      params.append('category', options.category)
    }

    if (options.min_width !== undefined && options.min_width >= 0) {
      params.append('min_width', options.min_width.toString())
    } else {
      params.append('min_width', '0')
    }

    if (options.min_height !== undefined && options.min_height >= 0) {
      params.append('min_height', options.min_height.toString())
    } else {
      params.append('min_height', '0')
    }

    if (options.colors && options.colors.length > 0) {
      params.append('colors', options.colors.join(','))
    }

    params.append('editors_choice', options.editors_choice ? 'true' : 'false')
    params.append('safesearch', options.safesearch ? 'true' : 'false')

    if (options.order) {
      params.append('order', options.order)
    } else {
      params.append('order', 'popular')
    }

    params.append(
      'per_page',
      options.per_page && options.per_page >= 3 && options.per_page <= 200
        ? options.per_page.toString()
        : '200'
    )

    const response = await axios.get(
      `${baseUrl}/${language}?${params.toString()}`
    )

    return response.data as ImagesResponse
  } catch (err: unknown) {
    console.error('Error fetching images:', err)
    let message = 'Error fetching images.'
    if (axios.isAxiosError(err)) {
      message =
        (err.response?.data as { message?: string } | undefined)?.message ??
        err.message
    } else if (err instanceof Error) {
      message = err.message
    }

    return {
      success: false,
      message,
      totalHits: 0,
      hits: [],
    }
  }
}

export default {
  searchMedia,
}
