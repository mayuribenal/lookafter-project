import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
  gethood = hoodName => {
    return this.props.members
      .filter(member => member.hood === hoodName)
      .map(member => {
        return (
          <div key={member.id} className="member">
            <img src={member.img || 'profile.png'} />
            <h4 className="capitalize">
              {member.first} {member.last}
            </h4>
            <span className="email">{member.email}</span>
          </div>
        );
      });
  };

  render() {
    if (!this.props.members) {
      return null;
    }

    return (
      <div className="main">
        <div className="home-top">
          <div className="home-welcome" />
        </div>
        <h1 className="hoods">home</h1>
        <h3 className="our-members-title">a friend will lookafter you</h3>
        <div className="members">{this.hood}</div>
        <h3 className="our-members-title">you'll lookafter a friend</h3>
        <div className="members">{this.hood}</div>
        <h3 className="our-members-title">miscellaneous</h3>
        <div className="members">{this.hood}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    members: state.members
  };
};

export default connect(mapStateToProps)(Home);
