import axios from 'axios';

function searchNrControle(nrcontrole) {
    return axios.get('Ajax/SearchNrControle', {
        params: {
            nrcontrole: nrcontrole
        }
    });
}

export const queryService = {
    searchNrControle
};