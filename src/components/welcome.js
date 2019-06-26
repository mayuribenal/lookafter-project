import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Registration from './registration';
import Login from './login';
import Fade from 'react-reveal/Fade';
import Rating from 'react-rating';

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="logo-welcome">
        <Fade left>
          <img id="logofront" src="./400bw.png" />
        </Fade>
        <Fade top delay={1500}>
          <h1>Sometime. Somehow.</h1>
        </Fade>
      </div>
      <HashRouter>
        <div className="reg-log">
          <Fade right>
            <Route exact path="/" component={Registration} />
          </Fade>

          <Fade right>
            <Route path="/login" component={Login} />
          </Fade>
        </div>
      </HashRouter>
    </div>
  );
};

export default Welcome;
// <div className="cat-anim">
// <img id='cat' src="./walking.gif" />
// </div>
