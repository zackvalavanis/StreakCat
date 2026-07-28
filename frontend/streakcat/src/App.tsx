import './App.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router'
import { MainPage } from './screens/MainPage/MainPage'
import { NavBar } from './components/NavBar/NavBar'
import { Footer } from './components/Footer/Footer'
import { LoginPage } from './screens/LoginPage/LoginPage'
import { AuthProvider } from './Auth/AuthProvider'
import { Toaster } from 'react-hot-toast'
import { ProfilePage } from './screens/ProfilePage/ProfilePage'
import { SignUpPage } from './screens/SignUp/SignUpPage'

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
      { path: '/profile', element: <ProfilePage /> },
      { path: '/singup-page', element: <SignUpPage /> }
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
