import type { LoginModel } from '@/models/login_model'
import type { SignUpModel } from '@/models/signup_model'
import { defineStore } from 'pinia'
import { instance } from '@/utils/network_manager'
import SecureLS from 'secure-ls'

export const useReceiptStore = defineStore('receiptStore', {
  state: () => ({}),
  getters: {},
  actions: {}
})
