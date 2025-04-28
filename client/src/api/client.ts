import axios from 'axios'

// Use the same host as the current window location when accessing via network
const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3000`

console.log('API URL:', API_URL) // Add this to debug the API URL

export const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  console.log('Making request to:', `${config.baseURL || ''}${config.url || ''}`) // Fixed type error
  return config
})

export const api = {
  // Auth endpoints
  login: (email: string, password: string) => 
    client.post('/api/auth/login', { email, password }),
  register: (userData: any) => 
    client.post('/api/auth/register', userData),
  
  // Donor endpoints
  getDonorProfile: () => 
    client.get('/api/donors/profile'),
  updateDonorProfile: (data: any) =>
    client.put('/api/donors/profile', data),
  
  // Search endpoints
  searchDonors: (params: { bloodGroup: string; location?: string }) =>
    client.get('/api/search/donors', { params })
} 