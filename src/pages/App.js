// React
import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useQuery } from '@apollo/client';

// graphql
import { USERS } from '../graphql/queries/users';

import { CoronaNavBar } from '../containers';

import logo from '../assets/logo.svg';
import '../assets/css/App.css';
import SignUp from './signup';
import Login from './login';

function App() {
  // TODO: create inner query to know if there is a user logged in
  let userLoggedIn = true;

  return (
    <Fragment>
      <CoronaNavBar userLoggedIn={userLoggedIn} />
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
          <Route path="/">
            <Home />
          </Route>
          {/* TODO: Delete about page */}
          <Route path="/about">
            <About />
          </Route>
          {/* TODO: Delete users page */}
          <Route path="/users">
            <Users />
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

function About() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {/* Edit <code>src/App.js</code> and save to reload. */}
          About
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

function Users() {
  const { data, loading, error } = useQuery(USERS);
  console.log(data);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {/* Edit <code>src/App.js</code> and save to reload. */}
          Users
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
