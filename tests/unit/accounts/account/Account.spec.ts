import { flushPromises, shallowMount, VueWrapper } from '@vue/test-utils';
import { AccountComponent, AccountVue } from '@/components/accounts/account';
import { Account } from '@/components/accounts/account/Account';
import mockedAccountsAxios from '../AccountsAxios.fixture';

let wrapper: VueWrapper<AccountComponent>;
let component: AccountComponent;

const wrap = () => {
  wrapper = shallowMount(AccountVue);
  component = wrapper.vm;
};

jest.mock('axios');

describe('Account', () => {
  it('Should exist', () => {
    wrap();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should get a single account', async () => {
    wrap();

    await flushPromises();

    expect(mockedAccountsAxios.get).toHaveBeenCalledWith('https://localhost:8080/accounts/1');
    expect(component.account).toEqual<Account>({
      id: 1,
      firstName: 'Ben',
      lastName: 'Scott',
      email: 'bscott@ipponusa.com',
      balance: 0.0,
    });
  });
});
