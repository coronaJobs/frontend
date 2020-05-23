// React
import React, { useState } from "react";
import { Form, FormControl } from "react-bootstrap";

export default function SearchBar(props) {
  const [text, setText] = useState("");
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [fromApplicantLimit, setFromApplicantLimit] = useState();
  const [toApplicantLimit, setToApplicantLimit] = useState();
  const [ownerId, setOwnerId] = useState();

  return (
    <Form inline className="ml-4">
      <Form.Group>
        <Form.Label>
          {" "}
          <i className="fas fa-search" />{" "}
        </Form.Label>
        <FormControl type="text" placeholder="Búsqueda" />
      </Form.Group>
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label>Cantidad de trabajadores</Form.Label>
        <Form.Control
          as="select"
          custom
          onChange={(event) => setFromApplicantLimit(+event.target.value)}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
}
