import React from 'react';
import moment from 'moment';
import axios from './axios';
import { connect } from 'react-redux';
import { removeEvent } from './actions';

class Popover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.remove = this.remove.bind(this);
  }
  remove(id, hood) {
    axios
      .post('remove-event', {
        id: id,
        hood: hood
      })
      .then(({ data }) => {
        if (!data.response) {
          console.log('my data from event:', data.response);
          this.props.dispatch(removeEvent(id));
          this.props.closeEvent();
        } else {
          this.setState({
            error: true
          });
        }
      });
  }
  render() {
    return (
      <div className="event-scheduler-container">
        <div className="event-scheduler">
          <div className="close">
            <span onClick={() => this.props.closeEvent()}>X</span>
          </div>
          <div className="event-info">
            <h3 className="capitalize">{this.props.eventInfo.title}</h3>
            <p className="capitalize">Booked by {this.props.eventInfo.hood}</p>
            <p>
              {moment(this.props.eventInfo.start).format('DD MMM')} to{' '}
              {moment(this.props.eventInfo.end).format('DD MMM')}
            </p>
            <p>
              From {moment(this.props.eventInfo.start).format('HH:mm')} to{' '}
              {moment(this.props.eventInfo.end).format('HH:mm')}
            </p>
            <button
              className="event-button"
              onClick={() =>
                this.remove(this.props.eventInfo.id, this.props.eventInfo.hood)
              }
            >
              Remove
            </button>
            {this.state.error && (
              <p className="error">Sorry, you cannot remove this event.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return { state };
};

export default connect(mapStateToProps)(Popover);
