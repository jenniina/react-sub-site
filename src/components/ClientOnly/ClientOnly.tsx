import { PropsWithChildren } from 'react'
import { useIsClient } from '../../hooks/useSSR'

export default function ClientOnly({ children }: PropsWithChildren<unknown>) {
  const isClient = useIsClient()
  if (!isClient) return null
  return <>{children}</>
}
