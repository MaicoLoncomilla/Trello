import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import { url } from './utils/url';
import api from './redux/action-creator';
import Login from './components/register_login/login/Login';
import Register from './components/register_login/registro/Register';
import Header from './components/main/header/Header';
import Main from './components/main/Main';
import ListProjects from './components/main/projects/ListProjects';
import UserProfile from './components/main/userProfile/UserProfile';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './routes/ProtectedRoute';
import Loading from './components/loading/Loading';

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const { USER} = api;
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get(`${url}/user/${token}`)
        .then(({ data }) => {
          dispatch({ type: USER, payload: data })
          setLoading(false)
        })
        .catch(() => {
          alert("Someting went wrong, please recharge the page")
        })
    }
    if (!token) {
      setLoading(false)
    }
  }, [dispatch, USER])
  
  return (
    <div className="App">
      {loading && <Loading/>}
      {!loading &&
        <Switch>
          <Route exact path="/Trello/register" component={Register} />
          <Route exact path="/Trello/login" component={Login} />
          <>
            <ProtectedRoute path="/Trello/" Component={Header} user={user} />
            <ProtectedRoute exact path="/Trello/" Component={Main} user={user} />
            <ProtectedRoute path="/Trello/userProfile" Component={UserProfile} user={user} />
            <ProtectedRoute path="/Trello/listProjects" Component={ListProjects} user={user} />
          </>
        </Switch>
      }
    </div>
  );
}