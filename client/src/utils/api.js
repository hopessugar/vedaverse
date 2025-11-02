import axios from 'axios'

// Get API base URL from environment or use relative path
const getApiUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL || ''
  return apiUrl
}

// Helper function to make API calls with correct base URL
export const apiCall = async (method, endpoint, data = null, config = {}) => {
  const apiUrl = getApiUrl()
  const url = `${apiUrl}${endpoint}`
  
  // Get auth token
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...config.headers
  }

  try {
    let response
    switch (method.toLowerCase()) {
      case 'get':
        response = await axios.get(url, { ...config, headers })
        break
      case 'post':
        response = await axios.post(url, data, { ...config, headers })
        break
      case 'put':
        response = await axios.put(url, data, { ...config, headers })
        break
      case 'delete':
        response = await axios.delete(url, { ...config, headers })
        break
      default:
        throw new Error(`Unsupported method: ${method}`)
    }
    return response
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    throw error
  }
}

// Convenience methods
export const api = {
  get: (endpoint, config) => apiCall('get', endpoint, null, config),
  post: (endpoint, data, config) => apiCall('post', endpoint, data, config),
  put: (endpoint, data, config) => apiCall('put', endpoint, data, config),
  delete: (endpoint, config) => apiCall('delete', endpoint, null, config)
}

export default api

