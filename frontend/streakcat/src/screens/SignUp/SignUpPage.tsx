import './SignUpPage.css'
import { useState } from 'react'
import type { SignUp } from '../../Types/types'



export function SignUpPage() {
  const [formData, setFormData] = useState<SignUp>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const api = import.meta.env.VITE_BACKEND_API
  const [passwordCheck, setPasswordCheck] = useState("")
  const [error, setError] = useState<string | null>(null)

  const HandleSignUp = async (formData: SignUp) => {
    setLoading(true)
    console.log('hi')
    try {
      const res = await fetch(`${api}/auth/register`, {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password
        })
      })
      if (!res.ok) {
        console.log("Error creating user")
        alert("Could not create user, please try again...")
        return
      } else {
        alert("User Created!")
      }
    } catch (error) {
      console.error("Error", error)
      alert("Something went wrong, Please try Again.")
    }
    finally {
      setLoading(false)
    }
  }

  const passwordRules = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
    { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  ]

  const validatePassword = (password: string, confirm: string): string | null => {
    if (password.length < 8) return "Password must be at least 8 characters."
    if (!/[A-Z]/.test(password)) return "Include at least one uppercase letter."
    if (!/[a-z]/.test(password)) return "Include at least one lowercase letter."
    if (!/[0-9]/.test(password)) return "Include at least one number."
    if (password !== confirm) return "Passwords do not match."
    return null
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validatePassword(formData.password, passwordCheck)
    if (validationError) {
      setError(validationError)
      return
    }
    setError(null)
    HandleSignUp(formData)
  }

  return (
    <div>
      <div className='sign-up-page'>
        <form className='form-signup' onSubmit={submit}>
          <input
            name="first_name"
            type='text'
            placeholder="First Name"
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })}
          >
          </input>
          <input
            name="last_name"
            type='text'
            placeholder="Last Name"
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })}
          >
          </input>
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

          <input
            name="password_check"
            type={showPassword ? 'text' : 'password'}
            placeholder='Confirm Password'
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          >
          </input>

          {formData.password && (
            <ul className="password-rules">
              {passwordRules.map((rule) => {
                const passed = rule.test(formData.password)
                return (
                  <li key={rule.label} style={{ color: passed ? "green" : "#999" }}>
                    {passed ? "✓" : "○"} {rule.label}
                  </li>
                )
              })}
              <li style={{ color: passwordCheck && formData.password === passwordCheck ? "green" : "#999" }}>
                {passwordCheck && formData.password === passwordCheck ? "✓" : "○"} Passwords match
              </li>
            </ul>
          )}

          <button type='button' onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show Password"}</button>

          {error && (
            <p className='form-error' style={{ color: '#d33', margin: '4px 0' }}>
              {error}
            </p>
          )}
          <button type='submit' disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
        </form>
      </div>
    </div>
  )
}