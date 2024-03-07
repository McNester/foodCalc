<template>
  <form @submit.prevent>
    <div id="genderContForm" class="optionsCont">
      <my-button @click="toggleGender(0)" :isChosen="isWomen">Женщина</my-button>
      <my-button @click="toggleGender(1)" :isChosen="isMen">Мужчина</my-button>
    </div>

    <div id="goalContForm" class="optionsCont">
      <my-button @click="toggleGoal(0)" :isChosen="isLose">Скинуть</my-button>
      <my-button @click="toggleGoal(1)" :isChosen="isGain">Набрать</my-button>
    </div>

    <div id="inputsCont">
      <my-input :placeholder="ageStr" v-model="age" />
      <my-input :placeholder="heightStr" v-model="height" />
      <my-input :placeholder="weightStr" v-model="weight" />
    </div>

    <div id="activityContForm">
      <h2>Сколько дней в неделю вы занимаетесь:</h2>
      <div id="coefCont" class="optionsCont">
        <my-button @click="toggleAct(0)" :isChosen="isNoAct">0</my-button>
        <my-button @click="toggleAct(1)" :isChosen="isTwoAct">2-3</my-button>
        <my-button @click="toggleAct(2)" :isChosen="isFourAct">4-5</my-button>
        <my-button @click="toggleAct(3)" :isChosen="isEveryAct">7</my-button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'calc-from',
  data() {
    return {
      isWomen: true,
      isMen: false,
      isLose: true,
      isGain: false,
      age: '',
      height: '',
      weight: '',
      ageStr: 'Ваш возраст',
      heightStr: 'Ваш рост(см)',
      weightStr: 'Ваш вес',
      isNoAct: true,
      isTwoAct: false,
      isFourAct: false,
      isEveryAct: false,
      coef: 1.2
    }
  },
  computed: {
    isGramms() {
      return this.$store.getters['calcs/getIsGramms']
    }
  },
  watch: {
    isGramms(newCount, oldCount) {
      console.log(`We have ${newCount} fruits now, yay!`)
      this.changeCalcs()
    },
    // Watcher for the observedData property
    age(newVal, oldVal) {
      this.changeCalcs()
    },
    height(newVal, oldVal) {
      this.changeCalcs()
    },
    weight(newVal, oldVal) {
      this.changeCalcs()
    }
  },
  methods: {
    toggleStyleGoal(id) {
      if ((this.isLose && id == 0) || (this.isGain && id == 1)) {
        return
      }
      this.isLose = !this.isLose
      this.isGain = !this.isGain
    },
    toggleGoal(id) {
      this.toggleStyleGoal(id)
      this.changeCalcs()
    },
    toggleStyleGender(id) {
      if ((this.isWomen && id == 0) || (this.isMen && id == 1)) {
        return
      }
      this.isWomen = !this.isWomen
      this.isMen = !this.isMen
    },
    toggleGender(id) {
      this.toggleStyleGender(id)
      this.changeCalcs()
    },
    toggleStyleAct(id) {
      if (
        (this.isNoAct && id == 0) ||
        (this.isTwoAct && id == 1) ||
        (this.isFourAct && id == 2) ||
        (this.isEveryAct && id == 3)
      ) {
        return
      } else if (id == 0) {
        this.isNoAct = true
        this.coef = 1.2
      } else if (id == 1) {
        this.isTwoAct = true
        this.coef = 1.375
      } else if (id == 2) {
        this.isFourAct = true
        this.coef = 1.55
      } else if (id == 3) {
        this.isEveryAct = true
        this.coef = 1.725
      }

      this.falsifyRemainingAct(id)
    },
    falsifyRemainingAct(id) {
      if (id == 0) {
        this.isTwoAct = false
        this.isFourAct = false
        this.isEveryAct = false
      } else if (id == 1) {
        this.isNoAct = false
        this.isFourAct = false
        this.isEveryAct = false
      } else if (id == 2) {
        this.isNoAct = false
        this.isTwoAct = false
        this.isEveryAct = false
      } else if (id == 3) {
        this.isNoAct = false
        this.isTwoAct = false
        this.isFourAct = false
      }
    },
    toggleAct(id) {
      this.toggleStyleAct(id)
      this.changeCalcs()
    },
    calcBaseCals() {
      let age = +this.age
      let height = +this.height
      let weight = +this.weight

      let base = weight * 10 + height * 6.25 - age * 4.92

      if (this.isWomen) {
        base -= 161
      } else {
        base += 5
      }

      base *= this.coef

      if (this.isLose) {
        base -= 0.15 * base
      } else {
        base += 0.15 * base
      }

      return base
    },
    changeCalcs() {
      let base = this.calcBaseCals()
      let fatG = this.calcFatGramm()
      let fatC = this.calcFatCals(fatG)

      let proteinG = this.calcProteinGramm()
      let proteinC = this.calcProteinCals(proteinG)

      let carbsC = this.calcCarbsCals(base, proteinC, fatC)
      let carbsG = this.calcCarbsGramm(carbsC)

      if (this.isGramms) {
        console.log('in grams:')
        this.updateStore(base, proteinG, carbsG, fatG)
      } else {
        console.log('in cals:')
        this.updateStore(base, proteinC, carbsC, fatC)
      }
    },
    calcProteinGramm() {
      return +this.weight * 1.2
    },
    calcProteinCals(proteinGramm) {
      return proteinGramm * 4
    },
    calcFatGramm() {
      return +this.weight
    },
    calcFatCals(fatGramm) {
      return fatGramm * 9
    },
    calcCarbsGramm(carbsCals) {
      return carbsCals / 4
    },
    calcCarbsCals(base, proteinCals, fatCals) {
      return base - proteinCals - fatCals
    },
    updateStore(base, protein, carbs, fat) {
      this.updateBaseStore(base)
      this.updateProteinStore(protein)
      this.updateCarbsStore(carbs)
      this.updateFatStore(fat)
    },
    updateBaseStore(base) {
      this.$store.commit('calcs/setBaseChange', base)
    },
    updateProteinStore(protein) {
      this.$store.commit('calcs/setProtein', protein)
    },
    updateCarbsStore(carbs) {
      this.$store.commit('calcs/setCarbs', carbs)
    },
    updateFatStore(fat) {
      this.$store.commit('calcs/setFat', fat)
    }
  }
}
</script>

<style scoped>
.optionsCont {
  @apply flex flex-row w-[101vw] h-fit justify-around items-center;
}

#inputsCont {
  @apply flex flex-col gap-5 mt-5;
}

#goalContForm {
  @apply mt-5;
}
#activityContForm {
  @apply flex flex-col justify-center items-center w-fit h-fit gap-3 mt-5;
}

h2 {
  @apply text-xl;
}
</style>
