<template>
  <Form v-slot="{ meta }" @submit="addAccount" :validation-schema="schema">
    <label for="form-first-name" data-selector="add-account.form.first-name.label">First Name</label>
    <Field type="text" id="form-first-name" name="firstName" data-selector="add-account.form.first-name.value" />
    <ErrorMessage name="firstName" data-selector="add-account.form.first-name.error" />
    &nbsp;
    <label for="form-last-name" data-selector="add-account.form.last-name.label">Last Name</label>
    <Field type="text" id="form-last-name" name="lastName" data-selector="add-account.form.last-name.value" />
    <ErrorMessage name="lastName" data-selector="add-account.form.last-name.error" />
    &nbsp;
    <input type="submit" value="Submit" :disabled="!(meta.dirty && meta.valid)" data-selector="add-account.form.submit" />
  </Form>
</template>

<script lang="ts" src="./CreateAccountForm.component.ts"></script>
<style>
input + span {
  display: block;
}
</style>
