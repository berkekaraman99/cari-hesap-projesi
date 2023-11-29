import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const baseURL: string = 'http://localhost:3000/api'
const timeOut: number = 60000

export const instance = axios.create({
  baseURL: baseURL,
  timeout: timeOut
})

// instance.interceptors.request.use(function (config) {
//     const authStore = useAuthStore()
//     config.headers.Authorization = `Bearer ${authStore.$state.accessToken}`
//     return config
//})

instance.interceptors.request.use(function (config) {
  const authStore = useAuthStore()
  config.headers.Authorization = `Bearer ${authStore.$state.accessToken}`
  return config
})
