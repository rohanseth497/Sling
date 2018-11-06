import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  navbar: {
    padding: '15px',
    background: '#fff',
    borderBottom: '1px solid rgb(240,240,240)',
  },
});

const RoomNavbar = ({ room }) => (
  <nav className={css(styles.navbar)}>
    <div>
      #
      {room.name}
    </div>
  </nav>
);

RoomNavbar.defaultProps = {
  room: {},
};

RoomNavbar.propTypes = {
  room: PropTypes.instanceOf(Object),
};

export default RoomNavbar;
