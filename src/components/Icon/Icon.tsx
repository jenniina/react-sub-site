import ClientOnly from '../ClientOnly/ClientOnly'
import { iconLibraries } from './iconLibraries'

interface IconProps {
  lib: string
  name: string
  className?: string
  style?: React.CSSProperties
  height?: string
  width?: string
}

const Icon = ({ lib, name, className, style, height, width }: IconProps) => {
  // Compute icon directly to avoid hydration mismatches
  const IconComp = (() => {
    // Only render on client to prevent SSR issues
    if (typeof window === 'undefined') return null

    try {
      const library = iconLibraries[lib]
      return library?.[name] || null
    } catch (e) {
      console.warn('Icon load failed', lib, name, e)
      return null
    }
  })()

  if (!IconComp) return null

  return (
    // Only render icons on the client to avoid bundling react-icons in SSR
    <ClientOnly>
      <IconComp
        className={className}
        style={style}
        height={height}
        width={width}
        aria-hidden="true"
      />
    </ClientOnly>
  )
}

export default Icon
