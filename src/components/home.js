import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
  render() {
    if (!this.props.members) {
      return null;
    }

    return (
      <div className="main">
        <h1 className="home">home</h1>
        <div className="home-container">
          <div className="home-box-w ">
            <div className="home-w">
              <div className="about">
                <img src="push-pin.png" />
                <h3 className="home-title">about us</h3>
              </div>
              <p>
                we are a community of people that love pets and plants and take
                them as part of our family. we believe that through human
                connection and collective support we can create a more loving
                and healthier atmosphere and spread that to those around us.{' '}
              </p>
            </div>
          </div>
          <div className="home-box-x">
            <div className="home-x">
              <div className="mission">
                <img src="target.png" />
                <h3 className="home-title">our mission</h3>
              </div>
              <p>
                to connect to our community by committing to share our support
                and our needs through a group calendar so that our members can
                look after their pets and plants.
              </p>
            </div>
          </div>
          <h1 className="how-it-works">how it works</h1>
          <div className="home-box-y">
            <div className="home-y">
              <div className="step-one">
                <h3 className="home-title">step 1</h3>
              </div>
              <p>
                <strong>registration</strong>
              </p>
              <img src="writing.png" />
            </div>
            <div className="home-a">
              <div className="step-two">
                <h3 className="home-title">step 2</h3>
              </div>
              <img src="user.png" />
              <p>
                <strong>add bio</strong>
              </p>
              <p>
                add your bio and your family member(s) in your profile(make sure
                to include all the important instructions)
              </p>
            </div>
          </div>
          <div className="home-box-z">
            <div className="home-z">
              <div className="step-two">
                <h3 className="home-title">step 3</h3>
              </div>
              <img src="calendarneed.png" />
              <p>
                <strong>your need</strong>
              </p>
              <p>
                select the date and time that you need a member to look after
                your pets and plants.
              </p>
            </div>
            <div className="home-a">
              <div className="step-two">
                <h3 className="home-title">step 3</h3>
              </div>
              <img src="calendaroffer.png" />
              <p>
                <strong>your support</strong>
              </p>
              <p>
                select the date and time that suits you to support a member by
                looking after their pets and plants
              </p>
            </div>
          </div>

          <div className="home-box-m">
            <div className="home-m">
              <div className="match">
                <h3 className="home-title-m">step 4</h3>
              </div>
              <img src="handshake.png" />
              <p>in case there is a match: communicate and organize to meet</p>
            </div>
          </div>
          <div className="home-box-i">
            <div className="home-i">
              <div className="important">
                <img src="warning.png" />
                <h3 className="home-title-i">important</h3>
              </div>
              <p>
                we highly encourage people to meet each other face to face. Real
                time communication and a short introduction to the pets and
                plants are extremely helpful for a smooth community support. The
                location is probably just around the corner from you
              </p>
            </div>
          </div>
        </div>
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

// gethood = hoodName => {
//   return this.props.members
//     .filter(member => member.hood === hoodName)
//     .map(member => {
//       return (
//         <div key={member.id} className="member">
//           <img src={member.img || 'profile.png'} />
//           <h4 className="capitalize">
//             {member.first} {member.last}
//           </h4>
//           <span className="email">{member.email}</span>
//         </div>
//       );
//     });
// };

// <div className="members">{this.hood}</div>

// <div className="members">{this.hood}</div>
