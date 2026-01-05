import axios from 'axios'
import { Draggable, SavedBlobs } from '../types'
import { ELanguages, IResponse } from '../../../types'

const url = 'https://react.jenniina.fi'
const baseUrl = `${url}/api/blobs`

// router.get('/api/blobs/:user/:language', getAllBlobsByUser)
// router.get('/api/blobs/:user/:versionName/:language', getBlobsVersionByUser)
// router.post('/api/blobs/:user/:versionName/:language', saveBlobsByUser)
// router.delete('/api/blobs/:user/:versionName/:language',

const getAllBlobsByUser = async (
  user: string,
  d: number,
  language: ELanguages
): Promise<SavedBlobs[]> => {
  const response = await axios.get(`${baseUrl}/${user}/${d}`, {
    params: { language },
  })
  return response.data as SavedBlobs[]
}

const getBlobsVersionByUser = async (
  user: string,
  d: number,
  versionName: string,
  language: ELanguages
): Promise<SavedBlobs> => {
  const response = await axios.get(
    `${baseUrl}/${user}/${d}/${versionName}/${language}`
  )
  return response.data as SavedBlobs
}

const saveBlobsByUser = async (
  user: string,
  d: number,
  draggables: Draggable[],
  versionName: string,
  backgroundColor: string[],
  language: ELanguages
): Promise<IResponse> => {
  const response = await axios.post(
    `${baseUrl}/${user}/${d}/${versionName}/${language}`,
    {
      draggables,
      backgroundColor,
    }
  )
  return response.data as IResponse
}

const editBlobsByUser = async (
  user: string,
  d: number,
  draggables: Draggable[],
  versionName: string,
  backgroundColor: string[],
  language: ELanguages,
  newVersionName: string
): Promise<IResponse> => {
  const response = await axios.put(
    `${baseUrl}/${user}/${d}/${versionName}/${language}`,
    {
      d,
      versionName,
      draggables,
      backgroundColor,
      newVersionName,
    }
  )
  return response.data as IResponse
}

const deleteBlobsVersionByUser = async (
  user: string,
  d: number,
  versionName: string,
  language: ELanguages
): Promise<IResponse> => {
  const response = await axios.delete(
    `${baseUrl}/${user}/${d}/${versionName}/${language}`
  )
  return response.data as IResponse
}

export default {
  getAllBlobsByUser,
  getBlobsVersionByUser,
  saveBlobsByUser,
  editBlobsByUser,
  deleteBlobsVersionByUser,
}
