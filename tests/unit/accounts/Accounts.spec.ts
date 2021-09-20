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

    expect(mockedAccountsAxios.get).toHaveBeenCalledWith('https://localhost:8080/api/accounts');
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

  it('Should add a newly created account', async () => {
    wrap();

    await flushPromises();
    component.addAccountToList({
      id: 2,
      firstName: 'Givenname',
      lastName: 'Surname',
      email: 'test@example.com',
      balance: 0.0,
    });

    expect(component.accountList).toEqual<Account[]>([
      {
        id: 1,
        firstName: 'Ben',
        lastName: 'Scott',
        email: 'bscott@ipponusa.com',
        balance: 0.0,
      },
      {
        id: 2,
        firstName: 'Givenname',
        lastName: 'Surname',
        email: 'test@example.com',
        balance: 0.0,
      },
    ]);
    expect(component.showAddAccount).toBe(false);
  });
});
