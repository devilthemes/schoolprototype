"use client";

import { useState } from "react";
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
} from "react-bootstrap";

interface ClassItem {
  id: number;
  name: string;
  section: string;
  students: number;
}

export default function ClassesPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<ClassItem[]>([
    { id: 1, name: "Class 1", section: "A", students: 30 },
    { id: 2, name: "Class 1", section: "B", students: 28 },
    { id: 3, name: "Class 2", section: "A", students: 32 },
    { id: 4, name: "Class 2", section: "B", students: 25 },
    { id: 5, name: "Class 3", section: "A", students: 30 },
    { id: 6, name: "Class 3", section: "B", students: 27 },
    { id: 7, name: "Class 4", section: "A", students: 29 },
    { id: 8, name: "Class 4", section: "", students: 31 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);
  const [deletingClass, setDeletingClass] = useState<ClassItem | null>(null);
  const [formData, setFormData] = useState({ name: "", section: "" });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [nameError, setNameError] = useState("");

  const handleAdd = () => {
    setEditingClass(null);
    setFormData({ name: "", section: "" });
    setNameError("");
    setShowModal(true);
  };

  const handleEdit = (cls: ClassItem) => {
    setEditingClass(cls);
    setFormData({ name: cls.name, section: cls.section });
    setNameError("");
    setShowModal(true);
  };

  const handleDelete = (cls: ClassItem) => {
    setDeletingClass(cls);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingClass) {
      setClasses(classes.filter((c) => c.id !== deletingClass.id));
      setToastMessage(`${deletingClass.name} deleted successfully`);
      setShowToast(true);
    }
    setShowDeleteModal(false);
    setDeletingClass(null);
  };

  const handleSave = () => {
    const existingClass = classes.find(
      (c) =>
        c.name.toLowerCase() === formData.name.toLowerCase() &&
        c.id !== editingClass?.id,
    );

    if (existingClass) {
      setNameError(`${formData.name} already exists`);
      return;
    }

    if (editingClass) {
      setClasses(
        classes.map((c) =>
          c.id === editingClass.id ? { ...c, ...formData } : c,
        ),
      );
      setToastMessage(`${formData.name} updated successfully`);
    } else {
      const newId = Math.max(...classes.map((c) => c.id), 0) + 1;
      setClasses([...classes, { id: newId, ...formData, students: 0 }]);
      setToastMessage(`${formData.name} added successfully`);
    }
    setShowModal(false);
    setShowToast(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Classes</h1>
        <Button variant="primary" onClick={handleAdd}>
          Add Class
        </Button>
      </div>

      <Row className="mb-4">
        <Col sm={6} lg={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Total Classes
              </Card.Title>
              <p className="display-4 mb-0">{classes.length}</p>
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
                {classes.reduce((sum, cls) => sum + cls.students, 0)}
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} lg={4}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Total Teachers
              </Card.Title>
              <p className="display-4 mb-0">35</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Class Name</th>
            <th>Section</th>
            <th>Students</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.id}>
              <td>{cls.id}</td>
              <td>{cls.name}</td>
              <td>{cls.section || "-"}</td>
              <td>{cls.students}</td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  className="me-2"
                  onClick={() => router.push(`/schooladmin/classes/class`)}
                >
                  Detail
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(cls)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(cls)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingClass ? "Edit Class" : "Add Class"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setNameError("");
                }}
                placeholder="e.g., Class 1"
                autoFocus
                isInvalid={!!nameError}
              />
              <Form.Control.Feedback type="invalid">
                {nameError}
              </Form.Control.Feedback>
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
            <strong>{deletingClass?.name}</strong>?
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
