import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this is correct
import './styles/EntryPage.css';
import './styles/LoginPage.css';
import './styles/Dashboard.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);