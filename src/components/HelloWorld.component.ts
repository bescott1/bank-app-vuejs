import axios from 'axios';
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String,
  },
})
export default class HelloWorld extends Vue {
  msg!: string;

  users = [];

  created(): void {
    this.retrieveUsers();
  }

  async retrieveUsers(): Promise<void> {
    this.users = await axios.get('https://jsonplaceholder.typicode.com/users').then(response => response.data);
  }
}
