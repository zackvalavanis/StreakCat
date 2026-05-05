

export interface LoginPage {
  email: string
  password: string
}

export interface AuthContextType {
  token: string | null
  login: (token: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}