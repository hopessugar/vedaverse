import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchUser()
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/users/me')
      setUser(response.data)
    } catch (error) {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = (token, userData) => {
    localStorage.setItem('token', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading,
    setUser,
    fetchUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

