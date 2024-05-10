import { defineStore } from 'pinia'
import { instance } from '@/utils/network_manager'

export const useCustomerStore = defineStore('customerStore', {
  state: () => ({
    customer: {} as ICustomer | null,
    customers: [] as Array<ICustomer>,
    customerReceipts: [] as Array<any>,
    statusCode: 0 as number,
    searchedCustomers: [] as Array<ICustomer>,
    receiptCount: 0 as any,
    totalPrice: {} as any
  }),

  getters: {
    _customer: (state: any) => state.customer as ICustomer,
    _statusCode: (state: any) => state.statusCode as number,
    _customers: (state: any) => state.customers as Array<ICustomer>,
    _customerReceipts: (state: any) => state.customerReceipts as Array<any>,
    _searchedCustomers: (state: any) => state.searchedCustomers as Array<ICustomer>,
    _receiptCount: (state: any) => state.receiptCount as any,
    _totalPrice: (state: any) => state.totalPrice as any
  },

  actions: {
    async createCustomer(customer: ICustomerCreate) {
      try {
        const response = await instance.post('/customer/create-customer', customer)
        this.statusCode = response.data.statusCode
      } catch (error: any) {
        console.error(error.response)
      } finally {
        setTimeout(() => {
          this.statusCode = 0
        }, 3000)
      }
    },

    async updateCustomer(customer: any) {
      try {
        const response = await instance.post('/customer/update-customer', customer)
        this.statusCode = response.data.statusCode
      } catch (error: any) {
        console.error(error.response)
      } finally {
        setTimeout(() => {
          this.statusCode = 0
        }, 3000)
      }
    },

    async deleteCustomer(customerId: string) {
      try {
        const response = await instance.post('/customer/delete-customer', {
          customerId
        })
        console.log(response.data)
      } catch (error: any) {
        console.error(error.response)
      }
    },

    async fetchCustomers(userId: string) {
      try {
        const response = await instance.get(`/customer/fetch-customers?userId=${userId}`)
        this.statusCode = response.data.statusCode
        console.log(response.data)
        this.customers = response.data.data
      } catch (error: any) {
        console.error(error.response)
      } finally {
        setTimeout(() => {
          this.statusCode = 0
        }, 3000)
      }
    },

    async searchCustomers(searchValue: string) {
      try {
        const response = await instance.get(`/customer/search?text=${searchValue}`)
        this.statusCode = response.data.statusCode
        this.searchedCustomers = response.data.data
        console.log(response.data)
      } catch (error: any) {
        console.error(error.response)
      } finally {
        setTimeout(() => {
          this.statusCode = 0
        }, 3000)
      }
    },

    async getCustomerById(id: string) {
      try {
        const response = await instance.get(`/customer/get-customer?customerId=${id}`)
        this.statusCode = response.data.statusCode
        this.customer = response.data.data
        console.log(response.data)
        console.log(this.customer)
      } catch (error: any) {
        console.error(error.response)
      } finally {
        setTimeout(() => {
          this.statusCode = 0
        }, 3000)
      }
    },

    async getCustomerReceiptCount(id: string) {
      try {
        const response = await instance.get(`/customer/get-customer-receipt-count?customerId=${id}`)
        this.statusCode = response.data.statusCode
        this.receiptCount = response.data.data[0]
        console.log(response.data)
        console.log(this.receiptCount)
      } catch (error: any) {
        console.error(error.response)
      }
    },

    async fetchReceipts(id: string) {
      try {
        const response = await instance.get(`/customer/fetch-receipts?customerId=${id}`)
        this.customerReceipts = response.data.data
        console.log(this.customerReceipts)
      } catch (error: any) {
        console.error(error.response)
      }
    },

    async getTotalPrices(year: number, customerId: string) {
      try {
        const response = await instance.get(
          `/customer/get-customer-total-prices?year=${year}&customer_id=${customerId}`
        )
        console.log(response.data)
        this.totalPrice = response.data.data
      } catch (error: any) {
        console.error(error.response)
      }
    }
  }
})
