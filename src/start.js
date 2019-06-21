import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './components/reducers';
import { initSocket } from './components/socket';
import Welcome from './components/welcome';
import App from './components/app.js';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(reduxPromise))
);

let component;

if (location.pathname == '/welcome') {
  component = <Welcome />;
} else {
  component = (initSocket(store),
  (
    <Provider store={store}>
      <App />
    </Provider>
  ));
}

ReactDOM.render(component, document.querySelector('main'));
