import { useEffect, useState } from "react"
import type { CatProps } from "../../Types/types"
export function Cat({ events }: CatProps) {
  const total_tasks = events.length
  const finished_tasks = events.filter((e) => e.completed == true).length
  const percent_completed = finished_tasks / total_tasks
  const [catMood, setCatMood] = useState('')


  useEffect(() => {
    const cat_mood = (percent_completed: GLfloat) => {
      if (percent_completed < 0.2) {
        setCatMood('very_angry')
      } else if (percent_completed < 0.4 && percent_completed >= 0.2) {
        setCatMood('Angry')
      } else if (percent_completed < 0.6 && percent_completed >= 0.4) {
        setCatMood('Slightly Annoyed')
      } else if (percent_completed < 0.8 && percent_completed >= 0.6) {
        setCatMood('neutral')
      } else {
        setCatMood('happy')
      }
    }
    cat_mood(percent_completed)
  }, [total_tasks, percent_completed])



  return (
    <div>
      <h1>Streak Cat</h1>
      {events.map((e) => (
        <div>
          <h1>{e.completed ? 'done' : 'not done'}</h1>
        </div>
      ))}
      <h1>{catMood}</h1>
    </div>
  )
}