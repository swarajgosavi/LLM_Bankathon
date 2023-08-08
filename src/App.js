import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import DashboardHR from './components/DashboardHR';
import CardDetails from './components/CardDetails';
import UploadPage from './components/UploadPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      
      <Switch>
        
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        {/* <Route path="/dashboard" exact component={DashboardHR} />
        <Route path="/card/:jobTitle" exact component={CardDetails} /> */}

        <Route path="/upload" exact component={UploadPage} />
      </Switch>
    </Router>
  );
};

export default App;
