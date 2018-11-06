import React from 'react';
import md5 from 'md5';
import PropTypes from 'prop-types';

const Avatar = ({ email, size, style }) => {
  const hash = md5(email);
  const uri = `https://secure.gravatar.com/avatar/${hash}`;

  return (
    <img
      src={uri}
      alt={email}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '4px',
        ...style,
      }}
    />
  );
};

Avatar.defaultProps = {
  email: '',
  size: -1,
  style: {},
};

Avatar.propTypes = {
  email: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.instanceOf(Object),
};

export default Avatar;
