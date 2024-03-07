<template>
  <button
    class="altText"
    :class="{ active: isActive, chosen: isChosen }"
    @touchstart="toggleActive"
    @touchend="toggleActive"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button',
  data() {
    return {
      isActive: false
    }
  },
  props: {
    isChosen: { type: Boolean }
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style scoped>
button {
  @apply w-full h-[3rem] bg-[#1E1F1F] text-lg;
  border-right: 2px solid #161617;
}

@media (hover: none) {
  .active {
    @apply bg-[#1D1D1E];
  }
}

@media (hover: hover) {
  button:hover {
    @apply bg-[#202121];
  }
  button:active {
    @apply bg-[#1E1F1F];
  }
}

.chosen {
  @apply font-bold;
}
</style>
