import { AUTHENTICATION_SUCCESS, LOGOUT } from '../actions/action_types';

const initialState = {
  isAuthenticated: false,
  currentUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.response.data,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {},
      };
    default:
      return state;
  }
}
