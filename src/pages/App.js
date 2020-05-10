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

import logo from '../assets/logo.svg';
import '../assets/css/App.css';
import UserProfile from './UserProfile';
import SignUp from './signup';
import Login from './login';


// JWT
import { decode } from 'jsonwebtoken';
import PostForm from './postForm';

function App() {
  const loggedInQuery = useQuery(IS_LOGGED_IN);
  const { isLoggedIn } = loggedInQuery.data;

  // const currentUserQuery = useQuery(CURRENT_USER);
  // const { currentUser } = currentUserQuery.data;

  const decoded_token = decode(localStorage.getItem('token'));
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {id: decoded_token ? decoded_token.id : null}
  });
  console.log(data);

  return (
    <Fragment>
      <CoronaNavBar userLoggedIn={isLoggedIn} currentUser={data ? data.getUser : null} />
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
          {/* Permitir ingresar al form de un post solo si esta loggeado y es un empleador */}
          <Route path="/post/new">
            <PostForm />
          </Route>
          {isLoggedIn? <Route exact path="/users/:userId">
            <UserProfile />
          </Route> : null}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App;
