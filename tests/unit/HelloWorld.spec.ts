import { flushPromises, shallowMount } from '@vue/test-utils';
import axios from 'axios';
import HelloWorld from '@/components/HelloWorld.vue';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: ['some', 'placeholder', 'names'] })),
}));

describe('HelloWorld.vue', () => {
  it('Should render props.msg when passed and get placeholder names', async () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });

    await flushPromises();

    expect(wrapper.text()).toMatch(msg);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.users).toEqual<string[]>(['some', 'placeholder', 'names']);
  });
});
