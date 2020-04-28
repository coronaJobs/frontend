// React
import React from 'react';

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

export default function CoronaNavBar({ userLoggedIn }) {
    // TODO: inner query to get current user from cache
    let currentUser;
    if (userLoggedIn) {
        currentUser = { role: 'employer' }
    }

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
                        {currentUser.role === 'employer' ? <EmployersLinks /> : <EmployeesLinks />}
                        {/* TODO: set correct hrefs for each link */}
                        <Nav.Link href="/"> Perfil </Nav.Link>
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
                            <Button variant="outline-light" className="background-pink">
                                Cerrar Sesión
                            </Button>
                        ) : (
                            // TODO: componente botón login
                            <Button variant="outline-light" className="background-pink">
                                Iniciar Sesión
                            </Button>
                        )
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};
