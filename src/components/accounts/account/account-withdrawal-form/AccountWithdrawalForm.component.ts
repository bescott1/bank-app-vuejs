import axios from 'axios';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { AccountWithdrawalFormEntry } from './AccountWithdrawalFormEntry';

const AccountWithdrawalForm = defineComponent({
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  props: {
    accountId: String,
  },
  setup(props) {
    const router = useRouter();
    const schema = Yup.object().shape({
      amount: Yup.number()
        .min(0.01)
        .typeError('Amount must be a number')
        .required()
        .label('Amount')
        .test('validDollarAmount', 'Enter a valid amount such as 1.23', number => (number ? Number.isInteger(number * 100) : false)),
    });
    const withdrawAmount = async (values: AccountWithdrawalFormEntry): Promise<void> => {
      if (0.01 > values.amount) {
        return;
      }
      await axios.post(`http://localhost:8080/api/accounts/${props.accountId}/withdrawal`, values);
      router.push(`/accounts/${props.accountId}`);
    };

    return {
      schema,
      withdrawAmount,
    };
  },
});

export default AccountWithdrawalForm;
