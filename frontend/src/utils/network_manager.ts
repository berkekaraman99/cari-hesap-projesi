import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const timeOut: number = 60000

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: import.meta.env.VITE_NETWORK_TIMEOUT ?? timeOut
})

instance.interceptors.request.use(function (config) {
  const authStore = useAuthStore()
  config.headers.Authorization = `Bearer ${authStore.$state.accessToken}`
  return config
})
