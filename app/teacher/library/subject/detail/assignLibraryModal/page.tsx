"use client";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

import { Form, Button } from "react-bootstrap";
export default function AssignLibraryModal({ show }: { show: boolean }) {
  const [showAssignLibraryModal, setShowAssignLibraryModal] = useState(false);

  type StudentName = string;

  const students: StudentName[] = [
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Emily Davis",
  ];

  const [selectedStudents, setSelectedStudents] = useState<StudentName[]>([]);

  const handleCheckboxChange = (name: StudentName) => {
    setSelectedStudents((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name],
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    alert(`Assigned: ${selectedStudents.join(", ")}`);
  };
  useEffect(() => {
    setShowAssignLibraryModal(show);
  }, [show]);
  return (
    <Modal
      show={showAssignLibraryModal}
      onHide={() => setShowAssignLibraryModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Assign Library to Students</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          This feature allows you to assign this library to specific students.
        </p>
        {/* Form fields for selecting classes and setting permissions would go here */}

        <Form onSubmit={handleSubmit}>
          {students.map((student, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={student}
              onChange={() => handleCheckboxChange(student)}
              checked={selectedStudents.includes(student)}
              className="mb-2"
            />
          ))}

          <Button variant="primary" type="submit" className="mt-3">
            Assign it
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
