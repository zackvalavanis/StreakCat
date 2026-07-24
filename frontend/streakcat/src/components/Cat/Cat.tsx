import type { CatProps } from "../../Types/types"
import { StreakCat } from "./StreakCat"
import type { MoodKey } from "./StreakCat"
import './Cat.css'

export function Cat({ events }: CatProps) {
  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  const startOfWeek = new Date(now)
  const dayOfWeek = now.getDay()
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  startOfWeek.setDate(now.getDate() - mondayOffset)
  const weekStart = `${startOfWeek.getFullYear()}-${String(startOfWeek.getMonth() + 1).padStart(2, '0')}-${String(startOfWeek.getDate()).padStart(2, '0')}`

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  const weekEnd = `${endOfWeek.getFullYear()}-${String(endOfWeek.getMonth() + 1).padStart(2, '0')}-${String(endOfWeek.getDate()).padStart(2, '0')}`

  const weeklyEvents = events.filter(e => {
    const d = String(e.date).split('T')[0]
    return d >= weekStart && d <= weekEnd
  })
  const totalTasksThisWeek = weeklyEvents.length
  const weeklyCompleted = weeklyEvents.filter(e => e.completed).length
  const percent = totalTasksThisWeek > 0 ? weeklyCompleted / totalTasksThisWeek : 0

  const dailyCompleted = events.filter(e => {
    const d = String(e.date).split('T')[0]
    return d === today && e.completed
  }).length

  let moodKey: MoodKey
  if (totalTasksThisWeek === 0) {
    moodKey = 'neutral'
  } else if (percent < 0.2) moodKey = 'very_angry'
  else if (percent < 0.4) moodKey = 'angry'
  else if (percent < 0.6) moodKey = 'annoyed'
  else if (percent < 0.8) moodKey = 'neutral'
  else moodKey = 'happy'

  return (
    <div className="cat">
      <StreakCat
        moodKey={moodKey}
        weeklyCompleted={weeklyCompleted}
        totalTasksThisWeek={totalTasksThisWeek}
        dailyCompleted={dailyCompleted}
      />
      <p style={{ paddingBottom: '2rem', color: 'white' }}>
        Make Whiskers happy by completing your tasks.
      </p>
    </div>
  )
}