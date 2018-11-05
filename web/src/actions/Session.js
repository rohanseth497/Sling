import { reset } from 'redux-form';
import { Socket } from 'phoenix';
import {
  AUTHENTICATION_SUCCESS,
  SHOW_ALERT,
  LOGOUT,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_FAILURE,
  SOCKET_CONNECTED,
} from './action_types';
import api from '../api';
import { fetchUserRooms } from './rooms';

const API_URL = process.env.REACT_APP_API_URL;
const WEBSOCKET_URL = API_URL.replace(/(https|http)/, 'ws').replace('/api', '');

const connectToSocket = (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const socket = new Socket(`${WEBSOCKET_URL}/socket`, {
    params: { token },
    logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data); },
  });
  socket.connect();
  dispatch({ type: SOCKET_CONNECTED, socket });
};

const setCurrentUser = (dispatch, response) => {
  localStorage.setItem('token', JSON.stringify(response.meta.token));
  dispatch({ type: AUTHENTICATION_SUCCESS, response });
  dispatch(fetchUserRooms(response.data.id));
  connectToSocket(dispatch);
};

export const login = (data) => {
  return dispatch => api.post('/sessions', data)
    .then((resp) => {
      setCurrentUser(dispatch, resp);
      dispatch(reset('login'));
    })
    .catch((err) => {
      dispatch({ type: SHOW_ALERT, message: err.message });
    });
};

export const signup = (data) => {
  return dispatch => api.post('/users', data)
    .then((response) => {
      setCurrentUser(dispatch, response);
      dispatch(reset('signup'));
    });
};

export const logout = () => {
  return dispatch => api.delete('/sessions')
    .then(() => {
      localStorage.removeItem('token');
      dispatch({ type: LOGOUT });
    });
};

export const authenticate = () => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATION_REQUEST });
    return api.post('/sessions/refresh')
      .then((resp) => {
        setCurrentUser(dispatch, resp);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem('token');
        window.location = '/login';
      });
  };
};

export const unauthenticate = () => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATION_FAILURE });
  };
};
