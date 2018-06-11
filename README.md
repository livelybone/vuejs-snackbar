# vuejs-snackbar
A Vuejs snackbar component. Used flex layout, 

## Installation

```bash
npm install vuejs-snackbar
```

## Register the component

```javascript
import Snackbar from 'vuejs-snackbar';

// Global register
Vue.component('snacbar', Snackbar);

// Local register
new Vue({
  component:{Snackbar}
})
```

## Props

| Name          | Type           | Description  |
| ------------- | -------------- | ------------ |
| `baseSize`    | `String`       | Validator: /\d(rem&#124;px&#124;em)$/, default: '100px'. Used to set size of snackbar |
| `wrapClass`   | `String`       | Default: ''. Used to set the wrap class of snackbar. When it Used, the prop 'baseSize' will be ignored, and you must rewrite all the style of snackbar |
| `colors`      | `Object`       | Default: "{open: '#333',info: '#3DBD7D',error: '#FA7377',warn: '#FF6600'}". Used to set the background color of snackbar with different type |
| `holdTime`    | `Number`       | Default: 3000. Used to set hold time of snackbar |
| `multiple`    | `Boolean`      | Default: true. Used to set if it show multiple snackbar or not |
