"use client";

import { ReactNode } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Card,
  Button,
  Dropdown,
} from "react-bootstrap";

export default function SchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        sticky="top"
        className="flex-md-nowrap p-0 shadow"
      >
        <Container fluid>
          <Navbar.Brand className="col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">
            School App
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col
            md="3"
            lg="2"
            className="sidebar border-end bg-body-tertiary p-0"
          >
            <div
              className="offcanvas-md offcanvas-end bg-body-tertiary"
              tabIndex={-1}
            >
              <div className="offcanvas-body d-md-flex flex-column p-0 pt-3 overflow-y-auto">
                <div className="py-3 d-flex justify-content-center">
                  <img
                    src="/assets/logos/2.png"
                    alt="School Logo"
                    style={{ height: "60px" }}
                  />
                </div>
                <Nav className="flex-column">
                  <Nav.Link href="/schooladmin" className="nav-link" active>
                    Dashboard
                  </Nav.Link>
                  <Nav.Link href="/schooladmin/students" className="nav-link">
                    Students
                  </Nav.Link>
                  <Nav.Link href="/schooladmin/teachers" className="nav-link">
                    Teachers
                  </Nav.Link>
                  <Nav.Link href="/schooladmin/classes" className="nav-link">
                    Classes
                  </Nav.Link>
                  <Nav.Link href="/schooladmin/calendar" className="nav-link">
                    Calendar
                  </Nav.Link>
                  <Nav.Link href="/schooladmin/parents" className="nav-link">
                    Parents
                  </Nav.Link>
                  <Nav.Link href="/schooladmin/library" className="nav-link">
                    Library
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

          <Col md={9} className="ms-sm-auto col-lg-10 px-md-4">
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
}
