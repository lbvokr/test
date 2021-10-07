import { AUTH, REGISTER, SIGN_IN, SIGN_OUT } from "../_actions/types";

export default function (state = {}, action) {
    switch (action.type) {
    case AUTH:
        return { ...state, userData: action.payload };
    case REGISTER:
        return { ...state, registerSuccess: action.payload };
    case SIGN_IN:
        return { ...state, signInSuccess: action.payload };
    case SIGN_OUT:
        return { ...state, signOutSuccess: action.payload };
    default:
        return state;
    }
}
