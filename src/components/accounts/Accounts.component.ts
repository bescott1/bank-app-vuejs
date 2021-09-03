import axios from 'axios';
import { Options, Vue } from 'vue-class-component';
import { Account } from './account/Account';
import { AccountFormVue } from './account/account-form';

@Options({
  components: {
    AccountFormVue,
  },
})
export default class Accounts extends Vue {
  accountList: Account[] = [];
  showAddAccount = false;

  created(): void {
    this.retrieveAccounts();
  }

  async retrieveAccounts(): Promise<void> {
    this.accountList = await axios.get('https://localhost:8080/api/accounts').then(response => response.data);
  }
}
