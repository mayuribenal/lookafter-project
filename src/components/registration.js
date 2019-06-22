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

  onSelect(mytarget) {
    this.setState({
      hood: mytarget
    });
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
            <select
              className="hood-select"
              name="hood"
              placeholder="pick your favorite bug..."
              onChange={e => {
                let mytarget = e.target;
                this.onSelect(mytarget[mytarget.selectedIndex].text);
              }}
            >
              <option value="">select your area...</option>
              <option value="kreuzberg">Kreuzberg</option>
              <option value="mitte">Mitte</option>
              <option value="neukoelln">Prenzlauer Berg</option>
              <option value="schoeneberg">Schöneberg</option>
            </select>
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
