import {
  ROOM_CONNECTED_TO_CHANNEL,
  USER_LEFT_ROOM,
} from '../actions/action_types';

const initialState = {
  channel: null,
  currentRoom: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ROOM_CONNECTED_TO_CHANNEL:
      return {
        ...state,
        channel: action.channel,
        currentRoom: action.response.room,
      };
    case USER_LEFT_ROOM:
      return initialState;
    default:
      return state;
  }
}
