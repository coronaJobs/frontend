// React
import React, { Fragment } from "react";

// Bootstrap
import Button from "react-bootstrap/Button";


export default function DownloadResumeComponent({ resumeUrl }) {
    return (
        <Fragment>
            {/* TODO: Disable if no cv uploaded */}
            <Button className="editUser-button-pink my-1" variant="outline-light">
                Descargar Curriculum
            </Button>
        </Fragment>
    )
}