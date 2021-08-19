import { shallowMount } from '@vue/test-utils';
import { AccountsVue } from '@/components/accounts';

describe('Accounts', () => {
  it('Should exist', () => {
    const wrapper = shallowMount(AccountsVue);
    expect(wrapper.exists()).toBe(true);
  });

  it.todo('Should get all accounts');

  it.todo('Should get a single account');
});
