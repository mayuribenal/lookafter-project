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
            <div className="nav-items">
              <img id="nav-logo" src="400bw.png" />
            </div>
          </Link>
        </div>
        <div className="nav-section">
          <Link to="/calendar-offer" className="link">
            <div className="nav-items">
              <img src="calendaroffer.png" />
              <p>your availability</p>
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
        <div className="nav-section">
          <Link to="/calendar-need" className="link">
            <div className="nav-items">
              <img src="calendaroffer.png" />
              <p>your need</p>
            </div>
          </Link>
        </div>

        <div className="nav-section" onClick={this.logout}>
          <div className="nav-items">
            <img src="logout.png" />
            <p>log out</p>
          </div>
        </div>
        <div className="nav-section">
          <div className="nav-items">
            <Link to="/profile" className="link">
              <img id="mypic" src={user.pic || 'user.png'} />
            </Link>
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
