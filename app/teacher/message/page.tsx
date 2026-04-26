"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Tabs,
  Tab,
  ListGroup,
  Pagination,
  Badge,
} from "react-bootstrap";

interface TeacherItem {
  id: number;
  name: string;
  subjects: string[];
  email: string;
  phone: string;
  profileImage: string | null;
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

interface MessageItem {
  id: number;
  sender: string;
  content: string;
  time: string;
  isNew?: boolean;
}

const teachers: TeacherItem[] = [
  {
    id: 1,
    name: "John Smith",
    subjects: ["Mathematics", "Physics"],
    email: "john.smith@example.com",
    phone: "555-111-1111",
    profileImage: null,
  },
];

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
];

const allMessages: MessageItem[] = [
  {
    id: 1,
    sender: "Principal Office",
    content: "Please submit the monthly progress report by Friday.",
    time: "Today",
    isNew: true,
  },
  {
    id: 2,
    sender: "John Doe (Student)",
    content: "Teacher, I have a doubt regarding the latest assignment.",
    time: "2 hours ago",
    isNew: true,
  },
  {
    id: 3,
    sender: "School Admin",
    content: "The staff meeting has been rescheduled to 4 PM today.",
    time: "Yesterday",
  },
  {
    id: 4,
    sender: "Sarah Jenkins (Parent)",
    content: "Regarding Tommy's performance in the last mathematics test...",
    time: "Yesterday",
  },
  {
    id: 5,
    sender: "IT Department",
    content: "Password reset successful for your school portal account.",
    time: "2 days ago",
  },
  {
    id: 6,
    sender: "School Library",
    content: "Notice: 3 books are currently overdue for your class 10-A.",
    time: "3 days ago",
  },
  {
    id: 7,
    sender: "Mike Ross (Student)",
    content: "Can I submit the science assignment tomorrow? I was unwell.",
    time: "3 days ago",
  },
  {
    id: 8,
    sender: "Sports Coordinator",
    content: "Next week's inter-school field trip details are attached.",
    time: "4 days ago",
  },
  {
    id: 9,
    sender: "Emily White (Teacher)",
    content: "Would you like to swap the Tuesday 2nd period for my free slot?",
    time: "4 days ago",
  },
  {
    id: 10,
    sender: "Accounts Office",
    content:
      "Salary slip for the month of April is now available for download.",
    time: "5 days ago",
  },
  {
    id: 11,
    sender: "HR Department",
    content:
      "Mandatory training session on child safety this Saturday at 10 AM.",
    time: "5 days ago",
  },
  {
    id: 12,
    sender: "David Miller (Student)",
    content:
      "I've uploaded the physics project files, please check and confirm.",
    time: "6 days ago",
  },
  {
    id: 13,
    sender: "PTA Meeting",
    content:
      "The minutes of the last parent-teacher meeting have been uploaded.",
    time: "1 week ago",
  },
  {
    id: 14,
    sender: "Maintenance",
    content:
      "Classroom 10-A air conditioning repair scheduled for tomorrow morning.",
    time: "1 week ago",
  },
  {
    id: 15,
    sender: "Science Lab",
    content: "Annual lab equipment inventory check is scheduled for Wednesday.",
    time: "1 week ago",
  },
  {
    id: 16,
    sender: "Principal Office",
    content:
      "Congratulations on achieving 100% attendance for your class last month!",
    time: "1 week ago",
  },
  {
    id: 17,
    sender: "Jessica Taylor (Student)",
    content:
      "Thank you for the detailed feedback on my history essay, Teacher.",
    time: "2 weeks ago",
  },
  {
    id: 18,
    sender: "School Events",
    content:
      "Invitations for the upcoming Annual Day are ready for distribution.",
    time: "2 weeks ago",
  },
  // Adding a few more to test pagination
  {
    id: 19,
    sender: "School Admin",
    content: "Reminder: Update student attendance by end of day.",
    time: "2 weeks ago",
  },
  {
    id: 20,
    sender: "Parent Association",
    content: "Invitation to the annual bake sale fundraiser.",
    time: "3 weeks ago",
  },
  {
    id: 21,
    sender: "IT Department",
    content: "System maintenance scheduled for Sunday midnight.",
    time: "3 weeks ago",
  },
  {
    id: 22,
    sender: "John Doe (Student)",
    content: "Thank you for the extra help with algebra.",
    time: "1 month ago",
  },
];

const students = [
  { id: 1, name: "John Doe (Class 10-A)" },
  { id: 2, name: "Mike Ross (Class 9-B)" },
  { id: 3, name: "David Miller (Class 10-A)" },
  { id: 4, name: "Jessica Taylor (Class 10-A)" },
];

const parents = [
  { id: 1, name: "Sarah Jenkins (Tommy's Parent)" },
  { id: 2, name: "Robert Smith (Jane's Parent)" },
  { id: 3, name: "Emily Wilson (Mark's Parent)" },
];

export default function TeacherDetail() {
  const router = useRouter();
  const [teacher, setTeacher] = useState<TeacherItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    subjects: [] as string[],
    email: "",
    phone: "",
    profileImage: null as string | null,
  });
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showSendMessageModal, setShowSendMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(
    null,
  );
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    className: "",
    section: "",
    due_date: "",
    total_marks: 100,
    description: "",
  });
  const [sendMessageForm, setSendMessageForm] = useState({
    recipientType: "student",
    recipientId: "",
    message: "",
    subject: "",
    files: [] as File[],
  });
  const [assignData, setAssignData] = useState({
    className: "",
    section: "",
    subject: "",
  });

  // Pagination states for Messages
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const teacherId = 1; // Defaulting to 1 for now as per current routing

  useEffect(() => {
    const foundTeacher = teachers.find((t) => t.id === teacherId);
    if (foundTeacher) {
      setTeacher(foundTeacher);
      setFormData({
        name: foundTeacher.name,
        subjects: foundTeacher.subjects,
        email: foundTeacher.email,
        phone: foundTeacher.phone,
        profileImage: foundTeacher.profileImage,
      });
    }
  }, [teacherId]);

  const handleAssignSubmit = () => {
    console.log("Assigning class:", assignData);
    setShowAssignModal(false);
  };

  const handleAddAssignmentSubmit = () => {
    console.log("Creating new assignment:", newAssignment);
    setShowAddAssignmentModal(false);
    setNewAssignment({
      title: "",
      className: "",
      section: "",
      due_date: "",
      total_marks: 100,
      description: "",
    });
  };

  const handleSendMessageSubmit = () => {
    console.log("Sending message:", sendMessageForm);
    setShowSendMessageModal(false);
    setSendMessageForm({
      recipientType: "student",
      recipientId: "",
      message: "",
      subject: "",
      files: [],
    });
  };

  // Pagination logic
  const indexOfLastMessage = currentPage * itemsPerPage;
  const indexOfFirstMessage = indexOfLastMessage - itemsPerPage;
  const currentMessages = allMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage,
  );
  const totalPages = Math.ceil(allMessages.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (!teacher) {
    return (
      <Container fluid className="py-4">
        <div className="text-center">
          <h3>Teacher not found</h3>
          <Button
            variant="primary"
            onClick={() => router.push("/schooladmin/teachers")}
          >
            Back to Teachers
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <Button
          variant="outline-secondary"
          onClick={() => router.push("/schooladmin/teachers")}
        >
          Back
        </Button>
        <Button variant="primary" onClick={() => setShowAssignModal(true)}>
          Assign Class
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={3} className="text-center">
          <Card>
            <Card.Body>
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt={formData.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    backgroundColor: "#6c757d",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "40px",
                    margin: "0 auto",
                  }}
                >
                  {formData.name.charAt(0).toUpperCase()}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Card>
            <Card.Body>
              <h3 className="mb-3">{formData.name}</h3>
              <p className="mb-2">
                <strong>Subjects:</strong> {formData.subjects.join(", ")}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {formData.email}
              </p>
              <p className="mb-0">
                <strong>Phone:</strong> {formData.phone}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4">
        <Card.Body>
          <h5>Subject & Classes</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Class</th>
                <th>Section</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Class 1</td>
                <td>A</td>
                <td>{formData.subjects[0] || "-"}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Class 1</td>
                <td>B</td>
                <td>{formData.subjects[0] || "-"}</td>
              </tr>
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
            <h5 className="mb-0">Teacher Assignments</h5>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowAddAssignmentModal(true)}
            >
              Add Assignment
            </Button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Class</th>
                <th>Section</th>
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
                  <td>{assignment.className}</td>
                  <td>{assignment.section}</td>
                  <td>{assignment.due_date}</td>
                  <td>
                    {assignment.status === "pending" && (
                      <span className="badge bg-warning">Pending</span>
                    )}
                    {assignment.status === "completed" && (
                      <span className="badge bg-success">Completed</span>
                    )}
                  </td>
                  <td>{assignment.total_marks}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() =>
                        router.push("/schooladmin/teachers/teacher/assignment")
                      }
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="py-2">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Recent Messages</h5>
              <div className="d-flex align-items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowSendMessageModal(true)}
                >
                  Send Message
                </Button>
                <span className="ms-2 me-2 small text-muted">Show:</span>
                <Form.Select
                  size="sm"
                  style={{ width: "auto" }}
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </Form.Select>
              </div>
            </div>

            <ListGroup variant="flush">
              {currentMessages.map((msg) => (
                <ListGroup.Item
                  key={msg.id}
                  action
                  onClick={() => {
                    setSelectedMessage(msg);
                    setShowMessageModal(true);
                  }}
                  className={`d-flex justify-content-between align-items-start px-2 border-bottom ${msg.isNew ? "bg-light" : ""}`}
                  style={msg.isNew ? { borderLeft: "4px solid #007bff" } : {}}
                >
                  <div className="ms-2 me-auto py-1">
                    <div className="fw-bold">{msg.sender}</div>
                    {msg.content}
                  </div>
                  <div className="text-end py-1">
                    {msg.isNew && (
                      <Badge bg="primary" pill className="d-block mb-1">
                        New
                      </Badge>
                    )}
                    <small className="text-muted d-block">{msg.time}</small>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.First
                    onClick={() => paginate(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages)].map((_, idx) => (
                    <Pagination.Item
                      key={idx + 1}
                      active={idx + 1 === currentPage}
                      onClick={() => paginate(idx + 1)}
                    >
                      {idx + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last
                    onClick={() => paginate(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      <Modal
        show={showAssignModal}
        onHide={() => setShowAssignModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Select
                value={assignData.className}
                onChange={(e) =>
                  setAssignData({ ...assignData, className: e.target.value })
                }
              >
                <option value="">Select Class</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Section</Form.Label>
              <Form.Select
                value={assignData.section}
                onChange={(e) =>
                  setAssignData({ ...assignData, section: e.target.value })
                }
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Select
                value={assignData.subject}
                onChange={(e) =>
                  setAssignData({ ...assignData, subject: e.target.value })
                }
              >
                <option value="">Select Subject</option>
                {formData.subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAssignSubmit}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAddAssignmentModal}
        onHide={() => setShowAddAssignmentModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Assignment Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={newAssignment.title}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        title: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Total Marks</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter marks"
                    value={newAssignment.total_marks}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        total_marks: Number(e.target.value),
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Class</Form.Label>
                  <Form.Select
                    value={newAssignment.className}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        className: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Class</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 10">Class 10</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Section</Form.Label>
                  <Form.Select
                    value={newAssignment.section}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        section: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={newAssignment.due_date}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        due_date: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={newAssignment.description}
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddAssignmentModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddAssignmentSubmit}>
            Create Assignment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Message Detail Modal */}
      <Modal
        show={showMessageModal}
        onHide={() => setShowMessageModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Message Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {selectedMessage && (
            <div className="d-flex flex-column" style={{ minHeight: "400px" }}>
              {/* Message Header */}
              <div className="p-4 border-bottom d-flex align-items-center bg-white">
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    marginRight: "15px",
                    flexShrink: 0,
                  }}
                >
                  {selectedMessage.sender.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h5 className="mb-0">{selectedMessage.sender}</h5>
                  <small className="text-muted">{selectedMessage.time}</small>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-4 bg-light flex-grow-1">
                <Card className="shadow-sm border-0">
                  <Card.Body className="p-4">
                    <p
                      className="mb-0"
                      style={{
                        whiteSpace: "pre-wrap",
                        lineHeight: "1.6",
                        fontSize: "1.1rem",
                      }}
                    >
                      {selectedMessage.content}
                    </p>
                  </Card.Body>
                </Card>
              </div>

              {/* Quick Reply Area */}
              <div className="p-4 border-top bg-white">
                <h6>Quick Reply</h6>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Type your reply here..."
                      className="border-primary-subtle"
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowMessageModal(false)}
                    >
                      Discard
                    </Button>
                    <Button variant="primary">Send Reply</Button>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Send Message Modal */}
      <Modal
        show={showSendMessageModal}
        onHide={() => setShowSendMessageModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Send New Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Send To</Form.Label>
                  <Form.Select
                    value={sendMessageForm.recipientType}
                    onChange={(e) =>
                      setSendMessageForm({
                        ...sendMessageForm,
                        recipientType: e.target.value,
                        recipientId: "", // Reset recipient when type changes
                      })
                    }
                  >
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    Select{" "}
                    {sendMessageForm.recipientType === "student"
                      ? "Student"
                      : "Parent"}
                  </Form.Label>
                  <Form.Select
                    value={sendMessageForm.recipientId}
                    onChange={(e) =>
                      setSendMessageForm({
                        ...sendMessageForm,
                        recipientId: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Recipient</option>
                    {(sendMessageForm.recipientType === "student"
                      ? students
                      : parents
                    ).map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject"
                value={sendMessageForm.subject}
                onChange={(e) =>
                  setSendMessageForm({
                    ...sendMessageForm,
                    subject: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Type your message here..."
                value={sendMessageForm.message}
                onChange={(e) =>
                  setSendMessageForm({
                    ...sendMessageForm,
                    message: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Attachments</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e: any) => {
                  if (e.target.files) {
                    setSendMessageForm({
                      ...sendMessageForm,
                      files: Array.from(e.target.files),
                    });
                  }
                }}
              />
              <Form.Text className="text-muted">
                You can select multiple files.
              </Form.Text>
              {sendMessageForm.files.length > 0 && (
                <div className="mt-2">
                  <small>Selected files:</small>
                  <ul className="list-unstyled">
                    {sendMessageForm.files.map((file, index) => (
                      <li key={index} className="small text-muted">
                        <Badge bg="secondary" className="me-1">
                          File
                        </Badge>
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSendMessageModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSendMessageSubmit}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
