<template>
  <div>
    <h2 data-selector="account-withdrawal.title">Withdrawal</h2>
    <Form v-slot="{ meta }" @submit="withdrawAmount" :validation-schema="schema">
      <label for="form-amount" data-selector="account-withdrawal.form.amount.label">Amount</label>
      <Field type="number" id="form-amount" name="amount" data-selector="account-withdrawal.form.amount.value" />
      <ErrorMessage name="amount" data-selector="account-withdrawal.form.amount.error" />
      &nbsp;
      <input type="submit" value="Submit" :disabled="!(meta.dirty && meta.valid)" data-selector="account-withdrawal.form.submit" />
    </Form>
  </div>
</template>

<script lang="ts" src="./AccountWithdrawalForm.component.ts"></script>
