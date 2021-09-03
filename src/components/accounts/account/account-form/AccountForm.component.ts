import axios from 'axios';
import { Vue } from 'vue-class-component';
import { Account } from '../Account';
import { AccountFormEntry } from './AccountFormEntry';

export default class AccountForm extends Vue {
  createdAccount: Account = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    balance: 0.0,
  };
  newAccount: AccountFormEntry = {
    firstName: '',
    lastName: '',
    email: '',
  };

  async addAccount(newAccountWithValues: AccountFormEntry): Promise<void> {
    this.createdAccount = await axios.post('https://localhost:8080/api/accounts', newAccountWithValues).then(response => response.data);
  }
}
