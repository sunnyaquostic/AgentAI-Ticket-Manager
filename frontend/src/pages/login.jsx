import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignupRedirect = () => {
    navigate("/signup")
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name] : e.target.value})
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
      })
      const data = await res.json()

      if (res.ok) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        navigate("/")
      } else {
        alert(data.message || "Login failed")
      }
    } catch (error) {
      console.error("Something went wrong while login", error)
      alert("Login - something went wrong")
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-base-200'>
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <form onSubmit={handleLogin} className='card-body'>
          <h2 className="card-title justify-center">Login</h2>
          <input 
            type="email"
            name='email' 
            placeholder='Email'
            className='input input-bordered'
            value={form.email}
            onChange={handleChange}
            required
          />
          <input 
            type="password"
            name='password' 
            placeholder='Password'
            className='input input-bordered'
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className='form-control mt-4'>
            <button 
              type="submit"
              className='btn btn-primary w-full'
              disabled={loading}
            >
              {loading ? "Login in..." : "Login"}
            </button>
            
          </div>
          <div className='form-control mt-4 flex justify-between items-center text-xl'>
            Don't have an account?
            <button 
              type="button"
              className='btn bg-red-400 w-50% '
              onClick={handleSignupRedirect}
            >
              Sign-UP
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login