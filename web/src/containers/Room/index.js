import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { connectToChannel, leaveChannel, createMessage } from '../../actions/room';
import MessageList from '../../components/MessageList';
import MessageForm from '../../components/MessageForm';
import RoomNavbar from '../../components/RoomNavBar';

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

  handleMessageCreate = (data) => {
    const { userCreateMessage, channel } = this.prop;
    userCreateMessage(channel, data);
  }

  render() {
    const { room, messages } = this.props;
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <RoomNavbar room={room} />
          <MessageList messages={messages} />
          <MessageForm onSubmit={this.handleMessageCreate} />
        </div>
      </div>
    );
  }
}

Room.defaultProps = {
  socket: {},
  channel: {},
  room: {},
  match: {},
  messages: [],
};

Room.propTypes = {
  socket: PropTypes.instanceOf(Object),
  channel: PropTypes.instanceOf(Object),
  room: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
  messages: PropTypes.instanceOf(Array),
  userConnectToChannel: PropTypes.func.isRequired,
  userLeaveChannel: PropTypes.func.isRequired,
  userCreateMessage: PropTypes.func.isRequired,
};

export default withRouter(connect(
  state => ({
    room: state.room.currentRoom,
    socket: state.session.socket,
    channel: state.room.channel,
    messages: state.room.messages,
  }),
  {
    userConnectToChannel: connectToChannel,
    userLeaveChannel: leaveChannel,
    userCreateMessage: createMessage,
  },
)(Room));
