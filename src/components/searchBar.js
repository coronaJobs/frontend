import { Form, FormControl, Container, Row, Col } from "react-bootstrap";
import { useApolloClient, useQuery } from "@apollo/client";
import { useDebounceSearchPosts } from "./../hooks";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import Select from "react-select";
import { DateTime } from "luxon";

import { GET_COMMUNES } from "./../graphql/queries/communes";

function SearchBar(props) {
  // get props
  const { handleSearch } = props;

  // set initial state
  const [text, setText] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromApplicantLimit, setFromApplicantLimit] = useState(1);
  const [toApplicantLimit, setToApplicantLimit] = useState(10);
  const [communeIds, setCommuneIds] = useState([]);

  // get apollo client
  const client = useApolloClient();

  // get communes
  const { data, loading, error } = useQuery(GET_COMMUNES, {
    fetchPolicy: "cache-first",
  });

  const communes = [];

  if (!loading && !error) {
    const rawCommunes = data.getCommunes;
    rawCommunes.map((commune) => {
      communes.push({
        value: commune.id,
        label: commune.name,
        __typename: commune.__typename,
      });
    });
    client.cache.writeData({
      data: { getCommunes: communes },
    });
  }

  // set filters for query
  let sendText = undefined;
  if (text !== "") {
    sendText = text;
  }

  let sendFromDate = undefined;
  if (fromDate) {
    sendFromDate = DateTime.fromISO(fromDate.toISOString())
      .startOf("day")
      .toISO();
  }
  let sendToDate = undefined;
  if (toDate) {
    sendToDate = DateTime.fromISO(toDate.toISOString()).endOf("day").toISO();
  }

  let sendCommuneIds = undefined;
  if (communeIds.length) {
    sendCommuneIds = [];
    communeIds.map((com) => {
      sendCommuneIds.push(com.value);
    });
  }

  const sendFromApplicantLimit = fromApplicantLimit;
  const sendToApplicantLimit = toApplicantLimit;

  // get query function

  const searchPosts = useDebounceSearchPosts(handleSearch);

  useEffect(() => {
    // get filtered posts when component is updated
    searchPosts({
      fetchPolicy: "network-only",
      variables: {
        sendText,
        sendFromDate,
        sendToDate,
        sendCommuneIds,
        sendFromApplicantLimit,
        sendToApplicantLimit,
      },
    });
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

  const handleCommuneChange = (event) => {
    if (event) {
      setCommuneIds(event);
    } else {
      // nothing selected
      setCommuneIds([]);
    }
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
                className="w-75"
                type="text"
                placeholder="Título o descripción"
                onChange={handleTextChange}
                value={text}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label className="mr-2 w-25">Fecha inicial</Form.Label>
              <DatePicker
                selected={fromDate}
                onChange={(event) => handleFromDateChange(event)}
                dateFormat="dd - MM - yyyy"
              ></DatePicker>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <Form.Group className="w-100">
              <Select
                isMulti={true}
                className="basic-single w-75"
                classNamePrefix="select"
                isLoading={loading}
                isClearable={true}
                isRtl={false}
                isSearchable={true}
                name="color"
                options={communes}
                placeholder="Selecciona una comuna"
                onChange={handleCommuneChange}
                noOptionsMessage={() => "No hay resultados"}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label className="mr-2 w-25">Fecha final</Form.Label>
              <DatePicker
                selected={toDate}
                onChange={(event) => handleToDateChange(event)}
                dateFormat="dd - MM - yyyy"
              ></DatePicker>
            </Form.Group>
          </Col>
        </Row>
        <Row>
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
      </Container>
    </Form>
  );
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func,
};

export default SearchBar;
