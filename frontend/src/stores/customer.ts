import { defineStore } from 'pinia'
import { instance } from '@/utils/network_manager'

export const useCustomerStore = defineStore('customerStore', {
  state: () => ({
    statusCode: 0 as number,
    customers: [] as Array<any>,
    searchedCustomers: [] as Array<any>
  }),
  getters: {
    _statusCode: (state: any) => state.statusCode as number,
    _customers: (state: any) => state.customers as Array<any>,
    _searchedCustomers: (state: any) => state.searchedCustomers as Array<any>
  },
  actions: {
    async createCustomer(customer: any) {
      try {
        const response = await instance.post('/customer/create-customer', customer)
        this.statusCode = response.data.statusCode
      } catch (error: any) {
        console.error(error.response)
      }
    },
    async fetchCustomers() {
      try {
        const response = await instance.get('/customer/fetch-customers')
        this.statusCode = response.data.statusCode
        console.log(response.data)
        this.customers = response.data.data
      } catch (error: any) {
        console.error(error.response)
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
      }
    }
  }
})
