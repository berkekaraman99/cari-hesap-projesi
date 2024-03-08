import { useAuthStore } from '@/stores/auth'
import { checkTokenValidity } from '@/utils/token_helper'
import { storeToRefs } from 'pinia'
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'auth',
    component: () => import('@/views/AuthView/AuthView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView/HomeView.vue')
  },
  {
    path: '/profile',
    name: 'user-profile',
    component: () => import('@/views/UserProfileView/UserProfile.vue')
  },
  {
    path: '/create-receipt',
    name: 'create-receipt',
    component: () => import('@/views/CreateReceiptView/CreateReceipt.vue')
  },
  {
    path: '/create-customer',
    name: 'create-customer',
    component: () => import('@/views/CreateCustomerView/CreateCustomer.vue')
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => import('@/views/CustomersView/CustomersView.vue')
  },
  {
    path: '/customer/:id',
    name: 'customer-details',
    component: () => import('@/views/CustomerDetailsView/CustomerDetails.vue'),
    props: true
  },
  {
    path: '/customer/:id/receipts',
    name: 'customer-receipts',
    component: () => import('@/views/CustomerReceiptsView/CustomerReceipts.vue'),
    props: true
  },
  {
    path: '/customer/edit/:id',
    name: 'customer-edit',
    component: () => import('@/views/CustomerEditView/CustomerEdit.vue'),
    props: true
  },
  {
    path: '/receipts',
    name: 'receipts',
    component: () => import('@/views/ReceiptsView/ReceiptsView.vue')
  },
  {
    path: '/receipt/:id',
    name: 'receipt-details',
    component: () => import('@/views/ReceiptDetailsView/ReceiptDetails.vue'),
    props: true
  },
  {
    path: '/receipt/:id/edit',
    name: 'receipt-edit',
    component: () => import('@/views/ReceiptEditView/ReceiptEdit.vue'),
    props: true
  }
  // {
  //   path: '/debt-receipt',
  //   name: 'debt-receipt',
  //   component: () => import('@/views/DebtReceiptView/DebtReceipt.vue')
  // },
  // {
  //   path: '/receivable-receipt',
  //   name: 'receivable-receipt',
  //   component: () => import('@/views/ReceivableReceiptView/ReceivableReceipt.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore()
    const { _user: user } = storeToRefs(authStore)
    const authNotRequiredRoutes: string[] = ['auth']

    checkTokenValidity()

    if (user.value === null && !authNotRequiredRoutes.includes(to.name?.toString() ?? '')) {
      next({ name: 'auth' })
    } else if (user.value !== null && authNotRequiredRoutes.includes(to.name?.toString() ?? '')) {
      next({ name: 'home' })
    } else next()
  }
)

export default router
