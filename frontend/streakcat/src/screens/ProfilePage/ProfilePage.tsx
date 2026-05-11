import { UseAuth } from "../../Auth/UseAuth"
import { Calendar } from "../../components/Calendar/Calendar"
import './ProfilePage.css'
import { useNavigate } from "react-router"

export function ProfilePage() {
  const { user } = UseAuth()
  const navigate = useNavigate()
  console.log("User: ", user)

  if (!user) {
    navigate('/')
  }

  return (
    <div className='profile-page'>
      <h1>
        {/* Welcome {user.first_name} */}
      </h1>
      <div className='calendar-container'>
        <div className='calendar'>
          <Calendar />
        </div>
      </div>
    </div>
  )
}