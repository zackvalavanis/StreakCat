import type { DateInput } from "@fullcalendar/core/index.js"

export interface User {
  token: string | null
  first_name: string
  last_name: string
}

export interface LoginPage {
  email: string
  password: string
}

export interface AuthContextType {
  token: string | null
  login: (token: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  user: User | null
}

export interface Task {
  id: number
  task_name: string
  time_start: DateInput
  time_end: DateInput
}

export type ModalCalendarProps = {
  show: boolean
  onClose: () => void
  onDelete: (id: string) => void
  info: {
    id: string
    title: string
    date: Date | null
  } | null
}

export interface DayModalProps {
  show: boolean
  onClose: () => void
  onSubmit: (task: { task_name: string; time_start: string; time_end: string; date: string }) => void
  date: string
}

export type SelectedEvent = {
  id: string
  title: string
  date: Date | null
}

export type SelectedDate = {
  id: string
  title: string
  date: string
}