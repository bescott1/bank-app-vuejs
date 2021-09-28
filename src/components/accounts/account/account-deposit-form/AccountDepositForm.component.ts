import axios from 'axios';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import { defineComponent } from 'vue';
import { AccountDepositFormEntry } from './AccountDepositFormEntry';

const AccountDepositForm = defineComponent({
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  props: {
    accountId: String,
  },
  data() {
    return {
      schema: Yup.object().shape({
        amount: Yup.number()
          .min(0.01)
          .typeError('Amount must be a number')
          .required()
          .label('Amount')
          .test('validDollarAmount', 'Enter a valid amount such as 1.23', number => (number ? Number.isInteger(number * 100) : false)),
      }),
    };
  },
  methods: {
    async addAmount(values: AccountDepositFormEntry): Promise<void> {
      if (0.01 > values.amount) {
        return;
      }
      await axios.post(`http://localhost:8080/api/accounts/${this.accountId}/deposit`, values);
      this.$router.push(`/accounts/${this.accountId}`);
    },
  },
});

export default AccountDepositForm;
