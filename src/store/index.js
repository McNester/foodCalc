import { createStore } from 'vuex'
import { calcsModule } from '@/store/calcsModule'

export default createStore({
  modules: {
    calcs: calcsModule
  }
})
