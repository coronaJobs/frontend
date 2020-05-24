// React
import React from 'react';

// Apollo & GraphQL
import { useApolloClient } from '@apollo/client';
// import { CURRENT_USER } from '../graphql/queries/inner_queries';
// Bootstrap
import { Button, Form, FormControl, Navbar, Nav } from 'react-bootstrap';

function EmployeesLinks() {
    return([
        <Nav.Link href="/" key='available-posts'>
            Ofertas Disponibles
        </Nav.Link>,
        <Nav.Link href="/" key='current-applications'>
            Postulaciones Vigentes
        </Nav.Link>
    ]);
};

function EmployersLinks() {
    return([
        <Nav.Link href="/">
            Nueva Oferta
        </Nav.Link>,
        <Nav.Link href="/">
            Ofertas Vigentes
        </Nav.Link>
    ]);
};

export default function CoronaNavBar({ userLoggedIn, currentUser }) {
    const client = useApolloClient();

    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            className="navbar-light navigation-clean-search navbar-background-gray navbar-font-color"
        >
            <Navbar.Brand href='/'>
                CoronaJobs
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
                id="responsive-navbar-nav"
                className="collapse-style"
            >
                { userLoggedIn ? (
                    <Nav>
                        {currentUser && currentUser.role.id === 1 ? <EmployersLinks /> : <EmployeesLinks />}
                        {/* TODO: set correct hrefs for each link */}
                        <Nav.Link
                            href={currentUser ? `/users/${currentUser.id}` : '/'}
                            disabled={currentUser ? false : true}
                        >
                            Perfil
                        </Nav.Link>
                        <Form inline className="ml-4">
                            <Form.Group>
                                <Form.Label> <i className="fas fa-search" /> </Form.Label>
                                <FormControl type="text" placeholder="Búsqueda" />
                            </Form.Group>
                        </Form>
                    </Nav>
                ) : null }
                <Nav className="ml-auto">
                    {
                        userLoggedIn ? (
                            <Button
                                variant="outline-light"
                                className="navbar-pink-button"
                                onClick = {() => {
                                    client.cache.writeData({
                                        data: {
                                            isLoggedIn: false,
                                            currentUser: null,
                                        }
                                    });
                                    localStorage.clear();
                                }}
                            >
                                Cerrar Sesión
                            </Button>
                        ) : (
                            // TODO: No mostrar botón si la vista actual es la de login
                            <Button variant="outline-light" className="navbar-pink-button" href="/login">
                                Iniciar Sesión
                            </Button>
                        )
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};
