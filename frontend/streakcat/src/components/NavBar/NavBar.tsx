import { Link } from "react-router"
import { UseAuth } from "../../Context/UseAuth"

export function NavBar() {
  const { user } = UseAuth()

  return (
    <div>
      {user ? (
        <Link to='/profile'>Profile</Link>
      ) : (
        <Link to='/login-page'>Login</Link>
      )}

    </div>
  )
}