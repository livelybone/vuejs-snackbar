module.exports = require('./src/index.vue').default;

if (typeof window !== 'undefined') {
  window['VueSlideForMore'] = module.exports;
}