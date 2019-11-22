import React from 'react';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';

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
                <h3 className="home-title">about us</h3>
              </div>
              <p>
                we are a community of people that love plants. we believe that
                through human connection and collective support we can create a
                more loving and healthier atmosphere and spread that to those
                around us.{' '}
              </p>
            </div>
            <div className="home-x">
              <div className="mission">
                <h3 className="home-title">our mission</h3>
              </div>
              <p>make the world greener thru communities!</p>
            </div>
          </div>
          <div className="how-it-works-wrap">
            <h1 className="how-it-works">how it works</h1>
            <div className="home-box-y">
              <Fade left delay={700}>
                <div className="home-y">
                  <h3 className="home-title">step 1</h3>
                  <img src="writing.png" />
                  <p>
                    <strong>registration</strong>
                  </p>
                  <p>input your information and select your location.</p>
                </div>
              </Fade>
              <Fade right delay={800}>
                <div className="home-a">
                  <h3 className="home-title">step 2</h3>
                  <img src="user.png" />
                  <p>
                    <strong>add bio</strong>
                  </p>
                  <p>
                    add your bio and your plant(s) in your profile (make sure to
                    include all the important instructions).
                  </p>
                </div>
              </Fade>
              <Fade top delay={500}>
                <div className="home-i">
                  <div className="important">
                    <img src="warning.png" />
                    <h3 className="home-title-i">important</h3>
                  </div>
                  <p>
                    we highly encourage people to meet each other face to face.
                    Real communication and a short introduction to the plants
                    are extremely helpful for a smooth community support. The
                    location is probably just around the corner from you.
                  </p>
                </div>
              </Fade>
            </div>
            <div className="home-box-z">
              <Fade left delay={500}>
                <div className="home-z">
                  <h3 className="home-title">step 3</h3>
                  <img src="calendaroffer.png" />
                  <p>
                    <strong>your need</strong>
                  </p>
                  <p>
                    select the date and time that you need a member to look
                    after your plants.
                  </p>
                </div>
              </Fade>
              <Fade right delay={600}>
                <div className="home-b">
                  <h3 className="home-title">step 4</h3>
                  <img src="calendaroffer.png" />
                  <p>
                    <strong>your availability</strong>
                  </p>
                  <p>
                    select the date and time that suits you to support a member
                    by looking after their plants.
                  </p>
                </div>
              </Fade>
            </div>
            <div className="home-box-m">
              <Fade bottom delay={300}>
                <div className="home-m">
                  <div className="match">
                    <h3 className="home-title-m">step 5</h3>
                  </div>
                  <img src="handshake.png" />
                  <p>
                    <strong>it's a match!</strong>
                  </p>
                  <p>communicate and organize to meet.</p>
                </div>
              </Fade>
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
