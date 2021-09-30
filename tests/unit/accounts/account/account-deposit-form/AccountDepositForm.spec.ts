import { AccountDepositFormVue } from '@/components/accounts/account/account-deposit-form';
import { flushPromises, shallowMount } from '@vue/test-utils';
import mockedAccountsAxios from '../../AccountsAxios.fixture';

jest.mock('axios');

describe('AccountDepositForm', () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const wrapper = shallowMount(AccountDepositFormVue, {
    props: {
      accountId: '1234',
    },
    global: {
      mocks: {
        $router: mockRouter,
      },
    },
  });
  const component = wrapper.vm;

  it('Should exist with vee-validate setup', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should not post an empty deposit amount', async () => {
    await component.depositAmount({
      amount: 0,
    });
    await flushPromises();

    expect(mockedAccountsAxios.post).toHaveBeenCalledTimes(0);
  });

  it('Should post a deposit amount and push to details', async () => {
    await component.depositAmount({
      amount: 1.11,
    });
    await flushPromises();

    expect(mockedAccountsAxios.post).toHaveBeenCalledWith('http://localhost:8080/api/accounts/1234/deposit', {
      amount: 1.11,
    });
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/accounts/1234');
  });
});
