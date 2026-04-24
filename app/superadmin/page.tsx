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
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>

      <Row className="mb-4">
        <Col sm={6} lg={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Total Students
              </Card.Title>
              <p className="display-4 mb-0">1,245</p>
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
    </>
  );
}
