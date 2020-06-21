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
  const handleClick = () => {
    const parsedUrl = resumeUrl.split('?');
    axios.get(
      // resumeUrl
      parsedUrl[0]
    ).then(function (response) {
      // handle success
      console.log('SUCCESS');
      console.log(response);
      console.log(response.headers["content-type"]);

      // const byteCharacters = window.atob(response.data);
      // const byteNumbers = new Array(byteCharacters.length);
      // for (let i = 0; i < byteCharacters.length; i++) {
      //   byteNumbers[i] = byteCharacters.charCodeAt(i);
      // }
      // const byteArray = new Uint8Array(byteNumbers);
      // const file = new Blob([byteArray], { type: 'application/pdf;base64' });
      // const file = new Blob([byteArray], { type: `${response.headers["content-type"]};base64` });
      const file = new Blob([response.data], {type: `${response.headers["content-type"]}`});
      saveAs(file, "cv.pdf");
    }).catch(function (error) {
      // handle error
      console.log('ERROR');
      console.log(error);
      toast('No fue posible descargar el curriculum.', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    })
  };
  return (
    <Fragment>
      <ToastContainer />
      {resumeUrl ? (
        <Button
          className="editUser-button-pink my-1"
          variant="outline-light"
          onClick={handleClick}
        >
          Descargar Curriculum
        </Button>
      ) : (
        <Button variant="light" disabled>
          Curriculum No Disponible
        </Button>
      )}
    </Fragment>
  )
}