import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

import Register from './components/register_login/registro/Register';
import UserProfile from './components/main/userProfile/UserProfile';
import ListProjects from './components/main/projects/ListProjects';
import Login from './components/register_login/login/Login';
import Header from './components/main/header/Header';
import ProtectedRoute from './routes/ProtectedRoute';
import Loading from './components/loading/Loading';
import Main from './components/main/Main';
import api from './redux/action-creator';
import actions from './redux/actions';
import { url } from './utils/url';

import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const { USER} = api;
  const { SPINNER } = actions
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get(`${url}/user/${token}`)
        .then(({ data }) => {
          dispatch({ type: USER, payload: data })
          dispatch({ type: SPINNER, payload: true })
          setLoading(false)
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Someting went wrong!, please recharge the page',
          })
        })
    }
    if (!token) {
      setLoading(false)
    }
  }, [dispatch, USER, SPINNER])

  return (
    <div className="App">
      {loading && <Loading/>}
      {!loading &&
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <>
            <ProtectedRoute path="/" Component={Header} user={user} />
            <ProtectedRoute exact path="/" Component={Main} user={user} />
            <ProtectedRoute path="/userProfile" Component={UserProfile} user={user} />
            <ProtectedRoute path="/listProjects" Component={ListProjects} user={user} />
          </>
        </Switch>
      }
    </div>
  );
}