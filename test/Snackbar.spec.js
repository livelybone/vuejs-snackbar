import { shallowMount } from '@vue/test-utils';
import Snackbar from '../src/component/Snackbar.vue';

describe('Snackbar.vue', () => {
  it('Rendered div.snack-bar-wrap element', () => {
    const wrapper = shallowMount(Snackbar);
    expect(wrapper.find('.snack-bar-wrap').exists()).to.equal(true);
  });

  it('There will no two snackbar exist at the same time when the prop multiple is false', () => {
    const wrapper = shallowMount(Snackbar);
    wrapper.setProps({ multiple: false });
    const msg = "this is an 'error' msg";
    wrapper.vm.error(msg);
    wrapper.vm.error(msg);
    expect(wrapper.findAll('.snack-bar').length).to.equal(1);
  });

  it('Rendered div.snack-bar element when called open function of Snackbar component', () => {
    const wrapper = shallowMount(Snackbar);
    const msg = "this is an 'open' msg";
    wrapper.setProps({ multiple: false });
    wrapper.vm.open(msg);
    expect(wrapper.find('.snack-bar').text()).to.equal(msg);
    wrapper.vm.open({ message: msg });
    expect(wrapper.find('.snack-bar').text()).to.equal(msg);
    wrapper.vm.open({ a: 'sdf' });
    expect(wrapper.find('.snack-bar').text()).to.includes('Parameter msg is invalid');
  });

  it('Rendered div.snack-bar element when called info function of Snackbar component', () => {
    const wrapper = shallowMount(Snackbar);
    const msg = "this is an 'info' msg";
    wrapper.setProps({ multiple: false });
    wrapper.vm.info(msg);
    expect(wrapper.find('.snack-bar').text()).to.equal(msg);
    wrapper.vm.info({ message: msg });
    expect(wrapper.find('.snack-bar').text()).to.equal(msg);
    wrapper.vm.info({ a: 'sdf' });
    expect(wrapper.find('.snack-bar').text()).to.includes('Parameter msg is invalid');
  });

  it('Rendered div.snack-bar element when called warn function of Snackbar component', () => {
    const wrapper = shallowMount(Snackbar);
    const msg = "this is an 'warn' msg";
    wrapper.setProps({ multiple: false });
    wrapper.vm.warn(msg);
    expect(wrapper.find('.snack-bar').text()).to.equal(msg);
    wrapper.vm.warn({ message: msg });
    expect(wrapper.find('.snack-bar').text()).to.equal(msg);
    wrapper.vm.warn({ a: 'sdf' });
    expect(wrapper.find('.snack-bar').text()).to.includes('Parameter msg is invalid');
  });

  it('Rendered div.snack-bar element when called error function of Snackbar component', () => {
    const wrapper = shallowMount(Snackbar);
    const msg = "this is an 'error' msg";
    wrapper.setProps({ multiple: false });
    wrapper.vm.error(msg);
    expect(wrapper.find('.snack-bar').text()).to.equal(msg);
    wrapper.vm.error({ message: msg });
    expect(wrapper.find('.snack-bar').text()).to.equal(msg);
    wrapper.vm.error({ a: 'sdf' });
    expect(wrapper.find('.snack-bar').text()).to.includes('Parameter msg is invalid');
  });

  it('Div.snack-bar element will be destroyed when click it', () => {
    const wrapper = shallowMount(Snackbar);
    const msg = "this is an 'error' msg";
    wrapper.vm.error(msg);
    expect(wrapper.find('.snack-bar').text()).to.equal(msg);
    wrapper.find('.snack-bar').trigger('click');
    expect(wrapper.find('.snack-bar').exists()).to.equal(false);
  });

  it('Div.snack-bar element will be destroyed after the hold time', (done) => {
    const wrapper = shallowMount(Snackbar);
    const msg = "this is an 'error' msg";
    const holdTime = 1000;
    wrapper.setProps({ holdTime });
    wrapper.vm.error(msg);
    expect(wrapper.find('.snack-bar').text()).to.equal(msg);
    setTimeout(() => {
      expect(wrapper.find('.snack-bar').exists()).to.equal(false);
      done();
    }, holdTime);
  });

  it('There will no style when set prop wrapClass', () => {
    const wrapper = shallowMount(Snackbar);
    const wrapClass = 'wrap-1';
    wrapper.setProps({ wrapClass });
    expect(wrapper.find('.snack-bar-wrap').element.getAttribute('style')).to.equal('');
    expect(wrapper.find('.snack-bar-wrap').element.getAttribute('class')).to.includes(wrapClass);
  });

  it('Right style when set right prop baseSize', () => {
    const wrapper = shallowMount(Snackbar);
    wrapper.setProps({ baseSize: '1rem' });
    expect(wrapper.find('.snack-bar-wrap').element.style.top).to.equal('calc(0.05rem)');
  });

  it('Incorrect style when set Incorrect prop baseSize', () => {
    const wrapper = shallowMount(Snackbar);
    wrapper.setProps({ baseSize: '110a' });
    expect(wrapper.find('.snack-bar-wrap').element.getAttribute('style')).to.equal('');
  });
});
