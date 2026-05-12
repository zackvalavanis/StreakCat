import type { ModalCalendarProps } from "../../Types/types"
import { createPortal } from 'react-dom'
import './ModalCalendar.css'
import { useState } from "react"

export function ModalCalendar({ info, show, onClose, onDelete, onUpdate }: ModalCalendarProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [timeStart, setTimeStart] = useState('09:00')
  const [timeEnd, setTimeEnd] = useState('10:00')
  const [completed, setCompleted] = useState(false)

  if (!show || !info) {
    return null;
  }

  const configure_date = info.date?.toString().split(' ').slice(0, 4).join(' ')
  const isoDate = info.date?.toISOString().split('T')[0]  // add it here
  const time = info.date?.toString().split(' ').slice(4, 5).join(' ')
  const time_zone = info.date?.toString().split(' ').slice(6).join(' ')
  const time_zone_cleaned = time_zone
    .split(' ')
    .join(' ')
    .replace(/[()]/g, '')

  const cleaned_time_zone = (time_zone_cleaned) => {
    const letters = time_zone_cleaned.split(' ')
    const arr = []

    for (let i = 0; i < letters.length; i++) {
      arr.push(letters[i][0])
    }
    return arr.join('');
  }
  console.log(time_zone_cleaned)


  const handleEdit = () => {
    setTaskName(info.title)
    setCompleted(info.completed ?? false)
    console.log('editing')
    setIsEditing(true)
  }

  const handleClose = () => {
    setIsEditing(false)
    onClose()
  }

  return createPortal(
    <div className='modal-overlay' onClick={handleClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        {isEditing ? (
          <div>
            <input onChange={(e) => setTaskName(e.target.value)} value={taskName} placeholder="Task"></input>
            <input type='time' onChange={(e) => setTimeStart(e.target.value)} value={timeStart} placeholder="start time"></input>
            <input type='time' onChange={(e) => setTimeEnd(e.target.value)} value={timeEnd} placeholder='end time'></input>
            <input type='date' value={time} placeholder="date" readOnly></input>
            <input
              type='checkbox'
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}>
            </input>
            <button className='close-btn' onClick={handleClose}>X</button>
            <button onClick={() => onUpdate({
              id: info.id,
              task_name: taskName,
              time_start: `${isoDate}T${timeStart}:00`,
              time_end: `${isoDate}T${timeEnd}:00`,
              date: `${isoDate}T${timeStart}:00`,
              completed: completed
            })}
            >Update
            </button>
            <button className='delete-btn' onClick={() => onDelete(info.id)}>Delete</button>
          </div>
        ) : (
          <div>
            <p>{configure_date}</p>
            <p>{time} {cleaned_time_zone(time_zone_cleaned)}</p>
            <button className='close-btn' onClick={handleClose}>X</button>
            <button className='delete-btn' onClick={() => onDelete(info.id)}>Delete</button>
            <button className='edit-btn' onClick={handleEdit}>Edit</button>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}