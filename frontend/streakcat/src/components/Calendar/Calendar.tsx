import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect, useState } from 'react'
import type { Task } from '../../Types/types'
import interactionPlugin from "@fullcalendar/interaction"
import { ModalCalendar } from './ModalCalendar'
import type { SelectedEvent } from '../../Types/types'
import type { EventClickArg } from '@fullcalendar/core'
import './Calendar.css'



export function Calendar() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isModalShowing, setIsModalShowing] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null)

  useEffect(() => {
    const HandleFetchTasks = async () => {
      const token = localStorage.getItem('access_token')
      try {
        const res = await fetch('http://localhost:8000/tasks/me', {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await res.json()
        if (res.ok && Array.isArray(data)) {
          setTasks(data)
        } else {
          console.error("Failed to fetch tasks", data)
        }
      } catch (error) {
        console.error('Error', error)
      }
    }
    HandleFetchTasks()
  }, [])


  const events =
    tasks.map((t: Task) => ({
      id: String(t.id),
      title: t.task_name,
      date: t.time_start,
      // end: t.time_end
    }))


  const handleEventClick = (info: EventClickArg) => {
    console.log("event showing here.", info.event.id)

    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      date: info.event.start
    })
    setIsModalShowing(true)
  }

  const handleModalClose = () => {
    setIsModalShowing(false)
    setSelectedEvent(null)
  }

  return (
    <div>
      <FullCalendar

        height="70vh"
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      />
      <ModalCalendar onClose={handleModalClose} show={isModalShowing} info={selectedEvent}>
      </ModalCalendar>
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <div className='events'>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  )
}