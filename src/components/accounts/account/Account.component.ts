import axios from 'axios';
import { Vue } from 'vue-class-component';
import { Account } from './Account';

export default class Accounts extends Vue {
  account: Account = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    balance: 0.0,
  };

  created(): void {
    this.retrieveAccount();
  }

  async retrieveAccount(): Promise<void> {
    this.account = await axios.get('https://localhost:8080/api/accounts/1').then(response => response.data);
  }
}
