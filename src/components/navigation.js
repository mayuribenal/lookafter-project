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
            <img src="home.png" />
          </Link>
        </div>
        <div className="nav-section">
          <Link to="/profile" className="link">
            <img src="profile.png" />
          </Link>
        </div>
        <div className="nav-section">
          <Link to="/calendar" className="link">
            <img src="calendar.png" />
          </Link>
        </div>
        <div className="nav-section">
          <Link to="/chat" className="link">
            <img src="chat.png" />
          </Link>
        </div>
        <div className="nav-section" onClick={this.logout}>
          <img src="logout.png" />
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
