// React
import React from 'react';

// Apollo & GraphQL
import { useApolloClient, useQuery } from '@apollo/client';
// import { CURRENT_USER } from '../graphql/queries/inner_queries';
import { GET_USER } from '../graphql/queries/users';
// Bootstrap
import { Button, Form, FormControl, Navbar, Nav } from 'react-bootstrap';

function EmployeesLinks() {
    {/* TODO: set correct hrefs for each link */}
    return([
        <Nav.Link href="/">
            Ofertas Disponibles
        </Nav.Link>,
        <Nav.Link href="/">
            Postulaciones Vigentes
        </Nav.Link>
    ]);
};

function EmployersLinks() {
    {/* TODO: set correct hrefs for each link */}
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
    // TODO: inner query to get current user from cache
    // const { data } = useQuery(CURRENT_USER);
    // let currentUser = data ? data.currentUser : null;
    // const decoded_token = decode(localStorage.getItem('token'));
    // const { data, loading, error } = useQuery(GET_USER, {
    //     variables: {id: decoded_token ? decoded_token.id : null}
    // });
    // console.log(data);
    // const currentUser = data.getUser;

    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            className="navbar-light navigation-clean-search background-gray font-color"
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
                            // TODO: componente botón logout
                            <Button
                                variant="outline-light"
                                className="background-pink"
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
                            // TODO: componente botón login
                            // TODO: No mostrar botón si la vista actual es la de login
                            <Button variant="outline-light" className="background-pink" href="/login">
                                Iniciar Sesión
                            </Button>
                        )
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};
