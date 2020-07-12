import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { WithAuthentication } from '../src/context-api/session';
import Routes from './Routes/Routes';

function App(props) {
  return (
    <Router>
      <div className='App'>
        <Routes />
      </div>
    </Router>
  );
}

export default WithAuthentication(App);
