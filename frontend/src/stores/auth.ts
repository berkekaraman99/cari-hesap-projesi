import type { LoginModel } from '@/models/login_model'
import type { SignUpModel } from '@/models/signup_model'
import { defineStore } from 'pinia'
// import { instance } from '@/utils/network_manager'
import SecureLS from 'secure-ls'

const ls = new SecureLS({ isCompression: false })

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null as any | null
  }),
  getters: {
    _user: (state: any) => state.user as any | null
  },
  actions: {
    async login(user: LoginModel) {
      this.user = {
        userName: user.userName,
        password: user.password,
        date: user.date,
        database: user.database
      }
    },
    async signup(user: SignUpModel) {
      this.user = {
        userName: user.userName,
        companyName: user.companyName,
        database: user.database,
        date: user.date
      }
    }
  },
  persist: {
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value)
    }
  }
})
