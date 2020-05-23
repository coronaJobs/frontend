// React
import React, { useState, useEffect } from "react";
import { Form, FormControl, Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";

import "react-datepicker/dist/react-datepicker.css";

export default function SearchBar(props) {
  const [text, setText] = useState("");
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [fromApplicantLimit, setFromApplicantLimit] = useState(1);
  const [toApplicantLimit, setToApplicantLimit] = useState(10);
  const [ownerId, setOwnerId] = useState();

  const handleSubmit = () => {
    let sendFromDate;
    if (fromDate) {
      sendFromDate = DateTime.fromISO(fromDate.toISOString())
        .startOf("day")
        .toISO();
    } else {
      sendFromDate = undefined;
    }

    console.log(sendFromDate);

    let sendToDate;
    if (toDate) {
      sendToDate = DateTime.fromISO(toDate.toISOString())
        .startOf("day")
        .toISO();
    } else {
      sendToDate = undefined;
    }
    console.log(sendToDate);
  };

  // executed when component is updated and mounted
  useEffect(() => {
    handleSubmit();
  });

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
    const newValue = event.target.value;
    if (
      newValue < fromApplicantLimit ||
      typeof fromApplicantLimit === "undefined"
    ) {
      setFromApplicantLimit(parseInt(newValue));
    }
    setToApplicantLimit(parseInt(newValue));
  };

  const handleFromDateChange = (event) => {
    if (toDate) {
      if (toDate < event) {
        setToDate(event);
      }
    }

    setFromDate(event);
  };

  const handleToDateChange = (event) => {
    if (fromDate) {
      if (fromDate > event) {
        setFromDate(event);
      }
    }

    setToDate(event);
  };
  return (
    <Form inline className="ml-4">
      <Container>
        <Row className="mb-4">
          <Col>
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
          </Col>
          <Col>
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
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label className="mr-2">Fecha inicial</Form.Label>
              <DatePicker
                selected={fromDate}
                onChange={(event) => handleFromDateChange(event)}
                dateFormat="dd - MM - yyyy"
              ></DatePicker>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label className="mr-2">Fecha final</Form.Label>
              <DatePicker
                selected={toDate}
                onChange={(event) => handleToDateChange(event)}
                dateFormat="dd - MM - yyyy"
              ></DatePicker>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}
