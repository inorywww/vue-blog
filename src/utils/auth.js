import {
    setLocalStorage,
    removeLocalStorage,
    getLocalStorage
} from './localStorage';
const bcrypt = require('bcryptjs'); 
const tokenKey = 'adminToken';
export function setToken(value) {
    return setLocalStorage(tokenKey, value, {
        exp: 3600
    });
}

export function removeToken() {
    return removeLocalStorage(tokenKey);
}

export function getToken() {
    return getLocalStorage(tokenKey);
}

export function encode(password){
    return bcrypt.hashSync(password, 10);
}