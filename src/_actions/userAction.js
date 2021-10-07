import axios from 'axios';
import { AUTH, REGISTER, SIGN_IN, SIGN_OUT } from "./types";

const URL = "/api/user";

export function auth() {
    const request = axios.get(URL + '/auth');
    return {
        type: AUTH,
        payload: request
    }
}

export function register(dataTosubmit) {
    const request = axios.post(URL + '/register', dataTosubmit);
    return {
        type: REGISTER,
        payload: request
    }
}

export function siginIn(dataTosubmit) {
    const request = axios.post(URL + '/signin', dataTosubmit);
    return {
        type: SIGN_IN,
        payload: request
    }
}

export function signOut() {
    const request = axios.get(URL + '/signout');
    return {
        type: SIGN_OUT,
        payload: request
    }
}

