import React from 'react';
import { connect } from 'react-redux';
import axios from './axios';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    axios.get('/logout').then(() => window.location.reload());
  }
  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    return (
      <div className="navigation">
        <div className="nav-section">
          <Link to="/home" className="link">
            <div className="nav-items logo">
              <img src="50bw.png" />
            </div>
          </Link>
        </div>
        <div className="nav-section">
          <Link to="/calendar-offer" className="link">
            <div className="nav-items">
              <img src="calendaroffer.png" />
              <p>your support</p>
            </div>
          </Link>
        </div>
        <div className="nav-section">
          <Link to="/profile" className="link">
            <img src="user.png" />
          </Link>
        </div>
        <div className="nav-section">
          <Link to="/calendar-need" className="link">
            <div className="nav-items">
              <img src="calendarneed.png" />
              <p>your need</p>
            </div>
          </Link>
        </div>
        <div className="nav-section">
          <Link to="/chat" className="link">
            <div className="nav-items">
              <img src="chats.png" />
              <p>chat</p>
            </div>
          </Link>
        </div>
        <div className="nav-section" onClick={this.logout}>
          <div className="nav-items">
            <img src="logout.png" />
            <p>log out</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Navigation);

// <div className="nav-section">
//     <Link to="/gear" className="link">
//         <img src="equipment.png" />
//     </Link>
// </div>
