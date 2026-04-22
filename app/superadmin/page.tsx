"use client";

import { ReactNode } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Card,
  Table,
  Button,
  Dropdown,
} from "react-bootstrap";
import Link from "next/link";

export default function SuperAdminDashboard() {
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" className="flex-md-nowrap p-0 shadow">
        <Container fluid>
          <Navbar.Brand className="col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">
            School App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Dashboard</Nav.Link>
              <Nav.Link href="#">Students</Nav.Link>
              <Nav.Link href="#">Teachers</Nav.Link>
              <Nav.Link href="#">Reports</Nav.Link>
            </Nav>
            <Nav>
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                  Admin
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Sign out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col md="3" lg="2" className="sidebar border-end bg-body-tertiary p-0">
            <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex={-1}>
              <div className="offcanvas-body d-md-flex flex-column p-0 pt-3 overflow-y-auto">
                <Nav className="flex-column">
                  <Nav.Link href="/superadmin/schools" className="nav-link" active>
                    School
                  </Nav.Link>
                </Nav>
                <hr className="my-3" />
                <Nav className="flex-column">
                  <Nav.Link href="#" className="nav-link">
                    Settings
                  </Nav.Link>
                  <Nav.Link href="/" className="nav-link">
                    Sign Out
                  </Nav.Link>
                </Nav>
              </div>
            </div>
          </Col>

          <Col md="9" ms-sm-auto col-lg="10" px-md="4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <Button variant="outline-secondary" size="sm">
                    Share
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    Export
                  </Button>
                </div>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" size="sm">
                    This week
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">This day</Dropdown.Item>
                    <Dropdown.Item href="#">This month</Dropdown.Item>
                    <Dropdown.Item href="#">This year</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            <Row className="mb-4">
              <Col sm={6} lg={3}>
                <Card className="text-center mb-3">
                  <Card.Body>
                    <Card.Title as="h4" className="my-0">
                      Total Students
                    </Card.Title>
                    <p className="display-4 mb-0">1,245</p>
                    <p className="text-success mb-0">+12% from last month</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={3}>
                <Card className="text-center mb-3">
                  <Card.Body>
                    <Card.Title as="h4" className="my-0">
                      Total Teachers
                    </Card.Title>
                    <p className="display-4 mb-0">48</p>
                    <p className="text-success mb-0">+2 this month</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={3}>
                <Card className="text-center mb-3">
                  <Card.Body>
                    <Card.Title as="h4" className="my-0">
                      Active Courses
                    </Card.Title>
                    <p className="display-4 mb-0">24</p>
                    <p className="text-muted mb-0">12 ongoing</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} lg={3}>
                <Card className="text-center mb-3">
                  <Card.Body>
                    <Card.Title as="h4" className="my-0">
                      Attendance
                    </Card.Title>
                    <p className="display-4 mb-0">94%</p>
                    <p className="text-success mb-0">+3% from last week</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <h2 className="mt-4 mb-3">Recent Students</h2>
            <div className="table-responsive">
              <Table striped hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Roll No</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>Grade 10-A</td>
                    <td>101</td>
                    <td>
                      <span className="badge bg-success">Active</span>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jane Smith</td>
                    <td>Grade 9-B</td>
                    <td>92</td>
                    <td>
                      <span className="badge bg-success">Active</span>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Mike Johnson</td>
                    <td>Grade 11-A</td>
                    <td>115</td>
                    <td>
                      <span className="badge bg-warning">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Sarah Williams</td>
                    <td>Grade 8-C</td>
                    <td>78</td>
                    <td>
                      <span className="badge bg-success">Active</span>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>David Brown</td>
                    <td>Grade 12-B</td>
                    <td>130</td>
                    <td>
                      <span className="badge bg-danger">Inactive</span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}