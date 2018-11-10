import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  connectToChannel,
  leaveChannel,
  createMessage,
  loadOlderMessages,
} from '../../actions/room';
import MessageList from '../../components/MessageList';
import MessageForm from '../../components/MessageForm';
import RoomNavbar from '../../components/RoomNavBar';
import RoomSidebar from '../../components/RoomSidebar';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.messageList = React.createRef();
  }

  componentDidMount() {
    console.log('mount room');
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
    console.log('unmount room');
    const { userLeaveChannel, channel } = this.props;
    userLeaveChannel(channel);
  }

  handleMessageCreate = (data) => {
    const { userCreateMessage, channel } = this.props;
    userCreateMessage(channel, data);
    this.messageList.current.scrollToBottom();
  }

  handleLoadMore = () => {
    const { loadRoomOlderMessages, match, messages } = this.props;
    loadRoomOlderMessages(match.params.id, { last_seen_id: messages[0].id });
  }

  render() {
    const {
      room,
      messages,
      currentUser,
      presentUsers,
      pagination,
      loadingOlderMessages,
    } = this.props;

    const moreMessages = pagination.total_pages > pagination.page_number;

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <RoomSidebar
          room={room}
          currentUser={currentUser}
          presentUsers={presentUsers}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <RoomNavbar room={room} />
          <MessageList
            messages={messages}
            moreMessages={moreMessages}
            onLoadMore={this.handleLoadMore}
            loadingOlderMessages={loadingOlderMessages}
            ref={this.messageList}
          />
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
  presentUsers: [],
  currentUser: {},
  pagination: {},
  loadingOlderMessages: false,
};

Room.propTypes = {
  socket: PropTypes.instanceOf(Object),
  channel: PropTypes.instanceOf(Object),
  room: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
  messages: PropTypes.instanceOf(Array),
  presentUsers: PropTypes.instanceOf(Array),
  currentUser: PropTypes.instanceOf(Object),
  pagination: PropTypes.instanceOf(Object),
  loadingOlderMessages: PropTypes.bool,
  userConnectToChannel: PropTypes.func.isRequired,
  userLeaveChannel: PropTypes.func.isRequired,
  userCreateMessage: PropTypes.func.isRequired,
  loadRoomOlderMessages: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    room: state.room.currentRoom,
    socket: state.session.socket,
    channel: state.room.channel,
    messages: state.room.messages,
    presentUsers: state.room.presentUsers,
    currentUser: state.session.currentUser,
    pagination: state.room.pagination,
    loadingOlderMessages: state.room.loadingOlderMessages,
  }),
  {
    userConnectToChannel: connectToChannel,
    userLeaveChannel: leaveChannel,
    userCreateMessage: createMessage,
    loadRoomOlderMessages: loadOlderMessages,
  },
)(Room);
