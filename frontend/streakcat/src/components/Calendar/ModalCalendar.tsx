import type { ModalCalendarProps } from "../../Types/types"
import { createPortal } from 'react-dom'
import './ModalCalendar.css'

export function ModalCalendar({ info, show, onClose, onDelete }: ModalCalendarProps) {
  if (!show || !info) {
    return null;
  }

  const configure_date = info.date?.toString().split(' ').slice(0, 4).join(' ')
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

  return createPortal(
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <h1>{info.title}</h1>
        <p>{configure_date}</p>
        <p>{time} {cleaned_time_zone(time_zone_cleaned)}</p>
        <button className='close-btn' onClick={onClose}>X</button>
        <button className='delete-btn' onClick={() => onDelete(info.id)}>Delete</button>
      </div>
    </div>,
    document.body
  )
}