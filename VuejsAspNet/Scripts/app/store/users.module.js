import { userService } from '../services';

const state = {
    allData: {},
    totalCountHistorico : 0
};

const actions = {
    logedIn({ commit }) {
        commit('success', 'Loged in');
    },

    selectrTotalContadorHistoricoApontamento({ commit }) {
        const user = JSON.parse(localStorage.getItem('user'));
        userService.selectrTotalContadorHistoricoApontamento(user.CODIGO)
            .then((response) => {
                commit('getTotalCountHistoricoApontamentoSuccess', response.data.total);
            })
            .catch((error) => {
                commit('getTotalCountHistoricoApontamentoFailure', error);
            });
    },

    getAllDataUser({ commit }) {
        commit('getAllDataRequest');
        const user = JSON.parse(localStorage.getItem('user'));
        userService.getById(user.CODIGOUSUARIO)
            .then(function (response) {
                commit('getAllDataSuccess', response.user);
            })
            .catch(function (error) {
                commit('getAllDataFailure', error);
            });
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        userService.delete(id)
            .then(
                user => commit('deleteSuccess', id),
                error => commit('deleteFailure', { id, error: error.toString() })
            );
    }
};

const mutations = {
    SuccessMessage(state) {
        state.type = 'alert-success';
        state.message = 'success';
    },
    FailureMessage(state, error) {
        state.type = 'alert-danger';
        state.message = error;
    },
    getAllDataRequest(state) {
        state.allData = { loading: true };
    },
    getAllDataSuccess(state, users) {
        state.allData = { items: users };
    },
    getTotalCountHistoricoApontamentoSuccess(state, total) {
        state.totalCountHistorico = total;
    },
    getAllDataFailure(state, error) {
        state.allData = { error };
    },
    getTotalCountHistoricoApontamentoFailure(state, error) {
        state.totalCountHistorico = 0;
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.allData.items = state.allData.items.map(user =>
            user.id === id
                ? { ...user, deleting: true }
                : user
        );
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.allData.items = state.allData.items.filter(user => user.id !== id);
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.allData.items = state.items.map(user => {
            if (user.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: error };
            }

            return user;
        });
    }
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};