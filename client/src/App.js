import React from 'react';
import './App.css';
import TableList from './components/main/tableList/TableList';
import Login from './components/registro_login/login/Login';
import { Route, Switch } from 'react-router-dom';
import UserProfile from './components/main/userProfile/UserProfile';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={TableList}/>
        <Route exact path="/userProfile" component={UserProfile}/>
      </Switch>
    </div>
  );
}

export default App;
