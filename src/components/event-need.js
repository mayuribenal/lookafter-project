import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from './axios';
import TimePicker from 'rc-time-picker';
import { closeEventEditor, addEventNeed } from './actions';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
    this.bookEvent = this.bookEvent.bind(this);
  }
  bookEvent() {
    let start = document.querySelector('.time-picker .rc-time-picker-input')
      .value;
    let end = document.querySelector('.time-picker2 .rc-time-picker-input')
      .value;
    let bookedEvent = document.querySelector('input').value;
    axios
      .post('/reserve-date-need', {
        start: moment(this.props.start).format('D MMM YYYY') + ' ' + start,
        end: moment(this.props.end).format('D MMM YYYY') + ' ' + end,
        title: bookedEvent
      })
      .then(({ data }) => {
        if (data.error) {
          this.setState({
            error: true
          });
        } else if (data.response) {
          this.setState({
            notAllowed: true
          });
        } else {
          for (var i = 0; i < data.length; i++) {
            data[i].start = moment(data[i].start).toDate();
            data[i].end = moment(data[i].end).toDate();
          }
          this.props.dispatch(addEventNeed(data[0]));
          this.props.dispatch(closeEventEditor());
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    const { start, end, user } = this.props;
    const startingTime = moment()
      .hour(this.props.startH)
      .minute(this.props.startM);
    const endingTime = moment()
      .hour(this.props.endH)
      .minute(this.props.endM);
    return (
      <div className="event-scheduler-container">
        <div className="event-scheduler">
          <div className="close">
            <span onClick={() => this.props.dispatch(closeEventEditor())}>
              X
            </span>
          </div>
          <div id="event-input">
            <input
              name="event"
              className="effect"
              type="text"
              placeholder="title"
            />
          </div>
          <div className="time-picker-container">
            <div className="time-picker-container-div">
              <img className="calendar-icon" src="clock.png" />
              <span className="time-picker-date">
                {moment(start).format('D MMM YYYY')} -{' '}
                {moment(end).format('D MM YYYY')}
              </span>
              <TimePicker
                showSecond={false}
                minuteStep={15}
                className="time-picker"
                defaultValue={startingTime}
              />
              <TimePicker
                showSecond={false}
                minuteStep={15}
                className="time-picker2"
                defaultValue={endingTime}
              />
            </div>
            <div className="calendar-container">
              <img className="calendar-icon" src="calendar.png" />
              <button className="event-button" onClick={this.bookEvent}>
                reserve
              </button>
              {this.state.notAllowed && (
                <div className="error">
                  ops, you cannot reserve in the past!
                </div>
              )}
              {this.state.error && (
                <div className="error">ops... please try again!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    start: state.start,
    end: state.end,
    reserveEventsNeed: state.reserveEventsNeed,
    user: state.user
  };
};

export default connect(mapStateToProps)(Event);
