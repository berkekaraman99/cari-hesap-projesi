import { defineStore } from 'pinia'

export const useToastStore = defineStore('toastStore', {
  state: () => ({
    showToast: false,
    statusCode: 200 as null | number,
    toastHeader: '' as string,
    toastContent: '' as string
  }),
  getters: {
    _showToast: (state) => state.showToast as boolean,
    _statusCode: (state) => state.statusCode as number | null,
    _toastHeader: (state) => state.toastHeader as string,
    _toastContent: (state) => state.toastContent as string
  },
  actions: {
    toggleToast() {
      this.showToast = !this.showToast
    },
    setStatusCode(code: number) {
      this.statusCode = code
    },
    setToastHeader(text: string) {
      this.toastHeader = text
    },
    setToastContent(text: string) {
      this.toastContent = text
    }
  }
})
