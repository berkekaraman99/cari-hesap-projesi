import { defineStore } from 'pinia'
import { instance } from '@/utils/network_manager'

export const useCustomerStore = defineStore('customerStore', {
  state: () => ({
    customer: {} as ICustomer,
    customers: [] as Array<ICustomer>,
    statusCode: 0 as number,
    searchedCustomers: [] as Array<ICustomer>
  }),
  getters: {
    _customer: (state: any) => state.customer as ICustomer,
    _statusCode: (state: any) => state.statusCode as number,
    _customers: (state: any) => state.customers as Array<ICustomer>,
    _searchedCustomers: (state: any) => state.searchedCustomers as Array<ICustomer>
  },
  actions: {
    async createCustomer(customer: ICustomer) {
      try {
        const response = await instance.post('/customer/create-customer', customer)
        this.statusCode = response.data.statusCode
      } catch (error: any) {
        console.error(error.response)
      }
    },
    async updateCustomer(customer: any) {
      try {
        const response = await instance.post('/customer/update-customer', customer)
        this.statusCode = response.data.statusCode
      } catch (error: any) {
        console.error(error.response)
      }
    },
    async fetchCustomers(userId: number) {
      try {
        const response = await instance.get(`/customer/fetch-customers?userId=${userId}`)
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
      }
    }
  }
})
