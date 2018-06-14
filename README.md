# vuejs-snackbar
A Vuejs snackbar component. Used flex layout. Repository: https://github.com/livelybone/Vue-Snackbar.git

You can rewrite all style by set prop wrapClass. the css file content maybe like:
```scss
  .[wrapClass] {
    ...
    
    .snack-bar {
      ...
    }
  }
```

## Installation

```bash
npm install vuejs-snackbar
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
  }
}
```

## Props

| Name          | Type           | Description  |
| ------------- | -------------- | ------------ |
| `baseSize`    | `String`       | Validator: /\d(rem&#124;px&#124;em)$/, default: '100px'. Used to set size of snackbar |
| `wrapClass`   | `String`       | Default: ''. Used to set the wrap class of snackbar. When it Used, the prop 'baseSize' will be ignored, and you must rewrite all the style of snackbar |
| `colors`      | `Object`       | Default: "{open: '#333',info: '#3DBD7D',error: '#FA7377',warn: '#FF6600'}". Used to set the background color of snackbar with different type |
| `holdTime`    | `Number`       | Default: 3000. Used to set hold time of snackbar |
| `multiple`    | `Boolean`      | Default: true. Used to set if it show multiple snackbar or not |

## method

| Name          | parameter  |
| ------------- | ------------ |
| `open`        | msg --> [String, Object]. when it is an Object, it must be an Object with property toString`Function]`, or with property message`String`. |
| `info`        | msg |
| `warn`        | msg |
| `error`       | msg |
