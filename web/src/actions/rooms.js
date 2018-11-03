import api from '../api';
import {
  FETCH_ROOMS_SUCCESS,
  FETCH_USER_ROOMS_SUCCESS,
} from './action_types';

export const fetchRooms = () => {
  return dispatch => api.fetch('/rooms')
    .then((response) => {
      dispatch({ type: FETCH_ROOMS_SUCCESS, response });
    });
};

export const fetchUserRooms = (userId) => {
  return dispatch => api.fetch(`/users/${userId}/rooms`)
    .then((response) => {
      dispatch({ type: FETCH_USER_ROOMS_SUCCESS, response });
    });
};
