import { memo } from 'react'

const TimerDisplay = memo(({ timer }: { timer: number }) => {
  return <span>{timer.toFixed(1)}s</span>
})

TimerDisplay.displayName = 'TimerDisplay'

export default TimerDisplay
