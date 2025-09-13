// src/store/index.js
import { createStore } from 'vuex';
const store = createStore({
  state: {
    storeUserData: null
  },
  mutations: {
    storeUserDataMutation(state, payload) {
      state.storeUserData = payload;
      // console.log(payload)
      // window.localStorage.setItem('userInfo' , JSON.stringify(payload.value.data.data))
    }
  },
  actions: {
    storeUserDataAction({ commit }) {
      commit('storeUserDataMutation', resultGet?.value?.data);
    }
  }  
});

export default store;
