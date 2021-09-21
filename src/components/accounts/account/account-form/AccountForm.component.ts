import axios from 'axios';
import { Options, Vue } from 'vue-class-component';
import { Account } from '../Account';
import { AccountFormEntry } from './AccountFormEntry';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';

@Options({
  components: {
    Field,
    Form,
    ErrorMessage,
  },
})
export default class AccountForm extends Vue {
  schema = Yup.object().shape({
    firstName: Yup.string()
      .required()
      .label('First Name'),
    lastName: Yup.string()
      .required()
      .label('Last Name'),
  });

  async addAccount(values: AccountFormEntry): Promise<void> {
    if (!values.firstName || !values.lastName) {
      return;
    }
    const createdAccount: Account = await axios.post('http://localhost:8080/api/accounts', values).then(response => response.data);
    this.$emit('createdAccount', createdAccount);
  }
}
