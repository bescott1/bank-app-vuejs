<template>
  <div>
    <h1 data-selector="landing">Landing</h1>
    <table aria-label="Accounts Table">
      <thead>
        <tr>
          <th data-selector="accounts-table.header.action" scope="col">Action</th>
          <th data-selector="accounts-table.header.id" scope="col">ID</th>
          <th data-selector="accounts-table.header.first-name" scope="col">First Name</th>
          <th data-selector="accounts-table.header.last-name" scope="col">Last Name</th>
          <th data-selector="accounts-table.header.balance" scope="col">Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(account, index) in accountList" :key="index">
          <td>
            <router-link :to="`/accounts/${account.id}`" :data-selector="`accounts-table.row.${index}.action.view`"
              >View Account</router-link
            >
          </td>
          <td :data-selector="`accounts-table.row.${index}.id`">{{ account.id }}</td>
          <td :data-selector="`accounts-table.row.${index}.first-name`">{{ account.firstName }}</td>
          <td :data-selector="`accounts-table.row.${index}.last-name`">{{ account.lastName }}</td>
          <td :data-selector="`accounts-table.row.${index}.balance`">${{ account.balance.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
    <hr />
    <button v-if="!showAddAccount" @click="showAddAccount = true" data-selector="add-account">Add Account</button>
    <CreateAccountFormVue v-if="showAddAccount" @createdAccount="addAccountToList" data-selector="add-account.form" />
  </div>
</template>

<script lang="ts" src="./Accounts.component.ts"></script>
