import {
  ROOM_CONNECTED_TO_CHANNEL,
  USER_LEFT_ROOM,
} from './action_types';

export const connectToChannel = (socket, roomId) => {
  return (dispatch) => {
    if (!socket) { return false; }
    const channel = socket.channel(`rooms:${roomId}`);

    channel.join().receive('ok', (response) => {
      dispatch({ type: ROOM_CONNECTED_TO_CHANNEL, response, channel });
    });

    return false;
  };
};

export const leaveChannel = (channel) => {
  return (dispatch) => {
    if (channel) {
      channel.leave();
    }
    dispatch({ type: USER_LEFT_ROOM });
  };
};
