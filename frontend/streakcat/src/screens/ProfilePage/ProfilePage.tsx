import { UseAuth } from "../../Auth/UseAuth"
import { Calendar } from "../../components/Calendar/Calendar"
import './ProfilePage.css'

export function ProfilePage() {
  const { user } = UseAuth()
  console.log("User: ", user)

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