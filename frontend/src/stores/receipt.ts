import { defineStore } from 'pinia'
import { instance } from '@/utils/network_manager'

export const useReceiptStore = defineStore('receiptStore', {
  state: () => ({
    receipt: {} as any,
    receipts: [] as Array<any>,
    statusCode: 0 as number,
    receiptCount: 0 as any,
    totalDebtPrice: [] as any,
    totalReceivablePrice: [] as any,
    qrCode: null as any,
    receiptReport: [] as Array<any>
  }),
  getters: {
    _receipt: (state: any) => state.receipt as any,
    _receipts: (state: any) => state.receipts as Array<any>,
    _statusCode: (state: any) => state.statusCode as number,
    _receiptCount: (state: any) => state.receiptCount as any,
    _totalDebtPrice: (state: any) => state.totalDebtPrice as any,
    _totalReceivablePrice: (state: any) => state.totalReceivablePrice as any,
    _qrCode: (state: any) => state.qrCode as any,
    _receiptReport: (state: any) => state.receiptReport as any
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

    async fetchReceipts(id: string) {
      try {
        const response = await instance.get(`/receipts/get-receipts?userId=${id}`)
        console.log(response.data)
        this.receipts = response.data.data
      } catch (error: any) {
        console.error(error.response)
      }
    },

    async deleteReceipt(receiptId: string) {
      try {
        const response = await instance.post('/receipts/delete-receipt', { receiptId })
        console.log(response.data)
        this.statusCode = response.data.statusCode
      } catch (error: any) {
        console.error(error.response)
      }
    },

    async updateReceipt(receipt: any) {
      try {
        const response = await instance.post('/receipts/update-receipt', receipt)
        console.log(response.data)
        this.statusCode = response.data.statusCode
      } catch (error: any) {
        console.error(error.response)
      }
    },

    async getReceiptCount() {
      try {
        const response = await instance.get('/receipts/get-receipt-count')
        console.log(response.data)
        this.receiptCount = response.data.data[0]
      } catch (error: any) {
        console.error(error.response)
      }
    },

    async getDebtTotalPrice(year: number) {
      try {
        const response = await instance.get(`/receipts/get-debt-total-price?year=${year}`)
        console.log(response.data)
        this.totalDebtPrice = response.data.data
      } catch (error: any) {
        console.error(error.response)
      }
    },

    async getReceivableTotalPrice(year: number) {
      try {
        const response = await instance.get(`/receipts/get-receivable-total-price?year=${year}`)
        console.log(response.data)
        this.totalReceivablePrice = response.data.data
      } catch (error: any) {
        console.error(error.response)
      }
    },

    async getReceiptById(id: string) {
      try {
        const response = await instance.get(`/receipts/get-receipt-by-id?receiptId=${id}`)
        console.log(response.data)
        this.receipt = response.data.data
      } catch (error: any) {
        console.error(error.response)
      }
    },

    async getQrCode(id: string) {
      try {
        const response = await instance.get(`/receipts/get-qr-code?id=${id}`)
        console.log(response.data)
        this.qrCode = response.data
      } catch (error: any) {
        console.error(error.response)
      }
    },

    async getReceiptReport(sort: {
      sortBy: string
      sort: string
      startDate: string
      endDate: string
    }) {
      try {
        const response = await instance.get(
          `/receipts/get-receipt-report?sortBy=${sort.sortBy}&sort=${sort.sort}&startDate=${sort.startDate}&endDate=${sort.endDate}`
        )
        console.log(response.data)
        this.receiptReport = response.data.data
      } catch (error: any) {
        console.error(error.response)
      }
    }
  }
})
