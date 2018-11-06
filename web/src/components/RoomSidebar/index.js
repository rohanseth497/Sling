import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  roomSidebar: {
    color: '#ab9ba9',
    background: '#4d394b',
  },

  header: {
    padding: '20px 15px',
    marginBottom: '10px',
    width: '220px',
  },

  roomName: {
    marginBottom: '0',
    fontSize: '22px',
    lineHeight: '1',
    color: '#fff',
  },

  userList: {
    paddingLeft: '15px',
    listStyle: 'none',
  },

  username: {
    position: 'relative',
    paddingLeft: '20px',
    fontSize: '14px',
    fontWeight: '300',
    ':after': {
      position: 'absolute',
      top: '7px',
      left: '0',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: 'rgb(64,151,141)',
      content: '""',
    },
  },

  listHeading: {
    marginLeft: '15px',
    marginBottom: '5px',
    fontSize: '13px',
    textTransform: 'uppercase',
  },
});

const RoomSidebar = ({ room, currentUser, presentUsers }) => (
  <div className={css(styles.roomSidebar)}>
    <div className={css(styles.header)}>
      <h2 className={css(styles.roomName)}>{room.name}</h2>
      <div style={{ fontSize: '13px' }}>{currentUser.username}</div>
    </div>
    <div className={css(styles.listHeading)}>Active Users</div>
    <ul className={css(styles.userList)}>
      {presentUsers.map(
        user => <li key={user.id} className={css(styles.username)}>{user.username}</li>,
      )}
    </ul>
  </div>
);

RoomSidebar.defaultProps = {
  room: {
    name: '',
  },
  currentUser: {
    username: '',
  },
  presentUsers: [],
};

RoomSidebar.propTypes = {
  room: {
    name: PropTypes.string,
  },
  currentUser: {
    username: PropTypes.string,
  },
  presentUsers: PropTypes.instanceOf(Array),
};

export default RoomSidebar;
