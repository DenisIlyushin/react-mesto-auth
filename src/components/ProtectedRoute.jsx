import React from "react";
import {Route, Redirect} from 'react-router-dom';

export default function ProtectedRoute({component: Component, isloggedIn, ...props}) {
  return (
    <Route>
      {() =>
        isloggedIn
          ? <Component {...props}/>
          : <Redirect to='/sign-in'/>
      }
    </Route>
  )
}