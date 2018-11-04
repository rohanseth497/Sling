import React from 'react';

const Room = ({ match }) => (
  <div>
    Room
    {match.params.id}
  </div>
);

export default Room;
