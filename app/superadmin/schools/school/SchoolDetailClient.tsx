"use client";

import { useState } from "react";
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
  Modal,
  Form,
} from "react-bootstrap";

interface SchoolDetail {
  id: number;
  name: string;
  address: string;
  principal: string;
  email: string;
  phone: string;
  students: number;
  totalTeachers: number;
  totalSchoolAdmins: number;
  status: string;
}

const school: SchoolDetail = {
  id: 1,
  name: "Navodit Vidya Kunja School",
  address: "123 Main St, City A",
  principal: "Dr. John Smith",
  email: "abc@school.edu",
  phone: "555-123-4567",
  students: 450,
  totalTeachers: 32,
  totalSchoolAdmins: 5,
  status: "active",
};

interface SchoolAdmin {
  id: number;
  name: string;
  phone: string;
  email: string;
  profileImage: string;
}

const schoolAdmins: SchoolAdmin[] = [
  {
    id: 1,
    name: "Alice Johnson",
    phone: "555-111-1111",
    email: "alice@school.edu",
    profileImage: "/assets/img/user.png",
  },
  {
    id: 2,
    name: "Bob Williams",
    phone: "555-222-2222",
    email: "bob@school.edu",
    profileImage: "/assets/img/user.png",
  },
  {
    id: 3,
    name: "Carol Davis",
    phone: "555-333-3333",
    email: "carol@school.edu",
    profileImage: "/assets/img/user.png",
  },
];

export default function SchoolDetailClient() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<SchoolAdmin | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    phone: "",
    email: "",
    profileImage: "/assets/img/user.png",
  });

  const handleDeleteClick = (admin: SchoolAdmin) => {
    setAdminToDelete(admin);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (adminToDelete) {
      console.log(`Deleting ${adminToDelete.name}`);
    }
    setShowDeleteModal(false);
    setAdminToDelete(null);
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleAddSubmit = () => {
    console.log("Adding new admin:", newAdmin);
    setNewAdmin({ name: "", phone: "", email: "", profileImage: "/assets/img/user.png" });
    setShowAddModal(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">{school?.name || "School not found"}</h1>
      </div>

      {school ? (
        <>
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p>
                    <strong>Principal:</strong> {school.principal}
                  </p>
                  <p>
                    <strong>Email:</strong> {school.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {school.phone}
                  </p>
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Address:</strong> {school.address}
                  </p>
                  <p>
                    <strong>Total Students:</strong> {school.students}
                  </p>
                  <p>
                    <strong>Total Teachers:</strong> {school.totalTeachers}
                  </p>
                  <p>
                    <strong>Total School Admins:</strong> {school.totalSchoolAdmins}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge bg-${school.status === "active" ? "success" : "warning"}`}
                    >
                      {school.status}
                    </span>
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">School Admins</h5>
              <Button variant="primary" size="sm" onClick={handleAddClick}>
                Create School Admin
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive hover className="mb-0">
                <thead>
                  <tr>
                    <th>Profile Image</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {schoolAdmins.map((admin) => (
                    <tr key={admin.id}>
                      <td>
                        <img
                          src={admin.profileImage}
                          alt={admin.name}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>{admin.name}</td>
                      <td>{admin.phone}</td>
                      <td>{admin.email}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteClick(admin)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete{" "}
              <strong>{adminToDelete?.name}</strong>?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showAddModal}
            onHide={() => setShowAddModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Create School Admin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={newAdmin.name}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone"
                    value={newAdmin.phone}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, phone: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={newAdmin.email}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, email: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e: any) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setNewAdmin({ ...newAdmin, profileImage: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAddSubmit}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p>School not found</p>
      )}
    </>
  );
}
