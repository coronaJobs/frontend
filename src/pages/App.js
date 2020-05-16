// React
import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useQuery } from '@apollo/client';

// GraphQL
import { GET_USER } from '../graphql/queries/users';
import { IS_LOGGED_IN } from '../graphql/queries/inner_queries';

import { CoronaNavBar, Loading } from '../containers';

// Bootstrap
import '../assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProfile from './UserProfile';
import SignUp from './signup';
import Login from './login';
import Home from './Home';

// JWT
import { decode } from 'jsonwebtoken';


function App() {
  const loggedInQuery = useQuery(IS_LOGGED_IN);
  const { isLoggedIn } = loggedInQuery.data;

  const decoded_token = decode(localStorage.getItem('token'));
  const { data, loading } = useQuery(GET_USER, {
    variables: {id: decoded_token ? parseInt(decoded_token.id) : null},
    fetchPolicy: 'network-only',
  });

  // TODO: Handle errors
  return (
    <Fragment>
      <CoronaNavBar userLoggedIn={isLoggedIn} currentUser={data ? data.getUser : null} />
      {loading ? (
        <Loading />
      ) : [
        <Router key='router'>
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            {isLoggedIn? <Route exact path="/users/:userId">
              <UserProfile />
            </Route> : null}
            <Route path="/">
              <Home userLoggedIn={isLoggedIn}/>
            </Route>
          </Switch>
        </Router>
      ]}
    </Fragment>
  );
}

export default App;
