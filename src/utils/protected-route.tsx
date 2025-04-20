import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { isAuthenticated } from "./auth-utils"

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Check if admin is logged in - admins can access student routes
  const isAdmin = localStorage.getItem("adminAuth") === "true"

  if (!isAuthenticated() && !isAdmin) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute