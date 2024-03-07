<template>
  <div id="cont">
    <div id="optionsCont">
      <my-button @click="toggleChoice(0)" :isChosen="isGramms">Граммы</my-button>
      <my-button @click="toggleChoice(1)" :isChosen="isCals">Калории</my-button>
    </div>
    <div id="line"></div>
    <h2>Количество белков: {{ $store.getters['calcs/getProtein'] }}</h2>
    <h2>Количество жиров: {{ $store.getters['calcs/getFat'] }}</h2>
    <h2>Количество углеводов: {{ $store.getters['calcs/getCarbs'] }}</h2>
    <h2 v-if="isCals">Базовый обмен: {{ $store.getters['calcs/getBaseChange'] }}</h2>
  </div>
</template>

<script>
export default {
  name: 'result',
  data() {
    return {
      isGramms: true,
      isCals: false
    }
  },
  props: {
    proteinG: { type: Number },
    fatG: { type: Number },
    carbsG: { type: Number },
    proteinK: { type: Number },
    fatK: { type: Number },
    carbsK: { type: Number },

    vals: { type: Array }
  },
  methods: {
    toggleStyle(id) {
      if ((this.isGramms && id == 0) || (this.isCals && id == 1)) {
        return
      }
      this.isGramms = !this.isGramms
      this.isCals = !this.isCals
    },
    toggleChoice(id) {
      this.toggleStyle(id)
      this.$store.commit('calcs/setIsGramms', this.isGramms)
    }
  }
}
</script>

<style scoped>
#cont {
  @apply flex flex-col justify-center items-start w-[100vw] h-fit mt-20 pb-[10rem];
}
#optionsCont {
  @apply flex flex-row w-[101vw] h-fit justify-around items-center;
}
#line {
  @apply w-[100vw] h-[0.28rem] bg-[#161617];
  @apply mb-3 !important;
}
h2 {
  @apply text-2xl my-3  px-3;
}
</style>
