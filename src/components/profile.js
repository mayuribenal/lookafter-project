import React from 'react';
import { connect } from 'react-redux';
import { setUploaderVisible } from './actions';
import moment from 'moment';
import Uploader from './uploader';

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
            <h3>{ev.title}</h3>
            <p>
              from {moment(ev.start).format('D MMM YYYY')} to{' '}
              {moment(ev.end).format('D MMM YYYY')}
            </p>
          </div>
        );
      });
    const userEventsOffer = reserveEventsOffer
      .filter(ev => user.hood == ev.hood && a <= ev.end)
      .map(ev => {
        return (
          <div className="schedule-container-offer " key={ev.id}>
            <h3>{ev.title}</h3>
            <p>
              from {moment(ev.start).format('D MMM YYYY')} to{' '}
              {moment(ev.end).format('D MMM YYYY')}
            </p>
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
                you lookafter need in{' '}
                <span className="capitalize">{user.hood}</span>
              </h2>
            </div>
            {userEventsNeed}
          </div>
          <div className="profile-info">
            <div className="profilepic-container">
              <div className="profilepic-uploader">
                <img
                  className="profilepic"
                  src={user.pic || 'user.png'}
                  onClick={() => this.props.dispatch(setUploaderVisible())}
                />
                {uploaderVisible && <Uploader />}
              </div>
            </div>
            <h2 className="capitalize">welcome, {user.first}!</h2>
          </div>
          <div className="userEventsOffer">
            <img src="magnifier-tool.png" className="icon-events" />
            <h2>
              your lookafter support in{' '}
              <span className="capitalize">{user.hood}</span>
            </h2>
            {userEventsOffer}
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
