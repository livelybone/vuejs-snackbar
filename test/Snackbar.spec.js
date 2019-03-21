import { shallowMount } from '@vue/test-utils'
import Snackbar from '../src/components/Snackbar.vue'

function $nextTick(vm, cb) {
  return new Promise((res) => {
    vm.$nextTick(() => {
      if (cb instanceof Function) cb()
      res()
    })
  })
}

describe('Snackbar.vue', () => {
  it('Rendered div.snack-bar-wrap element', () => {
    const wrapper = shallowMount(Snackbar)
    expect(wrapper.find('.snack-bar-wrap').exists()).to.equal(true)
  })

  it('There will no two snackbar exist at the same time when the prop multiple is false', async () => {
    const wrapper = shallowMount(Snackbar)
    wrapper.setProps({ multiple: false })
    const msg = 'this is an \'error\' msg'
    wrapper.vm.error(msg)
    wrapper.vm.error(msg)
    await $nextTick(wrapper.vm)
    expect(wrapper.findAll('.snack-bar').length).to.equal(1)
  })

  it('Rendered div.snack-bar element when called open function of Snackbar component', async () => {
    const wrapper = shallowMount(Snackbar)
    const msg = 'this is an \'open\' msg'
    wrapper.setProps({ multiple: false })
    wrapper.vm.open(msg)
    await $nextTick(wrapper.vm)
    expect(wrapper.find('.snack-bar').text()).to.equal(msg)
    wrapper.vm.open({ message: msg })
    await $nextTick(wrapper.vm)
    expect(wrapper.find('.snack-bar').text()).to.equal(msg)
    wrapper.vm.open({ a: 'sdf' })
    await $nextTick(wrapper.vm)
    expect(wrapper.find('.snack-bar').text()).to.includes('Parameter msg is invalid')
  })

  it('Rendered div.snack-bar element when called info function of Snackbar component', async () => {
    const wrapper = shallowMount(Snackbar)
    const msg = 'this is an \'info\' msg'
    wrapper.vm.info(msg)
    await $nextTick(wrapper.vm)
    expect(wrapper.find('.snack-bar').text()).to.equal(msg)
  })

  it('Rendered div.snack-bar element when called warn function of Snackbar component', async () => {
    const wrapper = shallowMount(Snackbar)
    const msg = 'this is an \'warn\' msg'
    wrapper.vm.warn(msg)
    await await $nextTick(wrapper.vm)
    expect(wrapper.find('.snack-bar').text()).to.equal(msg)
  })

  it('Rendered div.snack-bar element when called error function of Snackbar component', async () => {
    const wrapper = shallowMount(Snackbar)
    const msg = 'this is an \'error\' msg'
    wrapper.vm.error(msg)
    await $nextTick(wrapper.vm, () => {
      expect(wrapper.find('.snack-bar').text()).to.equal(msg)
    })
  })

  it('Div.snack-bar element will be destroyed when click it', async () => {
    const wrapper = shallowMount(Snackbar)
    const msg = 'this is an \'error\' msg'
    wrapper.vm.error(msg)
    await $nextTick(wrapper.vm)
    expect(wrapper.find('.snack-bar').text()).to.equal(msg)
    wrapper.find('.snack-bar').trigger('click')
    await $nextTick(wrapper.vm)
    expect(wrapper.find('.snack-bar').exists()).to.equal(false)
  })

  it('Div.snack-bar element will be destroyed after the hold time', async () => {
    const wrapper = shallowMount(Snackbar)
    const msg = 'this is an \'error\' msg'
    const holdTime = 1000
    wrapper.setProps({ holdTime })
    wrapper.vm.error(msg)
    await $nextTick(wrapper.vm)
    expect(wrapper.find('.snack-bar').text()).to.equal(msg)
    setTimeout(() => {
      expect(wrapper.find('.snack-bar').exists()).to.equal(false)
    }, holdTime)
  })

  it('There will no style when set prop wrapClass', async () => {
    const wrapper = shallowMount(Snackbar)
    const wrapClass = 'wrap-1'
    wrapper.setProps({ wrapClass })
    await $nextTick(wrapper.vm)
    expect(wrapper.find('.snack-bar-wrap').element.getAttribute('style')).to.equal('')
    expect(wrapper.find('.snack-bar-wrap').element.getAttribute('class')).to.includes(wrapClass)
  })

  it('Right style when set right prop baseSize', async () => {
    const wrapper = shallowMount(Snackbar)
    wrapper.setProps({ baseSize: '1rem' })
    await $nextTick(wrapper.vm)
    expect(wrapper.find('.snack-bar-wrap').element.style.top).to.equal('calc(0.05rem)')
  })

  it('baseSize is 100px by default when it\'s format is wrong', async () => {
    const wrapper = shallowMount(Snackbar)
    wrapper.setProps({ baseSize: '1a' })
    expect(wrapper.vm.$_baseSize).to.equal('100px')
  })
})
