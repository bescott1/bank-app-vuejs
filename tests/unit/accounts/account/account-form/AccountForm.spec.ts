import { flushPromises, shallowMount, VueWrapper } from '@vue/test-utils';
import { AccountFormComponent, AccountFormVue } from '@/components/accounts/account/account-form';
import mockedAccountsAxios from '../../AccountsAxios.fixture';
import { Account } from '@/components/accounts/account/Account';

let wrapper: VueWrapper<AccountFormComponent>;
let component: AccountFormComponent;

const wrap = () => {
  wrapper = shallowMount(AccountFormVue);
  component = wrapper.vm;
};

jest.mock('axios');

describe('AccountForm', () => {
  it('Should exist', () => {
    wrap();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should post a new account', async () => {
    wrap();

    await component.addAccount({
      firstName: 'Ben',
      lastName: 'Scott',
      email: 'bscott@ipponusa.com',
    });
    await flushPromises();

    expect(mockedAccountsAxios.post).toHaveBeenCalledWith('https://localhost:8080/api/accounts', {
      firstName: 'Ben',
      lastName: 'Scott',
      email: 'bscott@ipponusa.com',
    });
    expect(component.createdAccount).toEqual<Account>({
      id: 1234,
      firstName: 'Ben',
      lastName: 'Scott',
      email: 'bscott@ipponusa.com',
      balance: 0.0,
    });
  });
});
