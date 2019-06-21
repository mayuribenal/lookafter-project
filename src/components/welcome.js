import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Registration from './registration';
import Login from './login';

const Welcome = () => {
  return (
    <div className="welcome">
      <img src="./400bw.png" />
      <HashRouter>
        <div>
          <Route exact path="/" component={Registration} />
          <Route path="/login" component={Login} />
        </div>
      </HashRouter>
    </div>
  );
};

export default Welcome;
