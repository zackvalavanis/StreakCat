import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect, useState } from 'react'
import type { Task } from '../../Types/types'



export function Calendar() {
  const [tasks, setTasks] = useState<Task[]>([])


  const HandleFetchTasks = async () => {
    const access_token = localStorage.getItem('access_token')
    console.log("Access token", access_token)

    const token = localStorage.getItem('access_token')
    try {
      const res = await fetch('http://localhost:8000/tasks/me', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      setTasks(data)
    } catch (error) {
      console.error('Error', error)
    }
  }

  useEffect(() => {
    HandleFetchTasks()
  }, [])


  const events =
    tasks.map((t: Task) => ({
      title: t.task_name,
      start: t.time_start,
      end: t.time_end
    }))


  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}