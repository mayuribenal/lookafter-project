import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: false };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = async e => {
    e.preventDefault();

    const response = await axios.post('/login', {
      email: this.state.email,
      password: this.state.password
    });

    response.data.success
      ? location.replace('/')
      : this.setState({ error: true });
  };

  render() {
    return (
      <div className="login">
        {this.state.error && (
          <div className="error">
            user or password does not exist. please try again.
          </div>
        )}
        <form className="form-welcome" onSubmit={this.onFormSubmit}>
          <div className="input-field">
            <input
              onChange={this.onChange}
              name="email"
              className="effect"
              type="text"
              placeholder="email"
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
              placeholder="password"
              autoComplete="off"
            />
            <span className="focus-border" />
          </div>
          <button type="submit">log in</button>
        </form>
        <p>
          go to{' '}
          <Link to="/" className="link">
            registration
          </Link>
        </p>
      </div>
    );
  }
}

export default Login;
