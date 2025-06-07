import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this is correct
import './styles/EntryPage.css';
import './styles/LoginPage.css';
import './styles/Dashboard.css';

// Get the root DOM node
const container = document.getElementById('root');

// Create a root and render
const root = createRoot(container);
root.render(
  <Router>
    <App />
  </Router>
);
