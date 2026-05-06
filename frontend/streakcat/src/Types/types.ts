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
  task_name: string
  time_start: DateInput
  time_end: DateInput
}
