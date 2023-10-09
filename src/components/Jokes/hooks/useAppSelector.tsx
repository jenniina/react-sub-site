import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from '../store'

// Use throughout your app instead of plain `useDispatch`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
