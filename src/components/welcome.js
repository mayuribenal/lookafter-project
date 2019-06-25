import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Registration from './registration';
import Login from './login';
import Fade from 'react-reveal/Fade';

const Welcome = () => {
  return (
    <div className="welcome">
      <Fade left>
        <img id="logofront" src="./400bw.png" />
      </Fade>
      <Fade top>
        <h1>Sometime. Somehow.</h1>
      </Fade>

      <HashRouter>
        <div>
          <div>
            <Fade right>
              <Route exact path="/" component={Registration} />
            </Fade>
          </div>
          <div>
            <Fade right>
              <Route path="/login" component={Login} />
            </Fade>
          </div>
        </div>
      </HashRouter>
    </div>
  );
};

export default Welcome;
// <div className="cat-anim">
// <img id='cat' src="./walking.gif" />
// </div>
