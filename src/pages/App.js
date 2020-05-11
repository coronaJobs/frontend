// React
import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useQuery } from '@apollo/client';

// GraphQL
import { GET_USER } from '../graphql/queries/users';
import { IS_LOGGED_IN, CURRENT_USER } from '../graphql/queries/inner_queries';

import { CoronaNavBar } from '../containers';

// Bootstrap
import { Spinner } from 'react-bootstrap';
import '../assets/css/App.css';
import UserProfile from './UserProfile';
import SignUp from './signup';
import Login from './login';
import Home from './Home';

// JWT
import { decode } from 'jsonwebtoken';

function App() {
  const loggedInQuery = useQuery(IS_LOGGED_IN);
  const { isLoggedIn } = loggedInQuery.data;

  // const currentUserQuery = useQuery(CURRENT_USER);
  // const { currentUser } = currentUserQuery.data;

  const decoded_token = decode(localStorage.getItem('token'));
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {id: decoded_token ? parseInt(decoded_token.id) : null},
    fetchPolicy: 'network-only',
  });

  // TODO: Handle errors
  return (
    <Fragment>
      {loading ? (
        <Spinner animation="grow" role="status" as="h1" />
      ) : [
        <CoronaNavBar userLoggedIn={isLoggedIn} currentUser={data ? data.getUser : null} />,
        <Router>
          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
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
              <Home />
            </Route>
          </Switch>
        </Router>
      ]}
    </Fragment>
  );
}

export default App;
