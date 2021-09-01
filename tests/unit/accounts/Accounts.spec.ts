import { flushPromises, shallowMount, VueWrapper } from '@vue/test-utils';
import { AccountsComponent, AccountsVue } from '@/components/accounts';
import { Account } from '@/components/accounts/account/Account';
import mockedAccountsAxios from './AccountsAxios.fixture';

let wrapper: VueWrapper<AccountsComponent>;
let component: AccountsComponent;

const wrap = () => {
  wrapper = shallowMount(AccountsVue, {
    global: {
      stubs: ['router-link'],
    },
  });
  component = wrapper.vm;
};

jest.mock('axios');

describe('Accounts', () => {
  it('Should exist', () => {
    wrap();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should get all accounts', async () => {
    wrap();

    await flushPromises();

    expect(mockedAccountsAxios.get).toHaveBeenCalledWith('https://localhost:8080/accounts');
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
});
