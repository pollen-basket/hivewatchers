import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/common/Home.vue')
    },
    {
      path: '/choose-report',
      name: 'choose-report',
      component: () => import('@/components/common/ChooseReport.vue')
    },
    {
      path: '/blacklist-search',
      name: 'blacklist-search',
      component: () => import('@/components/blacklist/BlacklistSearch.vue')
    },
    {
      path: '/transaction-search',
      name: 'transaction-search',
      component: () => import('@/components/transactions/TransactionSearch.vue')
    },
    {
      path: '/report-abuse',
      name: 'report-abuse',
      component: () => import('@/components/abuses/ReportAbuse.vue')
    },
    {
      path: '/identity-verification',
      name: 'identity-verification',
      component: () => import('@/components/identity/IdentityVerification.vue')
    },
    {
      path: '/reports-search',
      name: 'reports-search',
      component: () => import('@/components/abuses/ReportSearch.vue')
    }
  ]
})

export default router
