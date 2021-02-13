import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import Login from './components/register_login/login/Login';
import Register from './components/register_login/registro/Register';
import Header from './components/main/header/Header';
import Main from './components/main/Main';
import ListProjects from './components/main/projects/listProjects/ListProjects';
import UserProfile from './components/main/userProfile/UserProfile';

export default function App() {
  
  return (
    <div className="App">
      <Switch>

        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route path="/" render={() => (
          <>
            <Route path="/" component={Header} />
            <Route exact path="/" component={Main} />
            <Route path="/userProfile" component={UserProfile} />
            <Route path="/listProjects" component={ListProjects} />
          </>
        )} />
      </Switch>
    </div>
  );
}