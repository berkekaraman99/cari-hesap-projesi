import axios from 'axios'

const baseURL: string = 'https://localhost:3000'
const timeOut: number = 60000

export const instance = axios.create({
  baseURL: baseURL,
  timeout: timeOut,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

// instance.interceptors.request.use(function (config) {
//     const authStore = useAuthStore()
//     config.headers.Authorization = `Bearer ${authStore.$state.accessToken}`
//     return config
//})
