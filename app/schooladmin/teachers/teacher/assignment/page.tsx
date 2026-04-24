"use client";

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
import { useRouter } from "next/navigation";

interface AssignmentItem {
  id: number;
  title: string;
  updated_date: string;
  status: string;
  marks: number | null;
}

const assignmentsData: AssignmentItem[] = [
  {
    id: 1,
    title: "John's Math Assignment",
    updated_date: "2024-10-15",
    marks: null,
    status: "pending",
  },
  {
    id: 2,
    title: "Sarah's Science Project",
    updated_date: "2024-10-20",
    marks: 85,
    status: "completed",
  },
  {
    id: 3,
    title: "Mike's History Essay",
    updated_date: "2024-10-25",
    marks: null,
    status: "pending",
  },
  {
    id: 4,
    title: "Emily's Math Assignment",
    updated_date: "2024-10-16",
    marks: 92,
    status: "completed",
  },
  {
    id: 5,
    title: "Robert's Math Assignment",
    updated_date: "2024-10-17",
    marks: null,
    status: "pending",
  },
  {
    id: 6,
    title: "Lisa's Math Assignment",
    updated_date: "2024-10-18",
    marks: 88,
    status: "completed",
  },
  {
    id: 7,
    title: "James's Math Assignment",
    updated_date: "2024-10-19",
    marks: null,
    status: "pending",
  },
  {
    id: 8,
    title: "Patricia's Math Assignment",
    updated_date: "2024-10-20",
    marks: 95,
    status: "completed",
  },
  {
    id: 9,
    title: "Michael's Math Assignment",
    updated_date: "2024-10-21",
    marks: null,
    status: "pending",
  },
  {
    id: 10,
    title: "Jennifer's Math Assignment",
    updated_date: "2024-10-22",
    marks: 90,
    status: "completed",
  },
  {
    id: 11,
    title: "David's Math Assignment",
    updated_date: "2024-10-23",
    marks: null,
    status: "pending",
  },
];

export default function AssignmentPage() {
  const router = useRouter();
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Assignment Details</h1>
        <Button
          variant="outline-secondary"
          href="/schooladmin/teachers/teacher"
        >
          Back to Teacher
        </Button>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title as="h4">Assignment 1: Math Homework</Card.Title>
          <Table striped bordered hover responsive>
            <tbody>
              <tr>
                <th style={{ width: "200px" }}>Title</th>
                <td>Math Homework</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>Complete exercises 1-10 on page 23</td>
              </tr>
              <tr>
                <th>Class</th>
                <td>10</td>
              </tr>
              <tr>
                <th>Section</th>
                <td>A</td>
              </tr>
              <tr>
                <th>Subject</th>
                <td>Mathematics</td>
              </tr>
              <tr>
                <th>Assign Date</th>
                <td>October 01, 2024</td>
              </tr>
              <tr>
                <th>Due Date</th>
                <td>October 15, 2024</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>
                  <span className="badge bg-warning">Pending</span>
                </td>
              </tr>
              <tr>
                <th>Total Marks</th>
                <td>100</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title as="h4">Student Assignments</Card.Title>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>

                <th>Updated Date</th>
                <th>Marks</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignmentsData.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.id}</td>
                  <td>{assignment.title}</td>

                  <td>{assignment.updated_date}</td>
                  <td>{assignment.marks ? assignment.marks : "N/A"}</td>
                  <td>
                    <span
                      className={`badge bg-${assignment.status === "completed" ? "success" : "warning"}`}
                    >
                      {assignment.status}
                    </span>
                  </td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => router.push("/schooladmin/teachers/teacher/assignment/assignmentdetail")}
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
    </>
  );
}
