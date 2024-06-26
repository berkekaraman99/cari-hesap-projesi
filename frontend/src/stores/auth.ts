import type { LoginModel } from '@/models/login_model'
import type { SignUpModel } from '@/models/signup_model'
import { defineStore } from 'pinia'
import { instance } from '@/utils/network_manager'
import type { AuthUser } from '@/models/auth_user_model'

import CryptoJS from 'crypto-js'

const encryptionKey = import.meta.env.ENCRYPTION_KEY ?? 'mysecretkey 123'

const removeFromStorage = async (key: string) => {
  const encryptedValue = localStorage.getItem(key)
  if (encryptedValue) {
    localStorage.removeItem(key)
  }
}

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null as null | AuthUser,
    statusCode: 0 as number,
    accessToken: '' as string,
    expiration: '' as string
  }),
  getters: {
    _user: (state: any) => state.user as AuthUser,
    _statusCode: (state: any) => state.statusCode as number,
    _accessToken: (state: any) => state.accessToken as string,
    _expiration: (state: any) => state.expiration as string
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
      } finally {
        setTimeout(() => {
          this.statusCode = 0
        }, 3000)
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
      } catch (error: any) {
        console.log(error)
      } finally {
        setTimeout(() => {
          this.statusCode = 0
        }, 3000)
      }
    },
    async logout() {
      await removeFromStorage('authStore')
      useAuthStore().$reset()
      instance.defaults.headers['Authorization'] = null
      location.reload()
    },
    async updateUser(updateModel: any) {
      try {
        const response = await instance.post('/auth/update-user', updateModel)
        console.log(response)
        this.statusCode = response.data.statusCode
        if (response.data.statusCode === 200) {
          await instance.get('/auth/getUserAfterLogin').then((res) => {
            this.user = res.data.data
          })
        }
      } catch (error: any) {
        console.log(error)
      } finally {
        setTimeout(() => {
          this.statusCode = 0
        }, 3000)
      }
    }
  },
  persist: {
    storage: {
      getItem: (key) => {
        const encryptedValue = localStorage.getItem(key)
        if (encryptedValue) {
          const bytes = CryptoJS.AES.decrypt(encryptedValue, encryptionKey)
          return bytes.toString(CryptoJS.enc.Utf8)
        }
        return null
      },
      setItem: (key, value) => {
        const encryptedValue = CryptoJS.AES.encrypt(value, encryptionKey).toString()
        localStorage.setItem(key, encryptedValue)
      }
    }
  }
})
