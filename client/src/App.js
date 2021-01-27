import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import TableList from './components/main/tableList/TableList';
import Login from './components/register_login/login/Login';
import UserProfile from './components/main/userProfile/UserProfile';
import Register from './components/register_login/registro/Register';
import Main from './components/main/Main';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={Main}/>
        <Route exact path="/userProfile" component={UserProfile}/>
      </Switch>
    </div>
  );
}

export default App;
