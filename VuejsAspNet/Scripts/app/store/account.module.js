import { userService } from '../services';
import { router } from '../helpers';

const user = JSON.parse(localStorage.getItem('user'));

const state = user ? {
    status: { loggedIn: true },
    user,
    loginFailure: false
} : {
        status: {},
        user: null,
        loginFailure: false
    };

const actions = {
    login({ dispatch, commit }, { CARNET }) {
        commit('loginRequest', { CARNET });
        userService.login(CARNET)
            .then(function (response) {
                if (response.success === true) {
                    commit('loginSuccess', user);
                    setTimeout(function () {
                        //router.push('/');
                        location.reload();
                    }, 300);
                    
                } else {
                    commit('loginFailure', 'fail');
                    dispatch('alert/error', 'fail', { root: true });
                }
            })
            .catch(function (error) {
                  commit('loginFailure', error);
                  dispatch('alert/error', error, { root: true });
            });
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');

        setTimeout(function () {
            router.push('/login');
        }, 300);
    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.loginFailure = false;
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.loginFailure = false;
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.loginFailure = true;
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
