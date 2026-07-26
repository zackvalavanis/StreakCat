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
        <Link className='link4' to='/'>Home</Link>
        {user ? (
          <div className='nav-bar-links'>
            <Link className='link1' to='/profile'>Profile</Link>
            <Link className='link2' to="/" onClick={handleLogout}>Logout</Link>

          </div>
        ) : (
          <div className='links-log'>
            <Link className='link3' to='/login-page'>Login</Link>
            <Link className='link4' to="/singup-page" >Sign Up</Link>
          </div>
        )}
      </div>

    </div>
  )
}