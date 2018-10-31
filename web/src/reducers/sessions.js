import {
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_FAILURE,
  LOGOUT,
} from '../actions/action_types';

const initialState = {
  isAuthenticated: false,
  willAuthenticate: true,
  currentUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION_REQUEST:
      return {
        ...state,
        willAuthenticate: true,
      };
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        willAuthenticate: false,
        isAuthenticated: true,
        currentUser: action.response.data,
      };
    case AUTHENTICATION_FAILURE:
      return {
        ...state,
        willAuthenticate: false,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        willAuthenticate: false,
        currentUser: {},
      };
    default:
      return state;
  }
}
