import { Link } from "react-router"
import { UseAuth } from "../../Auth/UseAuth"
import './NavBar.css'

export function NavBar() {
  const { logout, user } = UseAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className='nav-bar'>
      <div className='nav-bar-links'>
        <Link to='/'>Home</Link>
        {user ? (
          <div className='nav-bar-links'>
            <Link to='/profile'>Profile</Link>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </div>
        ) : (
          <Link to='/login-page'>Login</Link>
        )}
      </div>

    </div>
  )
}