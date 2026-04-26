"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
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

interface StudentItem {
  id: number;
  name: string;
  rollNo: string;
  className: string;
  section: string;
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

const students: StudentItem[] = [
  { id: 1, name: "Alice Johnson", rollNo: "101", className: "Class 10", section: "A" },
  { id: 2, name: "Bob Smith", rollNo: "102", className: "Class 10", section: "A" },
  { id: 3, name: "Charlie Brown", rollNo: "103", className: "Class 10", section: "A" },
  { id: 4, name: "David Wilson", rollNo: "104", className: "Class 10", section: "A" },
  { id: 5, name: "Eve Davis", rollNo: "105", className: "Class 10", section: "A" },
  { id: 6, name: "Frank Miller", rollNo: "101", className: "Class 10", section: "B" },
  { id: 7, name: "Grace Lee", rollNo: "102", className: "Class 10", section: "B" },
  { id: 8, name: "Henry Garcia", rollNo: "101", className: "Class 1", section: "A" },
  { id: 9, name: "Ivy Martinez", rollNo: "102", className: "Class 1", section: "A" },
  { id: 10, name: "Jack Robinson", rollNo: "103", className: "Class 1", section: "A" },
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
  {
    id: 3,
    title: "History Essay",
    description: "Write a 500-word essay on the French Revolution.",
    start_date: "2024-09-10",
    due_date: "2024-09-25",
    status: "pending",
    total_marks: 50,
    total_files: 1,
    className: "Class 10",
    section: "A",
  },
  {
    id: 4,
    title: "English Grammar Quiz",
    description: "Complete the online quiz on tenses.",
    start_date: "2024-09-12",
    due_date: "2024-09-18",
    status: "completed",
    total_marks: 20,
    total_files: 0,
    className: "Class 8",
    section: "C",
  },
  {
    id: 5,
    title: "Physics Lab Report",
    description: "Submit the report for the Ohm's Law experiment.",
    start_date: "2024-09-15",
    due_date: "2024-09-22",
    status: "pending",
    total_marks: 40,
    total_files: 2,
    className: "Class 11",
    section: "A",
  },
  {
    id: 6,
    title: "Geography Map Work",
    description: "Mark major rivers on the map of India.",
    start_date: "2024-09-18",
    due_date: "2024-09-24",
    status: "pending",
    total_marks: 30,
    total_files: 1,
    className: "Class 9",
    section: "B",
  },
  {
    id: 7,
    title: "Chemistry Balancing Equations",
    description: "Solve the worksheet on chemical equations.",
    start_date: "2024-09-20",
    due_date: "2024-09-27",
    status: "completed",
    total_marks: 25,
    total_files: 1,
    className: "Class 10",
    section: "B",
  },
  {
    id: 8,
    title: "Biology Diagram",
    description: "Draw and label the human heart.",
    start_date: "2024-09-22",
    due_date: "2024-09-29",
    status: "pending",
    total_marks: 15,
    total_files: 1,
    className: "Class 9",
    section: "A",
  },
  {
    id: 9,
    title: "Computer Science Coding",
    description: "Write a Python script for a simple calculator.",
    start_date: "2024-09-25",
    due_date: "2024-10-05",
    status: "pending",
    total_marks: 60,
    total_files: 1,
    className: "Class 12",
    section: "A",
  },
  {
    id: 10,
    title: "Economics Case Study",
    description: "Analyze the impact of inflation on small businesses.",
    start_date: "2024-09-28",
    due_date: "2024-10-10",
    status: "pending",
    total_marks: 80,
    total_files: 2,
    className: "Class 11",
    section: "B",
  },
  {
    id: 11,
    title: "Art & Craft",
    description: "Make a charcoal sketch of a still life.",
    start_date: "2024-10-01",
    due_date: "2024-10-08",
    status: "completed",
    total_marks: 50,
    total_files: 3,
    className: "Class 8",
    section: "A",
  },
  {
    id: 12,
    title: "Physical Education Quiz",
    description: "Multiple choice questions on sports rules.",
    start_date: "2024-10-03",
    due_date: "2024-10-07",
    status: "pending",
    total_marks: 20,
    total_files: 0,
    className: "Class 7",
    section: "B",
  },
  {
    id: 13,
    title: "Spanish Vocabulary",
    description: "Learn 50 common Spanish verbs.",
    start_date: "2024-10-05",
    due_date: "2024-10-12",
    status: "pending",
    total_marks: 30,
    total_files: 0,
    className: "Class 9",
    section: "C",
  },
  {
    id: 14,
    title: "Algebra Worksheet",
    description: "Solve problems 1-20 on quadratic equations.",
    start_date: "2024-10-08",
    due_date: "2024-10-15",
    status: "pending",
    total_marks: 45,
    total_files: 1,
    className: "Class 10",
    section: "A",
  },
  {
    id: 15,
    title: "Literature Review",
    description: "Read 'To Kill a Mockingbird' and summarize chapter 5.",
    start_date: "2024-10-10",
    due_date: "2024-10-17",
    status: "completed",
    total_marks: 25,
    total_files: 1,
    className: "Class 11",
    section: "A",
  },
  {
    id: 16,
    title: "Civics Presentation",
    description: "Prepare a PPT on the three branches of government.",
    start_date: "2024-10-12",
    due_date: "2024-10-22",
    status: "pending",
    total_marks: 70,
    total_files: 1,
    className: "Class 9",
    section: "B",
  },
  {
    id: 17,
    title: "Music Theory",
    description: "Identify notes on the treble clef.",
    start_date: "2024-10-15",
    due_date: "2024-10-20",
    status: "pending",
    total_marks: 20,
    total_files: 1,
    className: "Class 6",
    section: "A",
  },
  {
    id: 18,
    title: "Geometry Proofs",
    description:
      "Prove the Pythagorean theorem using three different methods.",
    start_date: "2024-10-18",
    due_date: "2024-10-28",
    status: "pending",
    total_marks: 55,
    total_files: 2,
    className: "Class 10",
    section: "B",
  },
  {
    id: 19,
    title: "Environmental Science",
    description: "Report on local waste management systems.",
    start_date: "2024-10-20",
    due_date: "2024-10-30",
    status: "pending",
    total_marks: 40,
    total_files: 1,
    className: "Class 8",
    section: "C",
  },
  {
    id: 20,
    title: "World History Timeline",
    description: "Create a timeline of World War II events.",
    start_date: "2024-10-22",
    due_date: "2024-11-05",
    status: "pending",
    total_marks: 65,
    total_files: 1,
    className: "Class 11",
    section: "C",
  },
  {
    id: 21,
    title: "Statistics Project",
    description: "Collect and analyze data from your class's height.",
    start_date: "2024-10-25",
    due_date: "2024-11-10",
    status: "pending",
    total_marks: 90,
    total_files: 2,
    className: "Class 12",
    section: "B",
  },
  {
    id: 22,
    title: "French Dialogue",
    description: "Write a short dialogue between two friends at a cafe.",
    start_date: "2024-10-28",
    due_date: "2024-11-04",
    status: "completed",
    total_marks: 30,
    total_files: 1,
    className: "Class 9",
    section: "A",
  },
  {
    id: 23,
    title: "Organic Chemistry",
    description: "Draw structures for the given IUPAC names.",
    start_date: "2024-11-01",
    due_date: "2024-11-10",
    status: "pending",
    total_marks: 45,
    total_files: 1,
    className: "Class 12",
    section: "A",
  },
  {
    id: 24,
    title: "Ancient Civilizations",
    description: "Research the daily life in Ancient Egypt.",
    start_date: "2024-11-05",
    due_date: "2024-11-15",
    status: "pending",
    total_marks: 50,
    total_files: 1,
    className: "Class 7",
    section: "A",
  },
  {
    id: 25,
    title: "Business Studies",
    description: "Draft a simple marketing plan for a new product.",
    start_date: "2024-11-08",
    due_date: "2024-11-20",
    status: "pending",
    total_marks: 75,
    total_files: 2,
    className: "Class 11",
    section: "B",
  },
  {
    id: 26,
    title: "Psychology Experiment",
    description: "Observe and record behavioral patterns in a public place.",
    start_date: "2024-11-10",
    due_date: "2024-11-25",
    status: "pending",
    total_marks: 100,
    total_files: 3,
    className: "Class 12",
    section: "C",
  },
  {
    id: 27,
    title: "Philosophy Essay",
    description: "Discuss the concept of free will versus determinism.",
    start_date: "2024-11-12",
    due_date: "2024-11-30",
    status: "pending",
    total_marks: 85,
    total_files: 1,
    className: "Class 12",
    section: "A",
  },
  {
    id: 28,
    title: "Information Technology",
    description: "Create a simple HTML webpage about your hobby.",
    start_date: "2024-11-15",
    due_date: "2024-11-25",
    status: "pending",
    total_marks: 50,
    total_files: 1,
    className: "Class 10",
    section: "C",
  },
  {
    id: 29,
    title: "Accounting Ledgers",
    description: "Prepare the ledger accounts for the given transactions.",
    start_date: "2024-11-18",
    due_date: "2024-11-28",
    status: "completed",
    total_marks: 60,
    total_files: 1,
    className: "Class 11",
    section: "A",
  },
  {
    id: 30,
    title: "Sociology Research",
    description: "Interview three people about their views on social media.",
    start_date: "2024-11-20",
    due_date: "2024-12-05",
    status: "pending",
    total_marks: 70,
    total_files: 2,
    className: "Class 12",
    section: "B",
  },
  {
    id: 31,
    title: "Final Math Revision",
    description: "Solve the sample paper for the upcoming finals.",
    start_date: "2024-11-25",
    due_date: "2024-12-10",
    status: "pending",
    total_marks: 100,
    total_files: 1,
    className: "Class 10",
    section: "A",
  },
  {
    id: 32,
    title: "Creative Writing",
    description: "Write a short story starting with 'The door creaked open...'",
    start_date: "2024-11-28",
    due_date: "2024-12-15",
    status: "pending",
    total_marks: 40,
    total_files: 1,
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
  const [showEditAssignmentModal, setShowEditAssignmentModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
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
  const [editFormData, setEditFormData] = useState({
    id: 0,
    title: "",
    className: "",
    section: "",
    due_date: "",
    total_marks: 100,
    description: "",
  });
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [assignData, setAssignData] = useState({
    className: "",
    section: "",
    subject: "",
  });

  // Pagination states for Messages
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Pagination states for Assignments
  const [assignmentCurrentPage, setAssignmentCurrentPage] = useState(1);
  const [assignmentItemsPerPage] = useState(10);

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
    console.log("Selected students:", selectedStudents);
    setShowAddAssignmentModal(false);
    setNewAssignment({
      title: "",
      className: "",
      section: "",
      due_date: "",
      total_marks: 100,
      description: "",
    });
    setSelectedStudents([]);
  };

  const handleEditAssignmentSubmit = () => {
    console.log("Updating assignment:", editFormData);
    setShowEditAssignmentModal(false);
  };

  const handleEditClick = (assignment: AssignmentItem) => {
    setEditFormData({
      id: assignment.id,
      title: assignment.title,
      className: assignment.className,
      section: assignment.section,
      due_date: assignment.due_date,
      total_marks: assignment.total_marks,
      description: assignment.description,
    });
    setShowEditAssignmentModal(true);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.className === (showEditAssignmentModal ? editFormData.className : newAssignment.className) &&
      s.section === (showEditAssignmentModal ? editFormData.section : newAssignment.section),
  );

  const toggleStudentSelection = (studentId: number) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId],
    );
  };

  const toggleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length && filteredStudents.length > 0) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map((s) => s.id));
    }
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

  // Pagination logic for Assignments
  const indexOfLastAssignment = assignmentCurrentPage * assignmentItemsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentItemsPerPage;
  const currentAssignments = assignmentsData.slice(
    indexOfFirstAssignment,
    indexOfLastAssignment,
  );
  const totalAssignmentPages = Math.ceil(
    assignmentsData.length / assignmentItemsPerPage,
  );

  const paginateAssignment = (pageNumber: number) =>
    setAssignmentCurrentPage(pageNumber);

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
      </div>

      <Card className="mt-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
            <h5 className="mb-0">Assignments</h5>
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
              {currentAssignments.map((assignment) => (
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
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() =>
                          router.push("/teacher/assignments/assignment")
                        }
                      >
                        View
                      </Button>
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => handleEditClick(assignment)}
                      >
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination for Assignments */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              Showing {indexOfFirstAssignment + 1} to{" "}
              {Math.min(indexOfLastAssignment, assignmentsData.length)} of{" "}
              {assignmentsData.length} entries
            </div>
            <Pagination className="mb-0">
              <Pagination.Prev
                onClick={() => paginateAssignment(assignmentCurrentPage - 1)}
                disabled={assignmentCurrentPage === 1}
              />
              {[...Array(totalAssignmentPages)].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === assignmentCurrentPage}
                  onClick={() => paginateAssignment(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => paginateAssignment(assignmentCurrentPage + 1)}
                disabled={assignmentCurrentPage === totalAssignmentPages}
              />
            </Pagination>
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

            {newAssignment.className && newAssignment.section && (
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Form.Label className="mb-0">Select Students</Form.Label>
                  {filteredStudents.length > 0 && (
                    <Button variant="link" size="sm" onClick={toggleSelectAll}>
                      {selectedStudents.length === filteredStudents.length
                        ? "Deselect All"
                        : "Select All"}
                    </Button>
                  )}
                </div>
                <div
                  className="border rounded p-3"
                  style={{ maxHeight: "200px", overflowY: "auto", background: "#f8f9fa" }}
                >
                  {filteredStudents.length > 0 ? (
                    <Row>
                      {filteredStudents.map((student) => (
                        <Col md={6} key={student.id} className="mb-2">
                          <Form.Check
                            type="checkbox"
                            id={`student-${student.id}`}
                            label={`${student.name} (${student.rollNo})`}
                            checked={selectedStudents.includes(student.id)}
                            onChange={() => toggleStudentSelection(student.id)}
                          />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <div className="text-center text-muted py-2">
                      No students found for this class and section.
                    </div>
                  )}
                </div>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <ReactQuill
                theme="snow"
                value={newAssignment.description}
                onChange={(value) =>
                  setNewAssignment({ ...newAssignment, description: value })
                }
                placeholder="Enter description"
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

      <Modal
        show={showEditAssignmentModal}
        onHide={() => setShowEditAssignmentModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Assignment</Modal.Title>
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
                    value={editFormData.title}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
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
                    value={editFormData.total_marks}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
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
                    value={editFormData.className}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
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
                    value={editFormData.section}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
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
                    value={editFormData.due_date}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        due_date: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            {editFormData.className && editFormData.section && (
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Form.Label className="mb-0">Select Students</Form.Label>
                  {filteredStudents.length > 0 && (
                    <Button variant="link" size="sm" onClick={toggleSelectAll}>
                      {selectedStudents.length === filteredStudents.length
                        ? "Deselect All"
                        : "Select All"}
                    </Button>
                  )}
                </div>
                <div
                  className="border rounded p-3"
                  style={{ maxHeight: "200px", overflowY: "auto", background: "#f8f9fa" }}
                >
                  {filteredStudents.length > 0 ? (
                    <Row>
                      {filteredStudents.map((student) => (
                        <Col md={6} key={student.id} className="mb-2">
                          <Form.Check
                            type="checkbox"
                            id={`edit-student-${student.id}`}
                            label={`${student.name} (${student.rollNo})`}
                            checked={selectedStudents.includes(student.id)}
                            onChange={() => toggleStudentSelection(student.id)}
                          />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <div className="text-center text-muted py-2">
                      No students found for this class and section.
                    </div>
                  )}
                </div>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <ReactQuill
                theme="snow"
                value={editFormData.description}
                onChange={(value) =>
                  setEditFormData({ ...editFormData, description: value })
                }
                placeholder="Enter description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditAssignmentModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditAssignmentSubmit}>
            Save Changes
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
    </>
  );
}
