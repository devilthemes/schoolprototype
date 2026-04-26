"use client";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Badge,
  Dropdown,
  Modal,
  Button,
} from "react-bootstrap";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications] = useState([
    {
      id: 1,
      title: "New Assignment Submitted",
      date: "2024-05-20",
      description:
        "A new assignment has been submitted by John Doe for Class 10-A Mathematics.",
      link: "/teacher/assignments",
      isRead: false,
    },
    {
      id: 2,
      title: "Message from Principal",
      date: "2024-05-19",
      description:
        "The Principal has sent a message regarding the upcoming annual sports day.",
      link: "/teacher/message",
      isRead: false,
    },
    {
      id: 3,
      title: "Staff Meeting Reminder",
      date: "2024-05-18",
      description:
        "Reminder: Weekly staff meeting tomorrow at 4:00 PM in the conference hall.",
      link: "/teacher/calendar",
      isRead: true,
    },
    {
      id: 4,
      title: "Parent-Teacher Meeting",
      date: "2024-05-17",
      description:
        "A parent-teacher meeting has been scheduled for Tommy's parent next Tuesday.",
      link: "/teacher/calendar",
      isRead: false,
    },
  ]);

  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationClick = (notification: any) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

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

          <div className="d-flex align-items-center pe-3 ms-auto">
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="dark"
                id="dropdown-notifications"
                className="p-0 border-0 d-flex align-items-center position-relative"
                style={{ background: "transparent" }}
              >
                <div style={{ position: "relative" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-bell"
                    viewBox="0 0 16 16"
                    style={{ color: "#fff" }}
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                  </svg>
                  {
                    <Badge
                      pill
                      bg="danger"
                      className="position-absolute start-100 translate-middle"
                      style={{
                        fontSize: "0.6rem",
                        padding: "0.25em 0.4em",
                        position: "relative",
                        left: "-5px",
                        top: "10px !important",
                      }}
                    >
                      {unreadCount}
                    </Badge>
                  }
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu
                className="shadow border-0 mt-2 py-0"
                style={{ width: "300px" }}
              >
                <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 fw-bold">Notifications</h6>
                  <Badge bg="primary">{unreadCount} New</Badge>
                </div>
                <div style={{ maxHeight: "350px", overflowY: "auto" }}>
                  {notifications.map((n) => (
                    <Dropdown.Item
                      key={n.id}
                      className={`p-3 border-bottom ${!n.isRead ? "bg-light" : ""}`}
                      onClick={() => handleNotificationClick(n)}
                    >
                      <div className="d-flex flex-column">
                        <span
                          className={`small mb-1 ${!n.isRead ? "fw-bold text-dark" : "text-muted"}`}
                        >
                          {n.title}
                        </span>
                        <small className="text-muted">{n.date}</small>
                      </div>
                    </Dropdown.Item>
                  ))}
                </div>
                <div className="p-2 text-center">
                  <small>
                    <a href="#" className="text-decoration-none text-primary">
                      View All Notifications
                    </a>
                  </small>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notification Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNotification && (
            <>
              <h5 className="mb-1">{selectedNotification.title}</h5>
              <p className="text-muted small mb-3">
                {selectedNotification.date}
              </p>
              <p>{selectedNotification.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {selectedNotification && (
            <Button
              variant="primary"
              href={selectedNotification.link}
              onClick={() => setShowModal(false)}
            >
              View Detail
            </Button>
          )}
        </Modal.Footer>
      </Modal>

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
                <div className="py-3 d-flex justify-content-center"></div>
                <Nav className="flex-column">
                  <Nav.Link href="/teacher" className="nav-link" active>
                    Dashboard
                  </Nav.Link>
                  <Nav.Link href="/teacher/students" className="nav-link">
                    Students
                  </Nav.Link>
                  <Nav.Link href="/teacher/assignments" className="nav-link">
                    Assignments
                  </Nav.Link>
                  <Nav.Link href="/teacher/message" className="nav-link">
                    Messages
                  </Nav.Link>
                  <Nav.Link href="/teacher/calendar" className="nav-link">
                    Calendar
                  </Nav.Link>
                  <Nav.Link href="/teacher/library" className="nav-link">
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
