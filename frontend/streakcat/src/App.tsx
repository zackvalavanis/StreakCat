import './App.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router'
import { MainPage } from './screens/MainPage/MainPage'
import { NavBar } from './components/NavBar/NavBar'
import { Footer } from './components/Footer/Footer'
import { LoginPage } from './Auth/LoginPage/LoginPage'

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
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
