import axios from 'axios';
import { Account } from './account/Account';
import { defineComponent } from 'vue';
import { CreateAccountFormVue } from './account/create-account-form';

const Accounts = defineComponent({
  components: {
    CreateAccountFormVue,
  },
  data() {
    return {
      accountList: [] as Account[],
      showAddAccount: false,
    };
  },
  async created() {
    this.accountList = await axios.get('http://localhost:8080/api/accounts').then(response => response.data);
  },
  methods: {
    addAccountToList(createdAccount: Account): void {
      this.accountList.push(createdAccount);
      this.showAddAccount = false;
    },
  },
});

export default Accounts;
