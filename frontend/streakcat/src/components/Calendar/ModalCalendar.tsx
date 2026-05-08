import type { ModalCalendarProps } from "../../Types/types"
import { createPortal } from 'react-dom'
import './ModalCalendar.css'

export function ModalCalendar({ info, show, onClose }: ModalCalendarProps) {
  if (!show || !info) {
    return null;
  }

  return createPortal(
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <h1>{info.id}</h1>
        <p>{info.date?.toString()}</p>
        <button className='close-btn' onClick={onClose}>X</button>
      </div>
    </div>,
    document.body
  )
}