import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DashboardHR from './components/DashboardHR';
import Candidates from './components/Candidates';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Router>
  <App />
 </Router>

);

