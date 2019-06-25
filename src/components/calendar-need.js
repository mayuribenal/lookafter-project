import React from 'react';
import BigCalendar from 'react-big-calendar';
import { connect } from 'react-redux';
import moment from 'moment';
import Event from './event-need.js';
import Popover from './popover-need';
import { setEventEditorVisible, displayDate } from './actions';
import CustomToolbar from './custom-toolbar';
const localizer = BigCalendar.momentLocalizer(moment);

class CalendarNeed extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.showEventEditor = this.showEventEditor.bind(this);
    this.showEvent = this.showEvent.bind(this);
    this.closeEvent = this.closeEvent.bind(this);
  }
  showEventEditor({ start, end }) {
    this.setState({
      startH: moment(start).format('HH'),
      startM: moment(start).format('mm'),
      endH: moment(end).format('HH'),
      endM: moment(end).format('mm')
    });
    this.props.dispatch(setEventEditorVisible());
    this.props.dispatch(displayDate(start, end));
  }
  showEvent(eventInfo) {
    this.setState({
      popOverIsVisible: true,
      eventInfo: eventInfo
    });
  }
  closeEvent() {
    this.setState({
      popOverIsVisible: false
    });
  }
  render() {
    const { reserveEventsNeed, eventEditorVisible } = this.props;
    const currentDateTime = moment().toDate();

    return (
      <div className="main">
        <div className="calendar-main">
          <h1>
            your <img src="./400bw.png" width="150px" /> need
          </h1>
          <div className="calendar">
            <BigCalendar
              scrollToTime={currentDateTime}
              defaultDate={currentDateTime}
              selectable
              localizer={localizer}
              events={reserveEventsNeed || []}
              timeslots={4}
              startAccessor="start"
              endAccessor="end"
              onSelectSlot={this.showEventEditor}
              onSelectEvent={this.showEvent}
              showMultiDayTimes
              components={{ toolbar: CustomToolbar }}
              eventPropGetter={event => {
                let newStyle = {
                  backgroundColor: '#ff6979',
                  color: 'white',
                  border: 'none'
                };
                if (event.hood == 'the callbacks') {
                  newStyle.backgroundColor = 'rgb(153, 230, 153)';
                } else if (event.hood == 'promises') {
                  newStyle.backgroundColor = 'rgb(255, 128, 128)';
                } else if (event.hood == 'manutos') {
                  newStyle.backgroundColor = 'rgb(255, 236, 128)';
                }
                return {
                  className: '',
                  style: newStyle
                };
              }}
            />
            {this.state.popOverIsVisible && (
              <Popover
                eventInfo={this.state.eventInfo}
                closeEvent={this.closeEvent}
              />
            )}
          </div>
        </div>
        {eventEditorVisible && (
          <Event
            startH={this.state.startH}
            startM={this.state.startM}
            endH={this.state.endH}
            endM={this.state.endM}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    eventEditorVisible: state.eventEditorVisible,
    reserveEventsNeed: state.reserveEventsNeed,
    user: state.user
  };
};

export default connect(mapStateToProps)(CalendarNeed);
