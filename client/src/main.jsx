import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import './index.css'

// Configure axios base URL for production
const API_URL = import.meta.env.VITE_API_URL || ''
if (API_URL) {
  axios.defaults.baseURL = API_URL
}

// Set up axios interceptor for auth tokens
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Set up axios interceptor for error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Show loading immediately
document.getElementById('root').innerHTML = '<div style="padding:50px;text-align:center;font-family:Arial"><h1>Loading Veda Verse...</h1></div>'

// Add error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  const rootEl = document.getElementById('root')
  if (rootEl) {
    rootEl.innerHTML = `
      <div style="padding: 20px; font-family: Arial;">
        <h1 style="color: red;">Error: ${event.error?.message || 'Unknown error'}</h1>
        <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${event.error?.stack || ''}</pre>
      </div>
    `
  }
})

// Load App with delay to catch errors
setTimeout(async () => {
  try {
    const { default: App } = await import('./App.jsx')
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  } catch (error) {
    console.error('React import/render error:', error)
    const rootEl = document.getElementById('root')
    if (rootEl) {
      rootEl.innerHTML = `
        <div style="padding: 20px; font-family: Arial;">
          <h1 style="color: red;">React Error: ${error.message}</h1>
          <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${error.stack}</pre>
          <p>Check browser console (F12) for more details</p>
        </div>
      `
    }
  }
}, 100)
