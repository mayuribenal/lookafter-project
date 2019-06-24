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
          <div className="error">ops... Please try again!</div>
        )}
        <form className="form-welcome" onSubmit={this.onFormSubmit}>
          <div className="input-field">
            <input
              onChange={this.onChange}
              name="first"
              className="effect"
              type="text"
              placeholder="first name"
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
              placeholder="last name"
              autoComplete="off"
              value={this.state.last}
            />
            <span className="focus-border" />
          </div>
          <div className="input-field">
            <div className="box">
              <select
                className="hood-select"
                name="hood"
                placeholder="pick your favorite hood..."
                onChange={e => {
                  let mytarget = e.target;
                  this.onSelect(mytarget[mytarget.selectedIndex].value);
                }}
              >
                <option value="">select your hood...</option>
                <option value="Kreuzberg">Kreuzberg</option>
                <option value="Mitte">Mitte</option>
                <option value="Prenzlauer Berg">Prenzlauer Berg</option>
                <option value="Schöneberg">Schöneberg</option>
                <option value="Neukölln">Neukölln</option>
              </select>
            </div>
            <span className="focus-border" />
          </div>
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
