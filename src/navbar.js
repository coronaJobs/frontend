// React
import React from 'react';

// Bootstrap
import { Button, Form, FormControl, Navbar, Nav } from 'react-bootstrap';

export default function CoronaNavBar({ userLoggedIn }) {
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
                        <Nav.Link href="/">
                            Home
                        </Nav.Link>
                        <Nav.Link href="/about">
                            About
                        </Nav.Link>
                        <Nav.Link href="users">
                            Users
                        </Nav.Link>
                        <Form inline className="ml-4">
                            <Form.Group>
                                <Form.Label> <i className="fas fa-search"/> </Form.Label>
                                <FormControl type="text" placeholder="Búsqueda" />
                            </Form.Group>
                        </Form>
                    </Nav>
                ) : null }
                <Nav className="ml-auto">
                    {
                        userLoggedIn ? (
                            <Button variant="outline-light" className="background-pink">
                                Cerrar Sesión
                            </Button>
                        ) : (
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
