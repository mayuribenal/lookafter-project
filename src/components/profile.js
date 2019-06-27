import React from 'react';
import { connect } from 'react-redux';
import { setUploaderVisible } from './actions';
import moment from 'moment';
import Uploader from './uploader';
import BioEditor from './bioeditor';
import BioFamily from './biofamily';
import Rating from 'react-rating';

class Profile extends React.Component {
  render() {
    const {
      user,
      reserveEventsNeed,
      reserveEventsOffer,
      uploaderVisible
    } = this.props;
    console.log('MY PROFILE PROPS:', this.props);
    const ratingChanged = newRating => {
      console.log(newRating);
    };
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
        <div className="header-profile">
          <div className="event-title">
            <img src="heart.png" className="icon-events" />
            <h2>
              your commitments in{' '}
              <span className="capitalize">{user.hood}</span>
            </h2>
          </div>
          <h2 className="capitalize">welcome, {user.first}!</h2>
          <div className="event-title">
            <img src="heart.png" className="icon-events" />
            <h2>
              your requests in <span className="capitalize">{user.hood}</span>
            </h2>
          </div>
        </div>
        <div className="profile-main">
          <div className="userEvents">
            <div className="userEventsNeed">{userEventsNeed}</div>
            <div className="profile-info">
              <div className="profilepic-container">
                <div className="profilepic-uploader">
                  <img
                    className="profilepic"
                    src={user.pic || 'user.png'}
                    onClick={() => this.props.dispatch(setUploaderVisible())}
                  />
                  {uploaderVisible && (
                    <Uploader
                      closeModalHandler={() =>
                        this.setState({ setUploaderVisible: false })
                      }
                    />
                  )}
                </div>
              </div>
              <div className="ratings">
                <h3>your ratings:</h3>
                <Rating initialRating={3} readonly />
              </div>
              <BioEditor />
            </div>
            <div className="userEventsOffer">{userEventsOffer}</div>
          </div>
          <div className="setbio">
            <div className="family-bio">
              <h1>family members:</h1>
              <button className="add-member">+ add member</button>
            </div>
            <div className="bio-img-container">
              <div>
                <div className="bio-animals">
                  <img className="pets" src="bulldog.jpg" />
                  <div className="bio-animals-box" />
                </div>
                <BioFamily />
              </div>
              <div>
                <div className="bio-animals">
                  <img className="plants" src="aloe.jpg" />
                  <div className="bio-animals-box">
                    <p>
                      this is my aloe vera! It only needs water 1x week. feel
                      free to take the gel from the leaft if you need to relieve
                      pain from scrapes and burns
                    </p>
                  </div>
                </div>
                <button>edit</button>
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
