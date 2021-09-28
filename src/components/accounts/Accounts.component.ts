import axios from 'axios';
import { Options, Vue } from 'vue-class-component';
import { Account } from './account/Account';
import { CreateAccountFormVue } from './account/create-account-form';

@Options({
  components: {
    CreateAccountFormVue,
  },
})
export default class Accounts extends Vue {
  accountList: Account[] = [];
  showAddAccount = false;

  created(): void {
    this.retrieveAccounts();
  }

  async retrieveAccounts(): Promise<void> {
    this.accountList = await axios.get('http://localhost:8080/api/accounts').then(response => response.data);
  }

  addAccountToList(createdAccount: Account): void {
    this.accountList.push(createdAccount);
    this.showAddAccount = false;
  }
}
