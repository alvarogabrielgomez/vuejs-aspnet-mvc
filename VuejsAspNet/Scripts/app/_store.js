import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vueLocalStorage = new VuexPersist({
    key: "vuex",
    storage:window.localStorage
   
});

const vueSessionStorage = new VuexPersist({
    key: "vuex",
    storage: window.sessionStorage
});

export const store = new Vuex.Store({
    state: {
        online: { "TEST01State": "offline", "TEST02State": "offline" }
    },
    mutations: {
        databaseChangeState(state, payload) {
            state.online = payload;
        }
    },
    actions: {

    },
    plugins: [vueLocalStorage.plugin]
});