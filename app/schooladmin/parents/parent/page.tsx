"use client";

import { useRouter } from "next/navigation";
import { Suspense } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Badge,
  ListGroup,
} from "react-bootstrap";
import { ArrowLeft, Mail, Phone, User, GraduationCap } from "lucide-react";

function ParentDetailContent() {
  const router = useRouter();
  const id = 1;

  // In a real app, you'd fetch the parent data by ID
  // This is placeholder data for demonstration
  const parent = {
    id: id || "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "555-111-1111",
    profileImage: null,
    address: "123 Main St, Springfield",
    occupation: "Software Engineer",
    children: [
      { id: 101, name: "Alice Smith", grade: "10-A", rollNo: "01" },
      { id: 102, name: "Charlie Smith", grade: "8-B", rollNo: "12" },
    ],
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex align-items-center mb-4">
        <Button
          variant="outline-secondary"
          size="sm"
          className="me-3"
          onClick={() => router.back()}
        >
          <ArrowLeft size={18} />
        </Button>
        <h1 className="h2 mb-0">Parent Details</h1>
      </div>

      <Row>
        <Col lg={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="text-center p-4">
              <div
                className="mx-auto mb-3"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "48px",
                }}
              >
                {parent.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="mb-1">{parent.name}</h3>
              <p className="text-muted mb-3">{parent.occupation}</p>
              <div className="d-flex justify-content-center gap-2">
                <Button variant="primary" size="sm">
                  Message
                </Button>
                <Button variant="outline-primary" size="sm">
                  Edit Profile
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">Contact Information</h5>
              <ListGroup variant="flush">
                <ListGroup.Item className="px-0 d-flex align-items-center">
                  <Mail size={18} className="text-primary me-3" />
                  <div>
                    <div className="small text-muted">Email</div>
                    <div>{parent.email}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 d-flex align-items-center">
                  <Phone size={18} className="text-primary me-3" />
                  <div>
                    <div className="small text-muted">Phone</div>
                    <div>{parent.phone}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 d-flex align-items-center">
                  <User size={18} className="text-primary me-3" />
                  <div>
                    <div className="small text-muted">Address</div>
                    <div>{parent.address}</div>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0">Linked Students</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                {parent.children.map((child) => (
                  <ListGroup.Item key={child.id} className="p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div
                          className="me-3"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            backgroundColor: "#e9ecef",
                            color: "#0d6efd",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                          }}
                        >
                          <GraduationCap />
                        </div>
                        <div>
                          <h6 className="mb-0">{child.name}</h6>
                          <small className="text-muted">
                            Grade: {child.grade} | Roll: {child.rollNo}
                          </small>
                        </div>
                      </div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() =>
                          router.push(
                            `/schooladmin/students/student?id=${child.id}`,
                          )
                        }
                      >
                        View Student
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0">Recent Activity</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="px-0 py-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="fw-semibold">Paid School Fees</span>
                    <small className="text-muted">2 days ago</small>
                  </div>
                  <p className="small text-muted mb-0">
                    Monthly tuition fee for Alice Smith (Grade 10-A)
                  </p>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 py-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="fw-semibold">Attended PTA Meeting</span>
                    <small className="text-muted">1 week ago</small>
                  </div>
                  <p className="small text-muted mb-0">
                    Meeting discussed upcoming annual sports event.
                  </p>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default function ParentDetailPage() {
  return (
    <Suspense fallback={<div>Loading parent details...</div>}>
      <ParentDetailContent />
    </Suspense>
  );
}
