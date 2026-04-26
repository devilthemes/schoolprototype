import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Modal, Form, Checkbox, Row, Col } from 'react-bootstrap';

interface FileItem {
  id: number;
  name: string;
  type: "pdf" | "doc" | "image" | "excel" | "zip" | "other";
  size: string;
  url: string;
  updatedAt: string;
}

interface StudentItem {
  id: number;
  name: string;
  className: string;
  section: string;
  email: string;
  phone: string;
  profileImage: string | null;
  parentName: string;
  rollNo: string; // Added missing property
}

const AssignLibraryModal = ({ show, handleClose, students }: { show: boolean; handleClose: () => void; students: StudentItem[] }) => {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

  const handleStudentSelect = (id: number) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((sid) => sid !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Library</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {students.map((student) => (
          <Form.Check
            key={student.id}
            type="checkbox"
            id={`student-${student.id}`}
            label={`${student.name} (${student.rollNo})`}
            checked={selectedStudents.includes(student.id)}
            onChange={() => handleStudentSelect(student.id)}
          />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleClose()}>
          Assign
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const LibrarySubjectDetailPage = () => {
  const router = useRouter();
  const [showAssignLibraryModal, setShowAssignLibraryModal] = useState(false);
  const students: StudentItem[] = [
    { id: 1, name: "John Doe", className: "Class 1", section: "A", email: "john@example.com", phone: "1234567890", profileImage: null, parentName: "Jane Doe", rollNo: "1" },
    // Add more students as needed
  ];

  const handleAssignLibrary = () => {
    setShowAssignLibraryModal(true);
  };

  return (
    <div>
      <Button variant="outline-primary" onClick={handleAssignLibrary}>
        Assign Library
      </Button>
      <AssignLibraryModal
        show={showAssignLibraryModal}
        handleClose={() => setShowAssignLibraryModal(false)}
        students={students}
      />
    </div>
  );
};

export default LibrarySubjectDetailPage;
