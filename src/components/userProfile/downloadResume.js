// React
import React, { Fragment } from "react";

// Bootstrap & Toastify
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Axios
import axios from 'axios';

// FileSaver
import { saveAs } from "file-saver";

export default function DownloadResumeComponent({ resumeUrl }) {
  return (
    <Fragment>
      <ToastContainer />
      {resumeUrl ? (
        <Button
          className="editUser-button-pink my-1"
          variant="outline-light"
          href={resumeUrl.split('?')[0]}
          target="_blank"
        >
          Descargar Curriculum
        </Button>
      ) : (
        <Button variant="light" disabled className="my-1">
          Curriculum No Disponible
        </Button>
      )}
    </Fragment>
  )
}