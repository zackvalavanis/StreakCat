import type { ModalCalendarProps } from "../../Types/types"
import { createPortal } from 'react-dom'
import './ModalCalendar.css'
import { useState } from "react"

export function ModalCalendar({ info, show, onClose, onDelete, onUpdate }: ModalCalendarProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [taskName, setTaskName] = useState(info?.title ?? '')
  const [timeStart, setTimeStart] = useState('09:00')
  const [timeEnd, setTimeEnd] = useState('10:00')
  const [completed, setCompleted] = useState(info?.completed ?? false)
  const [description, setDescription] = useState('')

  if (!show || !info) {
    return null;
  }

  const configure_date = info.date?.toString().split(' ').slice(0, 4).join(' ')
  const isoDate = info.date?.toISOString().split('T')[0]
  const time = info.date?.toString().split(' ').slice(4, 5).join(' ')

  const offsetMinutes = new Date(`${isoDate}T${timeStart}:00`).getTimezoneOffset()
  const sign = offsetMinutes <= 0 ? '+' : '-'
  const absMinutes = Math.abs(offsetMinutes)
  const hours = String(Math.floor(absMinutes / 60)).padStart(2, '0')
  const minutes = String(absMinutes % 60).padStart(2, '0')
  const tzOffset = `${sign}${hours}:${minutes}`

  const time_zone = info.date ? info.date.toString().split(' ').slice(6).join(' ') : ''
  const time_zone_cleaned = time_zone
    .replace(/[()]/g, '')
    .trim()

  const cleaned_time_zone = (tz: string) => {
    if (!tz) return ''
    const letters = tz.split(' ')
    const arr: string[] = []

    for (let i = 0; i < letters.length; i++) {
      if (letters[i]) arr.push(letters[i][0])
    }
    return arr.join('')
  }


  const handleEdit = () => {
    setTaskName(info.title)
    const start = new Date(info.time_start)
    const end = new Date(info.time_end)
    setTimeStart(`${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`)
    setTimeEnd(`${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`)
    setCompleted(info.completed ?? false)
    setDescription(info.description ?? '')
    console.log('editing')
    setIsEditing(true)
  }

  const handleClose = () => {
    setIsEditing(false)
    setTaskName('')
    setTimeStart('09:00')
    setTimeEnd('10:00')
    setCompleted(false)
    setDescription('')
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
            <label>
              <input
                type='checkbox'
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}>
              </input>
              Completed
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Description (optional)"
              rows={3}
            />
            <button className='close-btn' onClick={handleClose}>X</button>
            <button className='update-btn' onClick={() => onUpdate({
              id: info.id,
              task_name: taskName,
              time_start: `${isoDate}T${timeStart}:00${tzOffset}`,
              time_end: `${isoDate}T${timeEnd}:00${tzOffset}`,
              date: `${isoDate}T${timeStart}:00${tzOffset}`,
              completed: completed,
              description: description
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
            <p>{configure_date}</p>
            <p>{time} {cleaned_time_zone(time_zone_cleaned)}</p>
            {info.description && <p>{info.description}</p>}
            <button className='delete-btn' onClick={() => onDelete(info.id)}>Delete</button>
            <button className='edit-btn' onClick={handleEdit}>Edit</button>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}