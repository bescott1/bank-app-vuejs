import axios from 'axios';
import { Account } from '../Account';
import { AccountFormEntry } from './AccountFormEntry';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import { defineComponent } from 'vue';

const AccountForm = defineComponent({
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    return {
      schema: Yup.object().shape({
        firstName: Yup.string()
          .required()
          .label('First Name'),
        lastName: Yup.string()
          .required()
          .label('Last Name'),
      }),
    };
  },
  methods: {
    async addAccount(values: AccountFormEntry): Promise<void> {
      if (!values.firstName || !values.lastName) {
        return;
      }
      const createdAccount: Account = await axios.post('http://localhost:8080/api/accounts', values).then(response => response.data);
      this.$emit('createdAccount', createdAccount);
    },
  },
});

export default AccountForm;
