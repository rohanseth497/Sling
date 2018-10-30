import { reset } from 'redux-form';
// import { Socket } from 'phoenix';
import { AUTHENTICATION_SUCCESS, SHOW_ALERT, LOGOUT } from './action_types';
import api from '../api';

// const API_URL = process.env.REACT_APP_API_URL;
// const WEBSOCKET_URL = API_URL.replace(/(https|http)/, 'ws').replace('/api', '');

const setCurrentUser = (dispatch, response) => {
  localStorage.setItem('token', JSON.stringify(response.meta.token));
  dispatch({ type: AUTHENTICATION_SUCCESS, response });
};

export const login = (data, router) => {
  return dispatch => api.post('/sessions', data)
    .then((resp) => {
      setCurrentUser(dispatch, resp);
      dispatch(reset('login'));
      router.transitionTo('/login');
    })
    .catch((err) => {
      dispatch({ type: SHOW_ALERT, message: err.message });
    });
};

export const signup = (data, router) => {
  return dispatch => api.post('/users', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('signup'));
      router.transitionTo('/');
    });
};

export const logout = (router) => {
  return dispatch => api.delete('/sessions')
    .then(() => {
      localStorage.removeItem('token');
      dispatch({ type: LOGOUT });
      router.transitionTo('/login');
    });
};

export const authenticate = () => {
  return dispatch => api.post('/sessions/refresh')
    .then((resp) => {
      setCurrentUser(dispatch, resp);
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem('token');
      window.location = '/login';
    });
};
