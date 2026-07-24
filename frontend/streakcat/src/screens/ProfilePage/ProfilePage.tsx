import { UseAuth } from "../../Auth/UseAuth"
import { Calendar } from "../../components/Calendar/Calendar"
import './ProfilePage.css'
import { useNavigate } from "react-router"

export function ProfilePage() {
  const { user } = UseAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate('/')
  }

  return (
    <div className='profile-page'>
      <div className='calendar-container'>
        <div className='calendar'>
          {user ? (
            <div>
              <h1 style={{ color: 'White', letterSpacing: '.05px' }}>
                {user.first_name}'s Schedule
              </h1>
              <Calendar />
            </div>
          ) : (
            <div>
              <h1>Loading...</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}