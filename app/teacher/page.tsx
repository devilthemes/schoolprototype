"use client";

import { Row, Col, Card } from "react-bootstrap";

export default function TeacherDashboard() {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Teacher Dashboard</h1>
      </div>

      <Row className="mb-4">
        <Col sm={6} lg={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Total Students
              </Card.Title>
              <p className="display-4 mb-0">500</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} lg={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Total Teachers
              </Card.Title>
              <p className="display-4 mb-0">25</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} lg={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Total Parents
              </Card.Title>
              <p className="display-4 mb-0">350</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
