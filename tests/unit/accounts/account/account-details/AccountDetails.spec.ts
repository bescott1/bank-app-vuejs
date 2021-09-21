import { flushPromises, shallowMount, VueWrapper } from '@vue/test-utils';
import { AccountDetailsComponent, AccountDetailsVue } from '@/components/accounts/account/account-details';
import { Account } from '@/components/accounts/account/Account';
import mockedAccountsAxios from '../../AccountsAxios.fixture';

let wrapper: VueWrapper<AccountDetailsComponent>;
let component: AccountDetailsComponent;

const wrap = () => {
  wrapper = shallowMount(AccountDetailsVue);
  component = wrapper.vm;
};

jest.mock('axios');

describe('AccountDetails', () => {
  it('Should exist', () => {
    wrap();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should get a single account', async () => {
    wrap();

    await flushPromises();

    expect(mockedAccountsAxios.get).toHaveBeenCalledWith('http://localhost:8080/api/accounts/1');
    expect(component.account).toEqual<Account>({
      id: 1,
      firstName: 'Ben',
      lastName: 'Scott',
      balance: 0.0,
    });
  });
});
