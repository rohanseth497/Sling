import React from 'react';
import PropTypes from 'prop-types';

const RoomListItem = ({ room, currentUserRoomIds, onRoomJoin }) => {
  const isJoined = currentUserRoomIds.includes(room.id);

  return (
    <div key={room.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <span style={{ marginRight: '8px' }}>{room.name}</span>
      <button
        type="button"
        onClick={() => onRoomJoin(room.id)}
        className="btn btn-sm"
        disabled={isJoined}
      >
        {isJoined ? 'Joined' : 'Join'}
      </button>
    </div>
  );
};

RoomListItem.defaultProps = {
  room: {},
  currentUserRoomIds: [],
};

RoomListItem.propTypes = {
  room: PropTypes.instanceOf(Object),
  currentUserRoomIds: PropTypes.instanceOf(Array),
  onRoomJoin: PropTypes.func.isRequired,
};

export default RoomListItem;
