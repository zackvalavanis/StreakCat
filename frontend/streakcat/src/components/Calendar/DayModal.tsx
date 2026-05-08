import type { DayModalProps } from "../../Types/types"
import { useState } from "react"

export function DayModal({ show, onClose, onSubmit, date }: DayModalProps) {
  const [taskName, setTaskName] = useState('')
  const [timeStart, setTimeStart] = useState('09:00')
  const [timeEnd, setTimeEnd] = useState('10:00')

  if (!show) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!taskName.trim()) return
    onSubmit({
      task_name: taskName,
      time_start: `${date}T${timeStart}:00Z`,
      time_end: `${date}T${timeEnd}:00Z`,
      date: `${date}T${timeStart}:00Z`,
    })
    setTaskName('')
    setTimeStart('09:00')
    setTimeEnd('10:00')
  }


  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setTaskName(e.target.value)} value={taskName} placeholder="Task"></input>
          <input type='time' onChange={(e) => setTimeStart(e.target.value)} value={timeStart} placeholder="start time"></input>
          <input type='time' onChange={(e) => setTimeEnd(e.target.value)} value={timeEnd} placeholder='end time'></input>
          <input type='date' value={date} placeholder="date" readOnly></input>
          <button>Add to Calendar</button>
        </form>
        <button className='close-btn' onClick={onClose}>X</button>
      </div>
    </div>
  )
}