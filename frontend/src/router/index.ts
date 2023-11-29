import { useAuthStore } from '@/stores/auth'
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
    path: '/debt-receipt',
    name: 'debt-receipt',
    component: () => import('@/views/DebtReceiptView/DebtReceipt.vue')
  },
  {
    path: '/receivable-receipt',
    name: 'receivable-receipt',
    component: () => import('@/views/ReceivableReceiptView/ReceivableReceipt.vue')
  }
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

    if (user.value === null && !authNotRequiredRoutes.includes(to.name?.toString() ?? '')) {
      next({ name: 'auth' })
    } else if (user.value !== null && authNotRequiredRoutes.includes(to.name?.toString() ?? '')) {
      next({ name: 'home' })
    } else next()
  }
)

export default router
