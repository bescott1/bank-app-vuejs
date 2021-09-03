<template>
  <div>
    <h1 data-selector="account.title">Account Information</h1>
    <h2>
      <span data-selector="account.first-name">{{ account.firstName }}</span
      >&nbsp;<span data-selector="account.last-name">{{ account.lastName }}</span>
    </h2>
    <h3 data-selector="account.id">Account ID: {{ account.id }}</h3>
    <h3 data-selector="account.email">Email: {{ account.email }}</h3>
    <h3 data-selector="account.balance">Balance: {{ account.balance }}</h3>
  </div>
</template>

<script lang="ts" src="./AccountDetails.component.ts"></script>
