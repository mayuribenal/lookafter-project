import React from 'react';
import { connect } from 'react-redux';
import { setUploaderVisible } from './actions';
import moment from 'moment';
import Uploader from './uploader';

class Profile extends React.Component {
  render() {
    const { user, reserveEvents, uploaderVisible } = this.props;
    if (!user || !reserveEvents) {
      return null;
    }
    let a = moment();
    const userEvents = reserveEvents
      .filter(ev => user.hood == ev.hood && a <= ev.end)
      .map(ev => {
        return (
          <div className="schedule-container" key={ev.id}>
            <h3>{ev.title}</h3>
            <p>
              {moment(ev.start).format('DD MMM')} to{' '}
              {moment(ev.end).format('DD MMM')}
            </p>
            <p>
              From {moment(ev.start).format('HH:mm')} to{' '}
              {moment(ev.end).format('HH:mm')}
            </p>
          </div>
        );
      });
    return (
      <div className="main">
        <div className="profile-main">
          <div className="profile-info">
            <div className="profilepic-container">
              <img
                className="profilepic"
                src={user.pic || 'profile.png'}
                onClick={() => this.props.dispatch(setUploaderVisible())}
              />
              {uploaderVisible && <Uploader />}
            </div>
            <h2 className="capitalize">Welcome, {user.first}!</h2>
          </div>
          <div className="userEvents">
            <h2>
              your lookafters in <span className="capitalize">{user.hood}</span>
            </h2>
            {userEvents}
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
    reserveEvents: state.reserveEvents
  };
};

export default connect(mapStateToProps)(Profile);
