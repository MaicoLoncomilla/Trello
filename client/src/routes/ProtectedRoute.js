import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ user, Component, ...rest }) {

  return (
    <Route {...rest} render={(props) => {
      if (user) {
        return <Component />
      } else {
        return (<Redirect to={{pathname: "/Trello/login", state: { from: props.location }}} />)
      }
    }}>
    </Route>
  )
}