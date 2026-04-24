"use client";

import { useState, useEffect } from "react";
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
  Dropdown,
  Pagination,
  Form,
  Modal,
  Toast,
  ToastContainer,
} from "react-bootstrap";

interface School {
  id: number;
  name: string;
  address: string;
  principal: string;
  email: string;
  phone: string;
  students: number;
  status: string;
}

const ITEMS_PER_PAGE = 10;

export default function SuperAdminSchools() {
  const router = useRouter();
  const [schools, setSchools] = useState<School[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailSchool, setDetailSchool] = useState<School | null>(null);
  const [newSchool, setNewSchool] = useState({
    name: "",
    address: "",
    principal: "",
    email: "",
    phone: "",
    status: "active",
    logo: null as File | null,
    logoPreview: null as string | null,
  });

  const [editLogo, setEditLogo] = useState<File | null>(null);
  const [editLogoPreview, setEditLogoPreview] = useState<string | null>(null);

  const handleLogoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isEdit = false,
  ) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (isEdit) {
        setEditLogo(file);
        setEditLogoPreview(previewUrl);
      } else {
        setNewSchool({ ...newSchool, logo: file, logoPreview: previewUrl });
      }
    }
  };

  const handleSaveSchool = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowModal(false);
      setToastMessage("School saved successfully!");
      setToastType("success");
      setShowToast(true);
      setNewSchool({
        name: "",
        address: "",
        principal: "",
        email: "",
        phone: "",
        status: "active",
        logo: null,
        logoPreview: null,
      });
    }, 3000);
  };

  const handleUpdateSchool = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setShowEditModal(false);
      setToastMessage("School updated successfully!");
      setToastType("success");
      setShowToast(true);
      setEditingSchool(null);
    }, 3000);
  };

  const handleToggleStatus = (school: School) => {
    setTogglingId(school.id);
    setTimeout(() => {
      setTogglingId(null);
      setSchools(
        schools.map((s) =>
          s.id === school.id
            ? { ...s, status: s.status === "active" ? "inactive" : "active" }
            : s,
        ),
      );
      setToastMessage(
        school.status === "active"
          ? "School disabled successfully!"
          : "School enabled successfully!",
      );
      setToastType("success");
      setShowToast(true);
    }, 1000);
  };

  const isAddFormValid = () => {
    return (
      newSchool.name.trim() !== "" &&
      newSchool.address.trim() !== "" &&
      newSchool.principal.trim() !== "" &&
      newSchool.email.trim() !== "" &&
      newSchool.phone.trim() !== ""
    );
  };

  const isEditFormValid = () => {
    if (!editingSchool) return false;
    return (
      editingSchool.name.trim() !== "" &&
      editingSchool.address.trim() !== "" &&
      editingSchool.principal.trim() !== "" &&
      editingSchool.email.trim() !== "" &&
      editingSchool.phone.trim() !== ""
    );
  };

  useEffect(() => {
    fetch("/assets/json/schools.json")
      .then((res) => res.json())
      .then((data) => {
        setSchools(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalItems = schools.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const activeSchools = schools.filter((s) => s.status === "active").length;
  const inactiveSchools = schools.filter((s) => s.status === "inactive").length;
  const totalStudents = schools.reduce((sum, s) => sum + s.students, 0);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentSchools = schools.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const items = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    items.push(
      <Pagination.Prev
        key="prev"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      />,
    );

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>,
      );
    }

    items.push(
      <Pagination.Next
        key="next"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      />,
    );

    return items;
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Schools</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add School
          </Button>
        </div>
      </div>

      <Row className="mb-4">
        <Col sm={6} lg={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Total Schools
              </Card.Title>
              {loading ? (
                <p className="display-4 mb-0">-</p>
              ) : (
                <p className="display-4 mb-0">{totalItems}</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} lg={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Active
              </Card.Title>
              {loading ? (
                <p className="display-4 mb-0">-</p>
              ) : (
                <p className="display-4 mb-0">{activeSchools}</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} lg={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Total Students
              </Card.Title>
              {loading ? (
                <p className="display-4 mb-0">-</p>
              ) : (
                <p className="display-4 mb-0">
                  {totalStudents.toLocaleString()}
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} lg={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <Card.Title as="h4" className="my-0">
                Inactive
              </Card.Title>
              {loading ? (
                <p className="display-4 mb-0">-</p>
              ) : (
                <p className="display-4 mb-0">{inactiveSchools}</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2 className="mt-4 mb-3">All Schools</h2>
      <div className="table-responsive">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Table striped hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>School Name</th>
                  <th>Address</th>
                  <th>Principal</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Students</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentSchools.map((school) => (
                  <tr key={school.id}>
                    <td>{school.id}</td>
                    <td>{school.name}</td>
                    <td>{school.address}</td>
                    <td>{school.principal}</td>
                    <td>{school.email}</td>
                    <td>{school.phone}</td>
                    <td>{school.students}</td>
                    <td>
                      <span
                        className={`badge ${
                          school.status === "active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {school.status.charAt(0).toUpperCase() +
                          school.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            setEditingSchool(school);
                            setShowEditModal(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant={
                            school.status === "active"
                              ? "outline-warning"
                              : "outline-success"
                          }
                          size="sm"
                          onClick={() => handleToggleStatus(school)}
                          disabled={togglingId === school.id}
                        >
                          {togglingId === school.id
                            ? "..."
                            : school.status === "active"
                              ? "Disable"
                              : "Enable"}
                        </Button>
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() =>
                            router.push(`/superadmin/schools/school`)
                          }
                        >
                          Detail
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
              </span>
              <Pagination>{renderPagination()}</Pagination>
            </div>
          </>
        )}
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New School</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="text-center mb-3">
              <Form.Group controlId="formLogo">
                <Form.Label>School Logo</Form.Label>
                <div>
                  {newSchool.logoPreview ? (
                    <img
                      src={newSchool.logoPreview}
                      alt="School Logo"
                      className="rounded-circle"
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center bg-light rounded-circle"
                      style={{ width: 100, height: 100 }}
                    >
                      <span className="text-muted">No Logo</span>
                    </div>
                  )}
                </div>
                <Form.Control
                  type="file"
                  accept="image/*"
                  className="mt-2"
                  onChange={(e) => handleLogoChange(e)}
                />
              </Form.Group>
            </div>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formSchoolName">
                  <Form.Label>School Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter school name"
                    value={newSchool.name}
                    onChange={(e) =>
                      setNewSchool({ ...newSchool, name: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPrincipal">
                  <Form.Label>Principal</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter principal name"
                    value={newSchool.principal}
                    onChange={(e) =>
                      setNewSchool({ ...newSchool, principal: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={newSchool.email}
                    onChange={(e) =>
                      setNewSchool({ ...newSchool, email: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={newSchool.phone}
                    onChange={(e) =>
                      setNewSchool({ ...newSchool, phone: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={newSchool.address}
                    onChange={(e) =>
                      setNewSchool({ ...newSchool, address: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={newSchool.status}
                    onChange={(e) =>
                      setNewSchool({ ...newSchool, status: e.target.value })
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            disabled={saving}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveSchool}
            disabled={!isAddFormValid() || saving}
          >
            {saving ? "Saving..." : "Save School"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit School</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingSchool && (
            <Form>
              <div className="text-center mb-3">
                <Form.Group controlId="formEditLogo">
                  <Form.Label>School Logo</Form.Label>
                  <div>
                    {editLogoPreview ? (
                      <img
                        src={editLogoPreview}
                        alt="School Logo"
                        className="rounded-circle"
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center bg-light rounded-circle"
                        style={{ width: 100, height: 100 }}
                      >
                        <span className="text-muted">No Logo</span>
                      </div>
                    )}
                  </div>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    className="mt-2"
                    onChange={(e) => handleLogoChange(e, true)}
                  />
                </Form.Group>
              </div>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formEditSchoolName">
                    <Form.Label>School Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter school name"
                      value={editingSchool.name}
                      onChange={(e) =>
                        setEditingSchool({
                          ...editingSchool,
                          name: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEditPrincipal">
                    <Form.Label>Principal</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter principal name"
                      value={editingSchool.principal}
                      onChange={(e) =>
                        setEditingSchool({
                          ...editingSchool,
                          principal: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formEditEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={editingSchool.email}
                      onChange={(e) =>
                        setEditingSchool({
                          ...editingSchool,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEditPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter phone number"
                      value={editingSchool.phone}
                      onChange={(e) =>
                        setEditingSchool({
                          ...editingSchool,
                          phone: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group controlId="formEditAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      value={editingSchool.address}
                      onChange={(e) =>
                        setEditingSchool({
                          ...editingSchool,
                          address: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="formEditStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={editingSchool.status}
                      onChange={(e) =>
                        setEditingSchool({
                          ...editingSchool,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditModal(false)}
            disabled={saving}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdateSchool}
            disabled={!isEditFormValid() || saving}
          >
            {saving ? "Updating..." : "Update School"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>School Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailSchool && (
            <div>
              <Row className="mb-2">
                <Col md={4} className="text-muted">
                  School Name:
                </Col>
                <Col md={8}>{detailSchool.name}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={4} className="text-muted">
                  Address:
                </Col>
                <Col md={8}>{detailSchool.address}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={4} className="text-muted">
                  Principal:
                </Col>
                <Col md={8}>{detailSchool.principal}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={4} className="text-muted">
                  Email:
                </Col>
                <Col md={8}>{detailSchool.email}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={4} className="text-muted">
                  Phone:
                </Col>
                <Col md={8}>{detailSchool.phone}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={4} className="text-muted">
                  Students:
                </Col>
                <Col md={8}>{detailSchool.students}</Col>
              </Row>
              <Row className="mb-2">
                <Col md={4} className="text-muted">
                  Status:
                </Col>
                <Col md={8}>
                  <span
                    className={`badge ${
                      detailSchool.status === "active"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {detailSchool.status.charAt(0).toUpperCase() +
                      detailSchool.status.slice(1)}
                  </span>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ position: "fixed", top: 20, right: 20 }}
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          bg={toastType === "success" ? "success" : "danger"}
        >
          <Toast.Header>
            <strong className="me-auto">
              {toastType === "success" ? "Success" : "Error"}
            </strong>
          </Toast.Header>
          <Toast.Body
            className={toastType === "success" ? "text-white" : "text-white"}
          >
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
