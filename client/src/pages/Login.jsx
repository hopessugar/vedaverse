import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { FiZap } from 'react-icons/fi'
import './Login.css'

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!isLogin) {
        // Register
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }

        const response = await axios.post('/api/auth/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password
        })

        login(response.data.token, response.data.user)
        navigate('/')
      } else {
        // Login
        const response = await axios.post('/api/auth/login', {
          username: formData.username,
          password: formData.password
        })

        login(response.data.token, response.data.user)
        navigate('/')
      }
    } catch (err) {
      console.error('Auth error:', err)
      if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        setError('Cannot connect to server. Make sure the backend is running on port 5000.')
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.message) {
        setError(err.message)
      } else {
        setError('An error occurred. Please check console for details.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <FiZap className="login-logo" />
          <h1>Veda Verse</h1>
          <p>Integrating Ayurveda with Agentic AI</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary login-btn"
            disabled={loading}
          >
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <span
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
                setFormData({
                  username: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                })
              }}
              className="toggle-link"
            >
              {isLogin ? 'Register' : 'Login'}
            </span>
          </p>
        </div>
      </div>

      <div className="login-background">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
      </div>
    </div>
  )
}

export default Login

