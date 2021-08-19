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
    const { data } = await this.axios.get('https://jsonplaceholder.typicode.com/users');
    this.users = data;
  }
}
