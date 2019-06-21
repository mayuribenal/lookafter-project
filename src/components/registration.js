import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      hood: '',
      email: '',
      password: '',
      error: false
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = async e => {
    e.preventDefault();
    const response = await axios.post('/register', {
      first: this.state.first,
      last: this.state.last,
      hood: this.state.hood,
      email: this.state.email,
      password: this.state.password
    });

    response.data.success
      ? location.replace('/')
      : this.setState({ error: true });
  };

  render() {
    return (
      <div className="register">
        {this.state.error && (
          <div className="error">Ops... Please try again!</div>
        )}
        <form className="form-welcome" onSubmit={this.onFormSubmit}>
          <div className="input-field">
            <input
              onChange={this.onChange}
              name="first"
              className="effect"
              type="text"
              placeholder="First Name"
              autoComplete="off"
              value={this.state.first}
            />
            <span className="focus-border" />
          </div>
          <div className="input-field">
            <input
              onChange={this.onChange}
              name="last"
              className="effect"
              type="text"
              placeholder="Last Name"
              autoComplete="off"
              value={this.state.last}
            />
            <span className="focus-border" />
          </div>
          <div className="input-field">
            <input
              onChange={this.onChange}
              name="hood"
              className="effect"
              type="text"
              placeholder="hood"
              autoComplete="off"
              value={this.state.hood}
            />
            <span className="focus-border" />
          </div>
          <div className="input-field">
            <input
              onChange={this.onChange}
              name="email"
              className="effect"
              type="text"
              placeholder="Email address"
              autoComplete="off"
              value={this.state.email}
            />
            <span className="focus-border" />
          </div>
          <div className="input-field">
            <input
              onChange={this.onChange}
              name="password"
              className="effect"
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={this.state.password}
            />
            <span className="focus-border" />
          </div>
          <button type="submit">register</button>
        </form>
        <p>
          already registered?{' '}
          <Link to="/login" className="link">
            log in
          </Link>
        </p>
      </div>
    );
  }
}

export default Registration;
