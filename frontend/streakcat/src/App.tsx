import './App.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router'
import { MainPage } from './screens/MainPage/MainPage'
import { NavBar } from './components/NavBar/NavBar'
import { Footer } from './components/Footer/Footer'
import { LoginPage } from './Auth/LoginPage/LoginPage'
import { AuthProvider } from './Context/AuthProvider'
import { Toaster } from 'react-hot-toast'
import { ProfilePage } from './screens/ProfilePage/ProfilePage'

const router = createBrowserRouter([
  {
    element: (
      <div className="app-layout">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    ),
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/login-page', element: <LoginPage /> },
      { path: '/profile', element: <ProfilePage /> }
    ]
  }
])

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  )
}

export default App
