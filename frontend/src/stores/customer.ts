import { defineStore } from 'pinia'
import { instance } from '@/utils/network_manager'

export const useCustomerStore = defineStore('customerStore', {
  state: () => ({
    customer: {} as ICustomer | null,
    customers: [] as Array<ICustomer>,
    customerCount: 0 as number,
    customerReceipts: [] as Array<any>,
    statusCode: 0 as number,
    searchedCustomers: [] as Array<ICustomer>,
    foundCustomers: [] as Array<any>,
    receiptCount: 0 as any,
    totalPrice: {} as any
  }),

  getters: {
    _customer: (state: any) => state.customer as ICustomer,
    _statusCode: (state: any) => state.statusCode as number,
    _customers: (state: any) => state.customers as Array<ICustomer>,
    _customerCount: (state: any) => state.customerCount as number,
    _customerReceipts: (state: any) => state.customerReceipts as Array<any>,
    _searchedCustomers: (state: any) => state.searchedCustomers as Array<ICustomer>,
    _foundCustomers: (state: any) => state.foundCustomers as Array<any>,
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

    async fetchCustomers(userId: string, offset: number = 0) {
      try {
        const response = await instance.get(
          `/customer/fetch-customers?userId=${userId}&offset=${offset}`
        )
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

    async getCustomerCount(userId: string) {
      try {
        const response = await instance.get(`/customer/get-customer-count?userId=${userId}`)
        this.customerCount = response.data.data[0]
      } catch (error: any) {
        console.error(error.response)
      }
    },

    async searchCustomers(searchValue: string, userId: string) {
      try {
        const response = await instance.get(`/customer/search?text=${searchValue}&userId=${userId}`)
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

    async findCustomer(searchValue: string, userId: string) {
      try {
        const response = await instance.get(
          `/customer/find-customer?text=${searchValue}&userId=${userId}`
        )
        this.foundCustomers = response.data.data
        console.log(response.data)
      } catch (error: any) {
        console.log(error.response)
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
