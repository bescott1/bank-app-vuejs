import { flushPromises, shallowMount, VueWrapper } from '@vue/test-utils';
import { AccountsComponent, AccountsVue } from '@/components/accounts';
import { Account } from '@/components/accounts/Account';
import axios from 'axios';

let wrapper: VueWrapper<AccountsComponent>;
let component: AccountsComponent;

const wrap = () => {
  wrapper = shallowMount(AccountsVue);
  component = wrapper.vm;
};

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockImplementation(url => {
  switch (url) {
    case 'https://localhost:8080/accounts':
      return Promise.resolve({
        data: [
          {
            id: 1,
            firstName: 'Ben',
            lastName: 'Scott',
            email: 'bscott@ipponusa.com',
            balance: 0.0,
          },
        ],
      });
    default:
      return Promise.reject(new Error('not found'));
  }
});

describe('Accounts', () => {
  it('Should exist', () => {
    wrap();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should get all accounts', async () => {
    wrap();

    await flushPromises();

    expect(mockedAxios.get).toHaveBeenCalledWith('https://localhost:8080/accounts');
    expect(component.accountList).toEqual<Account[]>([
      {
        id: 1,
        firstName: 'Ben',
        lastName: 'Scott',
        email: 'bscott@ipponusa.com',
        balance: 0.0,
      },
    ]);
  });

  it.todo('Should get a single account');
});
