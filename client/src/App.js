import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';

import {logoutUser, setCurrentUser} from './actions/authAction';
import setAuthToken from './utils/setAuthToken';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';

import './App.css';

if(localStorage.jwtToken)
{
  // Set auth token
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  
  const currentTime = Date.now / 1000;
  if(decoded.exp < currentTime)
  {
    store.dispatch(logoutUser());

    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route path="/" exact component={ Landing }/>
          <div className="container">
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Switch>
              <PrivateRoute path="/dashboard" exact component={Dashboard}/>
            </Switch>
            <Switch>
              <PrivateRoute path="/create-profile" exact component={CreateProfile}/>
            </Switch>
             <Switch>
              <PrivateRoute path="/edit-profile" exact component={EditProfile}/>
            </Switch>
            <Switch>
              <PrivateRoute path="/add-experience" exact component={AddExperience}/>
            </Switch>
            <Switch>
              <PrivateRoute path="/add-education" exact component={AddEducation}/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
