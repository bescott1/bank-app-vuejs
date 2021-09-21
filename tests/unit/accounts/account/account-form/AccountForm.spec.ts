import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { AccountFormComponent, AccountFormVue } from '@/components/accounts/account/account-form';
import mockedAccountsAxios from '../../AccountsAxios.fixture';
import { Account } from '@/components/accounts/account/Account';

let wrapper: VueWrapper<AccountFormComponent>;
let component: AccountFormComponent;

const wrap = () => {
  wrapper = mount(AccountFormVue);
  component = wrapper.vm;
};

jest.mock('axios');

describe('AccountForm', () => {
  it('Should exist with vee-validate setup', async () => {
    wrap();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should not post an empty new account', async () => {
    wrap();

    await component.addAccount({
      firstName: '',
      lastName: '',
      email: '',
    });
    await flushPromises();

    expect(mockedAccountsAxios.post).toHaveBeenCalledTimes(0);
  });

  it('Should post a new account and emit', async () => {
    wrap();

    await component.addAccount({
      firstName: 'Ben',
      lastName: 'Scott',
      email: 'bscott@ipponusa.com',
    });
    await flushPromises();

    expect(mockedAccountsAxios.post).toHaveBeenCalledWith('http://localhost:8080/api/accounts', {
      firstName: 'Ben',
      lastName: 'Scott',
      email: 'bscott@ipponusa.com',
    });
    expect(wrapper.emitted().createdAccount[0]).toEqual<[Account]>([
      {
        id: 1234,
        firstName: 'Ben',
        lastName: 'Scott',
        email: 'bscott@ipponusa.com',
        balance: 0.0,
      },
    ]);
  });
});
