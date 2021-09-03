import { shallowMount, VueWrapper } from '@vue/test-utils';
import { AccountFormComponent, AccountFormVue } from '@/components/accounts/account/account-form';

let wrapper: VueWrapper<AccountFormComponent>;

const wrap = () => {
  wrapper = shallowMount(AccountFormVue);
};

jest.mock('axios');

describe('AccountForm', () => {
  it('Should exist', () => {
    wrap();
    expect(wrapper.exists()).toBe(true);
  });
});
