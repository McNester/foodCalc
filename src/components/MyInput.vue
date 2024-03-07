<template>
  <input
    class="altText"
    type="number"
    :class="{ red: !isInputValid }"
    :placeholder="placeHolder"
    :value="modelValue"
    @input="change"
  />
</template>

<script>
export default {
  name: 'my-input',
  data() {
    return {
      isInputValid: true
    }
  },
  props: {
    modelValue: { Number },
    placeHolder: { String }
  },
  methods: {
    update(val) {
      this.$emit('update:modelValue', val)
    },
    isValid(val) {
      return Number.isInteger(val) && val > 0
    },
    change(event) {
      let val = +event.target.value

      if (val == 0) {
        this.update('')
        return
      }
      this.isInputValid = this.isValid(val)
      if (this.isInputValid) {
        this.update(val)
      }
    }
  }
}
</script>

<style scoped>
input {
  outline: none;
  @apply w-full h-[3rem] bg-[#181a1a] text-lg px-4;
}

.red {
  border: 2px solid red;
}
</style>
