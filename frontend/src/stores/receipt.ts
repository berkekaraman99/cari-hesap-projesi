import { defineStore } from 'pinia'
import { instance } from '@/utils/network_manager'

export const useReceiptStore = defineStore('receiptStore', {
  state: () => ({
    receipt: {} as any,
    receipts: [] as Array<any>,
    statusCode: 0 as number,
    receiptCount: 0 as any,
    totalPrice: {} as any,
    qrCode: null as any,
    receiptReport: [] as Array<any>,
    receiptDonemReport: [] as Array<any>,
    receiptCountReport: [] as Array<any>,
    customerReport: null as any
  }),
  getters: {
    _receipt: (state: any) => state.receipt as any,
    _receipts: (state: any) => state.receipts as Array<any>,
    _statusCode: (state: any) => state.statusCode as number,
    _receiptCount: (state: any) => state.receiptCount as any,
    _totalPrice: (state: any) => state.totalPrice as any,
    _qrCode: (state: any) => state.qrCode as any,
    _receiptReport: (state: any) => state.receiptReport as any,
    _receiptDonemReport: (state: any) => state.receiptDonemReport as any,
    _receiptCountReport: (state: any) => state.receiptCountReport as any,
    _customerReport: (state: any) => state.customerReport as any
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

    async getReceiptTotalPrices(year: number) {
      try {
        const response = await instance.get(`/receipts/get-receipt-total-prices?year=${year}`)
        console.log(response.data)
        this.totalPrice = response.data.data
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
        this.receiptReport = response.data.data.report
        this.receiptDonemReport = response.data.data.donemRapor
        this.receiptCountReport = response.data.data.receiptCount
      } catch (error: any) {
        console.error(error.response)
      }
    },
    async getCustomerCompare(sort: {
      startDate: string
      endDate: string
      customer_one: string
      customer_two: string
    }) {
      try {
        const response = await instance.get(
          `/receipts/get-customer-compare-report?startDate=${sort.startDate}&endDate=${sort.endDate}&customerOne=${sort.customer_one}&customerTwo=${sort.customer_two}`
        )
        console.log(response.data)
        this.customerReport = response.data.data
      } catch (error: any) {
        console.error(error.response)
      }
    }
  }
})
