import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js';
import actions from './actions.js';

//vuex는 플러그인형태로 제공
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        news: [],
        jobs: [],
        ask : []
    },
    getters: {
        fetchedAsk(state) {
            return state.ask;
        }
    },
    mutations,
    actions,
});