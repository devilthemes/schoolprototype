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

interface ParentItem {
  id: number;
  name: string;
  studentName: string;
  email: string;
  phone: string;
  profileImage: string | null;
}

export default function ParentsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parents, setParents] = useState<ParentItem[]>([
    {
      id: 1,
      name: "John Smith",
      studentName: "Alice Smith",
      email: "john@example.com",
      phone: "555-111-1111",
      profileImage: null,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      studentName: "Bob Johnson",
      email: "sarah@example.com",
      phone: "555-222-2222",
      profileImage: null,
    },
    {
      id: 3,
      name: "Mike Williams",
      studentName: "Charlie Williams",
      email: "mike@example.com",
      phone: "555-333-3333",
      profileImage: null,
    },
    {
      id: 4,
      name: "Emily Brown",
      studentName: "David Brown",
      email: "emily@example.com",
      phone: "555-444-4444",
      profileImage: null,
    },
    {
      id: 5,
      name: "Robert Davis",
      studentName: "Eva Davis",
      email: "robert@example.com",
      phone: "555-555-5555",
      profileImage: null,
    },
    {
      id: 6,
      name: "Lisa Miller",
      studentName: "Frank Miller",
      email: "lisa@example.com",
      phone: "555-666-6666",
      profileImage: null,
    },
    {
      id: 7,
      name: "James Wilson",
      studentName: "Grace Wilson",
      email: "james@example.com",
      phone: "555-777-7777",
      profileImage: null,
    },
    {
      id: 8,
      name: "Patricia Moore",
      studentName: "Henry Moore",
      email: "patricia@example.com",
      phone: "555-888-8888",
      profileImage: null,
    },
    {
      id: 9,
      name: "Michael Lee",
      studentName: "Ivy Lee",
      email: "michael@example.com",
      phone: "555-999-9999",
      profileImage: null,
    },
    {
      id: 10,
      name: "Jennifer Taylor",
      studentName: "Jack Taylor",
      email: "jennifer@example.com",
      phone: "555-101-1010",
      profileImage: null,
    },
    {
      id: 11,
      name: "David Anderson",
      studentName: "Kate Anderson",
      email: "david@example.com",
      phone: "555-202-2020",
      profileImage: null,
    },
    {
      id: 12,
      name: "Linda Thomas",
      studentName: "Liam Thomas",
      email: "linda@example.com",
      phone: "555-303-3030",
      profileImage: null,
    },
    {
      id: 13,
      name: "William Jackson",
      studentName: "Mia Jackson",
      email: "william@example.com",
      phone: "555-404-4040",
      profileImage: null,
    },
    {
      id: 14,
      name: "Barbara White",
      studentName: "Noah White",
      email: "barbara@example.com",
      phone: "555-505-5050",
      profileImage: null,
    },
    {
      id: 15,
      name: "Richard Harris",
      studentName: "Olivia Harris",
      email: "richard@example.com",
      phone: "555-606-6060",
      profileImage: null,
    },
    {
      id: 16,
      name: "Susan Martin",
      studentName: "James Martin",
      email: "susan@example.com",
      phone: "555-707-7070",
      profileImage: null,
    },
    {
      id: 17,
      name: "Joseph Thompson",
      studentName: "Benjamin Thompson",
      email: "joseph@example.com",
      phone: "555-808-8080",
      profileImage: null,
    },
    {
      id: 18,
      name: "Nancy Garcia",
      studentName: "Sofia Garcia",
      email: "nancy@example.com",
      phone: "555-909-9090",
      profileImage: null,
    },
    {
      id: 19,
      name: "Thomas Martinez",
      studentName: "Ethan Martinez",
      email: "thomas@example.com",
      phone: "555-121-2121",
      profileImage: null,
    },
    {
      id: 20,
      name: "Karen Robinson",
      studentName: "Ava Robinson",
      email: "karen@example.com",
      phone: "555-232-3232",
      profileImage: null,
    },
    {
      id: 21,
      name: "Charles Clark",
      studentName: "Lucas Clark",
      email: "charles@example.com",
      phone: "555-343-4343",
      profileImage: null,
    },
    {
      id: 22,
      name: "Dorothy Lewis",
      studentName: "Mason Lewis",
      email: "dorothy@example.com",
      phone: "555-454-5454",
      profileImage: null,
    },
    {
      id: 23,
      name: "Daniel Walker",
      studentName: "Ella Walker",
      email: "daniel@example.com",
      phone: "555-565-6565",
      profileImage: null,
    },
    {
      id: 24,
      name: "Betty Hall",
      studentName: "Scarlett Hall",
      email: "betty@example.com",
      phone: "555-676-7676",
      profileImage: null,
    },
    {
      id: 25,
      name: "Paul Allen",
      studentName: "Chloe Allen",
      email: "paul@example.com",
      phone: "555-787-8787",
      profileImage: null,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingParent, setEditingParent] = useState<ParentItem | null>(null);
  const [deletingParent, setDeletingParent] = useState<ParentItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    studentName: "",
    email: "",
    phone: "",
    profileImage: null as string | null,
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    parentName: "",
    studentName: "",
    phone: "",
    email: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    parentName: "",
    studentName: "",
    phone: "",
    email: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredParents = parents.filter((p) => {
    return (
      (appliedFilters.parentName === "" ||
        p.name
          .toLowerCase()
          .includes(appliedFilters.parentName.toLowerCase())) &&
      (appliedFilters.studentName === "" ||
        p.studentName
          .toLowerCase()
          .includes(appliedFilters.studentName.toLowerCase())) &&
      (appliedFilters.phone === "" ||
        p.phone.toLowerCase().includes(appliedFilters.phone.toLowerCase())) &&
      (appliedFilters.email === "" ||
        p.email.toLowerCase().includes(appliedFilters.email.toLowerCase()))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredParents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredParents.length / itemsPerPage);

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
    setFilters({ parentName: "", studentName: "", phone: "", email: "" });
    setAppliedFilters({
      parentName: "",
      studentName: "",
      phone: "",
      email: "",
    });
    setCurrentPage(1);
  };

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
    setEditingParent(null);
    setFormData({
      name: "",
      studentName: "",
      email: "",
      phone: "",
      profileImage: null,
    });
    setShowModal(true);
  };

  const handleEdit = (parent: ParentItem) => {
    setEditingParent(parent);
    setFormData({
      name: parent.name,
      studentName: parent.studentName,
      email: parent.email,
      phone: parent.phone,
      profileImage: parent.profileImage,
    });
    setShowModal(true);
  };

  const handleDelete = (parent: ParentItem) => {
    setDeletingParent(parent);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingParent) {
      setParents(parents.filter((p) => p.id !== deletingParent.id));
      setToastMessage(`${deletingParent.name} deleted successfully`);
      setShowToast(true);
    }
    setShowDeleteModal(false);
    setDeletingParent(null);
  };

  const handleSave = () => {
    if (editingParent) {
      setParents(
        parents.map((p) =>
          p.id === editingParent.id ? { ...p, ...formData } : p,
        ),
      );
      setToastMessage(`${formData.name} updated successfully`);
    } else {
      const newId = Math.max(...parents.map((p) => p.id), 0) + 1;
      setParents([...parents, { id: newId, ...formData }]);
      setToastMessage(`${formData.name} added successfully`);
    }
    setShowModal(false);
    setShowToast(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Parents</h1>
        <div>
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={() => setShowFilter(true)}
          >
            Filter
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add Parent
          </Button>
        </div>
      </div>

      <Row className="mb-4">
        <Col sm={6} lg={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Total Parents
              </Card.Title>
              <p className="display-4 mb-0">{filteredParents.length}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} lg={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Total Students
              </Card.Title>
              <p className="display-4 mb-0">
                {new Set(filteredParents.map((p) => p.studentName)).size}
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
            <th>Parent Name</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((parent) => (
            <tr key={parent.id}>
              <td>
                {parent.profileImage ? (
                  <img
                    src={parent.profileImage}
                    alt={parent.name}
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
                    {parent.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </td>
              <td>{parent.id}</td>
              <td>{parent.name}</td>
              <td>{parent.studentName}</td>
              <td>{parent.email}</td>
              <td>{parent.phone}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(parent)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(parent)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {filteredParents.length > itemsPerPage && (
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
            {editingParent ? "Edit Parent" : "Add Parent"}
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
              <Form.Label>Parent Name</Form.Label>
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
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.studentName}
                onChange={(e) =>
                  setFormData({ ...formData, studentName: e.target.value })
                }
                placeholder="e.g., Alice Smith"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="e.g., john@example.com"
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
            <strong>{deletingParent?.name}</strong>?
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
          <Offcanvas.Title>Filter Parents</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Parent Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by parent name"
                value={filters.parentName}
                onChange={(e) =>
                  setFilters({ ...filters, parentName: e.target.value })
                }
              />
            </Form.Group>
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
