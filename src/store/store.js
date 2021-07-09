import { createStore } from 'vuex'

const store = createStore({
    state () {
      return {
          user: undefined,
          isAuthenticated: false,
          forest: undefined,
          sensor: undefined
      }
    },
    mutations: {
        userLogin (state, data) {
            state.user = data
        },
        chooseForest (state, data){
            state.forest = data
        },
        getSensorData (state, data) {
            state.sensor = data
        },
        userForestUpdate (state, data) {
            state.user.forest = data
        },
        userAuthenticated (state, data){
            state.isAuthenticated = data
        }
    },
    getters: {
        getForest(state) { return state.forest }
     }
})

export default store