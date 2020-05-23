// React
import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";

// GraphQL
import { IS_LOGGED_IN, CURRENT_USER } from "../graphql/queries/inner_queries";
import { CurrentUser } from "../components";
import { CoronaNavBar } from "../containers";

// Bootstrap
import "../assets/css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserProfile from "./UserProfile";
import SignUp from "./signup";
import Login from "./login";
import Home from "./Home";
import CurrentPosts from "./Posts";

function App() {
  const loggedInQuery = useQuery(IS_LOGGED_IN);
  const { isLoggedIn } = loggedInQuery.data;

  const currentUserQuery = useQuery(CURRENT_USER);
  const { currentUser } = currentUserQuery.data;

  // TODO: Handle errors
  return (
    <Fragment>
      {isLoggedIn ? <CurrentUser /> : null}
      <CoronaNavBar userLoggedIn={isLoggedIn} currentUser={currentUser} />
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
          <Route path="/posts">
            <CurrentPosts userLoggedIn={isLoggedIn}></CurrentPosts>
          </Route>
          {isLoggedIn ? (
            <Route exact path="/users/:userId">
              <UserProfile />
            </Route>
          ) : null}
          <Route path="/">
            <Home userLoggedIn={isLoggedIn} />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
