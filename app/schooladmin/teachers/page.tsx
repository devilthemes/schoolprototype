"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Toast,
  ToastContainer,
  Offcanvas,
  Pagination,
} from "react-bootstrap";

interface TeacherItem {
  id: number;
  name: string;
  subjects: string[];
  email: string;
  phone: string;
  password?: string;
  profileImage: string | null;
}

export default function TeachersPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [teachers, setTeachers] = useState<TeacherItem[]>([
    {
      id: 1,
      name: "John Smith",
      subjects: ["Mathematics", "Physics"],
      email: "john.smith@example.com",
      phone: "555-111-1111",
      profileImage: null,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      subjects: ["English", "History"],
      email: "sarah.johnson@example.com",
      phone: "555-222-2222",
      profileImage: null,
    },
    {
      id: 3,
      name: "Mike Williams",
      subjects: ["Science", "Biology"],
      email: "mike.williams@example.com",
      phone: "555-333-3333",
      profileImage: null,
    },
    {
      id: 4,
      name: "Emily Brown",
      subjects: ["Geography"],
      email: "emily.brown@example.com",
      phone: "555-444-4444",
      profileImage: null,
    },
    {
      id: 5,
      name: "Robert Davis",
      subjects: ["Chemistry"],
      email: "robert.davis@example.com",
      phone: "555-555-5555",
      profileImage: null,
    },
    {
      id: 6,
      name: "Lisa Miller",
      subjects: ["Physics", "Computer Science"],
      email: "lisa.miller@example.com",
      phone: "555-666-6666",
      profileImage: null,
    },
    {
      id: 7,
      name: "James Wilson",
      subjects: ["Chemistry", "Biology"],
      email: "james.wilson@example.com",
      phone: "555-777-7777",
      profileImage: null,
    },
    {
      id: 8,
      name: "Patricia Moore",
      subjects: ["Biology", "Science"],
      email: "patricia.moore@example.com",
      phone: "555-888-8888",
      profileImage: null,
    },
    {
      id: 9,
      name: "Michael Lee",
      subjects: ["Computer Science", "Mathematics"],
      email: "michael.lee@example.com",
      phone: "555-999-9999",
      profileImage: null,
    },
    {
      id: 10,
      name: "Jennifer Taylor",
      subjects: ["Art", "Music"],
      email: "jennifer.taylor@example.com",
      phone: "555-101-1010",
      profileImage: null,
    },
    {
      id: 11,
      name: "David Anderson",
      subjects: ["Music"],
      email: "david.anderson@example.com",
      phone: "555-202-2020",
      profileImage: null,
    },
    {
      id: 12,
      name: "Linda Thomas",
      subjects: ["Physical Education"],
      email: "linda.thomas@example.com",
      phone: "555-303-3030",
      profileImage: null,
    },
    {
      id: 13,
      name: "William Jackson",
      subjects: ["Mathematics"],
      email: "william.jackson@example.com",
      phone: "555-404-4040",
      profileImage: null,
    },
    {
      id: 14,
      name: "Barbara White",
      subjects: ["English"],
      email: "barbara.white@example.com",
      phone: "555-505-5050",
      profileImage: null,
    },
    {
      id: 15,
      name: "Richard Harris",
      subjects: ["Science"],
      email: "richard.harris@example.com",
      phone: "555-606-6060",
      profileImage: null,
    },
    {
      id: 16,
      name: "Susan Martin",
      subjects: ["History"],
      email: "susan.martin@example.com",
      phone: "555-707-7070",
      profileImage: null,
    },
    {
      id: 17,
      name: "Joseph Thompson",
      subjects: ["Geography"],
      email: "joseph.thompson@example.com",
      phone: "555-808-8080",
      profileImage: null,
    },
    {
      id: 18,
      name: "Nancy Garcia",
      subjects: ["Physics"],
      email: "nancy.garcia@example.com",
      phone: "555-909-9090",
      profileImage: null,
    },
    {
      id: 19,
      name: "Thomas Martinez",
      subjects: ["Chemistry"],
      email: "thomas.martinez@example.com",
      phone: "555-121-2121",
      profileImage: null,
    },
    {
      id: 20,
      name: "Karen Robinson",
      subjects: ["Biology"],
      email: "karen.robinson@example.com",
      phone: "555-232-3232",
      profileImage: null,
    },
    {
      id: 21,
      name: "Charles Clark",
      subjects: ["Computer Science"],
      email: "charles.clark@example.com",
      phone: "555-343-4343",
      profileImage: null,
    },
    {
      id: 22,
      name: "Dorothy Lewis",
      subjects: ["Art"],
      email: "dorothy.lewis@example.com",
      phone: "555-454-5454",
      profileImage: null,
    },
    {
      id: 23,
      name: "Daniel Walker",
      subjects: ["Music"],
      email: "daniel.walker@example.com",
      phone: "555-565-6565",
      profileImage: null,
    },
    {
      id: 24,
      name: "Betty Hall",
      subjects: ["Physical Education"],
      email: "betty.hall@example.com",
      phone: "555-676-7676",
      profileImage: null,
    },
    {
      id: 25,
      name: "Paul Allen",
      subjects: ["Mathematics", "Computer Science"],
      email: "paul.allen@example.com",
      phone: "555-787-8787",
      profileImage: null,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<TeacherItem | null>(
    null,
  );
  const [deletingTeacher, setDeletingTeacher] = useState<TeacherItem | null>(
    null,
  );
  const [formData, setFormData] = useState({
    name: "",
    subjects: [] as string[],
    email: "",
    phone: "",
    profileImage: null as string | null,
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    teacherName: "",
    subject: "",
    phone: "",
    email: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    teacherName: "",
    subject: "",
    phone: "",
    email: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const availableSubjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Science",
    "Computer Science",
    "English",
    "History",
    "Geography",
    "Art",
    "Music",
    "Physical Education",
  ];

  const filteredTeachers = teachers.filter((t) => {
    const subjectMatch =
      appliedFilters.subject === "" ||
      t.subjects.some((s) =>
        s.toLowerCase().includes(appliedFilters.subject.toLowerCase()),
      );
    return (
      (appliedFilters.teacherName === "" ||
        t.name
          .toLowerCase()
          .includes(appliedFilters.teacherName.toLowerCase())) &&
      subjectMatch &&
      (appliedFilters.phone === "" ||
        t.phone.toLowerCase().includes(appliedFilters.phone.toLowerCase())) &&
      (appliedFilters.email === "" ||
        t.email.toLowerCase().includes(appliedFilters.email.toLowerCase()))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTeachers.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    setEditingTeacher(null);
    setFormData({
      name: "",
      subjects: [],
      email: "",
      phone: "",
      profileImage: null,
    });
    setShowModal(true);
  };

  const handleEdit = (teacher: TeacherItem) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      subjects: teacher.subjects,
      email: teacher.email,
      phone: teacher.phone,
      profileImage: teacher.profileImage,
    });
    setShowModal(true);
  };

  const handleSubjectToggle = (subject: string) => {
    const currentSubjects = formData.subjects;
    if (currentSubjects.includes(subject)) {
      setFormData({
        ...formData,
        subjects: currentSubjects.filter((s) => s !== subject),
      });
    } else {
      setFormData({ ...formData, subjects: [...currentSubjects, subject] });
    }
  };

  const handleDelete = (teacher: TeacherItem) => {
    setDeletingTeacher(teacher);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingTeacher) {
      setTeachers(teachers.filter((t) => t.id !== deletingTeacher.id));
      setToastMessage(`${deletingTeacher.name} deleted successfully`);
      setShowToast(true);
    }
    setShowDeleteModal(false);
    setDeletingTeacher(null);
  };

  const handleSave = () => {
    if (editingTeacher) {
      setTeachers(
        teachers.map((t) =>
          t.id === editingTeacher.id ? { ...t, ...formData } : t,
        ),
      );
      setToastMessage(`${formData.name} updated successfully`);
    } else {
      const newId = Math.max(...teachers.map((t) => t.id), 0) + 1;
      setTeachers([...teachers, { id: newId, ...formData }]);
      setToastMessage(`${formData.name} added successfully`);
    }
    setShowModal(false);
    setShowToast(true);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleApplyFilter = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    setShowFilter(false);
  };

  const handleClearFilter = () => {
    setFilters({ teacherName: "", subject: "", phone: "", email: "" });
    setAppliedFilters({ teacherName: "", subject: "", phone: "", email: "" });
    setCurrentPage(1);
  };
  const changePassword = () => {
    setShowModal(false);
    setShowChangePasswordModal(true);
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Teachers</h1>
        <div>
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={() => setShowFilter(true)}
          >
            Filter
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add Teacher
          </Button>
        </div>
      </div>

      <Row className="mb-4">
        <Col sm={6} lg={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Total Teachers
              </Card.Title>
              <p className="display-4 mb-0">{filteredTeachers.length}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} lg={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Total Subjects
              </Card.Title>
              <p className="display-4 mb-0">
                {new Set(filteredTeachers.flatMap((t) => t.subjects)).size}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Profile</th>
            <th>#</th>
            <th>Teacher Name</th>
            <th>Subject</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((teacher) => (
            <tr key={teacher.id}>
              <td>
                {teacher.profileImage ? (
                  <img
                    src={teacher.profileImage}
                    alt={teacher.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#6c757d",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                    }}
                  >
                    {teacher.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </td>
              <td>{teacher.id}</td>
              <td>{teacher.name}</td>
              <td>{teacher.subjects.join(", ")}</td>
              <td>{teacher.email}</td>
              <td>{teacher.phone}</td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  className="me-2"
                  onClick={() => router.push(`/schooladmin/teachers/teacher`)}
                >
                  View
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(teacher)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(teacher)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {filteredTeachers.length > itemsPerPage && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="d-flex align-items-center">
            <span className="me-2">Show:</span>
            <Form.Select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              style={{ width: "70px" }}
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
            </Form.Select>
            <span className="ms-2">records</span>
          </div>
          <Pagination>
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </Pagination>
        </div>
      )}

      {/* Change Password Modal Box */}
      <Modal
        show={showChangePasswordModal}
        onHide={() => setShowChangePasswordModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Change password functionality to be implemented.</p>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                <Form.Control
                  type="text"
                  value=""
                  onChange={() => console.log()}
                  autoFocus
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowChangePasswordModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingTeacher ? "Edit Teacher" : "Add Teacher"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 text-center">
              <Form.Label>Profile Image</Form.Label>
              <div className="d-flex flex-column align-items-center">
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="Profile"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: "10px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      backgroundColor: "#6c757d",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      marginBottom: "10px",
                    }}
                  >
                    {formData.name
                      ? formData.name.charAt(0).toUpperCase()
                      : "?"}
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {formData.profileImage ? "Change Image" : "Upload Image"}
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teacher Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., John Smith"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subjects</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {availableSubjects.map((subject) => (
                  <Form.Check
                    key={subject}
                    type="checkbox"
                    id={`subject-${subject}`}
                    label={subject}
                    checked={formData.subjects.includes(subject)}
                    onChange={() => handleSubjectToggle(subject)}
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="e.g., john.smith@example.com"
              />
            </Form.Group>

            {!editingTeacher ? (
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </Form.Group>
            ) : (
              <Form.Group className="mb-3">
                <Button onClick={changePassword}>Change Password</Button>
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="e.g., 555-123-4567"
              />
            </Form.Group>
          </Form>
          <Form.Group controlId="studentCheckboxGroup">
            <Form.Check type="checkbox" label="Parental Control" value="yes" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!formData.name.trim()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete{" "}
            <strong>{deletingTeacher?.name}</strong>?
          </p>
          <p className="text-muted mb-0">Once deleted, it cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Offcanvas
        show={showFilter}
        onHide={() => setShowFilter(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter Teachers</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Teacher Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by teacher name"
                value={filters.teacherName}
                onChange={(e) =>
                  setFilters({ ...filters, teacherName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by subject"
                value={filters.subject}
                onChange={(e) =>
                  setFilters({ ...filters, subject: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by phone"
                value={filters.phone}
                onChange={(e) =>
                  setFilters({ ...filters, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by email"
                value={filters.email}
                onChange={(e) =>
                  setFilters({ ...filters, email: e.target.value })
                }
              />
            </Form.Group>
            <div className="d-flex gap-2">
              <Button variant="primary" onClick={handleApplyFilter}>
                Apply
              </Button>
              <Button variant="outline-secondary" onClick={handleClearFilter}>
                Clear
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ zIndex: 9999 }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
