// React
import React, { Fragment } from 'react';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Spinner } from 'react-bootstrap';

export default function Loading() {
    return (
        <Fragment>
            <Container fluid className='d-flex flex-column justify-content-center align-items-stretch'>
                <Row className='d-flex justify-content-center'>
                    {/* TODO: Bigger spinner */}
                    <Spinner animation="grow" variant="danger" className="mt-5" />
                </Row>
            </Container>
        </Fragment>
    );
};