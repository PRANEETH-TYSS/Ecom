import * as types from "./actionTypes";
import firebase from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";

let auth = getAuth();

export const addToBasket = item => ({
  type: types.ADD_TO_BASKET,
  payload: item,
});

export const removeFromBasket = id => ({
  type: types.REMOVE_FROM_BASKET,
  payload: id,
});

const registerStart = () => ({
  type: types.REGISTER_START,
});

const registerSuccess = user => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

const registerError = error => ({
  type: types.REGISTER_FAIL,
  payload: error,
});

const loginStart = () => ({
  type: types.LOGIN_START,
});

const loginSuccess = user => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

const loginError = error => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

const logoutStart = () => ({
  type: types.LOGOUT_START,
});

const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

const logoutError = error => ({
  type: types.LOGOUT_FAIL,
  payload: error,
});

export const setuser = user => ({
  type: types.SET_USER,
  payload: user,
});
export const searchitems = a => ({
  type: types.SEARCH_ITEMS,
  payload: a,
});

export const setBasketEmpty = () => ({
  type: types.SET_BASKET_EMPTY,
});

export const registerInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(registerStart());

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(registerSuccess(user));
        sendEmailVerification(user);
      })
      .catch(error => dispatch(registerError(error.message)));
  };
};

export const loginInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(loginStart());

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(loginSuccess(user));
      })
      .catch(error => dispatch(loginError(error.message)));
  };
};

export const logOutInitiate = () => {
  return function (dispatch) {
    dispatch(logoutStart());
    auth
      .signOut()
      .then(resp => dispatch(logoutSuccess()))
      .catch(error => dispatch(logoutError(error.message)));
  };
};
