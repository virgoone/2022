import { createStore } from 'vuex'

const state = {
  numbers: [1, 2, 3],
  banners: [],
}

const mutations = {
  ADD_NUMBER(state, payload) {
    state.numbers.push(payload)
  },
  ADD_BANNER(state, payload) {
    state.banners.push(payload)
  },
}

const actions = {
  addNumber(context, number) {
    context.commit('ADD_NUMBER', number)
  },
  addBanner(context, banner) {
    context.commit('ADD_BANNER', banner)
  },
}

const getters = {
  getNumbers(state) {
    return state.numbers
  },
  banners(state) {
    return state.banners
  },
}

const store = createStore({
  state,
  mutations,
  actions,
  getters,
})

export default store
