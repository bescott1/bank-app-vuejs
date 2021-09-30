<template>
  <div>
    <h2 data-selector="account-transfer.title">Transfer</h2>
    <Form v-slot="{ meta }" @submit="transferAmount" :validation-schema="schema">
      <label for="form-amount" data-selector="account-transfer.form.amount.label">Amount</label>
      <Field type="number" id="form-amount" name="amount" data-selector="account-transfer.form.amount.value" />
      <ErrorMessage name="amount" data-selector="account-transfer.form.amount.error" />
      &nbsp;
      <label for="form-destination-id" data-selector="account-transfer.form.destination-id.label">Destination Id</label>
      <Field type="number" id="form-destination-id" name="destinationId" data-selector="account-transfer.form.destination-id.value" />
      <ErrorMessage name="destinationId" data-selector="account-transfer.form.destination-id.error" />
      &nbsp;
      <input type="submit" value="Submit" :disabled="!(meta.dirty && meta.valid)" data-selector="account-transfer.form.submit" />
    </Form>
  </div>
</template>

<script lang="ts" src="./AccountTransferForm.component.ts"></script>
