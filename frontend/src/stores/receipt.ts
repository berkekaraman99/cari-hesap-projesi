import { defineStore } from 'pinia'
import { instance } from '@/utils/network_manager'

export const useReceiptStore = defineStore('receiptStore', {
  state: () => ({ receipts: [] as Array<any>, statusCode: 0 as number }),
  getters: {
    _receipts: (state: any) => state.receipts as Array<any>,
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
    },

    async fetchReceipts(id: number) {
      try {
        const response = await instance.get(`/receipts/get-receipts?userId=${id}`)
        console.log(response.data)
        this.receipts = response.data.data
      } catch (error: any) {
        console.error(error.response)
      }
    }
  }
})
