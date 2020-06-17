import React, { Fragment } from "react";
import "../../assets/css/user/userProfile.css";
import { ListGroup, ListGroupItem } from "react-bootstrap";

function DataProfile(props) {
  return (
    <Fragment>
      <ListGroup className="list-group-flush">
        <ListGroupItem> <b>Dirección:</b> {props.address} </ListGroupItem>
        <ListGroupItem> <b>Correo:</b> {props.mail} </ListGroupItem>
        <ListGroupItem> <b>Rut:</b> {props.rut} </ListGroupItem>
        <ListGroupItem> <b>Teléfono:</b> {props.phone} </ListGroupItem>
      </ListGroup>
    </Fragment>
  );
}

export default DataProfile;
