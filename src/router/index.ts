import { AccountsVue } from '@/components/accounts';
import { AccountDepositFormVue } from '@/components/accounts/account/account-deposit-form';
import { AccountDetailsVue } from '@/components/accounts/account/account-details';
import { AccountTransferFormVue } from '@/components/accounts/account/account-transfer-form';
import { AccountWithdrawalFormVue } from '@/components/accounts/account/account-withdrawal-form';
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
    component: AccountDetailsVue,
    props: route => ({
      accountId: route.params.accountId,
    }),
  },
  {
    path: '/accounts/:accountId/deposit',
    name: 'AccountDeposit',
    component: AccountDepositFormVue,
    props: route => ({
      accountId: route.params.accountId,
    }),
  },
  {
    path: '/accounts/:accountId/withdrawal',
    name: 'AccountWithdrawal',
    component: AccountWithdrawalFormVue,
    props: route => ({
      accountId: route.params.accountId,
    }),
  },
  {
    path: '/accounts/:accountId/transfer',
    name: 'AccountTransfer',
    component: AccountTransferFormVue,
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
