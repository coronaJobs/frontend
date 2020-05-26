// React
import React, { useState, useEffect } from "react";
import { Form, FormControl, Container, Row, Col } from "react-bootstrap";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_COMMUNES } from "./../graphql/queries/communes";
import { GET_ALL_POSTS } from "./../graphql/queries/posts";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { DateTime } from "luxon";

import "react-datepicker/dist/react-datepicker.css";

export default function SearchBar(props) {
  const { handleSearch } = props;
  const [text, setText] = useState("");
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [fromApplicantLimit, setFromApplicantLimit] = useState(1);
  const [toApplicantLimit, setToApplicantLimit] = useState(10);
  const [communeIds, setCommuneIds] = useState(null);

  const client = useApolloClient();

  // get communes

  const { data, loading, error } = useQuery(GET_COMMUNES, {
    fetchPolicy: "cache-first",
  });

  let communes = [];

  if (!loading && !error) {
    const rawCommunes = data.getCommunes;
    rawCommunes.map((commune, index) => {
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

  // get posts
  // { data, loading, error }

  const postsQuery = useQuery(GET_ALL_POSTS, {
    fetchPolicy: "cache-first",
  });

  console.log(postsQuery);

  if (!postsQuery.loading && !postsQuery.error) {
    const posts = postsQuery.data.getAllPosts;
    console.log(posts);

    client.cache.writeData({
      data: { getAllPosts: posts },
    });
    handleSearch(posts);
  }

  console.log("--------------------------------------");
  const handleSubmit = () => {
    let sendFromDate;
    if (fromDate) {
      sendFromDate = DateTime.fromISO(fromDate.toISOString())
        .startOf("day")
        .toISO();
    } else {
      sendFromDate = undefined;
    }

    let sendToDate;
    if (toDate) {
      sendToDate = DateTime.fromISO(toDate.toISOString())
        .startOf("day")
        .toISO();
    } else {
      sendToDate = undefined;
    }
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

  const handleCommuneChange = (event) => {
    if (event) {
      console.log(event);

      setCommuneIds(event.value);
    } else {
      // nothing selected
      setCommuneIds(null);
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
