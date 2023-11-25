import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'auth',
    component: () => import('../views/AuthView/AuthView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView/HomeView.vue')
  },
  {
    path: '/debt-receipt',
    name: 'debt-receipt',
    component: () => import('../views/DebtReceiptView/DebtReceipt.vue')
  },
  {
    path: '/receivable-receipt',
    name: 'receivable-receipt',
    component: () => import('../views/ReceivableReceiptView/ReceivableReceipt.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
