import { AccountWithdrawalFormVue } from '@/components/accounts/account/account-withdrawal-form';
import { flushPromises, shallowMount } from '@vue/test-utils';
import mockedAccountsAxios from '../../AccountsAxios.fixture';
import router from '@/router';

jest.mock('axios');

describe('AccountWithdrawalForm', () => {
  const wrapper = shallowMount(AccountWithdrawalFormVue, {
    props: {
      accountId: '1234',
    },
    global: {
      plugins: [router],
    },
  });
  const component = wrapper.vm;
  const spyRouterPush = jest.spyOn(router, 'push').mockImplementation();

  it('Should exist with vee-validate setup', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should not post an empty withdrawal amount', async () => {
    await component.withdrawAmount({
      amount: 0,
    });
    await flushPromises();

    expect(mockedAccountsAxios.post).toHaveBeenCalledTimes(0);
  });

  it('Should post a withdrawal amount and push to details', async () => {
    await component.withdrawAmount({
      amount: 3.21,
    });
    await flushPromises();

    expect(mockedAccountsAxios.post).toHaveBeenCalledWith('http://localhost:8080/api/accounts/1234/withdrawal', {
      amount: 3.21,
    });
    expect(spyRouterPush).toHaveBeenCalledTimes(1);
    expect(spyRouterPush).toHaveBeenCalledWith('/accounts/1234');

    spyRouterPush.mockRestore();
  });
});
