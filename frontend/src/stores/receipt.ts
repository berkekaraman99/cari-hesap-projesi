import { defineStore } from 'pinia'
import { instance } from '@/utils/network_manager'

export const useReceiptStore = defineStore('receiptStore', {
  state: () => ({ statusCode: 0 as number }),
  getters: {
    _statusCode: (state: any) => state.statusCode as number
  },
  actions: {
    async createReceipt(receiptModel: any) {
      try {
        const response = await instance.post('/receipts/create-receipt', receiptModel)
        console.log(response.data)
        this.statusCode = response.data.statusCode
      } catch (error: any) {
        console.error(error.response)
      }
    }
  }
})
