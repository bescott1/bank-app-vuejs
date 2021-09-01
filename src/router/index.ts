import { AccountsVue } from '@/components/accounts';
import { AccountVue } from '@/components/accounts/account';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Accounts',
    component: AccountsVue,
  },
  {
    path: '/accounts/:accountId',
    name: 'Account',
    component: AccountVue,
    props: route => ({
      accountId: route.params.accountId,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
