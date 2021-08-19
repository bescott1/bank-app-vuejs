import { shallowMount } from '@vue/test-utils';
import App from '../../src/App.vue';

describe('App', () => {
  it('Should exists', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.exists()).toBeTruthy();
  });
});
