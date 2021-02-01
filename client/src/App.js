import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/register_login/login/Login';
import UserProfile from './components/main/userProfile/UserProfile';
import Register from './components/register_login/registro/Register';
import Main from './components/main/Main';
import Header from './components/main/header/Header';
import ListProjects from './components/main/projects/listProjects/ListProjects';

function App() {
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

export default App;
