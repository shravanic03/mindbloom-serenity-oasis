// Helper function to get the auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken")
}

// Helper function to check if the user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAuthToken()
}

// Helper function to make authenticated API requests
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken()

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  // Handle token expiration
  if (response.status === 401) {
    // Clear token and redirect to login
    localStorage.removeItem("authToken")
    window.location.href = "/login"
    throw new Error("Your session has expired. Please log in again.")
  }

  return response
}

// Helper function to log out the user
export const logout = () => {
  localStorage.removeItem("authToken")
}

// Helper function to decode JWT token (basic implementation)
export const decodeToken = (token: string) => {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

// Get user info from token
export const getUserInfo = () => {
  const token = getAuthToken()
  if (!token) return null

  try {
    return decodeToken(token)
  } catch (error) {
    console.error("Error getting user info:", error)
    return null
  }
}