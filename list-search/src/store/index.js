import { createStore } from 'vuex';
import { getSuggestions } from '../services/apiMock';

export default createStore({
  state: {
    serverData: [],
  },
  getters: {
    getServerData: state => { return state.serverData },
  },
  mutations: {
    setServerData(state, data) {
      state.serverData = data;
    },
  },
  actions: {
    async fetchSuggestions({ state, commit }, inputValue) {
      try {
        const response = await getSuggestions(inputValue);
        commit('setServerData', Object.keys(response));
        return response;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },

  },
  modules: {
  }
})
