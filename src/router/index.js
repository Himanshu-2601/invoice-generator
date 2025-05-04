import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue')
    },
    {
        path: '/createinvoice',
        component: () => import('../views/CreateInvoice.vue')
    },
    {
        path: '/editinvoice/:id',
        component: () => import('../views/EditInvoice.vue'),
        props:true
    },
    {
        path: '/invoicehistory',
        component: () => import('../views/InvoiceHistory.vue') 
    }
  ]

  
})

export default router