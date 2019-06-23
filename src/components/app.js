import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  loggedInUser,
  getDatesOffer,
  getDatesNeed,
  getMembers
} from './actions';
import Navigation from './navigation';
import Home from './home';
import Chat from './chat';
import CalendarOffer from './calendar-offer';
import CalendarNeed from './calendar-need';
import Profile from './profile';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(loggedInUser());
    this.props.dispatch(getDatesOffer());
    this.props.dispatch(getDatesNeed());
    this.props.dispatch(getMembers());
  }
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" render={() => <Home />} />
          <Navigation />
          <Route path="/home" component={Home} />
          <Route path="/calendar-offer" component={CalendarOffer} />
          <Route path="/profile" component={Profile} />
          <Route path="/calendar-need" component={CalendarNeed} />
          <Route path="/chat" component={Chat} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user,
    reserveEventsNeed: state.reserveEventsNeed,
    reserveEventsOffer: state.reserveEventsOffer
  };
};

export default connect(mapStateToProps)(App);
