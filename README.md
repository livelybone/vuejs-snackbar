# vuejs-snackbar 
[![NPM Version](http://img.shields.io/npm/v/vuejs-snackbar.svg?style=flat-square)](https://www.npmjs.com/package/vuejs-snackbar)
[![Download Month](http://img.shields.io/npm/dm/vuejs-snackbar.svg?style=flat-square)](https://www.npmjs.com/package/vuejs-snackbar)
![gzip with dependencies: 1.3kb](https://img.shields.io/badge/gzip--with--dependencies-1.3kb-brightgreen.svg "gzip with dependencies: 1.3kb")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A Vuejs snackbar component, supported SSR, compatible with IE

Repository: https://github.com/livelybone/vuejs-snackbar.git

You can rewrite all style by set prop `wrapClass`. the css file content maybe like:
```scss
  .[wrapClass] {
    ...
    
    .snack-bar {
      ...
    }
  }
```

## Demo
https://livelybone.github.io/vue/vuejs-snackbar/

## Installation
```bash
npm install vuejs-snackbar --save-dev
```

## Register the component
```javascript
import Snackbar from 'vuejs-snackbar';

// Global register
Vue.component('snackbar', Snackbar);

// Local register
new Vue({
  components:{Snackbar}
})

```

## Apply
```html
// template
<template>
    <snackbar ref="snackbar" baseSize="100px" :wrapClass="''" :colors="null" :holdTime="3000" :multiple="true"/>
</template>
```
```javascript
// component
export default{
  name:'AnyComponent',
  mounted(){
    this.$refs.snackbar.info('msg');
    this.$refs.snackbar.error('msg');
    this.$refs.snackbar.warn('msg');
    this.$refs.snackbar.open('msg');
  },
  components:{Snackbar}  // Local register
}
```

## Props
| Name          | Type                                      | DefaultValue                                                          | Description  |
| ------------- | ----------------------------------------- | --------------------------------------------------------------------  | ------------ |
| `baseSize`    | `String`                                  | `100px`                                                               | Used to set size of snackbar. Tested by reg: /\d(rem&#124;px&#124;em)$/ |
| `wrapClass`   | `String`                                  | none                                                                  | Used to set the wrap class of snackbar. When it Used, the prop 'baseSize' will be ignored, and you must rewrite all the style of snackbar |
| `colors`      | `Object`                                  | `{open: '#333',info: '#3DBD7D',error: '#FA7377',warn: '#FF6600'}`     | Used to set the background color of snackbar with different type |
| `holdTime`    | `Number`                                  | `3000`                                                                | Used to set hold time of snackbar |
| `multiple`    | `Boolean`                                 | `true`                                                                | Used to set if it show multiple snackbar or not |
| `position`    | `String`                                  | `top-center`                                                          | Used to set the position of the wrap |

## method
| Name          | Parameter  |
| ------------- | ------------ |
| `open`        | msg --> [String, Object]. when it is an Object, it must be an Object with property toString`Function]`, or with property message`String`. |
| `info`        | msg |
| `warn`        | msg |
| `error`       | msg |
