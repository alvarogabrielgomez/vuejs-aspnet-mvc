﻿export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Custom' + user.token };
    } else {
        return {};
    }

}