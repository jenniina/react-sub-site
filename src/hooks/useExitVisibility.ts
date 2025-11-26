import { useCallback, useState } from 'react'

export default function useExitVisibility(initial = false) {
  const [open, setOpen] = useState(initial)
  const [hidden, setHidden] = useState(!initial)

  const show = () => {
    setHidden(false)
    setOpen(true)
  }
  const hide = () => {
    setOpen(false) /* hidden will flip after transition end */
  }

  // Attach this to the animated container
  const onTransitionEnd = useCallback<
    React.TransitionEventHandler<HTMLElement>
  >(
    e => {
      if (e.target !== e.currentTarget) return // ignore bubbling from children
      if (!open) setHidden(true) // exit finished; now hide
    },
    [open]
  )

  return { open, hidden, show, hide, onTransitionEnd }
}
