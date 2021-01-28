import Vue from "vue"

Vue.directive('phone', {
  bind(el) {
    el.oninput = function(e) {
      if (!e.isTrusted) {
        return
      }

      const x = this.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)

      x.input = x.input.slice(0, 11)

      if (!x[2] && x[1] !== '') {
        this.value = x[1] === '7' ? x[1] : '7' + x[1]
      } else {
        this.value =!x[3] ? x[1] + x[2] : x[1] + ' ' + x[2] + ' ' + x[3] + (x[5] ? '-' + x[4] + '-' + x[5] : x[4])
      }

      if (this.value.length > 1) {
        this.value = '+' + this.value
      }
    }
  },
})
