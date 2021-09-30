<template>
  <div>
    <h2 data-selector="account-deposit.title">Deposit</h2>
    <Form v-slot="{ meta }" @submit="depositAmount" :validation-schema="schema">
      <label for="form-amount" data-selector="account-deposit.form.amount.label">Amount</label>
      <Field type="number" id="form-amount" name="amount" data-selector="account-deposit.form.amount.value" />
      <ErrorMessage name="amount" data-selector="account-deposit.form.amount.error" />
      &nbsp;
      <input type="submit" value="Submit" :disabled="!(meta.dirty && meta.valid)" data-selector="account-deposit.form.submit" />
    </Form>
  </div>
</template>

<script lang="ts" src="./AccountDepositForm.component.ts"></script>
