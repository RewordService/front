import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

switch (process.env.NODE_ENV) {
  case 'development':
    axios.defaults.baseURL = 'http://localhost:3000/api';
    break;
  case 'production':
    axios.defaults.baseURL = 'https://reword-web.herokuapp.com/api';
    break;
  default:
    axios.defaults.baseURL = 'http://localhost:3000/api';
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
