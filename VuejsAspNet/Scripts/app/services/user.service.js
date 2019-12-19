import axios from 'axios';
//import config from 'config';
import { authHeader } from '../helpers';

function login(CARNET) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ CARNET })
    };

    return fetch('/Ajax/Authenticate', requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function register(user) {
    //return axios.post('/Ajax/Register', {
    //    username: username,
    //    password: password
    //})
    //    .then((response) => {
    //        var data = response.data;
    //        if (data.user.token) {
    //            localStorage.setItem('user', JSON.stringify(user));
    //        }
    //        return user;
    //    })
    //    .catch((error) => {
    //        return {};
    //    });
}
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/Ajax/users', requestOptions).then(handleResponse);
}

function selectrTotalContadorHistoricoApontamento(codigo) {
    return axios.get('/Ajax/selectrTotalContadorHistoricoApontamento', {
        params: {
            operadorapontamento: codigo
        }
    });
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/Ajax/user?codigousuario=${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    selectrTotalContadorHistoricoApontamento
    // update,
    // delete: _delete
};