import { UseAuth } from "../../Auth/UseAuth"
import { Calendar } from "../../components/Calendar/Calendar"

export function ProfilePage() {
  const { user } = UseAuth()
  console.log("User: ", user)

  return (
    <div>
      <h1>
        {/* Welcome {user.first_name} */}
      </h1>
      <Calendar />
    </div>
  )
}