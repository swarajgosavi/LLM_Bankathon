import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import DashboardHR from './components/DashboardHR';
import Candidates from './components/Candidates';
import UploadPage from './components/UploadPage';
import Test from './components/TestInterface';
import Instructions from './components/Instructions';



const App = () => {
  return (
    <Router>
      <Navbar />
      
      <Switch>
        
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        {/* <Route path="/dashboard" exact component={DashboardHR} /> */}

        <Route path="/upload" exact component={UploadPage} />
        <Route path="/candidates" exact component={Candidates} />
        <Route path="/instructions" exact component={Instructions} />
        <Route path="/test" exact component={Test} />
      </Switch>
    </Router>
  );
};

export default App;
