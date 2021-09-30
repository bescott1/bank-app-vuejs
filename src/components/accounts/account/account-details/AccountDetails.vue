<template>
  <div>
    <h1 data-selector="account.title">Account Information</h1>
    <h2>
      <span data-selector="account.first-name">{{ account.firstName }}</span
      >&nbsp;<span data-selector="account.last-name">{{ account.lastName }}</span>
    </h2>
    <h3 data-selector="account.id">Account ID: {{ account.id }}</h3>
    <h3 data-selector="account.balance">Balance: ${{ account.balance.toFixed(2) }}</h3>
    <div>
      <h4>Action</h4>
      <router-link :to="`/accounts/${account.id}/deposit`" :data-selector="`account.deposit`">Deposit</router-link>
      &nbsp;
      <router-link :to="`/accounts/${account.id}/withdrawal`" :data-selector="`account.withdrawal`">Withdrawal</router-link>
      &nbsp;
      <router-link :to="`/accounts/${account.id}/transfer`" :data-selector="`account.transfer`">Transfer</router-link>
    </div>
  </div>
</template>

<script lang="ts" src="./AccountDetails.component.ts"></script>
