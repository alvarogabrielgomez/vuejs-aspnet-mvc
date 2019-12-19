import { userService, queryService } from '../services';
import { router } from '../helpers';
import VuexPersist from "vuex-persist";
import axios from 'axios';

const vueLocalStorage = new VuexPersist({
    key: "vuex",
    storage: window.localStorage
});

const state = {
    status: "Idle",
    online: { "TEST01State": false, "TEST02State": false },
    dadosfichaprod: {
        'status': '',
        'data': {}
    },
    motivoFinalizacaoApontamento: {},
    dataHoraServer: {}
};

const getters = {
    getDataHoraServer: state => {
        return state.dataHoraServer;
    },
    status: state => {
        return state.status;
    },
    onlineDatabase: state => {
        return state.online;
    }
};

const actions = {

    checkDataHora({ dispatch, commit }) {
        axios.get('/Ajax/dataHoraServer')
            .then((response) => {
                commit('changeDataHoraServer', response.data.datahora);
            })
            .catch((error) => {
                commit('fetchFailure', 'dataHoraServer');
                dispatch('alert/error', 'fail', { root: true });
            });
    },

    checkDatabase({ commit }) {
        commit('checkingDatabase');
        axios.get('/Ajax/TestConnection')
            .then((response) => {
                commit('databaseChangeState', response.data);
            })
            .catch((error) => {
                commit('allDbDown');
            });

    },

    fetchFichaProd({ dispatch, commit }, nrcontrole) {
        commit('updateStatus', 'Fetching dadosfichaprod');
        queryService.searchNrControle(nrcontrole)
            .then(function (response) {
                if (response.data.success === true) {
                    commit('fetchFichaSuccess', response.data);
                } else {
                    commit('fetchFichaFailure', response.data);
                    dispatch('alert/error', 'fail', { root: true });
                }
            })
            .catch(function (error) {
                commit('fetchFailure', 'dadosfichaprod');
                dispatch('alert/error', 'fail', { root: true });
            });
    },
    fetchMotivoFinalizacaoApontamento({ commit }) { // Este NO lo comitamos por no ser tan importante.
        axios.get('Ajax/MotivoFinalizacaoApontamento')
            .then((response) => {
                state.motivoFinalizacaoApontamento = response.data.ls;
            })
            .catch((error) => {
                state.motivoFinalizacaoApontamento = {};
            });
    }

};
const mutations = {
    changeDataHoraServer(state, date) {
        state.dataHoraServer = date;
    },
    updateStatus(state, status) {
        state.status = status;
    },
    checkingDatabase(state) {
        state.online = 'checking...';
        state.status = "Cheking Database Online";
    },
    databaseChangeState(state, payload) {
        state.status = "Idle";
        state.online = payload;
    },
    allDbDown(state) {
        state.status = "Idle";
        state.online = { "TEST01State": false, "TEST02State": false };
    },

    fetchFichaSuccess(state, data) {
        state.status = "Idle";
        state.dadosfichaprod.status = data.status;
        state.dadosfichaprod.data = data.fichaProducaoView;
    },
    fetchFichaFailure(state, data) {
        state.status = "Idle";
        state.dadosfichaprod.status = data.status;
        state.dadosfichaprod.data = {};
    },
    fetchFailure(state, payload) { // Este es cuando falla todo, ni devuelve error personalizado
        state.status = "Fetch Failed";
        if (payload === 'dadosfichaprod') {
            state.dadosfichaprod.status = "Fetch Failed";
            state.dadosfichaprod.data = {};
        }
    }
};

export const database = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
