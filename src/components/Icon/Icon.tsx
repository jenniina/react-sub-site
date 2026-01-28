import { useEffect } from 'react'
import type { CSSProperties, SVGProps } from 'react'
import ClientOnly from '../ClientOnly/ClientOnly'
import { iconLibraries } from './iconLibraries'

interface IconProps {
  lib?: string
  name?: string
  className?: string
  style?: CSSProperties
  height?: string
  width?: string
  title?: string
  'aria-hidden'?: boolean | 'true' | 'false'
  'aria-label'?: string
}

const Icon = ({
  lib,
  name,
  className,
  style,
  height,
  width,
  title,
  'aria-hidden': ariaHidden = 'true',
  'aria-label': ariaLabel,
}: IconProps) => {
  const library = lib ? iconLibraries[lib] : undefined
  const IconComp = lib && name ? (library?.[name] ?? null) : null

  const isMissing = !lib || !name || !library || !IconComp
  const missingTitle =
    title ?? `Missing icon: ${lib ?? '(no lib)'}/${name ?? '(no name)'}`

  useEffect(() => {
    if (!isMissing) return
    if (!import.meta.env.DEV) return
    console.warn('Missing icon', { lib, name })
  }, [isMissing, lib, name])

  return (
    // Only render icons on the client to avoid bundling react-icons in SSR
    <ClientOnly>
      {isMissing ? (
        <span
          className={className}
          style={style}
          title={missingTitle}
          aria-hidden={ariaHidden}
          aria-label={ariaLabel}
        >
          ?
        </span>
      ) : (
        <IconComp
          className={className}
          style={style}
          height={height}
          width={width}
          aria-hidden={ariaHidden}
          aria-label={ariaLabel}
          title={title}
        />
      )}
    </ClientOnly>
  )
}

export default Icon
