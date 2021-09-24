import { flushPromises, shallowMount, VueWrapper } from '@vue/test-utils';
import { AccountDetailsComponent, AccountDetailsVue } from '@/components/accounts/account/account-details';
import { Account } from '@/components/accounts/account/Account';
import mockedAccountsAxios from '../../AccountsAxios.fixture';

let wrapper: VueWrapper<AccountDetailsComponent>;
let component: AccountDetailsComponent;

const wrap = (accountId = '1') => {
  wrapper = shallowMount(AccountDetailsVue, {
    props: {
      accountId,
    },
  });
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

  it('Should not get anything for nonexistent id', async () => {
    wrap('404');

    await flushPromises();

    expect(mockedAccountsAxios.get).toHaveBeenCalledWith('http://localhost:8080/api/accounts/404');
    expect(component.account).toEqual<Account>({
      id: 0,
      firstName: '',
      lastName: '',
      balance: 0.0,
    });
  });

  it('Should throw when a server error is received', async () => {
    try {
      wrap('500');
    } catch (error) {
      expect(mockedAccountsAxios.get).toHaveBeenCalledWith('http://localhost:8080/api/accounts/500');
      expect(error).toBe({
        response: {
          status: 500,
        },
        message: 'Error: Request failed with status code 500',
      });
    }
  });
});
