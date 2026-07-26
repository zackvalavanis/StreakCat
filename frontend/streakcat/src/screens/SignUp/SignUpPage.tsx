import './SignUpPage.css'
import { useState } from 'react'
import type { SignUp } from '../../Types/types'



export function SignUp() {
  const [formData, setFormData] = useState<SignUp>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <div>
      <div className='login-page'>
        <form className='form' onSubmit={submit}>
          <input
            name="email"
            type='email'
            placeholder="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })}
          >
          </input>
          <input
            name="password"
            id="passwordField"
            type={showPassword ? 'text' : 'password'}
            placeholder='password'
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          >
          </input>
          <button type='button' onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show Password"}</button>

          <button type='submit' disabled={loading}>{loading ? "Logging in.." : "Login"}</button>
        </form>
      </div>
    </div>
  )
}