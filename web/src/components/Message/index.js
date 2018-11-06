import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';

const Message = ({ message: { text, inserted_at, user } }) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px' }}>
      <Avatar email={user.email} style={{ marginRight: '10px' }} />
      <div>
        <div style={{ lineHeight: '1.2' }}>
          <b style={{ marginRight: '8px', fontSize: '14px' }}>{user.username}</b>
          <time style={{ fontSize: '12px', color: 'rgb(192,192,192)' }}>{moment(inserted_at).format('h:mm A')}</time>
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
};

Message.defaultProps = {
  message: {
    text: '',
    inserted_at: '',
    user: {
      email: '',
      username: '',
    },
  },
};

Message.propTypes = {
  message: {
    text: PropTypes.string,
    inserted_at: PropTypes.string,
    user: {
      email: PropTypes.string,
      username: PropTypes.string,
    },
  },
};

export default Message;
