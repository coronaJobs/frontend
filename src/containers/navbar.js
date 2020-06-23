// React
import React from "react";
import { usePath } from "hookrouter";
// Apollo & GraphQL
import { useApolloClient } from "@apollo/client";
// import { CURRENT_USER } from '../graphql/queries/inner_queries';
// Bootstrap
import { Button, Form, FormControl, Navbar, Nav } from "react-bootstrap";

function EmployeesLinks() {
  return [
    <Nav.Link href="/posts" key="available-posts">
      Ofertas Disponibles
    </Nav.Link>,
  ];
}

function EmployersLinks() {
  return [
    <Nav.Link key="available-posts" href="/">
      Ofertas Vigentes
    </Nav.Link>,
  ];
}

export default function CoronaNavBar({ userLoggedIn, currentUser }) {
  const client = useApolloClient();
  const path = usePath();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="navbar-light navigation-clean-search navbar-background-gray navbar-font-color"
    >
      <Navbar.Brand href="/">CoronaJobs</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="collapse-style">
        {userLoggedIn ? (
          <Nav>
            {currentUser
              ? [
                  currentUser.role.id === 1 ? (
                    <EmployersLinks key="employers-links" />
                  ) : (
                    <EmployeesLinks key="employees-links" />
                  ),
                  <Nav.Link
                    href={currentUser ? `/users/${currentUser.id}` : "/"}
                    disabled={currentUser ? false : true}
                    key="profile-nav-link"
                  >
                    Perfil
                  </Nav.Link>,
                ]
              : null}
          </Nav>
        ) : null}
        <Nav className="ml-auto">
          {userLoggedIn ? (
            <Button
              variant="outline-light"
              className="navbar-pink-button"
              onClick={() => {
                client.cache.writeData({
                  data: {
                    isLoggedIn: false,
                    currentUser: null,
                  },
                });
                localStorage.clear();
              }}
            >
              Cerrar Sesión
            </Button>
          ) : path === "/login" ? null : (
            <Button
              variant="outline-light"
              className="navbar-pink-button"
              href="/login"
            >
              Iniciar Sesión
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
