import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../graphql/queries/posts";
import { Loading } from "../containers";
import DefaultPicture from "../assets/images/userProfile-default.png";
import { Spinner, Container, Row, Col, Image } from "react-bootstrap";
import { SearchBar } from "./../components";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();

  const handleSearch = (newPosts) => {
    setPosts(newPosts);
  };

  return (
    <div>
      {loading ? (
        <Spinner animation="grow" variant="danger" />
      ) : (
        <div>
          <Container>
            <div className="center margin-container">
              <h2>Ofertas de trabajo</h2>
              <p>Revisa las distintas ofertas de trabajo disponibles.</p>
            </div>
            <div className="center margin-container">
              <SearchBar handleSearch={handleSearch}></SearchBar>
            </div>
          </Container>
          <Container>
            <Row>
              {posts.map((post, index) => (
                <Col key={"profile-" + index.toString()} className="center">
                  <Image
                    src={DefaultPicture}
                    className="homeUser-post-picture"
                  />
                  <h3>{post.name}</h3>
                  <p>{post.description}</p>
                  <span>
                    <a
                      className="homeUser-application-button strong-color some-space"
                      href="/signup"
                    >
                      Postular
                    </a>
                  </span>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}

export default Posts;
