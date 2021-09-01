import { shallowMount } from '@vue/test-utils';
import App from '../../src/App.vue';

describe('App', () => {
  it('Should exists', () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: ['router-view', 'router-link'],
      },
    });
    expect(wrapper.exists()).toBeTruthy();
  });
});
