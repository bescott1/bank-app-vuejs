import { convertResponse } from '@/AxiosResponseHandler';
import axios, { AxiosError } from 'axios';
import { Options, Vue } from 'vue-class-component';
import { Account, toAccount } from '../Account';

@Options({
  props: {
    accountId: String,
  },
})
export default class AccountDetails extends Vue {
  accountId!: string;
  account: Account = {
    id: 0,
    firstName: '',
    lastName: '',
    balance: 0.0,
  };

  created(): void {
    this.retrieveAccount();
  }

  async retrieveAccount(): Promise<void> {
    this.account = await axios
      .get(`http://localhost:8080/api/accounts/${this.accountId}`)
      .then(convertResponse(toAccount))
      .catch((error: AxiosError) => {
        if (error.response && error.response.status === 404) {
          return Promise.resolve({
            id: 0,
            firstName: '',
            lastName: '',
            balance: 0.0,
          });
        }
        throw error;
      });
  }
}
