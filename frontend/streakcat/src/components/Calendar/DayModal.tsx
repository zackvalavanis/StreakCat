import type { DayModalProps } from "../../Types/types"
import { useState } from "react"
import './DayModal.css'

export function DayModal({ show, onClose, onSubmit, date }: DayModalProps) {
  const [taskName, setTaskName] = useState('')
  const [timeStart, setTimeStart] = useState('09:00')
  const [timeEnd, setTimeEnd] = useState('10:00')
  const [complete, setCompleted] = useState(false)
  const [description, setDescription] = useState('')
  const offsetminutes = new Date(`${date}T${timeStart}:00`).getTimezoneOffset()
  const sign = offsetminutes <= 0 ? '+' : '-';
  const absMinutes = Math.abs(offsetminutes)
  const hours = String(Math.floor(absMinutes / 60)).padStart(2, '0');
  const minutes = String(absMinutes % 60).padStart(2, '0')
  const tzOffset = `${sign}${hours}:${minutes}`;


  if (!show) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!taskName.trim()) return
    onSubmit({
      task_name: taskName,
      time_start: `${date}T${timeStart}:00${tzOffset}`,
      time_end: `${date}T${timeEnd}:00${tzOffset}`,
      date: `${date}T${timeStart}:00${tzOffset}`,
      completed: complete,
      description: description
    })
    setTaskName('')
    setTimeStart('09:00')
    setTimeEnd('10:00')
    setCompleted(false)
    setDescription('')
  }


  return (
    <div className='modal-overlay-day' onClick={onClose}>
      <div className='modal-content-day' onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setTaskName(e.target.value)} value={taskName} placeholder="Task"></input>
          <input type='time' onChange={(e) => setTimeStart(e.target.value)} value={timeStart} placeholder="start time"></input>
          <input type='time' onChange={(e) => setTimeEnd(e.target.value)} value={timeEnd} placeholder='end time'></input>
          <input type='date' value={date} placeholder="date" readOnly></input>
          <input type='text' value={description} placeholder="description"></input>
          <button className='add-btn'>Add Task</button>
        </form>
        <button className='close-btn' onClick={onClose}>X</button>
      </div>
    </div>
  )
}