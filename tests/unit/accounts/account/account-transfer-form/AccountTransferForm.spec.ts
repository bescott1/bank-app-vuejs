import { AccountTransferFormVue } from '@/components/accounts/account/account-transfer-form';
import { flushPromises, shallowMount } from '@vue/test-utils';
import mockedAccountsAxios from '../../AccountsAxios.fixture';
import router from '@/router';

jest.mock('axios');

describe('AccountTransferForm', () => {
  const wrapper = shallowMount(AccountTransferFormVue, {
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

  it('Should not post an empty transfer amount', async () => {
    await component.transferAmount({
      amount: 0,
      destinationId: 2,
    });
    await flushPromises();

    expect(mockedAccountsAxios.post).toHaveBeenCalledTimes(0);
  });

  it('Should not post an invalid transfer destination', async () => {
    await component.transferAmount({
      amount: 0,
      destinationId: -1,
    });
    await flushPromises();

    expect(mockedAccountsAxios.post).toHaveBeenCalledTimes(0);
  });

  it('Should post a transfer amount and push to details', async () => {
    await component.transferAmount({
      amount: 3.21,
      destinationId: 2,
    });
    await flushPromises();

    expect(mockedAccountsAxios.post).toHaveBeenCalledWith('http://localhost:8080/api/accounts/1234/transfer', {
      amount: 3.21,
      destinationId: 2,
    });
    expect(spyRouterPush).toHaveBeenCalledTimes(1);
    expect(spyRouterPush).toHaveBeenCalledWith('/accounts/1234');

    spyRouterPush.mockRestore();
  });
});
