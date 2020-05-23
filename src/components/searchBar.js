// React
import React, { useState } from "react";
import { Form, FormControl, Container, Row, Col } from "react-bootstrap";

export default function SearchBar(props) {
  const [text, setText] = useState("");
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [fromApplicantLimit, setFromApplicantLimit] = useState(1);
  const [toApplicantLimit, setToApplicantLimit] = useState(10);
  const [ownerId, setOwnerId] = useState();

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFromApplicantLimitChange = (event) => {
    const newValue = event.target.value;
    if (
      newValue > toApplicantLimit ||
      typeof toApplicantLimit === "undefined"
    ) {
      setToApplicantLimit(parseInt(newValue));
    }
    setFromApplicantLimit(parseInt(newValue));
  };

  const handleToApplicantLimitChange = (event) => {
    setToApplicantLimit(parseInt(event.target.value));

    const newValue = event.target.value;
    if (
      newValue < fromApplicantLimit ||
      typeof fromApplicantLimit === "undefined"
    ) {
      setFromApplicantLimit(parseInt(newValue));
    }
    setToApplicantLimit(parseInt(newValue));
  };

  return (
    <Form inline className="ml-4">
      <Container>
        <Row className="mb-4">
          <Form.Group>
            <Form.Label>
              {" "}
              <i className="fas fa-search" />{" "}
            </Form.Label>
            <FormControl
              type="text"
              placeholder="Título o descripción"
              onChange={handleTextChange}
              value={text}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label className="mr-2">
              Cantidad de trabajadores entre
            </Form.Label>
            <Form.Control
              as="select"
              custom
              onChange={(event) => handleFromApplicantLimitChange(event)}
              value={fromApplicantLimit}
            >
              {Array.from(Array(10).keys()).map((x) => (
                <option key={x + 1}>{x + 1}</option>
              ))}
            </Form.Control>
            <Form.Label className="mx-2">y</Form.Label>
            <Form.Control
              as="select"
              custom
              onChange={(event) => handleToApplicantLimitChange(event)}
              value={toApplicantLimit}
            >
              {Array.from(Array(10).keys()).map((x) => (
                <option key={x + 1}>{x + 1}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>
      </Container>
    </Form>
  );
}
