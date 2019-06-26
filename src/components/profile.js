import React from 'react';
import { connect } from 'react-redux';
import { setUploaderVisible } from './actions';
import moment from 'moment';
import Uploader from './uploader';
import BioEditor from './bioeditor';

var Rating = require('react-rating');

class Profile extends React.Component {
  render() {
    const {
      user,
      reserveEventsNeed,
      reserveEventsOffer,
      uploaderVisible
    } = this.props;
    if (!user || !reserveEventsNeed || !reserveEventsOffer) {
      return null;
    }
    let a = moment();
    const userEventsNeed = reserveEventsNeed
      .filter(ev => user.hood == ev.hood && a <= ev.end)
      .map(ev => {
        return (
          <div className="schedule-container-need" key={ev.id}>
            <h3>
              {moment(ev.start).format('D MMM YYYY')} to{' '}
              {moment(ev.end).format('D MMM YYYY')}
            </h3>
            <p>{ev.title}</p>
          </div>
        );
      });
    const userEventsOffer = reserveEventsOffer
      .filter(ev => user.hood == ev.hood && a <= ev.end)
      .map(ev => {
        return (
          <div className="schedule-container-offer " key={ev.id}>
            <h3>
              {moment(ev.start).format('D MMM YYYY')} to{' '}
              {moment(ev.end).format('D MMM YYYY')}
            </h3>
            <p>{ev.title}</p>
          </div>
        );
      });
    return (
      <div className="main">
        <div className="userEvents">
          <div className="userEventsNeed">
            <div className="event-title">
              <img src="heart.png" className="icon-events" />
              <h2>
                your needs in <span className="capitalize">{user.hood}</span>
              </h2>
            </div>
            {userEventsNeed}
          </div>
          <div className="profile-info">
            <div className="profilepic-container">
              <div className="profilepic-uploader">
                <h2 className="capitalize">welcome, {user.first}!</h2>
                <img
                  className="profilepic"
                  src={user.pic || 'user.png'}
                  onClick={() => this.props.dispatch(setUploaderVisible())}
                />
                {uploaderVisible && <Uploader />}
              </div>
            </div>
            <div className="ratings" />
            <BioEditor />
          </div>
          <div className="userEventsOffer">
            <img src="heart.png" className="icon-events" />
            <h2>
              your commitments in{' '}
              <span className="capitalize">{user.hood}</span>
            </h2>
            {userEventsOffer}
          </div>
        </div>
        <div className="setbio">
          <div className="family-bio">
            <h1>family members:</h1>
            <button className="add-member">+ add member</button>
          </div>
          <div className="bio-img-container">
            <div className="bio-animals">
              <img className="pets" src="pet.png" />
              <div className="bio-animals-box">
                <h3>Marley</h3>
                <p>he eats 2x per day and loves to play</p>
              </div>
            </div>
            <div className="bio-animals">
              <img className="plants" src="plant.png" />
              <div className="bio-animals-box">
                <h3>Aloe vera</h3>
                <p>needs water 3x per week. aprox 150ml</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user,
    uploaderVisible: state.uploaderVisible,
    reserveEventsNeed: state.reserveEventsNeed,
    reserveEventsOffer: state.reserveEventsOffer
  };
};

export default connect(mapStateToProps)(Profile);
