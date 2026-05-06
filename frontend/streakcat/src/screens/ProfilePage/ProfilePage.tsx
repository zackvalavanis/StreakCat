import { UseAuth } from "../../Context/UseAuth"

export function ProfilePage() {
  const { user } = UseAuth()
  console.log("User: ", user)

  return (
    <h1>
      Welcome {user.first_name}

    </h1>
  )
}