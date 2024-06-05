import { defineStore } from 'pinia'
import { instance } from '@/utils/network_manager'

export const useReceiptStore = defineStore('receiptStore', {
  state: () => ({
    receipt: {} as any,
    receipts: [] as Array<any>,
    receiptMinMaxYear: {} as { first_year: number; last_year: number },
    statusCode: 0 as number,
    receiptCount: 0 as any,
    receiptTotalCount: 0 as number,
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
    _receiptMinMaxYear: (state: any) =>
      state.receiptMinMaxYear as { first_year: number; last_year: number },
    _statusCode: (state: any) => state.statusCode as number,
    _receiptCount: (state: any) => state.receiptCount as any,
    _receiptTotalCount: (state: any) => state.receiptTotalCount as number,
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

    async fetchReceipts(id: string, offset: number = 0) {
      try {
        const response = await instance.get(`/receipts/get-receipts?userId=${id}&offset=${offset}`)
        console.log(response.data)
        this.receipts = response.data.data
      } catch (error: any) {
        console.error(error.response)
      }
    },

    async getMinMaxYear(userId: string) {
      try {
        const response = await instance.get(`/receipts/get-minmax-year?userId=${userId}`)
        console.log(response.data)
        this.receiptMinMaxYear = response.data.data[0]
      } catch (error: any) {
        console.error(error.response)
      }
    },

    async getReceiptTotalCount(userId: string) {
      try {
        const response = await instance.get(`/receipts/get-total-receipt-count?userId=${userId}`)
        this.receiptTotalCount = response.data.data[0]
      } catch (error: any) {
        console.log(error.response)
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

    async getReceiptCount(userId: string) {
      try {
        const response = await instance.get(`/receipts/get-receipt-count?userId=${userId}`)
        console.log(response.data)
        this.receiptCount = response.data.data[0]
      } catch (error: any) {
        console.error(error.response)
      }
    },

    async getReceiptTotalPrices(year: number, userId: string) {
      try {
        const response = await instance.get(
          `/receipts/get-receipt-total-prices?year=${year}&userId=${userId}`
        )
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
        this.receipt = response.data.data[0]
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
      userId: string
    }) {
      try {
        const response = await instance.get(
          `/receipts/get-receipt-report?sortBy=${sort.sortBy}&sort=${sort.sort}&startDate=${sort.startDate}&endDate=${sort.endDate}&userId=${sort.userId}`
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
      userId: string
    }) {
      try {
        const response = await instance.get(
          `/receipts/get-customer-compare-report?startDate=${sort.startDate}&endDate=${sort.endDate}&customerOne=${sort.customer_one}&customerTwo=${sort.customer_two}&userId=${sort.userId}`
        )
        console.log(response.data)
        this.customerReport = response.data.data
      } catch (error: any) {
        console.error(error.response)
      }
    }
  }
})
