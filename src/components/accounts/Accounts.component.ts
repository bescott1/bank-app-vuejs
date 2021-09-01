import axios from 'axios';
import { Vue } from 'vue-class-component';
import { Account } from './account/Account';

export default class Accounts extends Vue {
  accountList: Account[] = [];

  created(): void {
    this.retrieveAccounts();
  }

  async retrieveAccounts(): Promise<void> {
    this.accountList = await axios.get('https://localhost:8080/accounts').then(response => response.data);
  }
}
