import React from 'react'
import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({ children }) => {
  let token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to={"/login"} />
  }

  try {
    let payload = JSON.parse(atob(token.split('.')[1]))
    let isExpired = payload.exp * 1000 < Date.now()

    if (isExpired) {
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("role")
      return <Navigate to="/login" />
    }
  } catch (error) {
    localStorage.clear()
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute