import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { connectToChannel, leaveChannel } from '../../actions/room';

class Room extends React.Component {
  componentDidMount() {
    const { userConnectToChannel, socket, match } = this.props;
    userConnectToChannel(socket, match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { match, socket } = this.props;
    if (nextProps.match.params.id !== match.params.id) {
      const { userLeaveChannel, userConnectToChannel, channel } = this.props;
      userLeaveChannel(channel);
      userConnectToChannel(nextProps.socket, nextProps.match.params.id);
    }
    if (!socket && nextProps.socket) {
      const { userConnectToChannel } = this.props;
      userConnectToChannel(nextProps.socket, nextProps.match.params.id);
    }
  }

  componentWillUnmount() {
    const { userLeaveChannel, channel } = this.props;
    userLeaveChannel(channel);
  }

  render() {
    const { room } = this.props;
    return (
      <div>
        {room.name}
      </div>
    );
  }
}

Room.defaultProps = {
  socket: {},
  channel: {},
  room: {},
  match: {},
};

Room.propTypes = {
  socket: PropTypes.instanceOf(Object),
  channel: PropTypes.instanceOf(Object),
  room: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
  userConnectToChannel: PropTypes.func.isRequired,
  userLeaveChannel: PropTypes.func.isRequired,
};

export default withRouter(connect(
  state => ({
    room: state.room.currentRoom,
    socket: state.session.socket,
    channel: state.room.channel,
  }),
  {
    userConnectToChannel: connectToChannel,
    userLeaveChannel: leaveChannel,
  },
)(Room));
