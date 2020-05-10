// React
import React, { Fragment } from 'react';

// Bootstrap
import { Container, Row, Spinner } from 'react-bootstrap';

export default function Loading() {
    return (
        <Fragment>
            <Container fluid className='d-flex flex-column justify-content-center align-items-stretch'>
                <Row className='d-flex justify-content-center'>
                    {/* TODO: Bigger spinner */}
                    {/* TODO: Ubicar spinner más abajo */}
                    <Spinner animation="grow" role="status" variant="danger" />
                </Row>
            </Container>
        </Fragment>
    );
};