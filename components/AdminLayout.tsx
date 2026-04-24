"use client";

import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Dropdown,
} from "react-bootstrap";

interface AdminLayoutProps {
  children?: React.ReactNode;
  sidebarContent?: React.ReactNode;
  title?: string;
}

export default function AdminLayout({ children, sidebarContent, title }: AdminLayoutProps) {
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
                {sidebarContent || <Nav className="flex-column" />}
                <hr className="my-3" />
                <Nav className="flex-column">
                  <Nav.Link href="#" className="nav-link">Settings</Nav.Link>
                  <Nav.Link href="/" className="nav-link">Sign Out</Nav.Link>
                </Nav>
              </div>
            </div>
          </Col>

          <Col md={9} className="ms-sm-auto col-lg-10 px-md-4">
            {title && (
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">{title}</h1>
              </div>
            )}
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
}