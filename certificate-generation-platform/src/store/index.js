import Vue from 'vue';
import Vuex from 'vuex';
// 持久化存储vuex里的数据
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
});

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    managerId: '',
    currentMatchData: {},
    currentMatchCerts: []
  },
  mutations: {
    SET_MANAGER_ID(state, managerId) {
      console.log(`----------set managerid------------`);
      state.managerId = managerId;
    },
    SET_CURRENTMATCH_DATA(state, newMatchData) {
      console.log(`----------vuex set mutation------------`);
      state.currentMatchData = newMatchData;
    },
    SET_CURRENTMATCH_CERTS(state, currentMatchCerts) {
      console.log(`----------vuex set certs------------`);
      state.currentMatchCerts = currentMatchCerts
    }
  },
  actions: {
    setCurrentMatchData({ commit }, newMatchData) {
      console.log(`----------vuex set action------------`);
      commit('SET_CURRENTMATCH_DATA', newMatchData);
    },
    setManagerId({ commit }, managerId) {
      commit('SET_MANAGER_ID', managerId);
    },
    setCurrentMatchCert({ commit }, currentMatchCerts) {
      commit('SET_CURRENTMATCH_CERTS', currentMatchCerts);
    }
  },
});

export default store;
