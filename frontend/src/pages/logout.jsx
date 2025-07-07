import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate()
    useEffect(() => {
        handleLogout()
    }, [])

    const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
      })
      const data = await res.json()

      if (res.ok) {
        console.log(data.message)
        navigate("/")
      } else {
        alert(data.message || "Logout failed")
      }
    } catch (error) {
      console.error("Something went wrong during logout", error)
      alert("Logout - something went wrong")
    }
  }
}

export default Logout