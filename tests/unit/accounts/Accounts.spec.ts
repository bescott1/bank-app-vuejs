import { shallowMount } from '@vue/test-utils';
import { AccountsVue } from '@/components/accounts';
import { Account } from '@/components/accounts/account/Account';
import mockedAccountsAxios from './AccountsAxios.fixture';

jest.mock('axios');

describe('Accounts', () => {
  const wrapper = shallowMount(AccountsVue, {
    global: {
      stubs: ['router-link'],
    },
  });
  const component = wrapper.vm;

  it('Should exist', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should get all accounts', async () => {
    expect(mockedAccountsAxios.get).toHaveBeenCalledWith('http://localhost:8080/api/accounts');
    expect(component.accountList).toEqual<Account[]>([
      {
        id: 1,
        firstName: 'Ben',
        lastName: 'Scott',
        balance: 0.0,
      },
    ]);
  });

  it('Should add a newly created account', async () => {
    component.addAccountToList({
      id: 2,
      firstName: 'Givenname',
      lastName: 'Surname',
      balance: 0.0,
    });

    expect(component.accountList).toEqual<Account[]>([
      {
        id: 1,
        firstName: 'Ben',
        lastName: 'Scott',
        balance: 0.0,
      },
      {
        id: 2,
        firstName: 'Givenname',
        lastName: 'Surname',
        balance: 0.0,
      },
    ]);
    expect(component.showAddAccount).toBe(false);
  });
});
