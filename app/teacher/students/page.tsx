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

interface StudentItem {
  id: number;
  name: string;
  className: string;
  section: string;
  email: string;
  phone: string;
  profileImage: string | null;
  parentName: string;
}

export default function StudentPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [students, setStudents] = useState<StudentItem[]>([
    {
      id: 1,
      name: "Alice Smith",
      className: "Class 1",
      section: "A",
      email: "alice@example.com",
      phone: "555-111-1111",
      profileImage: null,
      parentName: "John Smith",
    },
    {
      id: 2,
      name: "Bob Johnson",
      className: "Class 1",
      section: "A",
      email: "bob@example.com",
      phone: "555-222-2222",
      profileImage: null,
      parentName: "Sarah Johnson",
    },
    {
      id: 3,
      name: "Charlie Williams",
      className: "Class 1",
      section: "B",
      email: "charlie@example.com",
      phone: "555-333-3333",
      profileImage: null,
      parentName: "Mike Williams",
    },
    {
      id: 4,
      name: "David Brown",
      className: "Class 2",
      section: "A",
      email: "david@example.com",
      phone: "555-444-4444",
      profileImage: null,
      parentName: "Emily Brown",
    },
    {
      id: 5,
      name: "Eva Davis",
      className: "Class 2",
      section: "A",
      email: "eva@example.com",
      phone: "555-555-5555",
      profileImage: null,
      parentName: "Robert Davis",
    },
    {
      id: 6,
      name: "Frank Miller",
      className: "Class 2",
      section: "B",
      email: "frank@example.com",
      phone: "555-666-6666",
      profileImage: null,
      parentName: "Lisa Miller",
    },
    {
      id: 7,
      name: "Grace Wilson",
      className: "Class 3",
      section: "A",
      email: "grace@example.com",
      phone: "555-777-7777",
      profileImage: null,
      parentName: "James Wilson",
    },
    {
      id: 8,
      name: "Henry Moore",
      className: "Class 3",
      section: "A",
      email: "henry@example.com",
      phone: "555-888-8888",
      profileImage: null,
      parentName: "Patricia Moore",
    },
    {
      id: 9,
      name: "Ivy Lee",
      className: "Class 3",
      section: "B",
      email: "ivy@example.com",
      phone: "555-999-9999",
      profileImage: null,
      parentName: "Michael Lee",
    },
    {
      id: 10,
      name: "Jack Taylor",
      className: "Class 4",
      section: "A",
      email: "jack@example.com",
      phone: "555-101-1010",
      profileImage: null,
      parentName: "Jennifer Taylor",
    },
    {
      id: 11,
      name: "Kate Anderson",
      className: "Class 4",
      section: "A",
      email: "kate@example.com",
      phone: "555-202-2020",
      profileImage: null,
      parentName: "David Anderson",
    },
    {
      id: 12,
      name: "Liam Thomas",
      className: "Class 4",
      section: "B",
      email: "liam@example.com",
      phone: "555-303-3030",
      profileImage: null,
      parentName: "Linda Thomas",
    },
    {
      id: 13,
      name: "Mia Jackson",
      className: "Class 5",
      section: "A",
      email: "mia@example.com",
      phone: "555-404-4040",
      profileImage: null,
      parentName: "William Jackson",
    },
    {
      id: 14,
      name: "Noah White",
      className: "Class 5",
      section: "A",
      email: "noah@example.com",
      phone: "555-505-5050",
      profileImage: null,
      parentName: "Barbara White",
    },
    {
      id: 15,
      name: "Olivia Harris",
      className: "Class 5",
      section: "B",
      email: "olivia@example.com",
      phone: "555-606-6060",
      profileImage: null,
      parentName: "Richard Harris",
    },
    {
      id: 16,
      name: "James Martin",
      className: "Class 6",
      section: "A",
      email: "jamesm@example.com",
      phone: "555-707-7070",
      profileImage: null,
      parentName: "Susan Martin",
    },
    {
      id: 17,
      name: "Benjamin Thompson",
      className: "Class 6",
      section: "A",
      email: "benjamin@example.com",
      phone: "555-808-8080",
      profileImage: null,
      parentName: "Joseph Thompson",
    },
    {
      id: 18,
      name: "Sofia Garcia",
      className: "Class 6",
      section: "B",
      email: "sofia@example.com",
      phone: "555-909-9090",
      profileImage: null,
      parentName: "Nancy Garcia",
    },
    {
      id: 19,
      name: "Ethan Martinez",
      className: "Class 7",
      section: "A",
      email: "ethan@example.com",
      phone: "555-121-2121",
      profileImage: null,
      parentName: "Thomas Martinez",
    },
    {
      id: 20,
      name: "Ava Robinson",
      className: "Class 7",
      section: "A",
      email: "ava@example.com",
      phone: "555-232-3232",
      profileImage: null,
      parentName: "Karen Robinson",
    },
    {
      id: 21,
      name: "Lucas Clark",
      className: "Class 7",
      section: "B",
      email: "lucas@example.com",
      phone: "555-343-4343",
      profileImage: null,
      parentName: "Charles Clark",
    },
    {
      id: 22,
      name: "Mason Lewis",
      className: "Class 8",
      section: "A",
      email: "mason@example.com",
      phone: "555-454-5454",
      profileImage: null,
      parentName: "Dorothy Lewis",
    },
    {
      id: 23,
      name: "Ella Walker",
      className: "Class 8",
      section: "A",
      email: "ella@example.com",
      phone: "555-565-6565",
      profileImage: null,
      parentName: "Daniel Walker",
    },
    {
      id: 24,
      name: "Scarlett Hall",
      className: "Class 8",
      section: "B",
      email: "scarlett@example.com",
      phone: "555-676-7676",
      profileImage: null,
      parentName: "Betty Hall",
    },
    {
      id: 25,
      name: "Chloe Allen",
      className: "Class 8",
      section: "B",
      email: "chloe@example.com",
      phone: "555-787-8787",
      profileImage: null,
      parentName: "Paul Allen",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentItem | null>(
    null,
  );
  const [deletingStudent, setDeletingStudent] = useState<StudentItem | null>(
    null,
  );
  const [formData, setFormData] = useState({
    name: "",
    className: "",
    section: "",
    email: "",
    phone: "",
    profileImage: null as string | null,
    parentName: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [upgradeModal, setUpgradeModal] = useState({
    show: false,
    student: null as StudentItem | null,
    newClass: "",
  });

  const handleUpgrade = (student: StudentItem) => {
    const currentClassNum = parseInt(student.className.replace("Class ", ""));
    const nextClass = `Class ${currentClassNum + 1}`;
    setUpgradeModal({ show: true, student, newClass: nextClass });
  };

  const handleDegrade = (student: StudentItem) => {
    const currentClassNum = parseInt(student.className.replace("Class ", ""));
    if (currentClassNum > 1) {
      const prevClass = `Class ${currentClassNum - 1}`;
      setUpgradeModal({ show: true, student, newClass: prevClass });
    }
  };

  const confirmUpgrade = () => {
    if (upgradeModal.student) {
      setStudents(
        students.map((s) =>
          s.id === upgradeModal.student!.id
            ? { ...s, className: upgradeModal.newClass }
            : s,
        ),
      );
      setToastMessage(
        `${upgradeModal.student.name} upgraded to ${upgradeModal.newClass}`,
      );
      setShowToast(true);
    }
    setUpgradeModal({ show: false, student: null, newClass: "" });
  };
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    studentName: "",
    className: "",
    phone: "",
    email: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    studentName: "",
    className: "",
    phone: "",
    email: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [parentSearch, setParentSearch] = useState("");
  const [showParentDropdown, setShowParentDropdown] = useState(false);

  const parentNames = [
    ...new Set(students.map((s) => s.parentName).filter(Boolean)),
  ];

  const filteredStudents = students.filter((s) => {
    return (
      (appliedFilters.studentName === "" ||
        s.name
          .toLowerCase()
          .includes(appliedFilters.studentName.toLowerCase())) &&
      (appliedFilters.className === "" ||
        s.className
          .toLowerCase()
          .includes(appliedFilters.className.toLowerCase())) &&
      (appliedFilters.phone === "" ||
        s.phone.toLowerCase().includes(appliedFilters.phone.toLowerCase())) &&
      (appliedFilters.email === "" ||
        s.email.toLowerCase().includes(appliedFilters.email.toLowerCase()))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

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
    setEditingStudent(null);
    setFormData({
      name: "",
      className: "",
      section: "",
      email: "",
      phone: "",
      profileImage: null,
      parentName: "",
    });
    setParentSearch("");
    setShowModal(true);
  };

  const handleEdit = (student: StudentItem) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      className: student.className,
      section: student.section,
      email: student.email,
      phone: student.phone,
      profileImage: student.profileImage,
      parentName: student.parentName,
    });
    setParentSearch(student.parentName);
    setShowModal(true);
  };

  const handleParentSelect = (parentName: string) => {
    setFormData({ ...formData, parentName });
    setParentSearch(parentName);
    setShowParentDropdown(false);
  };

  const filteredParents = parentNames.filter((p) =>
    p.toLowerCase().includes(parentSearch.toLowerCase()),
  );

  const handleDelete = (student: StudentItem) => {
    setDeletingStudent(student);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingStudent) {
      setStudents(students.filter((s) => s.id !== deletingStudent.id));
      setToastMessage(`${deletingStudent.name} deleted successfully`);
      setShowToast(true);
    }
    setShowDeleteModal(false);
    setDeletingStudent(null);
  };

  const handleSave = () => {
    if (editingStudent) {
      setStudents(
        students.map((s) =>
          s.id === editingStudent.id ? { ...s, ...formData } : s,
        ),
      );
      setToastMessage(`${formData.name} updated successfully`);
    } else {
      const newId = Math.max(...students.map((s) => s.id), 0) + 1;
      setStudents([...students, { id: newId, ...formData }]);
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
    setFilters({ studentName: "", className: "", phone: "", email: "" });
    setAppliedFilters({ studentName: "", className: "", phone: "", email: "" });
    setCurrentPage(1);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Students</h1>
        <div>
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={() => setShowFilter(true)}
          >
            Filter
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add Student
          </Button>
        </div>
      </div>

      <Row className="mb-4">
        <Col sm={6} lg={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Total Students
              </Card.Title>
              <p className="display-4 mb-0">{filteredStudents.length}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} lg={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Total Classes
              </Card.Title>
              <p className="display-4 mb-0">
                {new Set(filteredStudents.map((s) => s.className)).size}
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} lg={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Total Parents
              </Card.Title>
              <p className="display-4 mb-0">
                {
                  new Set(
                    filteredStudents.map((s) => s.parentName).filter(Boolean),
                  ).size
                }
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
            <th>Student Name</th>
            <th>Parent Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((student) => (
            <tr key={student.id}>
              <td>
                {student.profileImage ? (
                  <img
                    src={student.profileImage}
                    alt={student.name}
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
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </td>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.parentName || "-"}</td>
              <td>{student.className}</td>
              <td>{student.section || "-"}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  className="me-2"
                  onClick={() => router.push(`/teacher/students/student`)}
                >
                  View
                </Button>
                <Button
                  variant="outline-success"
                  size="sm"
                  className="me-2"
                  onClick={() => handleUpgrade(student)}
                >
                  Upgrade
                </Button>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleDegrade(student)}
                >
                  Degrade
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(student)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {filteredStudents.length > itemsPerPage && (
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingStudent ? "Edit Student" : "Add Student"}
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
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Alice Smith"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Control
                type="text"
                value={formData.className}
                onChange={(e) =>
                  setFormData({ ...formData, className: e.target.value })
                }
                placeholder="e.g., Class 1"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Section (Optional)</Form.Label>
              <Form.Control
                type="text"
                value={formData.section}
                onChange={(e) =>
                  setFormData({ ...formData, section: e.target.value })
                }
                placeholder="e.g., A"
                maxLength={1}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Parents Name</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type="text"
                  value={parentSearch}
                  onChange={(e) => {
                    setParentSearch(e.target.value);
                    setFormData({ ...formData, parentName: e.target.value });
                    setShowParentDropdown(true);
                  }}
                  onFocus={() => setShowParentDropdown(true)}
                  placeholder="Search or select parent name"
                  autoComplete="off"
                />
                {showParentDropdown && filteredParents.length > 0 && (
                  <div
                    className="position-absolute w-100 border rounded mt-1"
                    style={{
                      maxHeight: "150px",
                      overflowY: "auto",
                      zIndex: 1000,
                      backgroundColor: "#fff",
                    }}
                  >
                    {filteredParents.map((parent, index) => (
                      <div
                        key={index}
                        className="p-2 cursor-pointer hover-bg-light"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleParentSelect(parent)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {parent}
                      </div>
                    ))}
                  </div>
                )}
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
                placeholder="e.g., alice@example.com"
              />
            </Form.Group>
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
            <Form.Group controlId="studentCheckboxGroup">
              <Form.Check
                type="checkbox"
                label="Parental Control"
                value="yes"
              />
            </Form.Group>
          </Form>
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
            <strong>{deletingStudent?.name}</strong>?
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
          <Offcanvas.Title>Filter Students</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by student name"
                value={filters.studentName}
                onChange={(e) =>
                  setFilters({ ...filters, studentName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by class"
                value={filters.className}
                onChange={(e) =>
                  setFilters({ ...filters, className: e.target.value })
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

      <Modal
        show={upgradeModal.show}
        onHide={() =>
          setUpgradeModal({ show: false, student: null, newClass: "" })
        }
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Upgrade/Degrade Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to change{" "}
            <strong>{upgradeModal.student?.name}</strong> from{" "}
            {upgradeModal.student?.className} to{" "}
            <strong>{upgradeModal.newClass}</strong>?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() =>
              setUpgradeModal({ show: false, student: null, newClass: "" })
            }
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmUpgrade}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

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
