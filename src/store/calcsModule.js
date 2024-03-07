export const calcsModule = {
  state: () => ({
    protein: 0,
    carbs: 0,
    fat: 0,
    baseChange: 0,
    isGramms: true
  }),
  getters: {
    getIsGramms(state) {
      return state.isGramms
    },
    getProtein(state) {
      return Math.round(state.protein)
    },
    getCarbs(state) {
      return Math.round(state.carbs)
    },
    getFat(state) {
      return Math.round(state.fat)
    },
    getBaseChange(state) {
      return Math.round(state.baseChange)
    }
  },
  mutations: {
    setIsGramms(state, isGramms) {
      state.isGramms = isGramms
    },
    setProtein(state, val) {
      state.protein = val
    },
    setCarbs(state, val) {
      state.carbs = val
    },
    setFat(state, val) {
      state.fat = val
    },
    setBaseChange(state, val) {
      state.baseChange = val
    }
  },
  namespaced: true
}
