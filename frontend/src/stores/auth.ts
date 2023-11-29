import type { LoginModel } from '@/models/login_model'
import type { SignUpModel } from '@/models/signup_model'
import { defineStore } from 'pinia'
import { instance } from '@/utils/network_manager'
import SecureLS from 'secure-ls'

const ls = new SecureLS({ isCompression: false })

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null as any | null,
    statusCode: 0 as number,
    accessToken: null as null | string
  }),
  getters: {
    _user: (state: any) => state.user as any | null,
    _statusCode: (state: any) => state.statusCode as any | null,
    _accessToken: (state: any) => state.accessToken as any | null
  },
  actions: {
    async login(user: LoginModel) {
      try {
        const response = await instance.post('/auth/login', user)
        console.log(response.data)
        this.statusCode = response.data.statusCode
        if (response.data.statusCode === 200) {
          this.accessToken = response.data.data.accessToken
          instance.defaults.headers['Authorization'] = `Bearer ${this.accessToken}`

          await instance.get('/auth/getUserAfterLogin').then((res) => {
            this.user = res.data.data
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async signup(user: SignUpModel) {
      try {
        const response = await instance.post('/auth/signup', user)
        console.log(response)
        this.statusCode = response.data.statusCode
        if (response.data.statusCode === 201) {
          this.accessToken = response.data.data.accessToken
          instance.defaults.headers['Authorization'] = `Bearer ${this.accessToken}`

          await instance.get('/auth/getUserAfterLogin').then((res) => {
            this.user = res.data.data
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async logout() {
      ls.remove('authStore')
      useAuthStore().$reset()
      instance.defaults.headers['Authorization'] = null
      location.reload()
    }
  },
  persist: {
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value)
    }
  }
})
