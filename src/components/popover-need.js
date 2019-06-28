import React from 'react';
import moment from 'moment';
import axios from './axios';
import { connect } from 'react-redux';
import { removeEventNeed } from './actions';

class Popover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.remove = this.remove.bind(this);
  }
  remove(id, hood) {
    axios
      .post('remove-event-need', {
        id: id,
        hood: hood
      })
      .then(({ data }) => {
        if (!data.response) {
          this.props.dispatch(removeEventNeed(id));
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
            <p className="capitalize">
              reserved in {this.props.eventInfo.hood}
            </p>
            <p>
              {moment(this.props.eventInfo.start).format('DD MMM')} to{' '}
              {moment(this.props.eventInfo.end).format('DD MMM')}
            </p>
            <p>
              from {moment(this.props.eventInfo.start).format('HH:mm')} to{' '}
              {moment(this.props.eventInfo.end).format('HH:mm')}
            </p>
            <p>
              by {this.props.eventInfo.first} {this.props.eventInfo.last}
            </p>
            <img className="popover-img" src={this.props.eventInfo.img} />
            <div className="popover-section">
              <button
                className="event-button"
                onClick={() =>
                  this.remove(
                    this.props.eventInfo.id,
                    this.props.eventInfo.hood
                  )
                }
              >
                <img src="delete.png" width="25px" height="25px" />
              </button>
              <img src="writing.png" width="25px" height="25px" />
            </div>
            {this.state.error && (
              <p className="error">sorry, you cannot remove this.</p>
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
