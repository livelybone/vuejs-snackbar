<template>
    <div class="snack-bar-wrap" :class="wrapClass" :style="wrapClass?'':style.wrap">
        <div v-for="(msg,i) in msgs"
             class="snack-bar"
             :style="wrapClass?'':style.bar(msg.color)"
             @click="pop"
             v-html="getMsg(msg.msg)">
        </div>
    </div>
</template>

<script>
  export default {
    name: 'SnackBar',
    mounted() {
    },
    props: {
      colors: {
        default() {
          return {
            open: '#333',
            info: '#3DBD7D',
            error: '#FA7377',
            warn: '#FF6600'
          }
        },
        type: Object
      },
      holdTime: {
        default: 3000,
        type: Number
      },
      multiple: {
        default: true,
        type: Boolean
      },
      wrapClass: String,
      baseSize: {
        validator(val) {
          return val === undefined || typeof val === 'string' && /\d(rem|px|em)$/.test(val)
        }
      },
    },
    data() {
      return {
        msgs: [],
        color: ''
      }
    },
    computed: {
      style() {
        return this.getStyle(this.baseSize)
      }
    },
    methods: {
      info(msg) {
        this.validator(msg);
        this.color = this.colors.info;
        this.open({color: this.color, msg: msg})
      },
      error(msg) {
        this.validator(msg);
        this.color = this.colors.error;
        this.open({color: this.color, msg: msg});
        return false;
      },
      warn(msg) {
        this.validator(msg);
        this.color = this.colors.warn;
        this.open({color: this.color, msg: msg});
      },
      open(msg) {
        this.validator(msg);
        const msgObj = typeof msg === 'string' ? {color: this.colors.open, msg} : msg;
        if (this.multiple) this.msgs.push(msgObj);
        else this.msgs = [msgObj];
        setTimeout(() => this.pop(), parseInt(this.holdTime));
      },
      pop() {
        this.msgs.splice(0, 1)
      },
      validator(msg) {
        if (typeof msg !== 'string' && typeof msg.message !== 'string' && !(msg.toString instanceof Function)) {
          throw new Error('Parameter msg is invalid. Expected a String, an Object with property toString[type:Function], or an Object with property message[type:String].')
        }
      },
      getMsg(msg) {
        if (typeof msg === 'string') return msg;
        if (msg.message) return msg.name + ': ' + msg.message
      },
      getStyle(baseSize = '100px') {
        return {
          wrap: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            position: 'fixed',
            left: '50%',
            top: this.c('.05', baseSize),
            zIndex: 1000,
            width: 0,
          },
          bar: bg => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'auto',
            minWidth: baseSize,
            maxWidth: `calc(100vw - .4 * ${baseSize})`,
            minHeight: this.c(.5, baseSize),
            padding: `${this.c(.1, baseSize)} ${this.c(.2, baseSize)}`,
            margin: `0 0 ${this.c(.05, baseSize)}`,
            borderRadius: this.c(.02, baseSize),
            lineHeight: this.c(.2, baseSize),
            color: '#fff',
            background: bg,
            boxShadow: `0 ${this.c(.01, baseSize)} ${this.c(.025, baseSize)} rgba(0,0,0, .15)`,
            cursor: 'pointer',
          })
        }
      },
      c(f, baseSize) {
        return `calc(${f} * ${baseSize})`
      }
    }
  }
</script>
