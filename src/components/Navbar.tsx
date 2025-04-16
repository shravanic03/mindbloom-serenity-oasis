"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X, User, LogOut } from "lucide-react"
import Button from "./Button"
import { cn } from "@/lib/utils"
import { isAuthenticated, logout } from "../utils/auth-utils"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Check authentication status whenever location changes
    const checkAuth = () => {
      const authStatus = isAuthenticated()
      setIsLoggedIn(authStatus)
    }

    checkAuth()
  }, [location])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    navigate("/login")
    setIsOpen(false)
  }

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "About Us", path: "/about" },
    { name: "Appointments", path: "/appointment" },
    { name: "Resources", path: "/books" },
    { name: "Chatbot", path: "/chatbot" },
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text">MindBloom</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-mindbloom-purple",
                isActive(link.path) ? "text-mindbloom-purple" : "text-gray-600",
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {isLoggedIn ? (
            <>
              <Link
                to="/appointment-history"
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-mindbloom-purple transition-colors"
              >
                <User size={16} className="text-mindbloom-purple" />
                <span>Profile</span>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center space-x-1">
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" to="/login">
                Login
              </Button>
              <Button variant="gradient" size="sm" to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden px-4 py-4 space-y-4 bg-white border-t border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "block text-sm font-medium py-2 transition-colors hover:text-mindbloom-purple",
                isActive(link.path) ? "text-mindbloom-purple" : "text-gray-600",
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col space-y-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/appointment-history"
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 py-2 hover:text-mindbloom-purple transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={16} className="text-mindbloom-purple" />
                  <span>Profile</span>
                </Link>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-1"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" to="/login" className="w-full" onClick={() => setIsOpen(false)}>
                  Login
                </Button>
                <Button variant="gradient" to="/signup" className="w-full" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar