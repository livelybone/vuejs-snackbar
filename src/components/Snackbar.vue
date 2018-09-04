<template>
  <div class="snack-bar-wrap" :class="wrapClass" :style="wrapClass?'':style.wrap">
    <template v-for="(msg,i) in msgs">
      <div :key="i"
           class="snack-bar"
           :style="wrapClass?'':style.bar(msg.color)"
           @click="pop(i)"
           v-html="getMsg(msg.msg)">
      </div>
      <br :key="i+'1'">
    </template>
  </div>
</template>

<script>
export default {
  name: 'SnackBar',
  props: {
    colors: {
      default() {
        return {
          open: '#333',
          info: '#3DBD7D',
          error: '#FA7377',
          warn: '#FF6600',
        }
      },
      type: Object,
    },
    holdTime: {
      default: 3000,
      type: Number,
    },
    multiple: {
      default: true,
      type: Boolean,
    },
    wrapClass: String,
    baseSize: {
      default: '100px',
      type: String,
    },
  },
  data() {
    return {
      msgs: [],
    }
  },
  computed: {
    style() {
      return this.getStyle(this.baseSize)
    },
  },
  methods: {
    info(msg) {
      const m = this.validator(msg)
      const color = this.colors.info
      this.open({ color, msg: m }, true)
    },
    error(msg) {
      const m = this.validator(msg)
      const color = this.colors.error
      this.open({ color, msg: m }, true)
      return false
    },
    warn(msg) {
      const m = this.validator(msg)
      const color = this.colors.warn
      this.open({ color, msg: m }, true)
    },
    open(msg, inner = false) {
      const m = !inner ? this.validator(msg) : msg
      const timer = setTimeout(() => this.pop(), this.holdTime)
      const msgObj = inner ? { ...m, timer } : { color: this.colors.open, msg: m, timer }
      if (this.multiple) {
        this.msgs.push(msgObj)
      } else {
        if (this.msgs[0]) {
          clearTimeout(this.msgs[0].timer)
        }
        this.msgs = [msgObj]
      }
    },
    pop(i = 0) {
      clearTimeout(this.msgs[i].timer)
      this.msgs.splice(i, 1)
    },
    validator(msg) {
      if (typeof msg !== 'string' && typeof msg.message !== 'string') {
        return 'Parameter msg is invalid. Expected a String, or an Object with property message[type:String].'
      }
      return msg
    },
    getMsg(msg) {
      if (typeof msg === 'string') return msg
      return msg.message
    },
    getStyle(baseSize) {
      const valid = /\d(rem|px|em)$/.test(baseSize)
      return valid ? {
        wrap: {
          position: 'fixed',
          left: 0,
          top: this.c('.05', baseSize),
          zIndex: 1000,
          width: '100%',
          pointerEvents: 'none',
          textAlign: 'center',
        },
        bar: bg => ({
          display: 'inline-block',
          width: 'auto',
          minWidth: baseSize,
          maxWidth: `calc(100vw - 0.4 * ${baseSize})`,
          padding: `${this.c(0.15, baseSize)} ${this.c(0.2, baseSize)}`,
          margin: `0 0 ${this.c(0.05, baseSize)}`,
          borderRadius: this.c(0.02, baseSize),
          lineHeight: this.c(0.2, baseSize),
          color: '#fff',
          background: bg,
          boxShadow: `0 ${this.c(0.01, baseSize)} ${this.c(0.025, baseSize)} rgba(0,0,0, .15)`,
          cursor: 'pointer',
          textAlign: 'center',
          pointerEvents: 'all',
        }),
      } : {}
    },
    c(f, baseSize) {
      return `calc(${f} * ${baseSize})`
    },
  },
}
</script>
