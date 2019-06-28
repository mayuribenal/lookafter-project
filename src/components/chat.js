import React from 'react';
import { connect } from 'react-redux';
import { initSocket } from './socket';
import moment from 'moment';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.resetChat = this.resetChat.bind(this);
  }
  componentDidMount() {
    if (!this.elem) {
      return null;
    }
    this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;
  }
  componentDidUpdate() {
    if (!this.elem) {
      return null;
    }
    this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;
  }
  handleChange(e) {
    this.message = e.target.value;
  }
  sendMessage(e) {
    if (e.key == 'Enter') {
      e.preventDefault();
      initSocket().emit('chatMessage', this.message);
      this.resetChat();
    }
  }
  resetChat() {
    this.textarea.value = '';
  }
  render() {
    const { chat, members, user } = this.props;
    if (!chat || !members) {
      return null;
    }
    const chatMembers = members.map(member => {
      if (member.id === user.id) {
        return (
          <div key={member.id} className="chat-member">
            <img src={member.img || 'user.png'} />
            <p>You</p>
          </div>
        );
      } else {
        return (
          <div key={member.id} className="chat-member">
            <img src={member.img || 'user.png'} />
            <p className="capitalize">{member.first}</p>
          </div>
        );
      }
    });
    const chatMessages = chat.map(message => {
      if (message.user_id == user.id) {
        return (
          <div
            key={message.id}
            id="my-message"
            className="chatMessage-container"
          >
            <div className="chat-message">
              <p className="words">{message.message}</p>
              <p>You</p>
              <p id="message-details">
                {' '}
                {moment(message['created_at']).fromNow()}
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <div key={message.id} className="chatMessage-container">
            <div className="chat-message">
              <p id="chat-name" className="capitalize">
                {message.first}
              </p>
              <p className="words">{message.message}</p>
              <p id="message-details">
                {' '}
                {moment(message['created_at']).fromNow()}
              </p>
            </div>
          </div>
        );
      }
    });
    return (
      <div className="main">
        <div className="chat-main">
          <div className="chat-room">
            <div className="chat" ref={elem => (this.elem = elem)}>
              {chatMessages}
            </div>
            <div className="text-area">
              <img src="clipper.png" width="40px" height="40px" />
              <textarea
                placeholder="write here!"
                onChange={this.handleChange}
                onKeyPress={this.sendMessage}
                ref={textarea => (this.textarea = textarea)}
              />
              <img src="mic.png" width="40px" height="40px" />
            </div>
          </div>
          <div className="chat-side">
            <div className="profiles">{chatMembers}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user,
    chat: state.chat,
    members: state.members
  };
};

export default connect(mapStateToProps)(Chat);
