import React from 'react';
// import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Routes from './routes';
import history from './services/history';

import "./App.css";



function App() {
  return (
    <div className="body">
        <Router history={history}>
          <Routes />
        </Router>
    </div>
  );
}

export default App;
