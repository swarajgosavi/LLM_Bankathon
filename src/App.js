import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';



const App = () => {
  return (
    <Router>

      <Navbar></Navbar>
      <Switch>
        <Route path="/"> 
          <Home />
        </Route>
        <Route path="/login"> 
          <Login />
        </Route>
        <Route path="/signup" emelent={}>
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default App;
