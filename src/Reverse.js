import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./Reverse.css";
var Duration = require("duration");
const Reverse = () => {
  const [posts, setPost] = useState([]);

  const getUploded = (uplodedAt) => {
    var duration = new Duration(new Date(uplodedAt), new Date());
    let unit = "";
    let renderView = "";
    if (duration.years >= 1) {
      renderView = duration.years;
      unit = "Years Ago";
    } else if (duration.months >= 1) {
      renderView = duration.months;
      unit = "Months Ago";
    } else if (duration.days >= 1) {
      renderView = duration.days;
      unit = "Days Ago";
    } else if (duration.days <= 1) {
      renderView = "";
      unit = "Today";
    } else {
      renderView = "";
      unit = "";
    }
    return `${renderView} ${unit}`;
  };

  useEffect(() => {
    fetch("fakePost.json")
      .then((res) => res.json())
      .then((data) => setPost(data.reverse()));
  }, []);
  console.log(posts);
  return (
    <div className="recent">
      <Container>
        <Row xs={1} md={3} className="g-4">
          {posts.map((post) => (
            <Col>
              <Card>
                <Card.Img variant="top" src={post?.img} width="100%" />
                <Card.Body>
                  <Card.Title>{post?.title}</Card.Title>
                  <Card.Text>
                    <div className="details">
                      {" "}
                      {post?.details.slice(0, 100)}...
                    </div>{" "}
                    <br />
                    <div className="Date_see">
                      <span className="date">{getUploded(post?.date)}</span>{" "}
                      <span>
                        <button>see more</button>
                      </span>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Reverse;
