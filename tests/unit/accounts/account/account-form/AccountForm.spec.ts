import { flushPromises, shallowMount } from '@vue/test-utils';
import { AccountFormVue } from '@/components/accounts/account/account-form';
import mockedAccountsAxios from '../../AccountsAxios.fixture';
import { Account } from '@/components/accounts/account/Account';

jest.mock('axios');

describe('AccountForm', () => {
  const wrapper = shallowMount(AccountFormVue);
  const component = wrapper.vm;

  it('Should exist with vee-validate setup', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should not post an empty new account', async () => {
    await component.addAccount({
      firstName: '',
      lastName: '',
    });
    await flushPromises();

    expect(mockedAccountsAxios.post).toHaveBeenCalledTimes(0);
  });

  it('Should post a new account and emit', async () => {
    await component.addAccount({
      firstName: 'Ben',
      lastName: 'Scott',
    });
    await flushPromises();

    expect(mockedAccountsAxios.post).toHaveBeenCalledWith('http://localhost:8080/api/accounts', {
      firstName: 'Ben',
      lastName: 'Scott',
    });
    expect(wrapper.emitted().createdAccount[0]).toEqual<[Account]>([
      {
        id: 1234,
        firstName: 'Ben',
        lastName: 'Scott',
        balance: 0.0,
      },
    ]);
  });
});
