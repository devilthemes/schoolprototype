"use client";

import React from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

interface StudentDetail {
  id: number;
  name: string;
  email: string;
  phone: string;
  className: string;
  section: string;
  parentName: string;
}

interface AssignmentItem {
  id: number;
  title: string;
  description: string;
  start_date: string;
  due_date: string;
  status: string;
  total_marks: number;
  total_files: number;
  className: string;
  section: string;
}

const assignmentsData: AssignmentItem[] = [
  {
    id: 1,
    title: "Math Assignment 1",
    description: "Complete exercises 1-10 on page 23.",
    start_date: "2024-09-01",
    due_date: "2024-09-15",
    status: "pending",
    total_marks: 100,
    total_files: 2,
    className: "Class 10",
    section: "A",
  },
  {
    id: 2,
    title: "Science Project",
    description: "Create a model of the solar system.",
    start_date: "2024-09-05",
    due_date: "2024-09-20",
    status: "completed",
    total_marks: 150,
    total_files: 3,
    className: "Class 9",
    section: "B",
  },
  {
    id: 3,
    title: "History Essay",
    description: "Write a 500-word essay on the French Revolution.",
    start_date: "2024-09-10",
    due_date: "2024-09-25",
    status: "pending",
    total_marks: 100,
    total_files: 1,
    className: "Class 10",
    section: "A",
  },
];

export default function StudentDetailPage() {
  const router = useRouter();
  const studentId = 1;

  const studentData: Record<number, StudentDetail> = {
    1: {
      id: 1,
      name: "John Doe",
      email: "john.doe@student.edu",
      phone: "555-123-4567",
      className: "Class 10-A",
      section: "A",
      parentName: "Mr. Richard Doe",
    },
    // ... other students (can be expanded if needed)
  };

  const student = studentData[studentId];

  if (!student) {
    return (
      <Container className="py-4">
        <h3>Student not found</h3>
        <Button
          variant="primary"
          onClick={() => router.push("/schooladmin/students")}
        >
          Back to Students
        </Button>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Student Profile</h2>
        <Button
          variant="outline-secondary"
          onClick={() => router.push("/schooladmin/students")}
        >
          Back to Students
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body>
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "40px",
                  margin: "0 auto 15px",
                }}
              >
                {student.name.charAt(0).toUpperCase()}
              </div>
              <h3>{student.name}</h3>
              <p className="text-muted">{student.className}</p>
              <hr />
              <div className="text-start">
                <p>
                  <strong>Email:</strong> {student.email}
                </p>
                <p>
                  <strong>Phone:</strong> {student.phone}
                </p>
                <p>
                  <strong>Section:</strong> {student.section}
                </p>
                <p>
                  <strong>Parent Name:</strong> {student.parentName}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="h-100">
            <Card.Header className="bg-white">
              <h4 className="mb-0 py-2">Assignments</h4>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Marks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentsData.map((assignment) => (
                    <tr key={assignment.id}>
                      <td>{assignment.id}</td>
                      <td>{assignment.title}</td>
                      <td>{assignment.due_date}</td>
                      <td>
                        <span
                          className={`badge bg-${assignment.status === "completed" ? "success" : "warning"}`}
                        >
                          {assignment.status.charAt(0).toUpperCase() +
                            assignment.status.slice(1)}
                        </span>
                      </td>
                      <td>{assignment.total_marks}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() =>
                            router.push(`/teacher/students/student/assignment`)
                          }
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
