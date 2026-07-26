import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect, useState } from 'react'
import type { Task } from '../../Types/types'
import interactionPlugin from "@fullcalendar/interaction"
import { ModalCalendar } from './ModalCalendar'
import type { SelectedEvent } from '../../Types/types'
import type { EventClickArg, EventContentArg } from '@fullcalendar/core'
import './Calendar.css'
import { DayModal } from './DayModal'
import type { SelectedDate } from '../../Types/types'
import type { DateClickArg } from '@fullcalendar/interaction'
import { Cat } from '../Cat/Cat'


export function Calendar() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isModalShowing, setIsModalShowing] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null)
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null)
  const [isDayModalShowing, setIsDayModalShowing] = useState(false)
  const api = import.meta.env.VITE_BACKEND_API

  useEffect(() => {
    const HandleFetchTasks = async () => {
      const token = localStorage.getItem('access_token')
      try {
        const res = await fetch(`${api}/tasks/me`, {
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
      completed: t.completed
      // end: t.time_end
    }))

  console.log(events)

  const handleEventClick = (info: EventClickArg) => {
    console.log("event showing here.", info.event.id)
    const task = tasks.find(t => String(t.id) === info.event.id)
    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      date: info.event.start,
      completed: task?.completed ?? false,
      time_start: String(task?.time_start ?? ''),
      time_end: String(task?.time_end ?? ''),
      description: task?.description ?? ''
    })
    setIsModalShowing(true)
  }

  const handleModalClose = () => {
    setIsModalShowing(false)
    setSelectedEvent(null)
  }

  const handleDayModalClose = () => {
    console.log('clicked')
    setIsDayModalShowing(false)
    setSelectedDate(null)
  }


  const handleDeleteEvent = async (id: string) => {
    const token = localStorage.getItem('access_token')
    try {
      const res = await fetch(`${api}/tasks/me/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (!res.ok) {
        console.log("Not able to delete", data)
        return;
      }

      setTasks(prev => prev.filter(task => String(task.id) != id))
      setIsModalShowing(false)
    } catch (error) {
      console.error('Error deleting account', error)
    }
  }

  const handleDateClick = (info: DateClickArg) => {
    setSelectedDate({
      id: "",
      title: "",
      date: info.dateStr,
      completed: false,
    })
    setIsDayModalShowing(true)
  }

  const handleAddTask = async (task: { task_name: string; time_start: string; time_end: string; date: string, completed: boolean }) => {
    const token = localStorage.getItem('access_token')
    try {
      const res = await fetch(`${api}/tasks/me`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(task)
      })
      const data = await res.json()
      if (res.ok) {
        setTasks(prev => [...prev, data])
        setIsDayModalShowing(false)
        setSelectedDate(null)
      } else {
        console.log("Failed to create task.")
      }
    } catch (error) {
      console.error("error creating task", error)
    }
  }

  const handleUpdateTask = async (task: { id: string, task_name: string; time_start: string; time_end: string; date: string, completed: boolean }) => {
    const token = localStorage.getItem('access_token')
    const { id, ...body } = task
    console.log(body)
    try {
      const res = await fetch(`${api}/tasks/me/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      if (res.ok) {
        setTasks(prev => prev.map(task => String(task.id) === String(data.id) ? data : task))
        setIsModalShowing(false)
        setSelectedDate(null)
        setSelectedEvent(null)
      } else {
        console.log("Failed to update Task.")
      }
    } catch (error) {
      console.error("error updating task", error)
    }
  }



  return (
    <div className='calendar-page'>
      <Cat events={events} />
      <FullCalendar
        height="70vh"
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
      />
      <ModalCalendar key={selectedEvent?.id ?? 'none'} onDelete={handleDeleteEvent} onClose={handleModalClose} show={isModalShowing} info={selectedEvent} onUpdate={handleUpdateTask}>
      </ModalCalendar>
      <DayModal show={isDayModalShowing} onClose={handleDayModalClose} onSubmit={handleAddTask} date={selectedDate?.date ?? ""}></DayModal>
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo: EventContentArg) {
  return (
    <div className='events' style={{ color: eventInfo.event.extendedProps.completed ? 'green' : 'red' }}>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  )
}